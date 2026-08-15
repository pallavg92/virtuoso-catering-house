/* Virtuōso Visual Language System → Figma
 * Builds the whole system natively inside Figma: variables, paint styles,
 * text styles, and component sets. Values are transcribed from
 * tokens/colors.css, tokens/system.css, tokens/typography.css and
 * tokens/spacing.css. OKLCH has been converted to sRGB hex.
 * Rule numbers refer to "Virtuoso Visual Language System", Edition One.
 */

/* ── The palette ─────────────────────────────────────────────── */

const PALETTE = {
  'green-900': '#101F10',
  'green-800': '#1A2F1B',
  'green-700': '#273F28',
  'green-600': '#3A553A',
  'sage-500': '#6D8168',
  'sage-300': '#AFBCA9',
  'sage-200': '#D0D7C9',
  'amber-700': '#935A11',
  'amber-600': '#B16F23',
  'amber-500': '#C9893D',
  'amber-300': '#E6C598',
  'clay-600': '#89543C',
  'clay-400': '#B88E78',
  'parchment-100': '#FAF6EE',
  'parchment-200': '#F4EEE3',
  'parchment-300': '#E8E0D4',
  'linen-50': '#FEFCF7',
  'ink-900': '#17100B',
  'ink-700': '#342C26',
  'ink-500': '#5F5650',
  'ink-300': '#98918B',
  'brass-600': '#AA6926',
};

/* The twelve working values, named as the house names them.
   Anything outside this list is archive and is never specified in new work. */
const VLS = {
  forest: 'green-900',
  cellar: 'green-800',
  bay: 'green-600',
  sage: 'sage-500',
  'olive-mist': 'sage-300',
  'sage-wash': 'sage-200',
  amber: 'amber-700',
  brass: 'brass-600',
  candlelight: 'amber-300',
  terracotta: 'clay-600',
  parchment: 'parchment-100',
  vellum: 'parchment-300',
  ink: 'ink-900',
  slate: 'ink-500',
  white: 'linen-50',
};

const C = {};
for (const k in PALETTE) C[k] = PALETTE[k];
for (const k in VLS) C[k] = PALETTE[VLS[k]];

const SPACE = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96, 10: 128, 11: 160 };

/* Digital scale W1–W7. Fluid steps are pinned to their 1440 px maxima. */
const SCALE = {
  'w1-hero': 88,
  'w2-section': 56,
  'w3-card': 32,
  'w4-body-l': 20,
  'w5-body': 16,
  'w6-label': 13,
  'w7-caption': 14,
};

const TRACK = {
  'caps-xs': 24, 'caps-s': 22, 'caps-m': 20, 'caps-l': 16, 'caps-xl': 12,
  wordmark: 9, descriptor: 44,
};

/* ── Fonts ───────────────────────────────────────────────────── */

let DISPLAY = { family: 'Cormorant Garamond', style: 'Light' };
let DISPLAY_ITALIC = { family: 'Cormorant Garamond', style: 'Light Italic' };
let BODY_LIGHT = { family: 'Work Sans', style: 'Light' };
let BODY = { family: 'Work Sans', style: 'Regular' };
let BODY_MED = { family: 'Work Sans', style: 'Medium' };

async function loadFonts() {
  const wanted = [DISPLAY, DISPLAY_ITALIC, BODY_LIGHT, BODY, BODY_MED];
  const missing = [];
  for (const f of wanted) {
    try {
      await figma.loadFontAsync(f);
    } catch (e) {
      missing.push(f.family + ' ' + f.style);
    }
  }
  if (missing.length) {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Light' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    figma.notify(
      'Missing fonts substituted with Inter: ' + missing.join(', ') +
      '. Install Cormorant Garamond and Work Sans, then re-run.',
      { timeout: 8000 }
    );
    const sub = (f, style) => ({ family: 'Inter', style: style });
    if (missing.some(m => m.indexOf('Cormorant') === 0)) {
      DISPLAY = sub(DISPLAY, 'Light');
      DISPLAY_ITALIC = sub(DISPLAY_ITALIC, 'Light');
    }
    if (missing.some(m => m.indexOf('Work Sans') === 0)) {
      BODY_LIGHT = sub(BODY_LIGHT, 'Light');
      BODY = sub(BODY, 'Regular');
      BODY_MED = sub(BODY_MED, 'Medium');
    }
  }
}

/* ── Helpers ─────────────────────────────────────────────────── */

function rgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

const VARS = {};

function fill(hex, varName) {
  const paint = { type: 'SOLID', color: rgb(hex) };
  const v = VARS[varName || ''];
  if (v) return [figma.variables.setBoundVariableForPaint(paint, 'color', v)];
  return [paint];
}

