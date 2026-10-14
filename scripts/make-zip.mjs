// Bundles the project (without node_modules / dist / existing zips) into project.zip.
// Usage:  npm run zip
import { createWriteStream } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import archiver from 'archiver';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const folderName = basename(root);
const outFile = resolve(root, 'project.zip');

const output = createWriteStream(outFile);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`\n✔ project.zip created (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
  console.log('  Extract it, then run:  npm install && npm run dev');
});
archive.on('warning', (err) => console.warn(err.message));
archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.glob('**/*', {
  cwd: root,
  dot: true,
  ignore: ['node_modules/**', 'dist/**', 'project.zip', '.git/**', '.DS_Store', 'package-lock.json'],
}, { prefix: folderName });
await archive.finalize();
