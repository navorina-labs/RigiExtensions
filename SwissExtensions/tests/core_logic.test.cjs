const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  DEFAULT_CAPTURE_LIMITS,
  getCapturePlan,
  getRestoreStorageKeys,
  isSuccessfulRestoreCommit,
  normalizeInactivityMinutes,
  shouldAllowActiveTabInAlarm,
  shouldIgnoreTransientUngroup,
} = require('../core_logic.js');

test('capture plan accepts a bounded page', () => {
  assert.deepEqual(getCapturePlan({ pageHeight: 5000, viewportHeight: 1000, viewportWidth: 1200 }), {
    ok: true,
    pageHeight: 5000,
    step: 1000,
    totalFrames: 5,
    estimatedPixels: 6_000_000,
  });
});

test('capture plan rejects invalid and oversized pages', () => {
  assert.equal(getCapturePlan({ pageHeight: 0, viewportHeight: 900, viewportWidth: 1200 }).ok, false);
  assert.equal(
    getCapturePlan({
      pageHeight: DEFAULT_CAPTURE_LIMITS.maxHeight + 1,
      viewportHeight: 900,
      viewportWidth: 1200,
    }).ok,
    false,
  );
  assert.equal(
    getCapturePlan(
      { pageHeight: 10_000, viewportHeight: 1000, viewportWidth: 2000 },
      { maxPixels: 1_000_000 },
    ).ok,
    false,
  );
});

test('restore keys are unique and include rebound storage', () => {
  assert.deepEqual(getRestoreStorageKeys(10, 4, 'suspended_3'), [
    'suspended_10',
    'suspended_4',
    'suspended_3',
  ]);
  assert.deepEqual(getRestoreStorageKeys(10, 10, 'suspended_10'), ['suspended_10']);
});

test('only a top-level web navigation finalizes a restore', () => {
  assert.equal(isSuccessfulRestoreCommit({ frameId: 0, url: 'https://example.com/' }), true);
  assert.equal(isSuccessfulRestoreCommit({ frameId: 1, url: 'https://example.com/' }), false);
  assert.equal(isSuccessfulRestoreCommit({ frameId: 0, url: 'chrome-error://chromewebdata/' }), false);
});

test('inactivity timeout rejects corrupted values', () => {
  assert.equal(normalizeInactivityMinutes(60), 60);
  assert.equal(normalizeInactivityMinutes('10'), 10);
  assert.equal(normalizeInactivityMinutes(0), 5);
  assert.equal(normalizeInactivityMinutes(-1), 5);
  assert.equal(normalizeInactivityMinutes(1441), 5);
  assert.equal(normalizeInactivityMinutes('broken'), 5);
});

test('an active tab in any visible window never auto-suspends', () => {
  assert.equal(shouldAllowActiveTabInAlarm({ active: true, windowId: 2 }, 1), false);
  assert.equal(shouldAllowActiveTabInAlarm({ active: true, windowId: 1 }, 1), false);
  assert.equal(shouldAllowActiveTabInAlarm({ active: false, windowId: 2 }, 1), false);
  assert.equal(shouldAllowActiveTabInAlarm({ active: true, windowId: 1 }, null), false);
});

test('temporary ungroup during placeholder navigation does not erase group data', () => {
  assert.equal(shouldIgnoreTransientUngroup(-1, 10_000, 9_000), true);
  assert.equal(shouldIgnoreTransientUngroup(-1, 10_000, 10_001), false);
  assert.equal(shouldIgnoreTransientUngroup(7, 10_000, 9_000), false);
});

test('service worker never loads the entire extension storage into memory', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.equal(worker.includes('chrome.storage.local.get(null)'), false);
});

test('placeholder rebind finishes before a background tab is discarded', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(
    worker,
    /await rebindSinglePlaceholderTab\(tab\)[\s\S]{0,160}await discardInactivePlaceholder\(tab\)/,
  );
});

