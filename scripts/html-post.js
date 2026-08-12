// Post-processes every built HTML file in /dist. Runs as the last step of
// `npm run build`, on whatever host does the deploy, so everything here is
// plain Node with no binaries and no dependencies.
//
// Three passes over each <img>:
//
//   1. width/height — read from the image's own header bytes and written onto
//      the tag when absent. Without them the browser cannot reserve space
//      before the image arrives, and every image on the page shifts the layout
//      as it loads. That is Cumulative Layout Shift, one of the three Core Web
//      Vitals, and it is the cheapest of the three to fix properly.
//
//   2. fetchpriority — any image already marked loading="eager" is the hero,
//      which is almost always the Largest Contentful Paint element. Telling
//      the browser to fetch it at high priority moves it ahead of the CSS-
//      referenced images and scripts queued alongside it.
//
//   3. <picture> — where a .webp sibling exists (written by
//      scripts/optimize-images.js), the tag is wrapped so browsers take the
//      smaller file and anything that cannot falls back to the original.
//
// Doing this at build time rather than in the templates means it applies to
// all 100+ images at once and keeps applying to any image added later, with
// no chance of someone forgetting the attributes on a new tag.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// --- image dimensions, straight from the file header ------------------------

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    // SOF0-SOF15, excluding the four that are not frame headers.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function webpSize(buf) {
  const fmt = buf.toString('ascii', 12, 16);
  if (fmt === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (fmt === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fmt === 'VP8X') {
    return {
      width: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      height: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1
    };
  }
  return null;
}

const sizeCache = new Map();

function dimensions(srcPath) {
  if (sizeCache.has(srcPath)) return sizeCache.get(srcPath);
  let result = null;
  try {
    const file = path.join(DIST, srcPath.replace(/^\//, '').split('?')[0]);
    const buf = fs.readFileSync(file);
    if (buf.slice(0, 2).toString('hex') === 'ffd8') result = jpegSize(buf);
    else if (buf.slice(1, 4).toString('ascii') === 'PNG') result = pngSize(buf);
    else if (buf.slice(0, 4).toString('ascii') === 'RIFF') result = webpSize(buf);
  } catch {
    result = null;
  }
  sizeCache.set(srcPath, result);
  return result;
}

// --- the rewrite ------------------------------------------------------------

const IMG_RE = /<img\b[^>]*>/gi;

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'));
  return m ? m[1] : null;
}

function processHtml(html) {
  const stats = { sized: 0, prioritised: 0, wrapped: 0 };

  const out = html.replace(IMG_RE, (tag) => {
    const src = attr(tag, 'src');
    // Only local raster images. Tracking pixels and anything remote are left
    // exactly as they are.
    if (!src || !/^\/(images|img)\//.test(src) || !/\.(jpe?g|png)$/i.test(src)) return tag;

    let next = tag;

    if (!/\bwidth=/i.test(next) && !/\bheight=/i.test(next)) {
      const dim = dimensions(src);
      if (dim && dim.width && dim.height) {
        next = next.replace(/<img\b/i, `<img width="${dim.width}" height="${dim.height}"`);
        stats.sized += 1;
      }
    }

    if (/loading=["']eager["']/i.test(next) && !/fetchpriority=/i.test(next)) {
      next = next.replace(/<img\b/i, '<img fetchpriority="high"');
      stats.prioritised += 1;
    }

    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    if (fs.existsSync(path.join(DIST, webpSrc.replace(/^\//, '')))) {
      next = `<picture><source srcset="${webpSrc}" type="image/webp">${next}</picture>`;
      stats.wrapped += 1;
    }

    return next;
  });

  return { html: out, stats };
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function postProcess() {
  const files = walk(DIST).filter((f) => f.endsWith('.html'));
  const total = { sized: 0, prioritised: 0, wrapped: 0 };

  files.forEach((file) => {
    const { html, stats } = processHtml(fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(file, html);
    total.sized += stats.sized;
    total.prioritised += stats.prioritised;
    total.wrapped += stats.wrapped;
  });

  console.log(`  post-processed ${files.length} pages: ${total.sized} images sized, ${total.prioritised} prioritised, ${total.wrapped} served as webp`);
}

module.exports = postProcess;

if (require.main === module) postProcess();
