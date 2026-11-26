# Rigi Extensions — brand and store assets

This is the publication asset set for Rigi Extensions. The original ridge mark is inspired by Mount Rigi and keeps the alpine character without copying the Swiss flag or state emblem.

Open `preview-sheet.png` for a quick overview of the complete set.

## Ready-to-use files

### Logo

- `logo/logo-mark.svg` — primary editable mark
- `logo/logo-mark-mono.svg` — monochrome mark
- `logo/logo-horizontal.svg` — horizontal wordmark

### Extension icons

- `icons/icon-16.png`
- `icons/icon-32.png`
- `icons/icon-48.png`
- `icons/icon-128.png`
- `icons/icon-512.png`
- `icons/favicon-32.png`

The 128 px icon follows Chrome Web Store guidance: the visible square occupies 96 × 96 px with 16 px transparent padding on every side.

### Chrome Web Store

- `store/store-icon-128.png`
- `store/promo-small-440x280.png`
- `store/promo-marquee-1400x560.png`
- `store/screenshot-01-overview-1280x800.png`
- `store/screenshot-02-command-1280x800.png`
- `store/screenshot-03-lens-1280x800.png`
- `store/screenshot-04-hibernate-1280x800.png`
- `store/screenshot-05-blocker-1280x800.png`

### Social

- `social/open-graph-1200x630.png`

## Palette

- Graphite: `#171717`
- Rigi red: `#D52B1E`
- Warm white: `#FAF9F6`
- Alpine gray: `#4B4C48`

## Rebuild

Run `render-assets.mjs` with Node.js and Sharp. The UI source captures are kept in `source/` so the store compositions can be regenerated.

The promotional background uses the existing alpine artwork and Swiss editorial composition. The mark is an original mountain silhouette rather than the official Swiss cross.
