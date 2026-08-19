// Tells IndexNow which pages changed, so Bing and the engines that share its
// index pick them up without waiting to be crawled.
//
// Run after a deploy:  npm run indexnow
//
// Why this is worth having here specifically: Bing feeds ChatGPT's answers,
// and ChatGPT is this site's weakest AI channel. Google ignores IndexNow, so
// nothing here affects Google rankings either way. The one endpoint below
// fans out to Bing, Yandex, Seznam, Naver, Yep and Amazon.
//
// Ownership is proved by a key file served from the site root. That file is
// public/${KEY}.txt and its contents are the key itself. If the key ever
// changes, the file has to change with it or every submission is rejected.
const https = require('https');
const { siteUrl, pages } = require('../utils/pageMeta');

const KEY = 'ab50605062ddc3673fe41cfa948903a1';
const HOST = new URL(siteUrl).hostname;
const KEY_LOCATION = `${siteUrl}/${KEY}.txt`;

// The same registry the routes and both sitemap generators read, so a page
// cannot be submitted that does not exist, or missed because someone forgot
// to add it here. excludeFromSitemap covers the paid landers, which are
// noindex and must not be announced.
const urls = Object.values(pages)
  .filter((page) => !page.excludeFromSitemap)
  .map((page) => siteUrl + (page.path === '/' ? '/' : page.path));

function submit() {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  const req = https.request(
    {
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body)
      }
    },
    (res) => {
      let text = '';
      res.on('data', (c) => { text += c; });
      res.on('end', () => {
        // 200 accepted, 202 accepted but key not yet verified. Both are fine.
        const ok = res.statusCode === 200 || res.statusCode === 202;
        console.log(`IndexNow: HTTP ${res.statusCode} ${ok ? 'accepted' : 'REJECTED'}, ${urls.length} URLs`);
        if (!ok) {
          console.error('  response:', text.slice(0, 300));
          console.error(`  check that ${KEY_LOCATION} is reachable and contains exactly the key`);
          process.exitCode = 1;
        }
      });
    }
  );

  req.on('error', (err) => {
    console.error('IndexNow: request failed —', err.message);
    process.exitCode = 1;
  });

  req.write(body);
  req.end();
}

// Confirm the key file is actually being served before submitting. A silent
// 404 here is the single most common reason IndexNow rejects everything.
https.get(KEY_LOCATION, (res) => {
  let text = '';
  res.on('data', (c) => { text += c; });
  res.on('end', () => {
    if (res.statusCode !== 200 || text.trim() !== KEY) {
      console.error(`IndexNow: key file check failed at ${KEY_LOCATION}`);
      console.error(`  HTTP ${res.statusCode}, body ${JSON.stringify(text.slice(0, 60))}`);
      console.error('  Deploy the key file first, then run this again.');
      process.exitCode = 1;
      return;
    }
    console.log(`IndexNow: key file verified at ${KEY_LOCATION}`);
    submit();
  });
}).on('error', (err) => {
  console.error('IndexNow: could not reach the key file —', err.message);
  process.exitCode = 1;
});
