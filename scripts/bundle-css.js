// Concatenates the site's CSS source files into one bundle.css, so the
// browser makes a single request instead of 12 (each of them is tiny,
// but the round-trip count itself was measured as ~1.1s of render-blocking
// time in a Lighthouse audit). Cascade order matches the original
// individual <link> tags exactly — do not reorder without checking for
// specificity regressions.
const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, '..', 'public', 'css');
const OUTPUT_FILE = path.join(CSS_DIR, 'bundle.css');

const SOURCE_FILES = [
  'fonts.css',
  'variables.css',
  'base.css',
  'typography.css',
  'cursor.css',
  'preloader.css',
  'nav.css',
  'hero.css',
  'sections.css',
  'forms.css',
  'footer.css',
  'animations.css',
  'pages.css',
  'popups.css',
  'lander.css'
];

// Conservative minifier: strips comments and collapses whitespace, and does
// nothing else. It walks the file character by character tracking whether it
// is inside a quoted string, so a comment sequence or a brace living inside
// `content: "..."` or a url() is never touched.
//
// It deliberately leaves colons alone. Trimming the space after `color: red`
// is safe, but the same rule applied before a colon would silently break a
// descendant-plus-pseudo selector like `li :first-child`. The few bytes are
// not worth a whole-stylesheet risk on a live site, especially since the
// response is compressed on the wire anyway.
function minifyCss(css) {
  let out = '';
  let quote = null;

  for (let i = 0; i < css.length; i += 1) {
    const ch = css[i];

    if (quote) {
      out += ch;
      if (ch === quote && css[i - 1] !== '\\') quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      out += ch;
      continue;
    }

    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 1;
      continue;
    }

    out += ch;
  }

  return out
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function bundleCss() {
  const combined = SOURCE_FILES
    .map((file) => fs.readFileSync(path.join(CSS_DIR, file), 'utf8'))
    .join('\n');
  fs.writeFileSync(OUTPUT_FILE, minifyCss(combined));
}

module.exports = bundleCss;

if (require.main === module) {
  bundleCss();
  console.log('  wrote public/css/bundle.css');
}
