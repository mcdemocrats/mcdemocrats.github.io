import { writeFile, mkdir, copyFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { site } from './src/data.js';
import { render as renderIndex } from './src/pages/index.js';
import { render as renderPrecincts } from './src/pages/precincts.js';
import { render as renderPrivacy } from './src/pages/privacy.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

const pages = [
  { file: 'index.html',    render: renderIndex },
  { file: 'precincts.html', render: renderPrecincts },
  { file: 'privacy.html',  render: renderPrivacy },
];

const assets = [
  'styles.css',
  'marshall-precincts.geojson',
  'favicon.ico',
  'favicon-32.png',
  'apple-touch-icon.png',
  'og-image.png',
  'meeting.ics',
  'CNAME',
];

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function build() {
  await mkdir(DIST, { recursive: true });

  for (const { file, render } of pages) {
    const html = render(site);
    await writeFile(join(DIST, file), html, 'utf8');
    console.log(`  built  ${file}`);
  }

  for (const asset of assets) {
    const src = join(__dirname, asset);
    if (await exists(src)) {
      await copyFile(src, join(DIST, asset));
      console.log(`  copied ${asset}`);
    }
  }

  console.log('\nBuild complete → dist/');
}

build().catch(err => { console.error(err); process.exit(1); });
