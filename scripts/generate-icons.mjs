/**
 * Generates the PWA icons (committed under public/icons/) from a plain
 * SVG mark: a stone square with a kasavu-gold bindu, echoing the
 * Malayalam anusvara. Run: node scripts/generate-icons.mjs
 */

import { mkdirSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const OUT_DIR = path.resolve('public/icons')
mkdirSync(OUT_DIR, { recursive: true })

const MARK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="115" fill="#1c1917"/>
  <circle cx="256" cy="256" r="128" fill="#fbbf24"/>
  <circle cx="256" cy="256" r="46" fill="#1c1917"/>
</svg>
`

for (const [size, file, maskable] of [
  [192, 'icon-192.png', false],
  [512, 'icon-512.png', false],
  [512, 'icon-maskable-512.png', true],
]) {
  const svg = maskable
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#1c1917"/><circle cx="256" cy="256" r="128" fill="#fbbf24"/><circle cx="256" cy="256" r="46" fill="#1c1917"/></svg>`
    : MARK
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(OUT_DIR, file))
  console.log(`wrote public/icons/${file}`)
}
