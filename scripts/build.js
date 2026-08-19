// Static site build: renders every EJS view to a plain .html file in /dist
// and copies /public assets alongside it. Run with `npm run build`.
// The output in /dist is what gets deployed to a static host (Netlify).
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const ROOT = path.join(__dirname, '..');
const VIEWS_DIR = path.join(ROOT, 'views');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');

const content = require('../utils/content');
const { siteUrl, business, pages } = require('../utils/pageMeta');
const bundleCss = require('./bundle-css');
const checkRepoComplete = require('./check-repo-complete');
const jsVersion = require('./js-version');
const postProcess = require('./html-post');
const minifyJs = require('./minify-js');
const redirects = require('../utils/redirects');

// Set by bundleCss() in build(), read by renderPage(). The stylesheet keeps a
// stable filename, so this hash is what busts a stale browser cache after a
// deploy; see the note in scripts/bundle-css.js. The JavaScript carries the
// same problem and the same fix; see scripts/js-version.js.
let cssVersion = '';
let jsHash = '';

async function renderPage(page) {
  const viewPath = path.join(VIEWS_DIR, `${page.view}.ejs`);
  const locals = {
    ...content,
    cssVersion,
    jsVersion: jsHash,
    ...page,
    canonicalUrl: siteUrl + (page.path === '/' ? '/' : page.path),
    siteUrl,
    business
  };
  const html = await ejs.renderFile(viewPath, locals);
  const relPath = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
  const outFile = path.join(DIST_DIR, relPath);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log(`  built ${page.path} -> dist/${relPath}`);
}

async function renderNotFound() {
  const viewPath = path.join(VIEWS_DIR, '404.ejs');
  const locals = {
    ...content,
    title: 'Page Not Found — Virtuoso Catering House',
    description: 'The page you are looking for does not exist.',
    activePage: '',
    canonicalUrl: siteUrl + '/404',
    ogImage: pages.home.ogImage,
    siteUrl,
    business
  };
  const html = await ejs.renderFile(viewPath, locals);
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), html);
  console.log('  built 404 -> dist/404.html');
}

function copyPublicAssets() {
  fs.cpSync(PUBLIC_DIR, DIST_DIR, { recursive: true });
  console.log('  copied /public -> /dist');
}

// The static host (Apache/LiteSpeed on Hostinger) has no Express router to
// run the redirects in utils/redirects.js, so without this file every
// legacy WordPress URL and renamed path (e.g. /gallery, /menu) just 404s
// in production even though it "works" against the local dev server.
// RewriteRule (not mod_alias Redirect) is used with a $ anchor so nested
// paths like /luxury-brand-event-catering-delhi-ncr/... match exactly
// instead of a shorter prefix rule swallowing a longer URL first.
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function writeHtaccess() {
  const rules = redirects
    .map(({ from, to }) => {
      const pattern = escapeRegex(from.replace(/^\//, ''));
      return `RewriteRule ^${pattern}/?$ ${to} [R=301,L]`;
    })
    .join('\n');
  // Compression and caching. Every block is IfModule-guarded so a host
  // without the module skips it rather than returning a 500.
  //
  // The TTLs are deliberately uneven. Images and fonts get a year because
  // they are effectively immutable — a changed picture gets a new filename.
  // CSS and JS get a week, not a year, because bundle.css has no content
  // hash in its name: cache it for a year and a visitor who has been to the
  // site before would keep the old stylesheet long after a deploy. HTML is
  // never cached, so a content change is live immediately.
  const performance = `
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml
  AddOutputFilterByType DEFLATE application/javascript application/json application/xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/css text/xml
  AddOutputFilterByType BROTLI_COMPRESS application/javascript application/json application/xml
  AddOutputFilterByType BROTLI_COMPRESS image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(jpg|jpeg|png|webp|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
`;

  const htaccess = `RewriteEngine On\n\n${rules}\n${performance}`;
  fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccess);
  console.log(`  wrote dist/.htaccess (${redirects.length} redirects + compression/caching)`);

  // Belt-and-braces noindex for the paid-traffic landers. Every page under
  // /lp/ already carries <meta name="robots" content="noindex">, but an
  // X-Robots-Tag header also covers responses whose markup is never parsed.
  // Scoped to the /lp/ directory by living inside it, so it can never catch
  // a real page elsewhere on the site.
  //
  // Deliberately NOT a robots.txt Disallow: blocking the crawl would stop
  // Google reading the noindex at all, and a URL linked from anywhere could
  // then still surface in results as a bare link. IfModule-guarded so a host
  // without mod_headers degrades quietly instead of 500-ing the directory.
  const lpDir = path.join(DIST_DIR, 'lp');
  if (fs.existsSync(lpDir)) {
    fs.writeFileSync(
      path.join(lpDir, '.htaccess'),
      '<IfModule mod_headers.c>\n  Header set X-Robots-Tag "noindex, nofollow"\n</IfModule>\n'
    );
    console.log('  wrote dist/lp/.htaccess (noindex header for paid landers)');
  }
}

// Every local image on a built page, for the image sitemap. Read back out of
// the rendered HTML rather than from the page data, so it reflects what the
// page actually shows. Runs before the <picture> rewrite, which is why it
// only ever sees plain <img> tags.
function imagesOnPage(page) {
  const rel = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
  const file = path.join(DIST_DIR, rel);
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  const srcs = [...html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/gi)]
    .map((m) => m[1])
    .filter((src) => /^\/(images|img)\//.test(src));
  return [...new Set(srcs)];
}

function writeSitemap() {
  const urls = Object.values(pages)
    .filter((page) => !page.excludeFromSitemap)
    .map((page) => {
      const loc = siteUrl + (page.path === '/' ? '/' : page.path);

      // A real date or none at all. Stamping every URL with the build date
      // told Google all 37 pages changed on every deploy, which is how a
      // site teaches Google to ignore its lastmod altogether — and that is
      // exactly the freshness signal worth keeping accurate.
      const modified = page.lastmod || (page.post && (page.post.updated || page.post.date));
      const lastmod = modified ? `\n    <lastmod>${modified}</lastmod>` : '';

      const images = imagesOnPage(page)
        .map((src) => `\n    <image:image>\n      <image:loc>${siteUrl}${src}</image:loc>\n    </image:image>`)
        .join('');

      return `  <url>\n    <loc>${loc}</loc>${lastmod}${images}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml);
  const dated = Object.values(pages).filter((p) => !p.excludeFromSitemap && (p.lastmod || (p.post && p.post.date))).length;
  console.log(`  wrote dist/sitemap.xml (${dated} URLs with a real lastmod, images included)`);
}

async function build() {
  console.log('Building static site...');

  // Fails the build if the repository could not reproduce it from a clone.
  checkRepoComplete();

  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  cssVersion = bundleCss();
  jsHash = jsVersion();
  copyPublicAssets();

  for (const page of Object.values(pages)) {
    await renderPage(page);
  }
  await renderNotFound();

  writeHtaccess();
  writeSitemap();

  // Last, because it rewrites the HTML that everything above produced.
  postProcess();
  await minifyJs();

  console.log('Build complete -> dist/');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