test('placeholder favicon is set before a background renderer is discarded', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const bootstrap = fs.readFileSync(
    path.join(__dirname, '..', '..', 'frontend', 'apps', 'swiss-ui', 'public', 'suspended-favicon-bootstrap.js'),
    'utf8',
  );
  const html = fs.readFileSync(
    path.join(__dirname, '..', '..', 'frontend', 'apps', 'swiss-ui', 'suspended.html'),
    'utf8',
  );
  assert.match(worker, /params\.set\('o', original\.origin \+ '\/'\)/);
  assert.match(worker, /await waitForPlaceholderFavicon\(tab\.id\)/);
  assert.match(worker, /changeInfo\.favIconUrl/);
  assert.match(worker, /if \(!faviconReady\) return false/);
  assert.match(worker, /changeInfo\.favIconUrl && isResolvedPlaceholderFavicon/);
  assert.doesNotMatch(
    worker.split('function isResolvedPlaceholderFavicon')[1]
      ?.split('function waitForPlaceholderFavicon')[0] || '',
    /\/_favicon\//,
  );
  assert.doesNotMatch(
    worker.split('function isResolvedPlaceholderFavicon')[1]
      ?.split('function waitForPlaceholderFavicon')[0] || '',
    /suspended-fallback\.svg/,
  );
  assert.match(html, /suspended-favicon-bootstrap\.js/);
  assert.match(html, /suspended-fallback\.svg/);
  assert.match(bootstrap, /chrome\.runtime\.getURL\("\/_favicon\/"\)/);
  assert.match(bootstrap, /canvas\.toDataURL\("image\/png"\)/);
  assert.match(bootstrap, /context\.filter = "grayscale\(1\)"/);
});

test('favicon-only refresh skips the suspended React UI and releases image memory', () => {
  const appRoot = path.join(__dirname, '..', '..', 'frontend', 'apps', 'swiss-ui');
  const bootstrap = fs.readFileSync(
    path.join(appRoot, 'public', 'suspended-favicon-bootstrap.js'),
    'utf8',
  );
  const main = fs.readFileSync(path.join(appRoot, 'src', 'suspended', 'main.tsx'), 'utf8');
  const mount = fs.readFileSync(path.join(appRoot, 'src', 'suspended', 'mount.tsx'), 'utf8');
  assert.match(bootstrap, /params\.get\("faviconRefresh"\) === "1"/);
  assert.match(bootstrap, /window\.__suspendedFaviconOnly = true/);
  assert.match(bootstrap, /history\.replaceState/);
  assert.match(bootstrap, /image\.src = ""/);
  assert.match(bootstrap, /canvas\.width = 0/);
  assert.match(main, /if \(!window\.__suspendedFaviconOnly\)/);
  assert.match(main, /await import\("\.\/mount"\)/);
  assert.doesNotMatch(main, /from "react"/);
  assert.match(mount, /from "react"/);
  assert.match(mount, /createRoot/);
});

