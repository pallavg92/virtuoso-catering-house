const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const JS_DIR = path.join(__dirname, '..', 'public', 'js');

/**
 * A content hash over the site's own JavaScript, appended to every script tag
 * as ?v=.
 *
 * The stylesheet already does this via bundle-css. The JS did not, and the
 * gap was live: these files are served with a week-long Cache-Control under
 * names that never change, so a behaviour change shipped to a returning
 * visitor did not reach them for up to seven days. Caught while testing the
 * menu-download handoff, where the browser kept running the previous copy of
 * inquire-drawer.js after the file on disk had changed.
 *
 * vendor/ is excluded deliberately: those files are third-party releases that
 * change only on a deliberate upgrade, and including them would churn the
 * hash for no benefit.
 */
function jsVersion() {
  const files = fs.readdirSync(JS_DIR)
    .filter((name) => name.endsWith('.js'))
    .sort();

  const hash = crypto.createHash('sha1');
  files.forEach((name) => hash.update(fs.readFileSync(path.join(JS_DIR, name))));
  return hash.digest('hex').slice(0, 8);
}

module.exports = jsVersion;
