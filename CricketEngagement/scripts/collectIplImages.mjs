import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import seasons from '../src/data/iplSeasonTimeline.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicImageDir = path.join(root, 'public', 'images')
const imageDataPath = path.join(root, 'src', 'data', 'iplSeasonImages.json')
const publicIndexPath = path.join(publicImageDir, 'image-index.json')

const folders = {
  champions: path.join(publicImageDir, 'champions'),
  orangecaps: path.join(publicImageDir, 'orangecaps'),
  purplecaps: path.join(publicImageDir, 'purplecaps'),
  logos: path.join(publicImageDir, 'logos'),
}

const teams = [...new Set(seasons.map((season) => season.champion).filter((team) => team !== 'Season in progress'))]
const requestDelayMs = Number(process.env.COLLECT_IMAGE_DELAY_MS ?? 900)

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function placeholderSvg({ title, subtitle, colors = ['#071018', '#f7c948'] }) {
  const [primary, accent] = colors

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${primary}"/>
      <stop offset="1" stop-color="#050812"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="28%" r="48%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".72"/>
      <stop offset=".55" stop-color="${accent}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="900" fill="url(#bg)"/>
  <rect width="1400" height="900" fill="url(#glow)"/>
  <path d="M120 670c190-70 390-96 580-76s382 20 580-76" fill="none" stroke="${accent}" stroke-width="10" stroke-opacity=".5"/>
  <g transform="translate(575 172)">
    <path d="M120 390h130l-20 70H140z" fill="${accent}"/>
    <path d="M115 130h140v230c0 52-32 94-70 94s-70-42-70-94z" fill="${accent}"/>
    <path d="M88 168c-64 12-84 90-32 128" fill="none" stroke="${accent}" stroke-width="24" stroke-linecap="round"/>
    <path d="M282 168c64 12 84 90 32 128" fill="none" stroke="${accent}" stroke-width="24" stroke-linecap="round"/>
  </g>
  <text x="92" y="735" fill="#fff" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="900">${escapeXml(title)}</text>
  <text x="96" y="800" fill="#dbe5ff" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">${escapeXml(subtitle)}</text>
</svg>
`
}

function extensionFromMime(mime, fallback) {
  if (mime === 'image/png') return 'png'
  if (mime === 'image/svg+xml') return 'svg'
  if (mime === 'image/webp') return 'webp'
  if (mime === 'image/jpeg') return 'jpg'

  return fallback
}

async function commonsSearch(query) {
  await sleep(requestDelayMs)
  const api = new URL('https://commons.wikimedia.org/w/api.php')
  api.searchParams.set('action', 'query')
  api.searchParams.set('generator', 'search')
  api.searchParams.set('gsrnamespace', '6')
  api.searchParams.set('gsrlimit', '8')
  api.searchParams.set('gsrsearch', query)
  api.searchParams.set('prop', 'imageinfo')
  api.searchParams.set('iiprop', 'url|mime|size|extmetadata')
  api.searchParams.set('iiurlwidth', '1400')
  api.searchParams.set('format', 'json')
  api.searchParams.set('origin', '*')

  let response
  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch(api, {
      headers: {
        'User-Agent': 'CricketFanEngagement/1.0 image collector (local development; source-tracked asset manifest)',
      },
    })
    if (response.status !== 429) break
    await sleep(2200 * (attempt + 1))
  }

  if (!response.ok) throw new Error(`Commons search failed for "${query}": ${response.status}`)
  const data = await response.json()
  const pages = Object.values(data.query?.pages ?? {})

  return pages
    .map((page) => ({ title: page.title, imageinfo: page.imageinfo?.[0] }))
    .filter((result) => result.imageinfo?.mime?.startsWith('image/'))
}

async function downloadFile(sourceUrl, destination) {
  await sleep(Math.round(requestDelayMs / 2))
  const response = await fetch(sourceUrl, {
    headers: {
      'User-Agent': 'CricketFanEngagement/1.0 image collector (local development; source-tracked asset manifest)',
    },
  })
  if (!response.ok) throw new Error(`Download failed for ${sourceUrl}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(destination, buffer)
}

async function collectOne({ folder, fileBase, fallbackExt, query, title, subtitle, colors, selectResult }) {
  try {
    const results = await commonsSearch(query)
    const selected = selectResult ? selectResult(results) : results[0]

    if (selected) {
      const info = selected.imageinfo
      const sourceUrl = info.thumburl ?? info.url
      const ext = extensionFromMime(info.mime, fallbackExt)
      const filename = `${fileBase}.${ext}`
      const destination = path.join(folders[folder], filename)
      await downloadFile(sourceUrl, destination)

      return {
        path: `/images/${folder}/${filename}`,
        status: 'downloaded',
        sourceTitle: selected.title,
        sourceUrl: info.descriptionurl,
        originalUrl: info.url,
        query,
        mime: info.mime,
      }
    }
  } catch (error) {
    console.warn(`Image lookup failed for ${fileBase}: ${error.message}`)
  }

  const filename = `${fileBase}.svg`
  const destination = path.join(folders[folder], filename)
  await fs.writeFile(destination, placeholderSvg({ title, subtitle, colors }), 'utf8')

  return {
    path: `/images/${folder}/${filename}`,
    status: 'placeholder',
    query,
    note: 'No suitable Wikimedia Commons image was found automatically. Replace manually with a licensed photo if needed.',
  }
}

async function main() {
  await Promise.all(Object.values(folders).map((folder) => fs.mkdir(folder, { recursive: true })))

  const logoEntries = {}
  for (const team of teams) {
    logoEntries[team] = await collectOne({
      folder: 'logos',
      fileBase: slug(team),
      fallbackExt: 'png',
      query: `${team} logo cricket`,
      title: team,
      subtitle: 'Transparent logo slot',
      colors: ['#071018', '#f7c948'],
      selectResult: (results) =>
        results.find((result) => {
          const mime = result.imageinfo?.mime
          return /logo/i.test(result.title) && (mime === 'image/png' || mime === 'image/svg+xml')
        }),
    })
  }

  const seasonEntries = {}
  for (const season of seasons) {
    const year = String(season.year)
    const championBase = `${year}-${slug(season.champion)}`
    const orangeBase = `${year}-${slug(season.orangeCap.winner)}`
    const purpleBase = `${year}-${slug(season.purpleCap.winner)}`

    seasonEntries[year] = {
      champion: await collectOne({
        folder: 'champions',
        fileBase: championBase,
        fallbackExt: 'jpg',
        query: `${season.year} ${season.champion} IPL trophy celebration`,
        title: season.champion,
        subtitle: `${season.year} champion moment`,
        colors: season.colors,
      }),
      orangeCap: await collectOne({
        folder: 'orangecaps',
        fileBase: orangeBase,
        fallbackExt: 'jpg',
        query: `${season.orangeCap.winner} cricketer portrait`,
        title: season.orangeCap.winner,
        subtitle: `${season.year} Orange Cap`,
        colors: ['#7c2d12', '#f97316'],
      }),
      purpleCap: await collectOne({
        folder: 'purplecaps',
        fileBase: purpleBase,
        fallbackExt: 'jpg',
        query: `${season.purpleCap.winner} cricketer portrait`,
        title: season.purpleCap.winner,
        subtitle: `${season.year} Purple Cap`,
        colors: ['#581c87', '#c084fc'],
      }),
      logo: logoEntries[season.champion] ?? null,
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    sourcePolicy:
      'Images are downloaded from Wikimedia Commons when found. Placeholder SVGs mark entries that require a licensed manual replacement.',
    seasons: seasonEntries,
    logos: logoEntries,
  }

  await fs.writeFile(imageDataPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8')
  await fs.writeFile(publicIndexPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

  const downloaded = Object.values(seasonEntries).flatMap((season) => [season.champion, season.orangeCap, season.purpleCap, season.logo])
    .filter((entry) => entry?.status === 'downloaded').length
  const placeholders = Object.values(seasonEntries).flatMap((season) => [season.champion, season.orangeCap, season.purpleCap, season.logo])
    .filter((entry) => entry?.status === 'placeholder').length

  console.log(`Image collection complete: ${downloaded} downloaded, ${placeholders} placeholders.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
