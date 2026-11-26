# Chrome Web Store Listing — Rigi Extensions

> Last Updated: 2026-08-21

## Store Listing

**Extension Name:** Rigi Extensions

**Short Description:** Capture pages, manage and recover tabs, free RAM, block distracting sites, and clear local site data from one side panel.

**Detailed Description:**

Rigi Extensions is a local browser-workspace manager for people who work with many tabs.

Swiss Command searches open tabs, bookmarks, and browser history. Swiss Lens applies per-site readability settings. Page Capture exports long pages to PNG or PDF. Tab Hibernate and Memory Cleaner reduce tab memory use while preserving recovery data. Site Blocker applies packaged filters and a local blocklist. Site Data Clear removes only the selected data for the current origin.

Open the extension side panel, choose a tool, and run the requested action. Automatic hibernation, blocklists, protected domains, and per-site Lens settings remain configurable in the panel.

All browser data is processed locally. The extension has no account system, analytics, advertising profile, or cloud upload. Support: https://github.com/navorina-labs/SwissExtensions/issues

**Category:** Productivity

**Single Purpose:** Manage a local Chrome workspace by searching, capturing, suspending, recovering, grouping, blocking, and cleaning browser tabs and sites from one side panel.

**Primary Language:** English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|---|---:|---|---|
| Store Icon | 128×128 PNG | Ready | `store-assets/final/store-icon-128.png` |
| Screenshot 1 | 1280×800 | Ready | `store-assets/final/screenshot-01-overview-1280x800.png` |
| Screenshot 2 | 1280×800 | Ready | `store-assets/final/screenshot-02-command-1280x800.png` |
| Screenshot 3 | 1280×800 | Ready | `store-assets/final/screenshot-03-lens-1280x800.png` |
| Screenshot 4 | 1280×800 | Ready | `store-assets/final/screenshot-04-hibernate-1280x800.png` |
| Screenshot 5 | 1280×800 | Ready | `store-assets/final/screenshot-05-blocker-1280x800.png` |
| Small Promo Tile | 440×280 | Ready | `store-assets/final/promo-small-440x280.png` |
| Marquee Promo Tile | 1400×560 | Ready | `store-assets/final/promo-marquee-1400x560.png` |

## Permissions Justification

| Permission | Type | Justification |
|---|---|---|
| `favicon` | permissions | Shows local Chrome-provided favicons beside tab, bookmark, history, and suspended-page results. |
| `tabs` | permissions | Reads tab titles/URLs and creates, updates, groups, discards, suspends, restores, and searches tabs for the visible workspace tools. |
| `tabGroups` | permissions | Preserves group title, color, order, and membership when users save, suspend, and restore grouped tabs. |
| `history` | permissions | Searches local browser history and supports explicit lost-tab recovery actions. |
| `alarms` | permissions | Runs configured hibernation checks, blocker schedules, cleanup, and short-lived restore-rule expiry. |
| `storage` | permissions | Stores settings, recovery metadata, blocklists, local history, operation locks, and rolling session snapshots on the device. |
| `unlimitedStorage` | permissions | Prevents recovery metadata and user-requested page captures from failing in very large tab sessions. |
| `bookmarks` | permissions | Creates local backup folders and restores user-requested tab and blocked-page backups. |
| `scripting` | permissions | Runs the user-requested Page Capture and Site Data Clear actions in the active page. |
| `downloads` | permissions | Saves user-requested PNG, PDF, and exported recovery files. |
| `sidePanel` | permissions | Hosts the extension's primary interface in Chrome's side panel. |
| `activeTab` | permissions | Grants temporary active-tab access for direct page-specific actions initiated by the user. |
| `browsingData` | permissions | Removes only user-selected cookies or storage types for the current origin. |
| `declarativeNetRequest` | permissions | Applies packaged ad/tracker filters and the user's local blocklist without transmitting requests. |
| `webNavigation` | permissions | Remembers the top-level target URL before a local blocking rule replaces it with a Chrome error page, enabling recovery. |
| `<all_urls>` | host_permissions | Supports optional Lens, capture, blocking, and current-site cleanup on any HTTP(S) site selected by the user. |

## Privacy & Data Use

The extension accesses tab URLs/titles, browsing history, bookmark data, user activity timestamps, and page pixels only for its local features. None of this data is transmitted off-device or shared with third parties.

| Data Type | Accessed or stored locally? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
|---|---|---|---|---|
| Web history | Yes | No | Search and explicit tab recovery | No |
| User activity | Yes | No | Determine tab inactivity locally | No |
| Website content | Only during requested capture | No | Generate PNG/PDF locally | No |
| Authentication, financial, health, location, communications | No | No | Not used | No |

- [x] Data is NOT sold to third parties.
- [x] Data is NOT used outside the extension's core functionality.
- [x] Data is NOT used for creditworthiness or lending purposes.

## Privacy Policy

https://github.com/navorina-labs/SwissExtensions/blob/main/PRIVACY_POLICY.md

## Distribution

**Visibility:** Public  
**Regions:** All regions  
**Pricing:** Free

## Developer Info

**Publisher Name:** Navorina Labs  
**Contact Email:** REQUIRED BEFORE SUBMISSION  
**Support URL:** https://github.com/navorina-labs/SwissExtensions/issues  
**Homepage URL:** https://github.com/navorina-labs/SwissExtensions

## Version History

| Version | Date | Changes | Status |
|---|---|---|---|
| 1.5.52 | 2026-08-21 | Prevents startup tab wake storms, persists MV3 throttles and Page Capture locking, keeps tabs intact when Site Blocker turns off, fixes smart settings and keyboard focus restoration. | Draft |
| 1.5.51 | 2026-08-14 | Rigi rename, ridge mark, and suspended-tab favicon work. | Superseded |

## Review Notes

- The package contains no remote executable code or analytics.
- `<all_urls>` is required because the user may explicitly apply the included tools to any HTTP(S) site.
- Before submission, provide a monitored public contact email and test the packaged ZIP by loading it unpacked in Chrome.
