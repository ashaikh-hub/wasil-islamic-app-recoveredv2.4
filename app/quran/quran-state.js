/* Quran reader state: last reading position and ayah bookmarks.
   Stored in browser storage when available (try/catch), otherwise kept in memory for the session.
   No Quran text is stored here. */
(function (g) {
  var KEY_POS = 'wasil.quran.pos.v1';
  var KEY_BM = 'wasil.quran.bm.v1';
  var mem = {};
  function rawGet(k) {
    try { var ls = g.localStorage; if (ls) { var v = ls.getItem(k); return v === null ? null : v; } } catch (e) {}
    return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
  }
  function rawSet(k, v) {
    mem[k] = v;
    try { var ls = g.localStorage; if (ls) ls.setItem(k, v); } catch (e) {}
  }
  function clampAyah(a, max) {
    var n = parseInt(a, 10);
    if (isNaN(n)) n = 1;
    if (max < 1) return 1;
    return Math.min(Math.max(n, 1), max);
  }
  function surahOk(s) { return Number.isInteger(s) && s >= 1 && s <= 114; }
  function savePos(s, a) {
    if (!surahOk(s) || !Number.isInteger(a) || a < 1) return false;
    rawSet(KEY_POS, JSON.stringify({ s: s, a: a, t: Date.now() }));
    return true;
  }
  function loadPos() {
    try {
      var p = JSON.parse(rawGet(KEY_POS) || 'null');
      if (p && surahOk(p.s) && Number.isInteger(p.a) && p.a >= 1) return { s: p.s, a: p.a, t: p.t || 0 };
    } catch (e) {}
    return null;
  }
  function loadBm() {
    try {
      var arr = JSON.parse(rawGet(KEY_BM) || '[]');
      if (!Array.isArray(arr)) return [];
      return arr.filter(function (b) { return b && surahOk(b.s) && Number.isInteger(b.a) && b.a >= 1; })
        .sort(function (x, y) { return x.s - y.s || x.a - y.a; });
    } catch (e) { return []; }
  }
  function saveBm(list) { rawSet(KEY_BM, JSON.stringify(list)); }
  function bmHas(s, a) { return loadBm().some(function (b) { return b.s === s && b.a === a; }); }
  function addBm(s, a) {
    if (!surahOk(s) || !Number.isInteger(a) || a < 1) return false;
    var list = loadBm();
    if (!bmHas(s, a)) { list.push({ s: s, a: a, t: Date.now() }); saveBm(list); }
    return true;
  }
  function removeBm(s, a) {
    saveBm(loadBm().filter(function (b) { return !(b.s === s && b.a === a); }));
  }
  function toggleBm(s, a) {
    if (bmHas(s, a)) { removeBm(s, a); return false; }
    addBm(s, a); return true;
  }
  function bmMap(s) {
    var m = {};
    loadBm().forEach(function (b) { if (b.s === s) m[b.a] = true; });
    return m;
  }
  function meta(s) { return (g.QSURAH_META || [])[s - 1] || null; }
  function posLabel() {
    var p = loadPos(); if (!p) return '';
    var m = meta(p.s); return (m ? m.enListed : 'Surah ' + p.s) + ' · Ayah ' + p.a;
  }
  g.QSTATE = {
    clampAyah: clampAyah, savePos: savePos, loadPos: loadPos, posLabel: posLabel,
    loadBm: loadBm, bmHas: bmHas, addBm: addBm, removeBm: removeBm, toggleBm: toggleBm,
    bmMap: bmMap, meta: meta
  };
})(typeof window !== 'undefined' ? window : globalThis);
