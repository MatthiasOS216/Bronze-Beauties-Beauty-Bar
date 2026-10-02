// Normalizes source photos from the legacy site into web-ready masters.
// next/image generates responsive AVIF/WebP variants from these at request time.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const SRC = 'assets-src';
const OUT = 'images';
mkdirSync(OUT, { recursive: true });

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.orig'))) {
  const name = basename(file, '.orig');
  const input = sharp(join(SRC, file), { failOn: 'none' }).rotate();
  if (name.startsWith('logo')) {
    await input.trim({ threshold: 10 }).resize({ width: 1000, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(join(OUT, `${name}.png`));
  } else {
    await input
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .modulate({ saturation: 0.96 })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(OUT, `${name}.jpg`));
  }
  const meta = await sharp(join(OUT, name.startsWith('logo') ? `${name}.png` : `${name}.jpg`)).metadata();
  console.log(name, meta.width, meta.height);
}
