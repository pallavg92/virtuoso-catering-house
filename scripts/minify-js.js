// Minifies the JavaScript in /dist, in place.
//
// terser is a devDependency, and a deploy host that installs production
// dependencies only will not have it. That must never fail the build, so the
// require is guarded and a missing terser simply means the JS ships
// unminified — exactly the state it was in before this step existed. The
// files are already served compressed, so the cost of that fallback is a few
// kilobytes, not a broken site.
//
// Minifying the built copy rather than the source keeps /public/js readable
// and keeps the dev server serving code you can actually debug.
const fs = require('fs');
const path = require('path');

const DIST_JS = path.join(__dirname, '..', 'dist', 'js');

async function minifyJs() {
  let terser;
  try {
    terser = require('terser');
  } catch {
    console.log('  skipped JS minification (terser not installed)');
    return;
  }

  if (!fs.existsSync(DIST_JS)) return;
  const files = fs.readdirSync(DIST_JS).filter((f) => f.endsWith('.js'));
  let before = 0;
  let after = 0;

  for (const file of files) {
    const full = path.join(DIST_JS, file);
    const source = fs.readFileSync(full, 'utf8');
    before += Buffer.byteLength(source);
    try {
      const result = await terser.minify(source, {
        compress: { drop_debugger: true },
        mangle: true,
        format: { comments: false }
      });
      // A parse failure returns no code; keep the original rather than
      // writing an empty file over working JavaScript.
      if (result.code) {
        fs.writeFileSync(full, result.code);
        after += Buffer.byteLength(result.code);
      } else {
        after += Buffer.byteLength(source);
      }
    } catch (err) {
      console.log(`  could not minify ${file}: ${err.message}`);
      after += Buffer.byteLength(source);
    }
  }

  console.log(`  minified ${files.length} JS files: ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB`);
}

module.exports = minifyJs;

if (require.main === module) minifyJs();
