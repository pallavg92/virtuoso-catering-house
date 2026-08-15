// Serves /dist exactly as a static host would, for checking the built output
// rather than the live-rendered dev server. The two differ: the build's HTML
// pass adds width/height, fetchpriority and <picture> wrappers that the dev
// server never sees, so layout regressions from those can only be caught here.
//
// Run with `npm run serve:dist`. Not part of the deploy.
const express = require('express');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = process.env.PORT || 4100;

const app = express();
app.use(express.static(DIST, { extensions: ['html'] }));
app.use((req, res) => res.status(404).sendFile(path.join(DIST, '404.html')));

app.listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`));