test('suspended favicons can be refreshed without activating tabs', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const app = fs.readFileSync(
    path.join(__dirname, '..', '..', 'frontend', 'apps', 'swiss-ui', 'src', 'side-panel', 'App.tsx'),
    'utf8',
  );
  const start = worker.split('async function startSuspendedFaviconRefresh')[1]
    ?.split('/** Load one suspended placeholder')[0] || '';
  const refresh = worker.split('async function processNextSuspendedFaviconRefresh')[1]
    ?.split('async function openPlaceholderTabForItem')[0] || '';
  assert.match(start, /!tab\.active/);
  assert.match(start, /FAVICON_REFRESH_BATCH_MAX/);
  assert.match(start, /FAVICON_REFRESH_JOB_KEY/);
  assert.match(start, /scheduleSuspendedFaviconRefresh/);
  assert.match(refresh, /await chrome\.tabs\.reload\(tabId\)/);
  assert.match(refresh, /await faviconReady/);
  assert.match(refresh, /await chrome\.tabs\.discard\(fresh\.id\)/);
  assert.match(refresh, /FAVICON_REFRESH_JOB_KEY/);
  assert.match(refresh, /scheduleSuspendedFaviconRefresh/);
  assert.match(worker, /alarm\.name === FAVICON_REFRESH_ALARM/);
  assert.match(worker, /msg\.type === 'refreshSuspendedFavicons'/);
  assert.match(worker, /const result = await startSuspendedFaviconRefresh\(\)/);
  assert.match(worker, /safeSend\(result\)/);
  assert.match(worker, /await processNextSuspendedFaviconRefresh\(\)/);
  assert.match(app, /Refresh tab icons/);
  assert.match(app, /Finding website icons/);
  assert.match(app, /refreshSuspendedFaviconsInPanel/);
  assert.match(app, /PANEL_FAVICON_REFRESH_TAB_DELAY_MS = 1500/);
  assert.match(app, /PANEL_FAVICON_REFRESH_PARAM = "faviconRefresh"/);
  assert.match(app, /pendingTabIds = queue\.tabIds/);
  assert.match(app, /tabs\.length = 0/);
  assert.match(app, /pendingTabIds\[index\] = 0/);
  assert.doesNotMatch(app, /PANEL_FAVICON_REFRESH_BATCH_MAX/);
  assert.doesNotMatch(app, /PANEL_FAVICON_REFRESH_CHUNK_SIZE/);
  assert.doesNotMatch(app, /PANEL_FAVICON_REFRESH_COOLDOWN_MS/);
  assert.match(app, /getPanelFaviconRefreshUrl/);
  assert.match(app, /await chrome\.tabs\.update\(tabId/);
  assert.match(app, /await chrome\.tabs\.reload\(tabId\)/);
  assert.match(app, /await chrome\.tabs\.discard\(tabId\)/);
  assert.match(app, /isPanelSuspendedTabUrl/);
  assert.doesNotMatch(
    app.split('const refreshTabIcons = async')[1]?.split('return (')[0] || '',
    /sendMessage/,
  );
  assert.match(app, /aria-label="Website icon refresh progress"/);
  assert.doesNotMatch(app, /timeoutMs: 6 \* 60_000/);
});

test('startup does not wake discarded placeholders just to repair favicons', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const startup = worker.split('async function initOnStartup')[1]
    ?.split('/** Extension icon click')[0] || '';
  assert.doesNotMatch(worker, /repairRestoredPlaceholderFavicons/);
  assert.doesNotMatch(worker, /faviconRepair/);
  assert.doesNotMatch(startup, /chrome\.tabs\.(?:update|reload)/);
});

test('disabling Site Blocker never navigates matching tabs to placeholders', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const inactiveBranch = worker.split('if (!blockingWindowActive) {')[1]
    ?.split('await chrome.storage.local.set({')[0] || '';
  assert.match(inactiveBranch, /preserveBlockedOpenTabs\('blocking-off', \{ convertToPlaceholder: false \}\)/);
  assert.doesNotMatch(inactiveBranch, /convertToPlaceholder: true/);
});

test('MV3 maintenance and blocker throttles persist across worker restarts', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(worker, /const LAST_LIGHT_MAINTENANCE_AT = 'lastLightMaintenanceAt'/);
  assert.match(worker, /chrome\.storage\.local\.get\(LAST_LIGHT_MAINTENANCE_AT\)/);
  assert.match(worker, /\[LAST_LIGHT_MAINTENANCE_AT\]: now/);
  assert.match(worker, /const BLOCKER_OPEN_TAB_ENFORCE_AT_KEY = 'lastBlockerOpenTabEnforceAt'/);
  assert.match(worker, /\[BLOCKER_OPEN_TAB_ENFORCE_AT_KEY\]: Date\.now\(\)/);
  assert.doesNotMatch(worker, /let lastLightMaintenanceAt/);
  assert.doesNotMatch(worker, /let lastBlockerOpenTabEnforceAt/);
});

