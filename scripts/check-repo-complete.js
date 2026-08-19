// Guard against the failure that emptied this repository twice: an index that
// loses tracked files, committed and pushed while every file sits safely on
// disk so nothing looks wrong locally.
//
// Runs as part of `npm run build`. It compares the files git is tracking
// against the files the build actually needs, and fails loudly if any of them
// are missing from version control. A build that succeeds locally but could
// not be reproduced from a clone is exactly the state that hid the problem.
const { execSync } = require('child_process');

// Without these, a fresh clone cannot build the site at all.
const REQUIRED = [
  'package.json',
  'scripts/build.js',
  'utils/content.js',
  'utils/pageMeta.js',
  'views/index.ejs',
  'views/partials/head.ejs'
];

const MIN_TRACKED = 150;

function check() {
  let tracked;
  try {
    tracked = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean);
  } catch {
    return; // not a git checkout (CI tarball, etc.) — nothing to verify
  }

  const set = new Set(tracked);
  const missing = REQUIRED.filter((f) => !set.has(f));

  if (missing.length) {
    console.error('\n  REPOSITORY INCOMPLETE — these files are not tracked by git:');
    missing.forEach((f) => console.error('    ' + f));
    console.error('\n  A fresh clone could not build this site. Fix with:');
    console.error('    git add ' + missing.join(' '));
    process.exit(1);
  }

  if (tracked.length < MIN_TRACKED) {
    console.error(`\n  REPOSITORY INCOMPLETE — only ${tracked.length} files tracked, expected at least ${MIN_TRACKED}.`);
    console.error('  The index has probably been emptied. Check `git status` before committing.\n');
    process.exit(1);
  }

  console.log(`  repo check: ${tracked.length} files tracked`);
}

module.exports = check;
if (require.main === module) check();
