import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Bronze Beauties Beauty Bar: organic spray tans, lashes, facials and nails in Elyria, Ohio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), 'images/logo-mark.png'));
  const src = `data:image/png;base64,${mark.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 88px',
          background: 'radial-gradient(circle at 78% 45%, #6e4422 0%, #2a1a10 34%, #0e0b09 68%)',
          color: '#f6f1e9',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: '#d9b26a', fontFamily: 'sans-serif' }}>
            Bronze Beauties Beauty Bar · Elyria, OH
          </div>
          <div style={{ fontSize: 92, lineHeight: 1, marginTop: 28, letterSpacing: -2 }}>Glow Bold.</div>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2, display: 'flex' }}>
            <span style={{ color: '#e8cf95', fontStyle: 'italic' }}>Bronze</span>&nbsp;Beautiful.
          </div>
          <div style={{ fontSize: 28, marginTop: 34, color: '#b8ada2', fontFamily: 'sans-serif' }}>
            Organic spray tans · Lashes · Facials · Waxing · Nails
          </div>
        </div>
        <img src={src} width={300} height={300} alt="" />
      </div>
    ),
    size,
  );
}
