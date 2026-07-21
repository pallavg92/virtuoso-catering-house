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
  'popups.css'
];

function bundleCss() {
  const combined = SOURCE_FILES
    .map((file) => fs.readFileSync(path.join(CSS_DIR, file), 'utf8'))
    .join('\n');
  fs.writeFileSync(OUTPUT_FILE, combined);
}

module.exports = bundleCss;

if (require.main === module) {
  bundleCss();
  console.log('  wrote public/css/bundle.css');
}