test('page capture lock survives service worker restarts and expires when stale', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const capture = worker.split("if (msg.type === 'capture')")[1]
    ?.split('return false;')[0] || '';
  assert.match(capture, /chrome\.storage\.session\.get\(CAPTURE_STATE_KEY\)/);
  assert.match(capture, /CAPTURE_STATE_STALE_MS/);
  assert.match(capture, /chrome\.storage\.session\.set/);
  assert.match(capture, /chrome\.storage\.session\.remove\(CAPTURE_STATE_KEY\)/);
});

test('side panel uses the worker smart-setting key and restores tool focus', () => {
  const app = fs.readFileSync(
    path.join(__dirname, '..', '..', 'frontend', 'apps', 'swiss-ui', 'src', 'side-panel', 'App.tsx'),
    'utf8',
  );
  assert.match(app, /smartUseHeuristicsFallback/);
  assert.match(app, /raw\.smartHeuristicsFallback/); // legacy migration only
  assert.match(app, /data-tool-view=\{b\.id\}/);
  assert.match(app, /trigger\?\.focus\(\)/);
});

test('blocked main-frame errors are converted before Chrome keeps the extension icon', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const handler = worker.split('if (chrome.webNavigation?.onErrorOccurred)')[1]
    ?.split('function mutateBlockerTabUrlMap')[0] || '';
  assert.match(handler, /ERR_BLOCKED_BY_CLIENT/);
  assert.match(handler, /convertBlockedTabToPlaceholder\(tab, pageUrl\)/);
  assert.match(worker, /const blockerPlaceholderConversions = new Set\(\)/);
});

test('restore progress contract uses the UI field name', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(worker, /restoreProgress:\s*\{\s*done:/);
  assert.doesNotMatch(worker, /restoreProgress:\s*\{\s*restored:/);
});

test('large suspended sessions keep more than the old 1000-entry recovery index', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const match = worker.match(/const SUSPENDED_URL_INDEX_MAX = (\d+);/);
  assert.ok(match);
  assert.ok(Number(match[1]) >= 5000);
});

test('service worker wake does not rebuild Site Blocker rules', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const wakeInit = worker.split('// SW wake: alarms + restore activity only.')[1] || '';
  assert.equal(wakeInit.includes('runSiteBlockerApplyRules()'), false);
  assert.equal(wakeInit.includes('siteBlockerApplyAdsRulesets()'), false);
});

test('placeholder repair compares extension hosts and runs once per runtime', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(worker, /current\.host !== expected\.host/);
  assert.match(worker, /await ensureRuntimePlaceholderRepair\(\)/);
  assert.match(worker, /chrome\.storage\.session\.get\(RUNTIME_PLACEHOLDER_REPAIR_KEY\)/);
});

test('activating a current placeholder does not reload and flash the page', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const activatedHandler = worker.split('chrome.tabs.onActivated.addListener')[1]?.split('chrome.windows.onFocusChanged')[0] || '';
  assert.doesNotMatch(activatedHandler, /chrome\.tabs\.reload\(tabId\)/);
  assert.match(activatedHandler, /rebindSinglePlaceholderTab\(tab\)/);
});

test('active placeholders in unfocused windows are never discarded', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const discard = worker.split('async function discardInactivePlaceholder')[1]
    ?.split('async function openPlaceholderTabForItem')[0] || '';
  assert.match(discard, /if \(tab\.active\) return false/);
  assert.doesNotMatch(discard, /window\?\.focused/);
});

test('rebind does not navigate a current placeholder just to rewrite restored tab ids', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const rebind = worker.split('async function rebindSinglePlaceholderTab')[1]
    ?.split('/** Max rows in closedAndSaved')[0] || '';
  const urlDecision = rebind.split('let needsUrlUpdate = true;')[1]
    ?.split('if (needsStorage)')[0] || '';
  assert.match(urlDecision, /current\.host !== expected\.host/);
  assert.doesNotMatch(urlDecision, /currentTabId !== tab\.id/);
  assert.doesNotMatch(urlDecision, /currentFallback !== expectedFallback/);
});

