import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const targetDir = resolve(rootDir, 'public', 'ffmpeg');

mkdirSync(targetDir, { recursive: true });

const filesToCopy = [
  ['node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js', 'ffmpeg-core.js'],
  ['node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm', 'ffmpeg-core.wasm'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/worker.js', 'worker.js'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/const.js', 'const.js'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/errors.js', 'errors.js'],
];

for (const [srcRel, destName] of filesToCopy) {
  const srcPath = resolve(rootDir, srcRel);
  const destPath = resolve(targetDir, destName);
  if (!existsSync(srcPath)) {
    console.error(`[copy-ffmpeg-assets] Missing source file: ${srcPath}`);
    process.exit(1);
  }
  copyFileSync(srcPath, destPath);
  console.log(`[copy-ffmpeg-assets] Copied ${srcRel} -> public/ffmpeg/${destName}`);
}
