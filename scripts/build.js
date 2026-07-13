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

async function renderPage(page) {
  const viewPath = path.join(VIEWS_DIR, `${page.view}.ejs`);
  const locals = {
    ...content,
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

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(pages)
    .map((page) => {
      const loc = siteUrl + (page.path === '/' ? '/' : page.path);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml);
  console.log('  wrote dist/sitemap.xml');
}

async function build() {
  console.log('Building static site...');

  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  bundleCss();
  copyPublicAssets();

  for (const page of Object.values(pages)) {
    await renderPage(page);
  }
  await renderNotFound();

  writeSitemap();

  console.log('Build complete -> dist/');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
