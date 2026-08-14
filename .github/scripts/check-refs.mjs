import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const SKIP_DIRS = new Set(['.git', 'node_modules']);
// LEMON MILK is a paid font that is deliberately not committed; the site
// falls back to Outfit. See fonts/README.md.
const EXPECTED_ABSENT = /^fonts\/LEMONMILK-/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

function refsIn(file, body) {
  const refs = [];
  if (file.endsWith('.html')) {
    for (const [, v] of body.matchAll(/(?:src|href)="([^"]+)"/g)) refs.push(v);
    for (const [, v] of body.matchAll(/srcset="([^"]+)"/g)) {
      for (const cand of v.split(',')) refs.push(cand.trim().split(/\s+/)[0]);
    }
  } else if (file.endsWith('.css')) {
    for (const [, v] of body.matchAll(/url\(\s*['"]?([^)'"]+)/g)) refs.push(v);
  }
  return refs;
}

const isLocal = (r) =>
  r && !/^(#|https?:|\/\/|mailto:|tel:|data:)/.test(r);

let checked = 0;
let skipped = 0;
const missing = [];

for (const file of walk('.')) {
  if (!/\.(html|css)$/.test(file)) continue;
  const body = readFileSync(file, 'utf8');
  for (const raw of refsIn(file, body)) {
    if (!isLocal(raw)) continue;
    const clean = raw.replace(/[?#].*$/, '');
    if (!clean) continue;
    // Root-relative paths resolve from the repo root, everything else from
    // the directory of the file that references it.
    const target = clean.startsWith('/')
      ? resolve('.', clean.slice(1))
      : resolve(dirname(file), clean);
    const rel = relative('.', target);
    if (EXPECTED_ABSENT.test(rel)) {
      skipped++;
      continue;
    }
    checked++;
    if (!existsSync(target)) missing.push(`${file} -> ${raw}`);
  }
}

for (const m of missing) console.log(`::error::missing local reference: ${m}`);
console.log(
  `${checked} local references checked, ${missing.length} missing` +
    (skipped ? `, ${skipped} optional skipped` : '')
);
process.exit(missing.length ? 1 : 0);
