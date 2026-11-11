import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const astroAssetsDir = resolve(rootDir, 'dist', '_astro');
const outManifest = resolve(rootDir, 'dist', 'precache-manifest.json');

if (!existsSync(astroAssetsDir)) {
  console.warn('[generate-precache-manifest] dist/_astro not found, skipping');
  process.exit(0);
}

const files = readdirSync(astroAssetsDir)
  .filter((name) => /\.(js|css)$/i.test(name))
  .map((name) => `/_astro/${name}`);

writeFileSync(outManifest, JSON.stringify(files, null, 2) + '\n', 'utf-8');
console.log(`[generate-precache-manifest] Wrote ${files.length} Astro assets to dist/precache-manifest.json`);