test('removed placeholder tabs are archived without deleting their recovery index', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const cleanup = worker.split('async function flushRemovedTabCleanup()')[1]?.split('function scheduleRemovedTabCleanup')[0] || '';
  assert.match(cleanup, /orphanedSuspendedArchive/);
  assert.match(cleanup, /persistBoundedList/);
  assert.doesNotMatch(cleanup, /delete idx\[/);
  assert.doesNotMatch(cleanup, /removeSuspendedUrlIndex/);
});

test('lost-tab recovery skips URLs that are already open', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const recovery = worker.split('async function runOpenUrlsAsPlaceholders')[1]?.split('function shouldSkipHistoryRecoverUrl')[0] || '';
  assert.match(recovery, /await getOpenTabUrlKeys\(\)/);
  assert.match(recovery, /alreadyOpenKeys\.has\(openKey\)/);
});

test('session backup is one rolling snapshot, not a new copy every day', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(worker, /const ROLLING_SESSION_BACKUP_KEY = 'rollingSessionBackup';/);
  const capture = worker.split('async function captureDailySessionSnapshot')[1]
    ?.split('async function persistBoundedList')[0] || '';
  assert.match(capture, /buildGroupMetaMapForTabs\(tabs, batchId\)/);
  assert.match(capture, /windowOrder:/);
  assert.match(capture, /tabIndex:/);
  assert.match(capture, /copyGroupMetaToEntry/);
  assert.match(capture, /pruneDailySessionSnapshots\(\)/);
  assert.match(capture, /ROLLING_SESSION_BACKUP_KEY/);
  assert.doesNotMatch(capture, /DAILY_SESSION_SNAPSHOT_PREFIX/);
  const alarmBackup = worker.split('async function persistAlarmBackupEntries')[1]
    ?.split('async function getFocusedNormalWindowId')[0] || '';
  assert.doesNotMatch(alarmBackup, /bookmarks\.create/);
  assert.doesNotMatch(alarmBackup, /backup_/);
});

test('automatic hibernation and memory cleaning stay bounded', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  assert.match(worker, /const ALARM_SUSPEND_MAX_PER_RUN = 12;/);
  assert.match(worker, /const DISCARD_MAX_PER_RUN = 40;/);
  assert.match(worker, /enabled: s\.enabled === true/);
  const alarm = worker.split('async function onAlarmCheck')[1]
    ?.split('function startAlarmCheck')[0] || '';
  assert.match(alarm, /ALARM_SUSPEND_MAX_PER_RUN/);
  assert.match(alarm, /skipBookmark:\s*true/);
  const rebind = worker.split('async function rebindPlaceholderStorageKeys')[1]
    ?.split('async function migrateOrphanedSuspendedTabs')[0] || '';
  assert.match(rebind, /forceRegroup:\s*false/);
  const groups = worker.split('async function collapseTabGroup')[1]
    ?.split('async function isTabEligibleForSuspend')[0] || '';
  assert.match(groups, /collapsed:\s*true/);
  assert.match(groups, /shouldCollapse/);
  assert.doesNotMatch(groups, /collapsed:\s*false/);
  assert.doesNotMatch(groups, /update\.collapsed = meta\.groupCollapsed/);
});

test('daily restore regroups existing tabs and opens only missing URLs', () => {
  const worker = fs.readFileSync(path.join(__dirname, '..', 'service_worker.js'), 'utf8');
  const restore = worker.split('async function runRestoreDailySessionSnapshot')[1]
    ?.split('function shouldSkipHistoryRecoverUrl')[0] || '';
  assert.match(restore, /openByUrl\.has\(key\)/);
  assert.match(restore, /existingGroupPairs\.push/);
  assert.match(restore, /applySavedTabGroups\(existingGroupPairs, \{ forceRegroup: true \}\)/);
  assert.match(restore, /runOpenUrlsAsPlaceholders\(missing, \{ existingGroupPairs \}\)/);
});
