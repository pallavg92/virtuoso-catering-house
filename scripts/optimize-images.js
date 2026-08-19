// Image optimisation for /public/images and /public/img.
//
// Run locally with `npm run images`, and COMMIT what it produces. It is
// deliberately not part of `npm run build`: the production build runs on a
// Linux host that has neither `sips` nor `cwebp`, so the optimised files have
// to exist in the repository before deploy rather than being generated during
// it.
//
// Two things happen here:
//   1. Any JPEG/PNG wider than MAX_WIDTH or heavier than MAX_BYTES is
//      resampled down in place. Camera-sized files are the single largest
//      cause of a slow Largest Contentful Paint.
//   2. A .webp sibling is written next to every raster image. The build's
//      HTML pass (scripts/html-post.js) wraps each <img> in a <picture> and
//      offers the .webp first, so browsers that support it — effectively all
//      of them — download 60-80% fewer bytes, while the original stays as
//      the fallback.
//
// Both steps are idempotent: a .webp that is already newer than its source is
// left alone, so re-running is cheap.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIRS = [path.join(ROOT, 'public', 'images'), path.join(ROOT, 'public', 'img')];

const MAX_WIDTH = 1800;
const MAX_BYTES = 400 * 1024;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 80;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function has(cmd) {
  try {
    execFileSync('/usr/bin/which', [cmd], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function widthOf(file) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' });
  const match = out.match(/pixelWidth:\s*(\d+)/);
  return match ? Number(match[1]) : 0;
}

function optimise() {
  if (!has('sips') || !has('cwebp')) {
    console.error('This script needs macOS `sips` and `cwebp` (brew install webp).');
    process.exit(1);
  }

  const files = DIRS.flatMap(walk).filter((f) => /\.(jpe?g|png)$/i.test(f));
  let resized = 0;
  let converted = 0;
  let savedBytes = 0;

  files.forEach((file) => {
    const before = fs.statSync(file).size;

    // Step 1 — bring oversized originals down to a sane display size.
    if (before > MAX_BYTES || widthOf(file) > MAX_WIDTH) {
      const args = ['-Z', String(MAX_WIDTH)];
      if (/\.jpe?g$/i.test(file)) args.push('-s', 'formatOptions', String(JPEG_QUALITY));
      execFileSync('sips', [...args, file, '--out', file], { stdio: 'ignore' });
      const after = fs.statSync(file).size;
      if (after < before) {
        savedBytes += before - after;
        resized += 1;
        console.log(`  resized ${path.relative(ROOT, file)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
      }
    }

    // Step 2 — emit the .webp sibling, unless it is already up to date.
    const webp = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const stale = !fs.existsSync(webp) || fs.statSync(webp).mtimeMs < fs.statSync(file).mtimeMs;
    if (stale) {
      execFileSync('cwebp', ['-quiet', '-q', String(WEBP_QUALITY), file, '-o', webp]);
      converted += 1;
    }
  });

  const totalWebp = files.reduce((sum, f) => {
    const w = f.replace(/\.(jpe?g|png)$/i, '.webp');
    return sum + (fs.existsSync(w) ? fs.statSync(w).size : 0);
  }, 0);
  const totalSrc = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);

  console.log(`\n  ${files.length} images | ${resized} resized | ${converted} webp written`);
  console.log(`  reclaimed ${(savedBytes / 1048576).toFixed(1)}MB by resampling`);
  console.log(`  originals ${(totalSrc / 1048576).toFixed(1)}MB -> webp ${(totalWebp / 1048576).toFixed(1)}MB`);
}

optimise();