function frame(name, opts) {
  const o = opts || {};
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = o.dir === 'row' ? 'HORIZONTAL' : 'VERTICAL';
  /* `width` always means the horizontal dimension — which axis that is
     depends on the layout direction. */
  if (o.width) {
    if (o.dir === 'row') {
      f.primaryAxisSizingMode = 'FIXED';
      f.counterAxisSizingMode = 'AUTO';
    } else {
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'FIXED';
    }
    f.resize(o.width, f.height);
  } else {
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
  }
  f.itemSpacing = o.gap == null ? SPACE[4] : o.gap;
  const p = o.pad == null ? 0 : o.pad;
  f.paddingTop = o.padTop == null ? p : o.padTop;
  f.paddingBottom = o.padBottom == null ? p : o.padBottom;
  f.paddingLeft = o.padLeft == null ? p : o.padLeft;
  f.paddingRight = o.padRight == null ? p : o.padRight;
  f.counterAxisAlignItems = o.align || 'MIN';
  f.fills = o.bg ? fill(o.bg, o.bgVar) : [];
  f.clipsContent = false;
  return f;
}

function text(chars, opts) {
  const o = opts || {};
  const t = figma.createText();
  t.fontName = o.font || BODY_LIGHT;
  t.fontSize = o.size || SCALE['w5-body'];
  t.characters = o.caps ? String(chars).toUpperCase() : String(chars);
  t.fills = fill(o.color || C.ink, o.colorVar);
  if (o.track != null) t.letterSpacing = { unit: 'PERCENT', value: o.track };
  t.lineHeight = { unit: 'PERCENT', value: o.leading == null ? 170 : o.leading };
  if (o.width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(o.width, t.height);
  } else {
    t.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  t.name = String(chars).slice(0, 40);
  return t;
}

/* Voice III — tracked capitals. Tracking follows size, never taste (R 3.19). */
function label(chars, opts) {
  const o = opts || {};
  const size = o.size || SCALE['w6-label'];
  const track = size <= 13 ? TRACK['caps-xs'] : size <= 15 ? TRACK['caps-s']
    : size <= 18 ? TRACK['caps-m'] : size <= 24 ? TRACK['caps-l'] : TRACK['caps-xl'];
  return text(chars, {
    font: BODY, size: size, caps: true, track: track, leading: 170,
    color: o.color || C.slate, colorVar: o.colorVar, width: o.width,
  });
}

/* A rule is solid, horizontal, and one of four authorised weights (R 9.03). */
function rule(weight, width, hex, varName) {
  const r = figma.createRectangle();
  const h = { hairline: 0.53, structural: 0.67, device: 1.07, anchor: 2.13 }[weight] || 1;
  r.resize(width, h);
  r.fills = fill(hex, varName);
  r.name = 'Rule / ' + weight;
  return r;
}

function section(title, subtitle) {
  const f = frame('§ ' + title, { gap: SPACE[3], pad: 0 });
  f.appendChild(label(title, { size: 15, color: C.amber, colorVar: 'vls/amber' }));
  const d = rule('device', 91, C.brass, 'vls/brass'); // 24 mm at 96 dpi
  f.appendChild(d);
  if (subtitle) {
    f.appendChild(text(subtitle, {
      font: BODY_LIGHT, size: SCALE['w4-body-l'], leading: 150,
      color: C.slate, colorVar: 'vls/slate', width: 520,
    }));
  }
  return f;
}

/* ── 1 · Variables ───────────────────────────────────────────── */

function buildVariables() {
  const existing = figma.variables.getLocalVariableCollections
    ? figma.variables.getLocalVariableCollections()
    : [];
  for (const col of existing) if (col.name === 'Virtuōso VLS') col.remove();

  const col = figma.variables.createVariableCollection('Virtuōso VLS');
  const mode = col.modes[0].modeId;
  col.renameMode(mode, 'Default');

  /* The signature changed from (name, collectionId, type) to
     (name, collection, type); support both. */
  const newVar = (name, type) => {
    try {
      return figma.variables.createVariable(name, col, type);
    } catch (e) {
      return figma.variables.createVariable(name, col.id, type);
    }
  };

  const mk = (name, type, value) => {
    const v = newVar(name, type);
    v.setValueForMode(mode, value);
    VARS[name] = v;
    return v;
  };

  for (const k in PALETTE) mk('palette/' + k, 'COLOR', rgb(PALETTE[k]));
  for (const k in VLS) mk('vls/' + k, 'COLOR', rgb(PALETTE[VLS[k]]));

  /* Semantic roles, aliased to the working values. */
  const roles = {
    'role/surface-page': 'vls/parchment',
    'role/surface-card': 'vls/white',
    'role/surface-panel': 'vls/vellum',
    'role/surface-inverse': 'vls/forest',
    'role/surface-wash': 'vls/sage-wash',
    'role/text-primary': 'vls/ink',
    'role/text-secondary': 'vls/slate',
    'role/text-on-inverse': 'vls/parchment',
    'role/text-on-inverse-muted': 'vls/olive-mist',
    'role/accent-type': 'vls/amber',
    'role/accent-rule': 'vls/brass',
    'role/alert': 'vls/terracotta',
  };
  for (const name in roles) {
    const src = VARS[roles[name]];
    const v = newVar(name, 'COLOR');
    v.setValueForMode(mode, { type: 'VARIABLE_ALIAS', id: src.id });
    VARS[name] = v;
  }

  for (const k in SPACE) mk('space/' + k, 'FLOAT', SPACE[k]);
  mk('module/screen', 'FLOAT', 8);   // R 4.02
  mk('module/slide', 'FLOAT', 16);
  mk('radius/all', 'FLOAT', 0);      // Refusal 03 — radius is zero, everywhere
  for (const k in SCALE) mk('type/' + k, 'FLOAT', SCALE[k]);
  mk('measure/body', 'FLOAT', 640);  // 68 characters, R 3.16
  mk('measure/lead', 'FLOAT', 520);  // 56 characters
  mk('container/max', 'FLOAT', 1160);
  return col;
}

/* ── 2 · Paint styles ────────────────────────────────────────── */

function buildPaintStyles() {
  const existing = figma.getLocalPaintStyles ? figma.getLocalPaintStyles() : [];
  for (const s of existing) if (s.name.indexOf('VLS/') === 0) s.remove();

  const mk = (name, hex, varName, desc) => {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = fill(hex, varName);
    if (desc) s.description = desc;
  };

  const notes = {
    forest: 'Inverse ground; primary type.',
    cellar: 'Secondary ground, panels.',
    bay: 'Charts, signage, secondary type.',
    sage: 'Graphic fields, linen match. NEVER type.',
    'olive-mist': 'Type on Forest, muted inverse.',
    'sage-wash': 'Wash panels, body copy on Forest.',
    amber: 'The only amber that sets type — 5.25:1.',
    brass: 'Rules, terminals, foil match. NEVER type.',
    candlelight: 'Accent type on Forest only.',
    terracotta: 'Correction, alert, non-vegetarian.',
    parchment: 'The field. Default page ground.',
    vellum: 'Panels, rules, table banding.',
    ink: 'Body copy on parchment.',
    slate: 'Captions, labels, folios.',
    white: 'The only white. #FFFFFF is prohibited (R 2.01).',
  };
  for (const k in VLS) mk('VLS/' + k, PALETTE[VLS[k]], 'vls/' + k, notes[k]);
  for (const k in PALETTE) mk('VLS/Archive/' + k, PALETTE[k], 'palette/' + k, 'Raw palette. Legacy artwork only.');
}

/* ── 3 · Text styles ─────────────────────────────────────────── */

function buildTextStyles() {
  const existing = figma.getLocalTextStyles ? figma.getLocalTextStyles() : [];
  for (const s of existing) if (s.name.indexOf('VLS/') === 0) s.remove();

  const mk = (name, font, size, leading, track, desc) => {
    const s = figma.createTextStyle();
    s.name = name;
    s.fontName = font;
    s.fontSize = size;
    s.lineHeight = { unit: 'PERCENT', value: leading };
    s.letterSpacing = { unit: 'PERCENT', value: track };
    if (desc) s.description = desc;
    return s;
  };

  /* Voice I — the ceremonial register. Never below 22 px on screen (R 3.01). */
  mk('VLS/Voice I · W1 Hero', DISPLAY, SCALE['w1-hero'], 108, -1, 'Cormorant Light. Covers and hero statements.');
  mk('VLS/Voice I · W2 Section', DISPLAY, SCALE['w2-section'], 108, -1, 'Section titles.');
  mk('VLS/Voice I · W3 Card', DISPLAY, SCALE['w3-card'], 125, -1, 'Card titles, dish names, totals.');
  mk('VLS/Voice I · Italic', DISPLAY_ITALIC, SCALE['w3-card'], 125, -1, 'Garnish notes, asides.');

  /* Voice II — the editorial register. */
  mk('VLS/Voice II · W4 Body Large', BODY_LIGHT, SCALE['w4-body-l'], 170, 0, 'Standfirsts, leads. Measure 520 px.');
  mk('VLS/Voice II · W5 Body', BODY_LIGHT, SCALE['w5-body'], 170, 0, 'Body copy. Never lower (R 3.15). Measure 640 px.');
  mk('VLS/Voice II · W7 Caption', BODY_LIGHT, SCALE['w7-caption'], 150, 0, 'Captions. The floor.');

  /* Voice III — the operational register. Always capitals, always tracked. */
  mk('VLS/Voice III · Label XS', BODY, 13, 170, TRACK['caps-xs'], 'Set in capitals. 0.24em.');
  mk('VLS/Voice III · Label S', BODY, 15, 170, TRACK['caps-s'], 'Set in capitals. 0.22em.');
  mk('VLS/Voice III · Label M', BODY, 18, 160, TRACK['caps-m'], 'Set in capitals. 0.20em.');
  mk('VLS/Voice III · Label L', BODY, 24, 140, TRACK['caps-l'], 'Set in capitals. 0.16em.');

  /* The mark. */
  mk('VLS/Wordmark', DISPLAY, 40, 100, TRACK.wordmark, 'Tracking fixed at 0.09em (R 1.01).');
  mk('VLS/Wordmark Descriptor', BODY, 9, 100, TRACK.descriptor, '"Catering House" at 0.44em (R 1.02).');
}

/* ── 4 · Components ──────────────────────────────────────────── */

function variantSet(nodes, name, description) {
  const set = figma.combineAsVariants(nodes, figma.currentPage);
  set.name = name;
  if (description) set.description = description;
  set.layoutMode = 'VERTICAL';
  set.primaryAxisSizingMode = 'AUTO';
  set.counterAxisSizingMode = 'AUTO';
  set.itemSpacing = SPACE[4];
  set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = SPACE[5];
  set.fills = [];
  return set;
}

/* Wordmark — four lockups, no fifth (R 1.01–1.06). */
function buildWordmark(lockup, inverse) {
  const size = 40;
  const markColor = inverse ? C.parchment : C.forest;
  const markVar = inverse ? 'vls/parchment' : 'vls/forest';
  const descColor = inverse ? C['olive-mist'] : C.slate;
  const descVar = inverse ? 'vls/olive-mist' : 'vls/slate';

  const mark = () => text('Virtuōso', {
    font: DISPLAY, size: size, track: TRACK.wordmark, leading: 100,
    color: markColor, colorVar: markVar,
  });
  const descriptor = () => text('Catering House', {
    font: BODY, size: 9, caps: true, track: TRACK.descriptor, leading: 100,
    color: descColor, colorVar: descVar,
  });

  let f;
  if (lockup === 'wordmark') {
    f = frame('w', { gap: 0 });
    f.appendChild(mark());
  } else if (lockup === 'monogram') {
    f = frame('w', { gap: Math.round(size * 0.14) });
    f.appendChild(rule('device', Math.round(size * 0.62),
      inverse ? C.candlelight : C.brass, inverse ? 'vls/candlelight' : 'vls/brass'));
    f.appendChild(text('V', { font: DISPLAY, size: size, leading: 100, color: markColor, colorVar: markVar }));
  } else if (lockup === 'horizontal') {
    f = frame('w', { dir: 'row', gap: Math.round(size * 0.34), align: 'CENTER' });
    f.appendChild(mark());
    const bar = figma.createRectangle();
    bar.resize(1, size * 0.44);
    bar.fills = fill(C.vellum, 'vls/vellum');
    f.appendChild(bar);
    f.appendChild(descriptor());
  } else {
    f = frame('w', { gap: Math.round(size * 0.22) });
    f.appendChild(mark());
    f.appendChild(descriptor());
  }
  f.paddingTop = f.paddingBottom = SPACE[4];
  f.paddingLeft = f.paddingRight = SPACE[4];
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Lockup=' + lockup + ', Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* The macron device — the stroke lifted from the Ō. Three lengths at A4. */
function buildDevice(length, inverse) {
  const px = { long: 91, mid: 53, short: 34, full: 240 }[length];
  const f = frame('d', { gap: 0, pad: SPACE[4] });
  f.appendChild(rule('device', px, inverse ? C.candlelight : C.brass,
    inverse ? 'vls/candlelight' : 'vls/brass'));
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Length=' + length + ', Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* Rule — three structural weights. The fourth, 0.8pt brass, belongs to Device. */
function buildRule(weight, inverse) {
  const f = frame('r', { gap: 0, pad: SPACE[4], width: 320 });
  const hex = inverse ? C['olive-mist'] : weight === 'anchor' ? C.forest : C.vellum;
  const vn = inverse ? 'vls/olive-mist' : weight === 'anchor' ? 'vls/forest' : 'vls/vellum';
  const r = rule(weight, 288, hex, vn);
  f.appendChild(r);
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Weight=' + weight + ', Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* Action — a tracked capital word over a brass rule. The only button form
   in the system; no filled buttons anywhere (R 11.09). */
function buildAction(variant, size) {
  const px = size === 'sm' ? 13 : 15;
  const color = variant === 'inverse' ? C.parchment : variant === 'quiet' ? C.slate : C.forest;
  const cv = variant === 'inverse' ? 'vls/parchment' : variant === 'quiet' ? 'vls/slate' : 'vls/forest';
  const ruleColor = variant === 'inverse' ? C.candlelight : C.brass;
  const ruleVar = variant === 'inverse' ? 'vls/candlelight' : 'vls/brass';

  const inner = frame('a', { gap: SPACE[1] });
  const t = label('Request a proposal', { size: px, color: color, colorVar: cv });
  inner.appendChild(t);
  inner.appendChild(rule('device', Math.ceil(t.width), ruleColor, ruleVar));

  const f = frame('action', { gap: 0, pad: SPACE[4] });
  f.appendChild(inner);
  if (variant === 'inverse') f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Variant=' + variant + ', Size=' + size;
  return f;
}

/* Surface — the only container. Square corners, no shadow; distinguished
   from the page by ground colour alone (R 9.05, R 9.06). */
function buildSurface(tone) {
  const bg = { card: C.white, panel: C.vellum, inverse: C.forest, wash: C['sage-wash'], page: C.parchment }[tone];
  const bgVar = { card: 'vls/white', panel: 'vls/vellum', inverse: 'vls/forest', wash: 'vls/sage-wash', page: 'vls/parchment' }[tone];
  const onInverse = tone === 'inverse';

  const f = frame('surface', { gap: SPACE[3], pad: SPACE[6], width: 320, bg: bg, bgVar: bgVar });
  f.appendChild(label('Surface · ' + tone, {
    color: onInverse ? C['olive-mist'] : C.slate,
    colorVar: onInverse ? 'vls/olive-mist' : 'vls/slate',
  }));
  f.appendChild(text('A flat panel. Elevation is expressed by ground colour, not by shadow.', {
    font: BODY_LIGHT, size: SCALE['w5-body'], width: 256,
    color: onInverse ? C['sage-wash'] : C.ink,
    colorVar: onInverse ? 'vls/sage-wash' : 'vls/ink',
  }));
  f.name = 'Tone=' + tone;
  return f;
}

/* SectionHeader — eyebrow, device, Cormorant title, standfirst. */
function buildSectionHeader(inverse) {
  const f = frame('header', { gap: SPACE[3], pad: SPACE[6], width: 560 });
  f.appendChild(label('The house', {
    size: 13, color: inverse ? C.candlelight : C.amber,
    colorVar: inverse ? 'vls/candlelight' : 'vls/amber',
  }));
  f.appendChild(rule('device', 91, inverse ? C.candlelight : C.brass, inverse ? 'vls/candlelight' : 'vls/brass'));
  f.appendChild(text('Hospitality before food', {
    font: DISPLAY, size: SCALE['w2-section'], track: -1, leading: 108, width: 496,
    color: inverse ? C.parchment : C.forest, colorVar: inverse ? 'vls/parchment' : 'vls/forest',
  }));
  f.appendChild(text('One paragraph, capped at fifty-six characters of measure, set in the editorial register.', {
    font: BODY_LIGHT, size: SCALE['w4-body-l'], leading: 150, width: 496,
    color: inverse ? C['sage-wash'] : C.slate, colorVar: inverse ? 'vls/sage-wash' : 'vls/slate',
  }));
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* MenuItem — dish name in Voice I over its garnish note in Voice II. */
function buildMenuItem(inverse) {
  const f = frame('item', { gap: SPACE[2], pad: SPACE[4], width: 480 });
  f.appendChild(text('Kashmiri morel pulao', {
    font: DISPLAY, size: SCALE['w3-card'], track: -1, leading: 125,
    color: inverse ? C.parchment : C.ink, colorVar: inverse ? 'vls/parchment' : 'vls/ink',
  }));
  f.appendChild(text('Gucchi, saffron, browned onion, ghee', {
    font: BODY_LIGHT, size: SCALE['w7-caption'], leading: 150,
    color: inverse ? C['olive-mist'] : C.slate, colorVar: inverse ? 'vls/olive-mist' : 'vls/slate',
  }));
  f.appendChild(rule('hairline', 448, inverse ? C['olive-mist'] : C.vellum, inverse ? 'vls/olive-mist' : 'vls/vellum'));
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* PullQuote — brass rule, Voice I at display size, tracked attribution.
   No quotation marks. One per document. */
function buildPullQuote(inverse) {
  const f = frame('quote', { gap: SPACE[4], pad: SPACE[6], width: 560 });
  f.appendChild(rule('device', 91, inverse ? C.candlelight : C.brass, inverse ? 'vls/candlelight' : 'vls/brass'));
  f.appendChild(text('A banquet is a piece of theatre in which nobody may see the stagehands.', {
    font: DISPLAY, size: SCALE['w3-card'], track: -1, leading: 125, width: 496,
    color: inverse ? C.parchment : C.forest, colorVar: inverse ? 'vls/parchment' : 'vls/forest',
  }));
  f.appendChild(label('Pallav Goel · Virtuōso', {
    size: 13, color: inverse ? C['olive-mist'] : C.slate,
    colorVar: inverse ? 'vls/olive-mist' : 'vls/slate',
  }));
  if (inverse) f.fills = fill(C.forest, 'vls/forest');
  f.name = 'Inverse=' + (inverse ? 'true' : 'false');
  return f;
}

/* Field — underlined, never boxed. Brass rule matching the Action. */
function buildField(state) {
  const f = frame('field', { gap: SPACE[2], pad: SPACE[4], width: 400 });
  f.appendChild(label('Date of function', { size: 13 }));
  const line = frame('line', { gap: SPACE[2], width: 368 });
  line.appendChild(text(state === 'filled' ? '14 February 2027' : 'DD Month YYYY', {
    font: BODY_LIGHT, size: SCALE['w5-body'],
    color: state === 'filled' ? C.ink : C.slate,
    colorVar: state === 'filled' ? 'vls/ink' : 'vls/slate',
  }));
  line.appendChild(rule(state === 'focus' ? 'device' : 'structural', 368,
    state === 'focus' ? C.brass : C.vellum, state === 'focus' ? 'vls/brass' : 'vls/vellum'));
  f.appendChild(line);
  f.appendChild(text('The date the guests arrive, not the load-in.', {
    font: BODY_LIGHT, size: SCALE['w7-caption'], color: C.slate, colorVar: 'vls/slate',
  }));
  f.name = 'State=' + state;
  return f;
}

/* DietMark — the twelve marks. No thirteenth exists, and no other icons
   exist anywhere in the system (R 9.07, R 9.08). */
const DIET_MARKS = [
  ['veg', null, 'green-700', 'Vegetarian'],
  ['nonveg', null, 'clay-600', 'Non-vegetarian'],
  ['vegan', 'VG', 'green-700', 'Vegan'],
  ['glutenfree', 'GF', 'ink-700', 'Gluten free'],
  ['nut', 'N', 'ink-700', 'Contains nut'],
  ['dairy', 'D', 'ink-700', 'Contains dairy'],
  ['jain', 'J', 'ink-700', 'Jain'],
  ['noonion', '◦', 'ink-700', 'No onion or garlic'],
  ['spiced', '▲', 'amber-700', 'Spiced'],
  ['warm', '≈', 'ink-700', 'Served warm'],
  ['chilled', '✳', 'ink-700', 'Served chilled'],
  ['signature', 'Ō', 'green-700', 'House signature'],
];

function buildDietMark(spec) {
  const name = spec[0], glyph = spec[1], colorKey = spec[2];
  const size = 32;
  const hex = PALETTE[colorKey];
  const f = frame('mark', { gap: 0, pad: 0, align: 'CENTER' });
  f.layoutMode = 'HORIZONTAL';
  f.primaryAxisSizingMode = 'FIXED';
  f.counterAxisSizingMode = 'FIXED';
  f.resize(size, size);
  f.primaryAxisAlignItems = 'CENTER';
  f.counterAxisAlignItems = 'CENTER';
  f.fills = [];
  f.strokes = fill(hex, 'palette/' + colorKey);
  f.strokeWeight = 1.6;
  f.strokeAlign = 'INSIDE';
  if (glyph) {
    f.appendChild(text(glyph, {
      font: name === 'signature' ? DISPLAY : BODY,
      size: Math.round(size * 0.44), leading: 100, track: 0,
      color: hex, colorVar: 'palette/' + colorKey,
    }));
  } else {
    const dot = figma.createEllipse();
    dot.resize(size * 0.32, size * 0.32);
    dot.fills = fill(hex, 'palette/' + colorKey);
    f.appendChild(dot);
  }
  f.name = 'Mark=' + name;
  return f;
}

/* Figure — three permitted ratios only (R 6.06). Brass tick, number, caption. */
function buildFigure(ratio) {
  const w = 320;
  const h = ratio === '3:2' ? Math.round(w / 1.5) : ratio === '4:5' ? Math.round(w * 1.25) : w;
  const f = frame('figure', { gap: SPACE[3], pad: 0, width: w });
  const plate = figma.createRectangle();
  plate.resize(w, h);
  plate.fills = fill(C['sage-wash'], 'vls/sage-wash');
  plate.name = 'Image ' + ratio;
  f.appendChild(plate);
  const cap = frame('caption', { dir: 'row', gap: SPACE[2], align: 'MIN', width: w });
  const tick = rule('device', 12, C.brass, 'vls/brass');
  cap.appendChild(tick);
  const body = frame('c', { gap: SPACE[1] });
  body.appendChild(label('Fig. 04', { size: 13 }));
  body.appendChild(text('Long table, Ragwas courtyard, February.', {
    font: BODY_LIGHT, size: SCALE['w7-caption'], leading: 150, width: 260,
    color: C.slate, colorVar: 'vls/slate',
  }));
  cap.appendChild(body);
  f.appendChild(cap);
  f.name = 'Ratio=' + ratio;
  return f;
}

/* DataTable — horizontal rules only, tabular figures, one banded milestone. */
function buildDataTable() {
  const w = 640;
  const f = frame('table', { gap: 0, pad: 0, width: w });
  f.appendChild(label('Quotation · 240 pax', { size: 13, color: C.amber, colorVar: 'vls/amber' }));
  const spacer = figma.createRectangle();
  spacer.resize(w, SPACE[3]);
  spacer.fills = [];
  f.appendChild(spacer);

  const row = (cells, opts) => {
    const o = opts || {};
    const r = frame('row', { dir: 'row', gap: 0, width: w, align: 'CENTER' });
    r.primaryAxisSizingMode = 'FIXED';
    r.paddingTop = r.paddingBottom = SPACE[2];
    r.paddingLeft = r.paddingRight = o.band ? SPACE[3] : 0;
    if (o.band) r.fills = fill(C.vellum, 'vls/vellum');
    const widths = [0.5, 0.2, 0.3];
    cells.forEach((cell, i) => {
      const t = text(cell, {
        font: o.head ? BODY : o.total ? DISPLAY : BODY_LIGHT,
        size: o.head ? 13 : o.total ? SCALE['w3-card'] : SCALE['w5-body'],
        caps: !!o.head,
        track: o.head ? TRACK['caps-xs'] : o.total ? -1 : 0,
        leading: o.total ? 125 : 170,
        color: o.head ? C.slate : C.ink,
        colorVar: o.head ? 'vls/slate' : 'vls/ink',
        width: Math.round((w - (o.band ? SPACE[6] : 0)) * widths[i]) - (i ? SPACE[3] : 0),
      });
      if (i) t.textAlignHorizontal = 'RIGHT';
      r.appendChild(t);
    });
    return r;
  };

  f.appendChild(row(['Course', 'Pax', 'Amount'], { head: true }));
  f.appendChild(rule('structural', w, C.vellum, 'vls/vellum'));
  f.appendChild(row(['Welcome and live counters', '240', '1,44,000']));
  f.appendChild(rule('hairline', w, C.vellum, 'vls/vellum'));
  f.appendChild(row(['Principal dinner service', '240', '3,60,000'], { band: true }));
  f.appendChild(rule('hairline', w, C.vellum, 'vls/vellum'));
  f.appendChild(row(['Dessert and paan', '240', '72,000']));
  f.appendChild(rule('anchor', w, C.forest, 'vls/forest'));
  f.appendChild(row(['Total', '', '5,76,000'], { total: true }));
  return f;
}

/* ── 5 · Specimen boards ─────────────────────────────────────── */

function colourBoard() {
  const board = section('Colour', 'The twelve working values, plus the two grounds. Anything outside this list is archive and is never specified in new work.');
  const grid = frame('swatches', { dir: 'row', gap: SPACE[4], width: 1160 });
  grid.layoutWrap = 'WRAP';
  grid.counterAxisSpacing = SPACE[4];

  for (const k in VLS) {
    const hex = PALETTE[VLS[k]];
    const cell = frame('swatch', { gap: SPACE[2], width: 176 });
    const chip = figma.createRectangle();
    chip.resize(176, 104);
    chip.fills = fill(hex, 'vls/' + k);
    cell.appendChild(chip);
    cell.appendChild(label(k, { size: 13, color: C.ink, colorVar: 'vls/ink' }));
    cell.appendChild(text(hex + '  ·  ' + VLS[k], {
      font: BODY_LIGHT, size: SCALE['w7-caption'], color: C.slate, colorVar: 'vls/slate',
    }));
    grid.appendChild(cell);
  }
  board.appendChild(grid);
  return board;
}

function typeBoard() {
  const board = section('Typography', 'Three voices. Cormorant Garamond Light sets the ceremonial register, Work Sans Light the editorial, Work Sans capitals the operational.');
  const rows = [
    ['W1 · Hero', 'Hospitality before food', DISPLAY, SCALE['w1-hero'], -1, 108],
    ['W2 · Section', 'A house, not a kitchen', DISPLAY, SCALE['w2-section'], -1, 108],
    ['W3 · Card', 'Kashmiri morel pulao', DISPLAY, SCALE['w3-card'], -1, 125],
    ['W4 · Body large', 'The standfirst runs to fifty-six characters of measure.', BODY_LIGHT, SCALE['w4-body-l'], 0, 150],
    ['W5 · Body', 'Body copy sits on a measure of sixty-eight characters and never falls below sixteen pixels.', BODY_LIGHT, SCALE['w5-body'], 0, 170],
    ['W7 · Caption', 'What is shown, where, and when. No adjectives.', BODY_LIGHT, SCALE['w7-caption'], 0, 150],
  ];
  for (const r of rows) {
    const row = frame('row', { gap: SPACE[2], width: 1160 });
    row.appendChild(label(r[0], { size: 13, color: C.amber, colorVar: 'vls/amber' }));
    row.appendChild(text(r[1], {
      font: r[2], size: r[3], track: r[4], leading: r[5], width: 1000,
      color: C.forest, colorVar: 'vls/forest',
    }));
    board.appendChild(row);
  }
  const caps = frame('caps', { gap: SPACE[3], width: 1160 });
  caps.appendChild(label('Voice III · tracking follows size, not taste', { size: 13, color: C.amber, colorVar: 'vls/amber' }));
  [[24, 'caps-l'], [18, 'caps-m'], [15, 'caps-s'], [13, 'caps-xs']].forEach(p => {
    caps.appendChild(label('Course one · Ragwas · 240 pax', { size: p[0], color: C.forest, colorVar: 'vls/forest' }));
  });
  board.appendChild(caps);
  return board;
}

function spacingBoard() {
  const board = section('Spacing', 'The module is 8 px on screen, 4 mm in print, 16 px on a slide. Every measurement is a multiple of it.');
  for (const k in SPACE) {
    const row = frame('row', { dir: 'row', gap: SPACE[4], align: 'CENTER' });
    const bar = figma.createRectangle();
    bar.resize(SPACE[k], 16);
    bar.fills = fill(C.brass, 'vls/brass');
    row.appendChild(bar);
    row.appendChild(text('space-' + k + '  ·  ' + SPACE[k] + ' px  ·  ' + (SPACE[k] / 8) + ' modules', {
      font: BODY_LIGHT, size: SCALE['w7-caption'], color: C.slate, colorVar: 'vls/slate',
    }));
    board.appendChild(row);
  }
  const refusals = frame('refusals', { gap: SPACE[2], width: 640 });
  refusals.appendChild(label('The refusals', { size: 13, color: C.terracotta, colorVar: 'vls/terracotta' }));
  [
    'Radius is zero, everywhere, on every element.',
    'Elevation is ground colour. Shadow does not exist.',
    'Pure white and pure black are prohibited in every medium.',
    'Bullets do not exist. Lists are set with space alone.',
    'No fifth rule weight is authorised.',
  ].forEach(line => {
    refusals.appendChild(text(line, { font: BODY_LIGHT, size: SCALE['w5-body'], width: 600, color: C.ink, colorVar: 'vls/ink' }));
  });
  board.appendChild(refusals);
  return board;
}

/* ── Assembly ────────────────────────────────────────────────── */

async function run() {
  await loadFonts();

  const page = figma.createPage();
  page.name = 'Virtuōso VLS';
  page.backgrounds = [{ type: 'SOLID', color: rgb(C.parchment) }];
  await figma.setCurrentPageAsync(page);

  buildVariables();
  buildPaintStyles();
  buildTextStyles();

  const root = frame('Virtuōso Visual Language System', {
    gap: SPACE[10], pad: SPACE[10], bg: C.parchment, bgVar: 'vls/parchment',
  });
  root.counterAxisSizingMode = 'AUTO';

  /* Cover */
  const cover = frame('Cover', { gap: SPACE[5] });
  cover.appendChild(text('Virtuōso', {
    font: DISPLAY, size: SCALE['w1-hero'], track: TRACK.wordmark, leading: 100,
    color: C.forest, colorVar: 'vls/forest',
  }));
  cover.appendChild(label('Catering House', { size: 13, track: TRACK.descriptor, color: C.slate, colorVar: 'vls/slate' }));
  cover.appendChild(rule('device', 91, C.brass, 'vls/brass'));
  cover.appendChild(text('Visual Language System · Edition One', {
    font: BODY_LIGHT, size: SCALE['w4-body-l'], color: C.slate, colorVar: 'vls/slate',
  }));
  root.appendChild(cover);

  root.appendChild(colourBoard());
  root.appendChild(typeBoard());
  root.appendChild(spacingBoard());

  /* Components */
  const compBoard = section('Components', 'Every component below is a real Figma component. Variants carry the property names used in the code.');
  root.appendChild(compBoard);

  const shelf = frame('Component shelf', { gap: SPACE[8] });

  const addSet = (nodes, name, desc) => {
    nodes.forEach(n => figma.currentPage.appendChild(n));
    const comps = nodes.map(n => figma.createComponentFromNode(n));
    const set = variantSet(comps, name, desc);
    shelf.appendChild(set);
    return set;
  };

  addSet(
    ['stacked', 'horizontal', 'wordmark', 'monogram'].reduce((acc, l) => {
      acc.push(buildWordmark(l, false), buildWordmark(l, true));
      return acc;
    }, []),
    'Brand / Wordmark',
    'Four authorised lockups. Stand-in artwork set in Cormorant Garamond Light — no logo file has been supplied.'
  );

  addSet(
    ['long', 'mid', 'short', 'full'].reduce((acc, l) => {
      acc.push(buildDevice(l, false), buildDevice(l, true));
      return acc;
    }, []),
    'Brand / Device',
    'The macron device. Brass on parchment, Candlelight on Forest. Opens a section, terminates a heading, signs a card.'
  );

  addSet(
    ['hairline', 'structural', 'anchor'].reduce((acc, w) => {
      acc.push(buildRule(w, false), buildRule(w, true));
      return acc;
    }, []),
    'Core / Rule',
    'Three structural weights. The fourth, 0.8 pt Brass, is reserved for the Device.'
  );

  addSet(
    ['primary', 'inverse', 'quiet'].reduce((acc, v) => {
      acc.push(buildAction(v, 'md'), buildAction(v, 'sm'));
      return acc;
    }, []),
    'Core / Action',
    'The only button form: a tracked capital word with a brass rule beneath it. No filled buttons anywhere.'
  );

  addSet(['card', 'panel', 'inverse', 'wash', 'page'].map(buildSurface), 'Core / Surface',
    'The only container. Square corners, no shadow, distinguished from the page by ground colour alone.');

  addSet([buildSectionHeader(false), buildSectionHeader(true)], 'Core / SectionHeader',
    'Eyebrow, device, Cormorant title, standfirst. One device per page.');

  addSet([buildMenuItem(false), buildMenuItem(true)], 'Core / MenuItem',
    'Dish name in Voice I over its garnish note in Voice II, on a hairline.');

  addSet([buildPullQuote(false), buildPullQuote(true)], 'Core / PullQuote',
    'Brass rule, Cormorant quote, tracked attribution. No quotation marks. One per document.');

  addSet(['default', 'focus', 'filled'].map(buildField), 'Core / Field',
    'Underlined, never boxed. Brass rule on focus, matching the Action.');

  addSet(DIET_MARKS.map(buildDietMark), 'Core / DietMark',
    'The twelve dietary and service marks. Buffet labels and allergen schedules only, never a guest menu.');

  addSet(['3:2', '4:5', '1:1'].map(buildFigure), 'Core / Figure',
    'The only three ratios in the system. Brass tick, figure number, caption.');

  const tableNode = buildDataTable();
  figma.currentPage.appendChild(tableNode);
  const tableComp = figma.createComponentFromNode(tableNode);
  tableComp.name = 'Core / DataTable';
  tableComp.description = 'Horizontal rules only, no verticals. Tabular figures, one banded milestone, one total in Voice I.';
  shelf.appendChild(tableComp);

  root.appendChild(shelf);
  page.appendChild(root);
  root.x = 0;
  root.y = 0;

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.closePlugin('Virtuōso VLS built — variables, styles and ' + shelf.children.length + ' components.');
}

run().catch(err => {
  figma.closePlugin('Failed: ' + (err && err.message ? err.message : String(err)));
});
