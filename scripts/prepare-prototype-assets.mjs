// Copyright 2026 Impact Engines. Refresh packaged licence texts from the installed, pinned dependencies.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const store = join(root, 'node_modules', '.pnpm');
const notices = [];
const seen = new Set();
for (const entry of readdirSync(store, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'node_modules') continue;
  const modules = join(store, entry.name, 'node_modules');
  let packages;
  try {
    packages = readdirSync(modules, { withFileTypes: true });
  } catch {
    continue;
  }
  const roots = [];
  for (const pkg of packages) {
    if (pkg.isSymbolicLink()) continue;
    if (pkg.name.startsWith('@')) {
      for (const child of readdirSync(join(modules, pkg.name), { withFileTypes: true })) {
        if (child.isDirectory()) roots.push(join(modules, pkg.name, child.name));
      }
    } else if (pkg.isDirectory()) roots.push(join(modules, pkg.name));
  }
  for (const dir of roots) {
    let meta;
    try {
      meta = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
    } catch {
      continue;
    }
    const id = `${meta.name}@${meta.version}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const files = readdirSync(dir).filter(name => /^(licen[cs]e|copying|notice)([.-]|$)/i.test(name));
    for (const file of files) {
      try {
        notices.push(`\n===== ${id} — ${file} =====\n\n${readFileSync(join(dir, file), 'utf8')}`);
      } catch {
        /* Directories are not notices. */
      }
    }
  }
}
mkdirSync(join(root, 'public', 'licenses'), { recursive: true });
writeFileSync(
  join(root, 'public', 'licenses', 'third-party-licenses.txt'),
  'Third-party licence and notice texts from installed dependencies, including build tools.\n' + notices.join('\n'),
);
console.log(`Bundled ${notices.length} licence/notice files from ${seen.size} installed packages.`);
