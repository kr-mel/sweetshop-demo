// Convert source photos to WebP to slash page weight. Run: node scripts/to-webp.mjs
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets')

const targets = {
  'hero_sweets.png': 1400,
  'heritage_sweets.png': 1400,
  'gift_box.png': 1400,
  'kunafa.png': 1400,
  'kol_w_shkor.jpg': 1200,
  'kunafa_smooth.jpg': 1200,
  'maamoul_dates.jpg': 1200,
  'maamoul_pistachio.jpg': 1200,
}

for (const [file, max] of Object.entries(targets)) {
  const src = path.join(dirPath, file)
  const out = path.join(dirPath, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'))
  const before = (await stat(src)).size
  await sharp(src)
    .resize(max, max, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  const after = (await stat(out)).size
  const saved = (100 - (after / before) * 100).toFixed(0)
  console.log(`${file} ${(before / 1024).toFixed(0)}KB -> ${path.basename(out)} ${(after / 1024).toFixed(0)}KB (-${saved}%)`)
}
