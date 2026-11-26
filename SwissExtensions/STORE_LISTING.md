# Rigi Extensions — тексты для Chrome Web Store

Версия пакета: **1.5.52** · [Developer Dashboard](https://chrome.google.com/webstore/devconsole)

Privacy Policy: `https://github.com/navorina-labs/SwissExtensions/blob/main/PRIVACY_POLICY.md`

---

## Short description (≤132 символов)

**EN (131 символ):**
```
Capture, tab hibernate, RAM cleaner, site blocker with tab backup, history recovery — all local in one side panel.
```

**RU:**
```
Скрин, сон вкладок, RAM, блокировка сайтов с сохранением вкладок и восстановлением из истории — локально, одна панель.
```

---

## Full description (Detailed description)

**EN — вставить в карточку Store:**

Your browser shouldn’t feel like a second job. Rigi Extensions brings practical browser tools into one minimal side panel — so you move faster, use less RAM, and stay on task.

What’s inside

1. **Swiss Command** — Search open tabs, bookmarks, and browsing history from one private command palette.

2. **Swiss Lens** — Increase text size, reduce motion, improve contrast, and hide common distractions per site.

3. **Page Capture** — Long pages, clean exports: tiled PNG capture (full scroll stitched in the browser).

4. **Tab Hibernate** — Suspend inactive tabs as lightweight placeholders or discard; restore when you’re back. Backup to bookmarks and local history. **Recover lost tabs** after crashes or extension updates.

5. **Memory Cleaner** — Discard background tabs to free memory without closing your active tab.

6. **Site Blocker** — Block distracting domains with built-in filter lists plus your own blocklist, whitelist, and focus schedule. **Auto-save open tabs** on blocked sites to plugin History and Chrome bookmarks so you can restore them later.

7. **Site Data Clear** — Clear cookies, localStorage, and sessionStorage for the current site — only when you confirm.

**Tab recovery (local, on your device)**

- **Backup all tabs now** before updating the extension.
- **Recover lost tabs** from extension storage and backup bookmarks.
- **Recover from Chrome history** — find visited URLs that are not open and restore as placeholders.
- **History page** — closed tabs, site-blocker saves, dated backups; export/import JSON.
- **Site Blocker → Saved tabs** — auto-saved when blocking turns on or you add a domain.

No accounts. No cloud upload of your browsing data. Keyboard shortcuts: suspend current tab (Alt+Shift+H), discard background tabs (Alt+Shift+K).

No bloat. No noise. Built for people who live in many tabs and want performance and focus through the day.

---

**RU (опционально, отдельная локаль):**

Браузер не должен ощущаться второй работой. Rigi Extensions объединяет полезные инструменты в одной боковой панели: быстрее, меньше RAM, больше фокуса.

**Внутри:** поиск по вкладкам, закладкам и истории; захват длинных страниц (PNG); гибернация вкладок с восстановлением; очистка RAM; блокировка сайтов; очистка данных текущего сайта.

**Восстановление вкладок (только на устройстве):** резервная копия перед обновлением; восстановление из storage и закладок; поиск потерянных URL в истории Chrome; отдельный раздел History; автосохранение вкладок на заблокированных сайтах.

Без аккаунта. Данные не отправляются на сервер. Горячие клавиши: Alt+Shift+H (усыпить вкладку), Alt+Shift+K (сбросить фоновые).

---

---

## What's new (Release notes) — version 1.5.52

**EN (full):**
```
Improves stability in large tab sessions: startup no longer wakes discarded tabs to refresh favicons, Page Capture keeps its lock across service-worker restarts, and disabling Site Blocker no longer replaces open pages with placeholders. Keyboard focus now returns to the selected tool after navigating back.
```

**EN (short, if character limit):**
```
More stable large-tab startup, safer Page Capture, and predictable Site Blocker disable behavior.
```

**RU:**
```
Стабильнее запуск с большим числом вкладок, безопаснее Page Capture, а выключение Site Blocker больше не заменяет открытые страницы заглушками.
```

---

## What's new (Release notes) — version 1.5.25 (archive)

**EN (full):**
```
Tab Hibernate: Group same URLs — Chrome tab groups for matching pages in the current window (hash ignored; different paths stay separate). Works on hibernate placeholders and Site Blocker error pages.

Tab Hibernate: dedupe by URL when saving — Close all and save, Save tab group, History import/load keep one entry per page URL.

Site Blocker: remember page URL before block (webNavigation); blocked tabs convert to hibernate placeholders when blocking is off or the extension is disabled.
```

**EN (short, if character limit):**
```
Group same URLs; save/History URL dedupe; Site Blocker URL memory and placeholder fallback.
```

**RU:**
```
Tab Hibernate: «Group same URLs» — группы вкладок с одинаковым URL (# игнорируется; разные path/query — отдельно). Работает на placeholder и заблокированных вкладках.

Tab Hibernate: дедуп по URL при сохранении — Close all and save, Save tab group, History.

Site Blocker: запоминание URL до блокировки; при выключении блокировки/расширения вкладки остаются placeholder с URL.
```

## What’s new (Release notes) — version 1.5.14 (archive)

**EN (полный):**
```
Tab Hibernate: save and restore whole tab groups (title, color, order) — Close all and save, History, Save tab group.

Tab Hibernate: after browser restart or force quit, suspended placeholders rebind faster; alarm no longer deletes live restore data before rebind.

Site Blocker: stronger domain blocking rules; periodic reload of open tabs on blocked sites.
```

**EN (короткий, если лимит символов):**
```
Tab groups save/restore; crash-restart placeholder fix; Site Blocker blocking improvements.
```

**RU:**
```
Tab Hibernate: сохранение и восстановление групп вкладок (название, цвет, порядок) — Close all and save, History, Save tab group.

После перезапуска/force quit placeholder быстрее перепривязывается; alarm больше не удаляет живые suspended_* до rebind.

Site Blocker: усиленные правила блокировки; периодическая перезагрузка открытых вкладок на заблокированных доменах.
```

---

## What’s new (Release notes) — version 1.5.11 (archive)

**EN (полный):**
```
Tab Hibernate: fixed inactivity timer resetting on every service worker wake — background tabs now auto-suspend again.

Tab Hibernate: pinned tabs no longer stay “always active” after notification sounds (audible:false no longer resets the timer).

Tab Hibernate: suspended placeholders stay in their tab group; clearer “Auto-suspend pinned tabs” setting.
```

**EN (короткий, если лимит символов):**
```
Auto-hibernate timer fix; pinned-tab activity reset fix; placeholders keep tab groups.
```

**RU:**
```
Tab Hibernate: таймер неактивности больше не сбрасывается при каждом пробуждении SW — фоновые вкладки снова усыпляются.

Закреплённые вкладки: audible:false не обнуляет таймер после уведомлений. Placeholder остаётся в группе; понятнее настройка auto-suspend для pinned.
```

---

## Single purpose

**EN:**
```
Rigi Extensions is a local browser-workspace manager. It helps users manage and recover tabs, reduce tab memory use, capture pages, apply per-site readability settings, block distracting sites, and clear data for the current site from one side panel. All processing stays on the user's device.
```

---

## Privacy tab — обоснование разрешения webNavigation

Вставить на вкладке **«Меры по обеспечению конфиденциальности»** → поле обоснования для **webNavigation**:

**EN (для Store):**
```
The webNavigation permission is used only to read the target http(s) URL of the main frame in onBeforeNavigate before Site Blocker declarativeNetRequest rules replace the page with a chrome-error page. Chrome tabs.onUpdated often no longer exposes the original URL after a block, so without this hook the extension cannot recover which page the user was opening.

That remembered URL is stored locally (chrome.storage.local and in-memory maps on the device) to: auto-save tabs on blocked domains to History and bookmarks; convert blocked tabs to Tab Hibernate placeholders when blocking is disabled or the extension is turned off; resolve URLs for “Group same URLs” and tab recovery. No navigation history is uploaded, sold, or used for advertising or profiling.
```

**RU (если форма на русском):**
```
Разрешение webNavigation нужно только чтобы в onBeforeNavigate (основной фрейм) прочитать целевой http(s) URL до того, как Site Blocker через declarativeNetRequest заменит страницу на chrome-error. После блокировки tabs.onUpdated часто уже не содержит исходный адрес — без этого хука расширение не может восстановить, какую страницу открывал пользователь.

Запомненный URL хранится локально (chrome.storage.local и оперативные структуры на устройстве) для: автосохранения вкладок на заблокированных доменах в History и закладки; перевода заблокированных вкладок в placeholder Tab Hibernate при выключении блокировки или расширения; определения URL для «Group same URLs» и восстановления вкладок. История навигации не отправляется на сервер, не продаётся и не используется для рекламы или профилирования.
```

**Короткий EN (если лимит символов):**
```
Capture the http(s) URL in onBeforeNavigate before Site Blocker DNR replaces the tab with chrome-error, so blocked tabs can be saved/restored locally. Stored on-device only; never sent off-device.
```

---

## Privacy tab — обоснование разрешения tabGroups

Вставить на вкладке **«Меры по обеспечению конфиденциальности»** → поле обоснования для **tabGroups**:

**EN (для Store):**
```
The tabGroups permission is used only for Tab Hibernate features that the user triggers: saving a tab group to local History (title, color, tab order), keeping suspended placeholder tabs in their group, and restoring saved tabs back into a group when opened from History. Group metadata is read from Chrome Tab Groups API and stored locally in chrome.storage.local on the device. It is not transmitted to any server, not sold, and not used for advertising or profiling.
```

**RU (если форма на русском):**
```
Разрешение tabGroups нужно только для Tab Hibernate по действию пользователя: сохранить группу вкладок в локальную History (название, цвет, порядок), оставить suspended-заглушки в группе и восстановить сохранённые вкладки в группу при открытии из History. Метаданные группы читаются через Chrome Tab Groups API и хранятся локально в chrome.storage.local. Данные не отправляются на сервер, не продаются и не используются для рекламы или профилирования.
```

**Короткий EN (если лимит символов):**
```
Read/update tab group title, color, and membership when the user saves or restores tab groups in Tab Hibernate. Stored locally only; never sent off-device.
```

---

## Permission justifications — paste into the Privacy tab

**favicon**
```
Used to display the original website icon on suspended and blocked-tab placeholders and in local recovery views. Chrome's built-in favicon service receives only the page URL on the user's device. Favicons are not sent to the developer or any external service.
```

**tabs**
```
Used to read tab URLs, titles, favicons, activity state, and group membership, and to create, update, discard, suspend, restore, and organize tabs. These actions power tab search, Page Capture, Tab Hibernate, Memory Cleaner, Site Blocker saved tabs, and recovery. Tab data is processed and stored locally only.
```

**tabGroups**
```
Used to read and restore tab-group membership, title, color, collapsed state, and tab order when users save, suspend, close, or recover grouped tabs. Group metadata is stored locally in chrome.storage.local and is never transmitted off the device.
```

**history**
```
Used for the user-triggered Recover from Chrome history feature and the optional Site Blocker helper for finding previously visited pages. The extension searches Chrome history locally only when the user starts these actions. It does not delete, upload, sell, or use history for advertising or profiling.
```

**alarms**
```
Used to schedule periodic local checks for inactive tabs, automatic tab hibernation, Site Blocker focus schedules, and retention of recovery backups. Alarms are not used for analytics, advertising, or remote communication.
```

**storage**
```
Used to save settings and local feature state, including per-site Swiss Lens preferences, blocklists and schedules, tab activity timestamps, suspended-tab records, saved sessions, recovery indexes, and Page Capture workflow data. This information remains on the user's device.
```

**unlimitedStorage**
```
Used to prevent loss of local recovery data and page captures when users have large browsing sessions with hundreds or thousands of tabs. Stored data can include URLs, titles, tab-group metadata, suspended-tab records, capture data, and rolling daily session snapshots. Old snapshots are automatically removed; data is never transmitted off the device.
```

**bookmarks**
```
Used to create and manage dedicated local bookmark folders for Tab Hibernate backups, blocked-tab saves, and emergency session recovery. Backups are created by explicit user actions or when Site Blocker saves a tab for later restoration. Bookmark data is not uploaded or used for advertising or profiling.
```

**scripting**
```
Used to inject the packaged Page Capture helper into the active tab only after the user starts a capture. The helper measures and scrolls the page so visible sections can be captured and combined locally. No remote script is downloaded or executed.
```

**downloads**
```
Used to save PNG or PDF files generated by Page Capture to the user's Downloads folder or chosen location. A download starts only after the user requests an export. Downloaded files are created locally and are not uploaded to the developer.
```

**sidePanel**
```
Used to provide the extension's primary interface in Chrome's side panel, where users access tab search, readability settings, Page Capture, Tab Hibernate, Memory Cleaner, Site Blocker, and Site Data Clear.
```

**activeTab**
```
Used to obtain temporary access to the current tab when the user starts a page-specific action, such as Page Capture or clearing data for the current site. Access is used only to perform the requested action and is not transmitted off the device.
```

**browsingData**
```
Used by Site Data Clear to remove only the data types selected by the user, such as cookies, local storage, session storage, and cache, for the current site. Removal occurs only after explicit user confirmation. The extension does not read or upload the contents of this data.
```

**declarativeNetRequest**
```
Used by Site Blocker to apply packaged filter rules and the user's local blocklist or allowlist. Rules block configured distracting sites and optional ad/tracker requests. No remote rules are downloaded, and request data is not sent to the developer.
```

**webNavigation**
```
Used to read the main-frame http(s) URL immediately before Site Blocker replaces a blocked navigation with a Chrome error page. This preserves the original URL so the tab can be saved, shown as a restorable placeholder, grouped, or recovered later. The URL is stored locally only and is never transmitted off the device.
```

**Host permission (`<all_urls>`)**
```
Required because the user may use Rigi Extensions on any http(s) website. It lets the packaged Swiss Lens content script apply user-selected readability settings, Page Capture capture the requested page, Site Blocker enforce local rules, and current-site tools identify the active origin. Page content and URLs are processed locally and are not sent to the developer.
```

**Remote code** — select **No**. All JavaScript and other executable code is included in the submitted extension package; no remote code is downloaded or executed.

---

## Data safety

- Обработка данных **только на устройстве** (chrome.storage.local, IndexedDB для capture, локальные закладки).
- **Не продаётся** и **не передаётся** на серверы разработчика.
- History permission: чтение истории **только** для функций восстановления по действию пользователя.

---

## Скриншоты (рекомендации)

1. Главная боковая панель (5 инструментов).
2. Tab Hibernate — recovery / History.
3. Site Blocker — список + auto-save.
4. History — Site blocker saved tabs + Chrome history recover.
5. Page Capture — результат.

---

## Сборка

```bash
./scripts/package-swiss-extensions-store.sh
```

Архив Store: `dist/RigiExtensions-v1.5.52-chrome-store.zip`
Сайт (ZIP): `downloads/RigiExtensions-v1.5.52.zip`
