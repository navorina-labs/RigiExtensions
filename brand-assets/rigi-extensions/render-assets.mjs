import fs from "node:fs/promises"
import path from "node:path"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const sharp = require("sharp")

const root = path.dirname(new URL(import.meta.url).pathname)
const logoPath = path.resolve(root, "../../SwissExtensions/icons/icon.svg")
const backgroundPath = path.join(root, "source", "promo-background-generated.png")

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")

const svg = (width, height, body) => Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${body}
  </svg>
`)

async function renderIcons() {
  const iconSvg = await fs.readFile(logoPath)
  for (const size of [16, 32, 48, 128, 512]) {
    await sharp(iconSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(root, "icons", `icon-${size}.png`))
  }
  await sharp(iconSvg).resize(128, 128).png().toFile(path.join(root, "store", "store-icon-128.png"))
  await sharp(iconSvg).resize(32, 32).png().toFile(path.join(root, "icons", "favicon-32.png"))
}

async function baseBackground(width, height, darken = 0) {
  const layers = []
  if (darken > 0) {
    layers.push({
      input: svg(width, height, `<rect width="100%" height="100%" fill="#020617" fill-opacity="${darken}"/>`),
    })
  }
  return sharp(backgroundPath)
    .resize(width, height, { fit: "cover", position: "center" })
    .composite(layers)
    .png()
    .toBuffer()
}

async function renderPromo() {
  const logoSvg = await fs.readFile(logoPath)

  const smallBase = await baseBackground(440, 280, 0.05)
  await sharp(smallBase)
    .composite([
      { input: await sharp(logoSvg).resize(122, 122).png().toBuffer(), left: 34, top: 79 },
    ])
    .png()
    .toFile(path.join(root, "store", "promo-small-440x280.png"))

  const marqueeBase = await baseBackground(1400, 560, 0.04)
  await sharp(marqueeBase)
    .composite([
      { input: await sharp(logoSvg).resize(216, 216).png().toBuffer(), left: 112, top: 172 },
    ])
    .png()
    .toFile(path.join(root, "store", "promo-marquee-1400x560.png"))
}

const screens = [
  {
    source: "ui-home.png",
    output: "screenshot-01-overview-1280x800.png",
    kicker: "ONE FOCUSED PANEL",
    title: ["A calmer way", "to run your browser."],
    copy: "Seven practical tools, always close at hand.",
  },
  {
    source: "ui-command.png",
    output: "screenshot-02-command-1280x800.png",
    kicker: "COMMAND SEARCH",
    title: ["Find anything", "without losing focus."],
    copy: "Search open tabs, bookmarks, and history locally.",
  },
  {
    source: "ui-lens.png",
    output: "screenshot-03-lens-1280x800.png",
    kicker: "READABILITY CONTROLS",
    title: ["Make every site", "easier to read."],
    copy: "Tune text size, contrast, motion, and distractions per site.",
  },
  {
    source: "ui-hibernate.png",
    output: "screenshot-04-hibernate-1280x800.png",
    kicker: "TAB HIBERNATION",
    title: ["Put inactive tabs", "gently to sleep."],
    copy: "Save memory while keeping every page ready to restore.",
  },
  {
    source: "ui-blocker.png",
    output: "screenshot-05-blocker-1280x800.png",
    kicker: "FOCUS MODE",
    title: ["Block distractions.", "Keep control."],
    copy: "Use local blocklists and preserve tabs for later.",
  },
]

async function renderScreenshots() {
  const logoSvg = await fs.readFile(logoPath)
  const smallLogo = await sharp(logoSvg).resize(62, 62).png().toBuffer()

  for (const screen of screens) {
    const base = await baseBackground(1280, 800)
    const ui = await sharp(path.join(root, "source", screen.source))
      .resize(399, 760, { fit: "cover", position: "top" })
      .png()
      .toBuffer()
    const frame = svg(431, 792, `
      <rect x="1" y="1" width="429" height="790" rx="34" fill="#F8FAFC" fill-opacity=".16" stroke="#FFFFFF" stroke-opacity=".22" stroke-width="2"/>
    `)
    const copyLayer = svg(1280, 800, `
      <defs>
        <linearGradient id="copyWash" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#FAF9F6" stop-opacity=".99"/>
          <stop offset=".52" stop-color="#FAF9F6" stop-opacity=".96"/>
          <stop offset=".7" stop-color="#FAF9F6" stop-opacity=".58"/>
          <stop offset=".82" stop-color="#FAF9F6" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#171717" flood-opacity=".3"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#copyWash)"/>
      <text x="142" y="109" fill="#171717" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">Rigi Extensions</text>
      <text x="96" y="248" fill="#C9281C" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="750" letter-spacing="2.4">${escapeXml(screen.kicker)}</text>
      <text x="96" y="330" fill="#111111" font-family="Inter, Arial, sans-serif" font-size="55" font-weight="760" letter-spacing="-2.2">${escapeXml(screen.title[0])}</text>
      <text x="96" y="394" fill="#111111" font-family="Inter, Arial, sans-serif" font-size="55" font-weight="760" letter-spacing="-2.2">${escapeXml(screen.title[1])}</text>
      <text x="96" y="466" fill="#3F403D" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="500">${escapeXml(screen.copy)}</text>
      <rect x="96" y="524" width="48" height="5" rx="2.5" fill="#D52B1E"/>
      <text x="96" y="687" fill="#4B4C48" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="650" letter-spacing="1.35">PRIVATE BY DESIGN · DATA STAYS LOCAL</text>
      <g filter="url(#shadow)">
        <rect x="761" y="3" width="431" height="794" rx="34" fill="#171717" fill-opacity=".28"/>
      </g>
    `)

    await sharp(base)
      .composite([
        { input: copyLayer, left: 0, top: 0 },
        { input: smallLogo, left: 76, top: 77 },
        { input: frame, left: 761, top: 3 },
        { input: ui, left: 777, top: 20 },
      ])
      .png()
      .toFile(path.join(root, "store", screen.output))
  }
}

async function renderSocial() {
  const base = await baseBackground(1200, 630)
  const logoSvg = await fs.readFile(logoPath)
  const overlay = svg(1200, 630, `
    <defs>
      <linearGradient id="socialWash" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FAF9F6" stop-opacity=".99"/>
        <stop offset=".62" stop-color="#FAF9F6" stop-opacity=".9"/>
        <stop offset=".86" stop-color="#FAF9F6" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#socialWash)"/>
    <text x="102" y="348" fill="#111111" font-family="Inter, Arial, sans-serif" font-size="70" font-weight="760" letter-spacing="-2.5">Rigi Extensions</text>
    <text x="104" y="405" fill="#3F403D" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="500">Seven focused tools. One calm browser.</text>
    <rect x="104" y="449" width="54" height="5" rx="2.5" fill="#D52B1E"/>
  `)
  await sharp(base)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: await sharp(logoSvg).resize(156, 156).png().toBuffer(), left: 86, top: 126 },
    ])
    .png()
    .toFile(path.join(root, "social", "open-graph-1200x630.png"))
}

async function renderPreviewSheet() {
  const promoSmall = await sharp(path.join(root, "store", "promo-small-440x280.png")).png().toBuffer()
  const promoWide = await sharp(path.join(root, "store", "promo-marquee-1400x560.png"))
    .resize(700, 280)
    .png()
    .toBuffer()
  const icon = await sharp(path.join(root, "store", "store-icon-128.png"))
    .resize(192, 192)
    .png()
    .toBuffer()
  const thumbs = []
  for (const screen of screens) {
    thumbs.push(await sharp(path.join(root, "store", screen.output)).resize(480, 300).png().toBuffer())
  }
  const social = await sharp(path.join(root, "social", "open-graph-1200x630.png"))
    .resize(571, 300)
    .png()
    .toBuffer()

  await sharp({
    create: { width: 1600, height: 1080, channels: 4, background: "#E2E8F0" },
  })
    .composite([
      { input: icon, left: 54, top: 94 },
      { input: promoSmall, left: 300, top: 50 },
      { input: promoWide, left: 840, top: 50 },
      { input: thumbs[0], left: 40, top: 390 },
      { input: thumbs[1], left: 560, top: 390 },
      { input: thumbs[2], left: 1080, top: 390 },
      { input: thumbs[3], left: 40, top: 730 },
      { input: thumbs[4], left: 560, top: 730 },
      { input: social, left: 1040, top: 730 },
    ])
    .png()
    .toFile(path.join(root, "preview-sheet.png"))
}

await renderIcons()
await renderPromo()
await renderScreenshots()
await renderSocial()
await renderPreviewSheet()

console.log("Rendered Rigi Extensions brand assets")
