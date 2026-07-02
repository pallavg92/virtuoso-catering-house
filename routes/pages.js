const express = require('express');
const router = express.Router();
const content = require('../utils/content');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Virtuoso Catering House — Culinary Artistry for Unforgettable Occasions',
    activePage: 'home',
    bodyClass: 'page-home',
    ...content
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About — Virtuoso Catering House',
    activePage: 'about',
    bodyClass: 'page-about',
    ...content
  });
});

router.get('/menu', (req, res) => {
  res.render('menu', {
    title: 'Menus & Services — Virtuoso Catering House',
    activePage: 'menu',
    bodyClass: 'page-menu',
    ...content
  });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: 'Gallery — Virtuoso Catering House',
    activePage: 'gallery',
    bodyClass: 'page-gallery',
    ...content
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact — Virtuoso Catering House',
    activePage: 'contact',
    bodyClass: 'page-contact',
    ...content
  });
});

module.exports = router;
