import { useState, useEffect, useRef } from "react";

// ── Supabase client (no npm needed — loaded via CDN in index.html) ──
const SUPABASE_URL = "https://jvtgkptrmqckvascojrx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dGdrcHRybXFja3Zhc2NvanJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjgxMjgsImV4cCI6MjA4NzU0NDEyOH0.cJFUGwyHn7t3e1Bow_7etqP8RnZa1WS_VKrBAmNGpBM";

function supabase() {
  // Uses the global supabase object injected by the CDN script
  if (window._sb) return window._sb;
  window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return window._sb;
}

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c8a951;
    --gold-light: #e8c96a;
    --gold-dim: #7a6530;
    --bg: #0a0b0d;
    --bg2: #0f1114;
    --bg3: #161920;
    --bg4: #1e2128;
    --border: #2a2e38;
    --border-gold: #3d3520;
    --text: #d4c9a8;
    --text-dim: #7a7260;
    --red: #c0392b;
    --green: #27ae60;
    --blue: #2980b9;
    --purple: #8e44ad;
    --orange: #e67e22;
    --teal: #16a085;
    --ink-lesser: #7ecba1;
    --ink-greater: #5b8edb;
    --ink-powerful: #c47de8;
    --ink-primal: #e8704a;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Crimson Text', Georgia, serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* BG texture */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200,169,81,0.07) 0%, transparent 60%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a951' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  #root { position: relative; z-index: 1; }

  /* HEADER */
  .header {
    background: linear-gradient(180deg, #080a0c 0%, rgba(8,10,12,0.95) 100%);
    border-bottom: 1px solid var(--border-gold);
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    backdrop-filter: blur(12px);
  }
  .header-brand {
    display: flex;
    align-items: center;
    gap: 0;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
  }
  .header-brand:hover .logo-flame { filter: brightness(1.3); }
  .header-brand:hover .logo-text-main { text-shadow: 0 0 20px rgba(255,120,30,0.8); }
  .logo-flame {
    transition: filter 0.2s;
    filter: drop-shadow(0 0 8px rgba(255,100,20,0.6));
  }
  .logo-text-main {
    font-family: 'Cinzel', serif;
    font-size: 1.15rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    line-height: 1;
    background: linear-gradient(135deg, #ff6a00 0%, #ffb347 40%, #c8a951 70%, #fff5cc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: text-shadow 0.2s;
  }
  .logo-text-sub {
    font-family: 'Crimson Text', serif;
    font-size: 0.62rem;
    color: #7a6530;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 1px;
  }
  .header-nav {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  .nav-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  .nav-btn:hover, .nav-btn.active {
    color: var(--gold);
    background: rgba(200,169,81,0.08);
  }
  .nav-btn.active {
    border-bottom: 1px solid var(--gold);
  }

  /* LAYOUT */
  .main { padding: 1.5rem 2rem; max-width: 1600px; margin: 0 auto; width: 100%; }

  /* SECTION HEADER */
  .section-title {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.05em;
    margin-bottom: 0.3rem;
  }
  .section-desc {
    color: var(--text-dim);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, var(--gold-dim), transparent);
    margin: 2rem 0;
  }

  /* CARDS */
  .card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold-dim), transparent);
  }
  .card-title {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  @media (max-width: 900px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .header-nav { display: none; }
  }

  /* INPUTS */
  input, select {
    background: var(--bg4);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 4px;
    padding: 8px 12px;
    font-family: 'Crimson Text', serif;
    font-size: 1rem;
    width: 100%;
    transition: border-color 0.2s;
  }
  input:focus, select:focus {
    outline: none;
    border-color: var(--gold-dim);
  }
  label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-family: 'Cinzel', serif;
  }
  .input-group { margin-bottom: 1rem; }

  /* BUTTON */
  .btn {
    background: linear-gradient(135deg, var(--gold-dim), #5a4820);
    border: 1px solid var(--gold-dim);
    color: var(--gold-light);
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .btn:hover {
    background: linear-gradient(135deg, #7a6530, #6a5228);
    box-shadow: 0 0 12px rgba(200,169,81,0.2);
  }
  .btn-sm { padding: 6px 12px; font-size: 0.7rem; }
  .btn-full { width: 100%; }

  /* ========== NECROMANCY CALCULATOR ========== */
  .ink-display {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .ink-card {
    border-radius: 8px;
    padding: 1rem 1.25rem;
    border: 1px solid;
    position: relative;
    overflow: hidden;
  }
  .ink-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .ink-lesser { border-color: var(--ink-lesser); background: rgba(126,203,161,0.06); }
  .ink-greater { border-color: var(--ink-greater); background: rgba(91,142,219,0.06); }
  .ink-powerful { border-color: var(--ink-powerful); background: rgba(196,125,232,0.06); }
  .ink-primal { border-color: var(--ink-primal); background: rgba(232,112,74,0.06); }

  .ink-name {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
    opacity: 0.8;
  }
  .ink-lesser .ink-name { color: var(--ink-lesser); }
  .ink-greater .ink-name { color: var(--ink-greater); }
  .ink-powerful .ink-name { color: var(--ink-powerful); }
  .ink-primal .ink-name { color: var(--ink-primal); }

  .ink-amount {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
  }
  .ink-sub {
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-top: 2px;
  }
  .ink-necroplasm {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(200,169,81,0.06);
    border: 1px solid var(--border-gold);
    border-radius: 6px;
    padding: 1rem 1.25rem;
    margin-top: 1rem;
  }
  .ink-necroplasm-icon { font-size: 1.5rem; }
  .ink-necroplasm-label { font-family: 'Cinzel', serif; font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; }
  .ink-necroplasm-val { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 700; color: var(--gold); }

  .ritual-breakdown {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--text-dim);
    line-height: 1.8;
  }
  .ritual-breakdown strong { color: var(--text); }

  /* ========== HISCORES ========== */
  .hiscore-member {
    background: var(--bg4);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .member-name {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .member-rank { font-size: 0.7rem; color: var(--text-dim); }
  .skill-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    margin-top: 4px;
  }
  .skill-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.78rem;
    padding: 3px 6px;
    background: var(--bg3);
    border-radius: 3px;
  }
  .skill-icon { font-size: 0.9rem; }
  .skill-level { font-weight: 600; color: var(--gold-light); font-family: 'Cinzel', serif; }
  .hiscore-input-row {
    display: flex;
    gap: 8px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .hiscore-input-row input { flex: 1; min-width: 140px; }
  .total-level {
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    color: var(--text-dim);
    margin-top: 4px;
  }
  .total-level span { color: var(--gold); font-size: 0.9rem; }

  /* ========== EVENT TRACKERS ========== */
  .event-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.05em;
  }
  .badge-active { background: rgba(39,174,96,0.15); border: 1px solid var(--green); color: #2ecc71; }
  .badge-inactive { background: rgba(192,57,43,0.15); border: 1px solid var(--red); color: #e74c3c; }
  .badge-soon { background: rgba(230,126,34,0.15); border: 1px solid var(--orange); color: #f39c12; }

  .event-card {
    background: var(--bg4);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1rem;
  }
  .event-name {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    color: var(--text);
    margin-bottom: 6px;
  }
  .event-detail { font-size: 0.85rem; color: var(--text-dim); }
  .countdown {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: var(--gold);
    margin-top: 6px;
  }

  /* ========== PRIFF DISTRICTS ========== */
  .priff-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  @media (max-width: 800px) { .priff-grid { grid-template-columns: repeat(2, 1fr); } }
  .priff-district {
    border-radius: 6px;
    padding: 10px;
    border: 1px solid var(--border);
    background: var(--bg4);
    text-align: center;
  }
  .priff-district.active {
    border-color: var(--gold-dim);
    background: rgba(200,169,81,0.08);
  }
  .priff-icon { font-size: 1.4rem; margin-bottom: 4px; }
  .priff-name { font-family: 'Cinzel', serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); }
  .priff-district.active .priff-name { color: var(--gold); }
  .priff-skill { font-size: 0.75rem; color: var(--text-dim); margin-top: 2px; }
  .priff-district.active .priff-skill { color: var(--text); }

  /* ========== WIKI LINKS ========== */
  .wiki-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .wiki-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--bg4);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.2s;
    cursor: pointer;
  }
  .wiki-link:hover {
    border-color: var(--gold-dim);
    background: rgba(200,169,81,0.06);
    color: var(--gold);
  }
  .wiki-link-icon { font-size: 1.2rem; flex-shrink: 0; }

  /* ========== LOG TRACKER ========== */
  .log-section { margin-bottom: 1rem; }
  .log-section-title {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
  }
  .log-items { display: flex; flex-direction: column; gap: 4px; }
  .log-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    background: var(--bg4);
    border-radius: 4px;
    font-size: 0.85rem;
    border: 1px solid transparent;
    transition: border-color 0.2s;
  }
  .log-item.obtained { border-color: rgba(39,174,96,0.3); background: rgba(39,174,96,0.04); }
  .log-item-name { color: var(--text); }
  .log-item.obtained .log-item-name { color: #2ecc71; }
  .log-check {
    width: 18px; height: 18px;
    border: 1px solid var(--border);
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 0.7rem;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .log-item.obtained .log-check {
    background: var(--green);
    border-color: var(--green);
  }
  .log-progress {
    height: 6px;
    background: var(--bg4);
    border-radius: 3px;
    overflow: hidden;
    margin-top: 8px;
  }
  .log-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dim), var(--gold));
    border-radius: 3px;
    transition: width 0.4s ease;
  }
  .log-stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-top: 4px;
  }

  /* ========== CALCULATOR ========== */
  .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
  .calc-result {
    background: var(--bg4);
    border: 1px solid var(--border-gold);
    border-radius: 6px;
    padding: 1rem;
    margin-top: 1rem;
  }
  .xp-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--border); font-size: 0.85rem; }
  .xp-row:last-child { border-bottom: none; }
  .xp-val { color: var(--gold); font-family: 'Cinzel', serif; }

  /* ========== DISCORD ========== */
  .discord-card {
    background: linear-gradient(135deg, rgba(88,101,242,0.15), rgba(88,101,242,0.05));
    border: 1px solid rgba(88,101,242,0.3);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .discord-icon { font-size: 3rem; }
  .discord-info { flex: 1; }
  .discord-name { font-family: 'Cinzel', serif; font-size: 1.1rem; color: #7289da; margin-bottom: 4px; }
  .discord-desc { font-size: 0.85rem; color: var(--text-dim); }
  .discord-link-input { display: flex; gap: 8px; margin-top: 1rem; }
  .discord-link-input input { flex: 1; }

  /* TABS */
  .tab-bar {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-dim);
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding: 8px 14px;
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: -1px;
    transition: all 0.2s;
  }
  .tab:hover { color: var(--text); }
  .tab.active { color: var(--gold); border-bottom-color: var(--gold); }

  /* STATUS DOT */
  .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .dot-red { background: var(--red); }
  .dot-orange { background: var(--orange); box-shadow: 0 0 6px var(--orange); }

  /* ANIMATION */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .fade-in { animation: fadeIn 0.3s ease forwards; }

  .tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 0.65rem;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .tag-ironman { background: rgba(200,169,81,0.15); color: var(--gold); border: 1px solid var(--gold-dim); }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mt-1 { margin-top: 0.5rem; }
  .flex { display: flex; }
  .gap-1 { gap: 0.5rem; }
  .gap-2 { gap: 1rem; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .flex-wrap { flex-wrap: wrap; }
  .text-gold { color: var(--gold); }
  .text-dim { color: var(--text-dim); }
  .text-sm { font-size: 0.8rem; }
  .font-cinzel { font-family: 'Cinzel', serif; }
`;

// ============================================================
// DATA
// ============================================================
//
// Ghostly ink recipes (RS Wiki):
// Basic: buy from Soul Supplies shop (3 coins each)
// Regular ink:  20x lesser necroplasm  + 1 vial of water + 1 ashes
// Greater ink:  20x greater necroplasm + 1 vial of water + 1 ashes
// Powerful ink: 20x powerful necroplasm + 1 vial of water + 1 ashes
//
// Necroplasm conversion rituals (2:1 ratio):
//   200 weak    -> 100 lesser
//   200 lesser  -> 100 greater
//   200 greater -> 100 powerful

function calcInks(targetTier, targetAmount) {
  const n = Number(targetAmount) || 0;
  const r = { weak_necro: 0, lesser_necro: 0, greater_necro: 0, powerful_necro: 0, vials: 0, ashes: 0 };
  if (targetTier === "regular")  { r.lesser_necro = n*20; r.weak_necro = n*40; r.vials = n; r.ashes = n; }
  if (targetTier === "greater")  { r.greater_necro = n*20; r.lesser_necro = n*40; r.weak_necro = n*80; r.vials = n; r.ashes = n; }
  if (targetTier === "powerful") { r.powerful_necro = n*20; r.greater_necro = n*40; r.lesser_necro = n*80; r.weak_necro = n*160; r.vials = n; r.ashes = n; }
  return r;
}

// PRIFF districts (rotate hourly)
const PRIFF_DISTRICTS = [
  { name: "Cadarn", icon: "🏹", skill: "Ranged / Magic" },
  { name: "Crwys", icon: "🌿", skill: "Farming / Woodcutting" },
  { name: "Hefin", icon: "⚖️", skill: "Agility / Prayer" },
  { name: "Iorwerth", icon: "⚔️", skill: "Slayer / Combat" },
  { name: "Ithell", icon: "🏗️", skill: "Construction / Crafting" },
  { name: "Meilyr", icon: "🧪", skill: "Herblore / Dungeoneering" },
  { name: "Trahaearn", icon: "⛏️", skill: "Mining / Smithing" },
  { name: "Amlodd", icon: "✨", skill: "Divination / Summoning" },
];

const WIKI_LINKS = [
  { icon: "💀", label: "Necromancy Guide", url: "https://runescape.wiki/w/Necromancy" },
  { icon: "⚔️", label: "Group Ironman", url: "https://runescape.wiki/w/Group_Ironman" },
  { icon: "🩸", label: "Wilderness Flash Events", url: "https://runescape.wiki/w/Wilderness_Flash_Events" },
  { icon: "🌆", label: "Prifddinas", url: "https://runescape.wiki/w/Prifddinas" },
  { icon: "🏆", label: "Boss Strategies", url: "https://runescape.wiki/w/Boss" },
  { icon: "📦", label: "Drop Tables", url: "https://runescape.wiki/w/Category:Monsters" },
  { icon: "🎯", label: "Slayer Tasks", url: "https://runescape.wiki/w/Slayer" },
  { icon: "🌐", label: "RS3 Hiscores", url: "https://secure.runescape.com/m=hiscore/ranking" },
  { icon: "🧪", label: "Herblore Calc", url: "https://runescape.wiki/w/Calculator:Herblore" },
  { icon: "⚗️", label: "Rituals", url: "https://runescape.wiki/w/Ritual_(Necromancy)" },
  { icon: "🏛️", label: "City of Um", url: "https://runescape.wiki/w/City_of_Um" },
  { icon: "💎", label: "GE Prices", url: "https://runescape.wiki/w/Grand_Exchange" },
];

// 14 events in fixed hourly sequence per RS wiki
const WILDFLASH_EVENTS = [
  { name: "Spider Swarm",           type: "combat",  icon: "🕷️" },
  { name: "Unnatural Outcrop",      type: "skilling",icon: "⛏️" },
  { name: "Stryke the Wyrm",        type: "combat",  icon: "🐍" },
  { name: "Demon Stragglers",       type: "combat",  icon: "👹" },
  { name: "Butterfly Swarm",        type: "skilling",icon: "🦋" },
  { name: "King Black Dragon Rampage", type: "combat", icon: "🐉" },
  { name: "Forgotten Soldiers",     type: "combat",  icon: "💀" },
  { name: "Surprising Seedlings",   type: "skilling",icon: "🌱" },
  { name: "Hellhound Pack",         type: "combat",  icon: "🐺" },
  { name: "Infernal Star",          type: "both",    icon: "⭐" },
  { name: "Lost Souls",             type: "combat",  icon: "👻" },
  { name: "Ramokee Incursion",      type: "combat",  icon: "🗡️" },
  { name: "Displaced Energy",       type: "skilling",icon: "✨" },
  { name: "Evil Bloodwood Tree",    type: "skilling",icon: "🌳" },
];

const LOG_DATA = {
  "Necromancy Uniques": [
    "First Necromancer's Hood", "First Necromancer's Robe Top", "First Necromancer's Robe Bottom",
    "First Necromancer's Gloves", "First Necromancer's Boots", "Soulbound Lantern",
    "Spectral Scythe", "Spectral Scythe 2", "Spectral Scythe 3",
    "Omni Guard", "Soul Accumulator",
  ],
  "GWD2 Drops": [
    "Malevolent Kiteshield", "Anima Core of Zaros", "Anima Core of Sliske",
    "Anima Core of Zamorak", "Anima Core of Seren", "Refined Anima Core of Zaros",
    "Nex: Angel of Death Pet",
  ],
  "Raid Drops": [
    "Essence of Finality Amulet", "Masterwork Spear of Annihilation",
    "Leng Artefacts", "Scripture of Ful", "Scripture of Jas",
    "Animate Dead Codex", "Greater Chain Codex",
  ],
};

// ============================================================
// CLUE SCROLL DATA
// ============================================================
const CLUE_TIERS = [
  { id: "easy",   label: "Easy",   icon: "📜", color: "#7ecba1", rewards: [
    "Ham Joint","Imp Champion Scroll","Highwayman Mask","Steel Full Helm (t)","Steel Platebody (t)","Steel Platelegs (t)","Steel Plateskirt (t)","Steel Kiteshield (t)","Black Full Helm (t)","Black Platebody (t)","Black Platelegs (t)","Black Plateskirt (t)","Black Kiteshield (t)","Studded Body (t)","Studded Chaps (t)","Studded Body (g)","Studded Chaps (g)","Black Full Helm (g)","Black Platebody (g)","Black Platelegs (g)","Black Plateskirt (g)","Black Kiteshield (g)","Blue Wizard Hat (t)","Blue Wizard Robe (t)","Blue Skirt (t)","Blue Wizard Hat (g)","Blue Wizard Robe (g)","Blue Skirt (g)","Staff of Bob the Cat","Cape of Skulls","Monk Robe (g) Top","Monk Robe (g) Bottom","Saradomin Crozier","Guthix Crozier","Zamorak Crozier","Saradomin Cloak","Guthix Cloak","Zamorak Cloak","Saradomin Stole","Guthix Stole","Zamorak Stole",
  ]},
  { id: "medium", label: "Medium", icon: "📋", color: "#5b8edb", rewards: [
    "Wizard Robe (g)","Wizard Hat (g)","Chainbody (g) (various)","Plate Armour (t/g) (various)","Elegant Clothing (male/female)","Briefcase","Sleeping Cap","Flared Trousers","Pantaloons","Tri-jester Hat","Tri-jester Top","Tri-jester Tights","Tri-jester Shoes","Harlequin Crest","Harlequin Top","Harlequin Tights","Harlequin Shoes","Foppish Shirt","Musketeer Hat","Musketeer Jacket","Musketeer Pants","Gnome Robe","Gnome Robe Top","Gnomish Firelighter","Mime Mask","Mime Top","Mime Legs","Mime Gloves","Mime Boots","Uri's Hat",
  ]},
  { id: "hard",   label: "Hard",   icon: "📿", color: "#c8a951", rewards: [
    "3rd Age Full Helmet","3rd Age Platebody","3rd Age Platelegs","3rd Age Kiteshield","3rd Age Vambraces","3rd Age Range Top","3rd Age Range Legs","3rd Age Coif","3rd Age Mage Hat","3rd Age Robe Top","3rd Age Robe","3rd Age Amulet","3rd Age Wand","3rd Age Longsword","Gilded Full Helm","Gilded Platebody","Gilded Platelegs","Gilded Plateskirt","Gilded Kiteshield","Gilded 2h Sword","Gilded Scimitar","Gilded Spear","Gilded Med Helm","Gilded Chainbody","Gilded Sq Shield","Robin Hood Hat","Pith Helmet","Gilded Pickaxe","Gilded Axe","Gilded Spade","Rune Full Helm (t)","Rune Platebody (t)","Rune Platelegs (t)","Rune Plateskirt (t)","Rune Kiteshield (t)","Rune Full Helm (g)","Rune Platebody (g)","Rune Platelegs (g)","Rune Plateskirt (g)","Rune Kiteshield (g)",
  ]},
  { id: "elite",  label: "Elite",  icon: "💎", color: "#c47de8", rewards: [
    "3rd Age Full Helmet","3rd Age Platebody","3rd Age Platelegs","3rd Age Kiteshield","3rd Age Vambraces","3rd Age Range Top","3rd Age Range Legs","3rd Age Coif","3rd Age Mage Hat","3rd Age Robe Top","3rd Age Robe","3rd Age Amulet","3rd Age Wand","Gilded Full Helm","Gilded Platebody","Gilded Platelegs","Gilded Boots","Gilded Plateskirt","Gilded Kiteshield","Imbued Saradomin Cape","Imbued Guthix Cape","Imbued Zamorak Cape","Saradomin Dhide Body","Guthix Dhide Body","Zamorak Dhide Body","Saradomin Dhide Chaps","Guthix Dhide Chaps","Zamorak Dhide Chaps","Saradomin Dhide Coif","Guthix Dhide Coif","Zamorak Dhide Coif","Saradomin Dhide Boots","Guthix Dhide Boots","Zamorak Dhide Boots","Fury Ornament Kit","Dragon Chainbody Ornament Kit","Dragon Legs/Skirt Ornament Kit","Dragon Square Shield Ornament Kit","Amulet of Torture Ornament Kit","Tormented Bracelet Ornament Kit","Necklace of Anguish Ornament Kit",
  ]},
  { id: "master", label: "Master", icon: "👑", color: "#e74c3c", rewards: [
    "3rd Age Pickaxe","3rd Age Axe","3rd Age Bow","3rd Age Druidic Robe Top","3rd Age Druidic Robe Bottoms","3rd Age Druidic Cloak","3rd Age Druidic Staff","Bloodhound (Pet)","Fancy Boots","Fighting Boots","Gilded Scythe","Master Clue Scroll Set","Dragon Pickaxe Ornament Kit","Dragon Axe Ornament Kit","Dragon Hatchet Ornament Kit","Infernal Cape Ornament Kit","Fire Cape Ornament Kit","Wizard Boots (g)","Ranger Gloves","Heavy Frame","Bulwark Horn","Scroll of Imbuing","Scroll of Redirection","Tattered Moon Page","Tattered Temple Page","Tattered Eye Page","Tattered Wings Page",
  ]},
];

// ============================================================
// REAPER TASK DATA
// ============================================================
const REAPER_BOSSES = [
  {
    name: "Vindicta & Gorvek",
    drops: ["Dragon Rider Lance", "Anima Core Helm of Zaros", "Anima Core Body of Zaros", "Anima Core Legs of Zaros", "Dormant Anima Core", "Crest of Zaros", "Scripture of Ful", "Zaros Godsword (Dormant)"],
  },
  {
    name: "Nex",
    drops: ["Torva Full Helm", "Torva Platebody", "Torva Platelegs", "Zaryte Crossbow", "Ancient Hilt", "Nihil Horn", "Ancient Ceremonial Robes"],
  },
  {
    name: "Nex: Angel of Death",
    drops: ["Plague Doctor's Mask", "Wand of the Praesul", "Imperium Core", "Essence of Finality Amulet (uncharged)", "Tectonic Mask", "Tectonic Robe Top", "Tectonic Robe Bottom"],
  },
  {
    name: "Solak",
    drops: ["Blightbound Crossbow", "Essence of Finality Amulet (uncharged)", "Limitless Sigil", "Scripture of Wen"],
  },
  {
    name: "Telos",
    drops: ["Zaros Godsword (Dormant)", "Seren Godbow (Dormant)", "Staff of Sliske (Dormant)", "Warden's Tower Sigil"],
  },
  {
    name: "Vorago",
    drops: ["Seismic Wand", "Seismic Singularity", "Tectonic Mask", "Tectonic Robe Top", "Tectonic Robe Bottom", "Achto Primeval Mask", "Achto Primeval Top", "Achto Primeval Robe"],
  },
  {
    name: "Araxxor & Araxxi",
    drops: ["Off-hand Ascension Crossbow", "Noxious Scythe", "Noxious Staff", "Noxious Longbow", "Spider Leg (top)", "Spider Leg (middle)", "Spider Leg (bottom)", "Araxyte Head"],
  },
  {
    name: "Kalphite King",
    drops: ["Drygore Mace", "Drygore Rapier", "Drygore Longsword", "Off-hand Drygore Mace", "Off-hand Drygore Rapier", "Off-hand Drygore Longsword"],
  },
  {
    name: "Corporeal Beast",
    drops: ["Holy Elixir", "Spirit Shield", "Arcane Spirit Shield", "Elysian Spirit Shield", "Divine Spirit Shield", "Spectral Spirit Shield"],
  },
  {
    name: "General Graardor",
    drops: ["Bandos Chestplate", "Bandos Tassets", "Bandos Boots", "Bandos Hilt", "Bandos Warshield", "Pet: Graardor"],
  },
  {
    name: "K'ril Tsutsaroth",
    drops: ["Steam Battlestaff", "Zamorak Spear", "Zamorak Hilt", "Zamorakian Spear", "Pet: K'ril"],
  },
  {
    name: "Commander Zilyana",
    drops: ["Saradomin Sword", "Armadyl Crossbow", "Saradomin Hilt", "Pet: Zilyana"],
  },
  {
    name: "Kree'arra",
    drops: ["Armadyl Helmet", "Armadyl Chestplate", "Armadyl Chainskirt", "Armadyl Hilt", "Pet: Kree'arra"],
  },
  {
    name: "Dagannoth Kings",
    drops: ["Berserker Ring", "Archer Ring", "Seer's Ring", "Warrior Ring", "Berserker Necklace", "Dagannoth Supreme Pet", "Dagannoth Rex Pet", "Dagannoth Prime Pet"],
  },
  {
    name: "Barrows",
    drops: ["Ahrim's Hood", "Ahrim's Robe Top", "Ahrim's Robe Skirt", "Ahrim's Staff", "Dharok's Helm", "Dharok's Platebody", "Dharok's Platelegs", "Dharok's Greataxe", "Guthan's Helm", "Guthan's Platebody", "Guthan's Chainskirt", "Guthan's Warspear", "Karil's Coif", "Karil's Leather Top", "Karil's Leather Skirt", "Karil's Crossbow", "Torag's Helm", "Torag's Platebody", "Torag's Platelegs", "Torag's Hammers", "Verac's Helm", "Verac's Brassard", "Verac's Plateskirt", "Verac's Flail"],
  },
  {
    name: "Chaos Elemental",
    drops: ["Dragon 2h Sword", "Dragon Pickaxe", "Pet: Chaos Elemental"],
  },
  {
    name: "King Black Dragon",
    drops: ["Draconic Visage", "Pet: Baby Black Dragon"],
  },
  {
    name: "Queen Black Dragon",
    drops: ["Royal Crossbow", "Dragonbone Upgrade Kit", "Pet: Baby Queen Black Dragon"],
  },
  {
    name: "Har-Aken",
    drops: ["Seasinger's Hood", "Seasinger's Robe Top", "Seasinger's Robe Bottom", "Tetsu Helm", "Tetsu Body", "Tetsu Legs"],
  },
  {
    name: "Legiones",
    drops: ["Ascension Crossbow", "Off-hand Ascension Crossbow", "Ascension Keystone (all types)"],
  },
  {
    name: "Rots (Rise of the Six)",
    drops: ["Malevolent Helm", "Malevolent Cuirass", "Malevolent Greaves", "Achto Malevolent Helm", "Achto Malevolent Cuirass", "Achto Malevolent Greaves", "Barrows Dye"],
  },
  {
    name: "Tztok-Jad",
    drops: ["TzRek-Jad (Pet)", "Fire Cape"],
  },
  {
    name: "TzKal-Zuk",
    drops: ["Igneous Kal-Ket", "Igneous Kal-Mej", "Igneous Kal-Xil", "Igneous Kal-Zuk", "TzKal-Zuk (Pet)"],
  },
  {
    name: "Raksha",
    drops: ["Divik Claw", "Dagon'hai Hat", "Dagon'hai Robe Top", "Dagon'hai Robe Bottom", "Scripture of Ful", "Shadow Spike"],
  },
  {
    name: "Croesus",
    drops: ["Pontifex Shadow Ring", "Scripture of Jas", "Scripture of Ful", "Scripture of Wen", "Scripture of Bik"],
  },
  {
    name: "Kerapac",
    drops: ["Fractured Staff of Armadyl", "Ful Book", "Jas Book", "Wen Book"],
  },
  {
    name: "Arch-Glacor",
    drops: ["Frozen Core of Leng", "Ice Quartz", "Scripture of Wen", "Glacyte Boots", "Crest of Wen", "Enchanted Bolts (various)"],
  },
  {
    name: "Zamorak, Lord of Chaos",
    drops: ["Shard of Zamorak", "Fractured Staff of Armadyl", "Staff of Sliske", "Virtus Mask", "Virtus Robe Top", "Virtus Robe Legs"],
  },
  {
    name: "Zuk (Dragonkin Laboratory)",
    drops: ["Leng Artefact", "Greater Chain Ability Codex", "Greater Ricochet Ability Codex"],
  },
];

// ============================================================
// NECROMANCY CALC
// ============================================================

function NecromancyCalc({ nested }) {
  const [tier, setTier] = useState("powerful");
  const [amount, setAmount] = useState(500);
  const n = Number(amount) || 0;
  const r = calcInks(tier, n);

  const tiers = [
    { id: "regular",  label: "Regular",  color: "var(--ink-lesser)",   emoji: "🟢" },
    { id: "greater",  label: "Greater",  color: "var(--ink-greater)",  emoji: "🔵" },
    { id: "powerful", label: "Powerful", color: "var(--ink-powerful)", emoji: "🟣" },
  ];
  const active = tiers.find(t => t.id === tier) || tiers[2];

  const NecroRow = ({ icon, label, amount: amt, sub }) => amt > 0 ? (
    <div className="ink-necroplasm">
      <div className="ink-necroplasm-icon">{icon}</div>
      <div style={{ flex: 1 }}>
        <div className="ink-necroplasm-label">{label}</div>
        <div className="ink-necroplasm-val">{amt.toLocaleString()}</div>
        {sub && <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  ) : null;

  return (
    <div className="fade-in">
      {!nested && (
        <>
          <div className="section-title">Necromancy Ritual Ink Calculator</div>
          <div className="section-desc">Calculate exactly how much necroplasm you need to craft your target ghostly ink.</div>
        </>
      )}
      <div className="card" style={{ maxWidth: nested ? "100%" : 760 }}>
        <div className="card-title">⚗️ Target Ink</div>
        <div style={{ background: "var(--bg4)", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 14px", marginBottom: "1rem", fontSize: "0.82rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--gold)" }}>Basic ink</strong> — buy from Soul Supplies (3 coins each)<br/>
          <strong style={{ color: "var(--ink-lesser)" }}>Regular ink</strong> — 20× lesser necroplasm + 1 vial + 1 ashes · Lv 20<br/>
          <strong style={{ color: "var(--ink-greater)" }}>Greater ink</strong> — 20× greater necroplasm + 1 vial + 1 ashes · Lv 60<br/>
          <strong style={{ color: "var(--ink-powerful)" }}>Powerful ink</strong> — 20× powerful necroplasm + 1 vial + 1 ashes · Lv 90
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
          {tiers.map(t => (
            <button key={t.id} onClick={() => setTier(t.id)} style={{
              background: tier === t.id ? t.color + "22" : "var(--bg4)",
              border: "1px solid " + (tier === t.id ? t.color : "var(--border)"),
              color: tier === t.id ? t.color : "var(--text-dim)",
              padding: "8px 18px", borderRadius: 4, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "0.75rem",
              textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.2s",
            }}>
              {t.emoji} {t.label} Ink
            </button>
          ))}
        </div>
        <div className="input-group" style={{ maxWidth: 280 }}>
          <label>How many {tier} inks do you want?</label>
          <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        {n > 0 && (
          <>
            <div style={{ margin: "0.5rem 0 1rem", fontSize: "0.88rem", color: "var(--text-dim)" }}>
              To craft <strong style={{ color: active.color }}>{n.toLocaleString()} {tier} ghostly ink{n !== 1 ? "s" : ""}</strong> you will need:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {tier === "regular" && <>
                <NecroRow icon="🟢" label="Lesser Necroplasm" amount={r.lesser_necro} sub="Needed to craft the ink directly" />
                <NecroRow icon="⚪" label="Weak Necroplasm (if making lesser via ritual)" amount={r.weak_necro} sub="200 weak → 100 lesser necroplasm" />
              </>}
              {tier === "greater" && <>
                <NecroRow icon="🔵" label="Greater Necroplasm" amount={r.greater_necro} sub="Needed to craft the ink" />
                <NecroRow icon="🟢" label="Lesser Necroplasm (ritual → greater)" amount={r.lesser_necro} sub="200 lesser → 100 greater necroplasm" />
                <NecroRow icon="⚪" label="Weak Necroplasm (ritual → lesser)" amount={r.weak_necro} sub="200 weak → 100 lesser necroplasm" />
              </>}
              {tier === "powerful" && <>
                <NecroRow icon="🟣" label="Powerful Necroplasm" amount={r.powerful_necro} sub="Needed to craft the ink" />
                <NecroRow icon="🔵" label="Greater Necroplasm (ritual → powerful)" amount={r.greater_necro} sub="200 greater → 100 powerful necroplasm" />
                <NecroRow icon="🟢" label="Lesser Necroplasm (ritual → greater)" amount={r.lesser_necro} sub="200 lesser → 100 greater necroplasm" />
                <NecroRow icon="⚪" label="Weak Necroplasm (ritual → lesser)" amount={r.weak_necro} sub="200 weak → 100 lesser necroplasm" />
              </>}
            </div>
            <div style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
              <div style={{ background: "var(--bg4)", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 14px", flex: 1 }}>
                <div className="ink-necroplasm-label">🧪 Vials of Water</div>
                <div className="ink-necroplasm-val">{r.vials.toLocaleString()}</div>
              </div>
              <div style={{ background: "var(--bg4)", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 14px", flex: 1 }}>
                <div className="ink-necroplasm-label">🪦 Ashes</div>
                <div className="ink-necroplasm-val">{r.ashes.toLocaleString()}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// HISCORES
// ============================================================

function Hiscores() {
  const [members, setMembers] = useState([
    { name: "TulakIron" },
    { name: "Nyakatra" },
    { name: "Rawrsial" },
    { name: "GIMAn0nym0us" },
  ]);
  const [newName, setNewName] = useState("");

  const addMember = () => {
    if (!newName.trim()) return;
    setMembers(prev => [...prev, { name: newName.trim() }]);
    setNewName("");
  };
  const removeMember = (name) => setMembers(prev => prev.filter(m => m.name !== name));
  const medals = ["👑", "🥈", "🥉", "⚔️"];

  return (
    <div className="fade-in">
      <div className="section-title">Team Hiscores</div>
      <div className="section-desc">Your Group Ironman crew. Click any link to view their stats.</div>
      <div className="hiscore-input-row">
        <input placeholder="Add teammate RSN..." value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addMember()} />
        <button className="btn" onClick={addMember}>+ Add</button>
      </div>
      <div className="grid-3">
        {members.map((m, i) => (
          <div className="hiscore-member fade-in" key={m.name}>
            <div className="member-name">
              <span style={{ fontSize: "1.1rem" }}>{medals[i] || "⚔️"}</span>
              <span style={{ flex: 1 }}>{m.name}</span>
              <span className="tag tag-ironman">GIM</span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
              <a href={`https://secure.runescape.com/m=hiscore/compare?user1=${encodeURIComponent(m.name)}`}
                target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ textDecoration: "none" }}>
                🏆 Hiscores
              </a>
              <a href={`https://runescape.wiki/w/Special:Search?search=${encodeURIComponent(m.name)}`}
                target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ textDecoration: "none" }}>
                📖 Wiki
              </a>
              <button className="btn btn-sm" onClick={() => removeMember(m.name)}
                style={{ background: "rgba(192,57,43,0.2)", borderColor: "var(--red)", color: "#e74c3c", marginLeft: "auto" }}>✕</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <div className="card-title">🔗 Quick Links</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a href="https://secure.runescape.com/m=hiscore/ranking" target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ textDecoration: "none" }}>RS3 Hiscores</a>
          <a href="https://wiseoldman.net" target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ textDecoration: "none" }}>Wise Old Man</a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EVENT TRACKER
// ============================================================



function EventTracker() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const utcS = now.getUTCSeconds();
  const pad = n => String(n).padStart(2, "0");

  const activePriff = PRIFF_DISTRICTS[utcH % 8];
  const minsUntilPriff = 60 - utcM;

  const activeEventIdx = (utcH + 8) % WILDFLASH_EVENTS.length;
  const activeWildy = WILDFLASH_EVENTS[activeEventIdx];
  const minsUntilWildyEnd = 60 - utcM;
  const nextEventIdx = (activeEventIdx + 1) % WILDFLASH_EVENTS.length;
  const nextWildy = WILDFLASH_EVENTS[nextEventIdx];

  // Next 8 priff rotations
  const upcomingPriff = Array.from({ length: 8 }, (_, i) => {
    const h = (utcH + i + 1) % 24;
    return { name: PRIFF_DISTRICTS[h % 8].name, icon: PRIFF_DISTRICTS[h % 8].icon, at: `${pad(h)}:00 UTC` };
  });

  return (
    <div className="fade-in">
      <div className="section-title">Event Tracker</div>
      <div className="section-desc">Live RS3 game events based on UTC time.</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Priff */}
        <div className="card">
          <div className="card-title">🌆 Active Priff District</div>
          <div style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>{activePriff.icon}</div>
          <div style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "1.2rem", marginBottom: "4px" }}>{activePriff.name}</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "8px" }}>{activePriff.skill}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Switches in <strong style={{ color: "var(--gold)" }}>{minsUntilPriff}m {60 - utcS}s</strong></div>
          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Upcoming</div>
            {upcomingPriff.slice(0, 5).map(p => (
              <div key={p.at} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "3px 0", fontSize: "0.82rem", borderBottom: "1px solid var(--border)" }}>
                <span>{p.icon}</span>
                <span style={{ flex: 1 }}>{p.name}</span>
                <span style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>{p.at}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wildy */}
        <div className="card">
          <div className="card-title">🩸 Wilderness Flash Events</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: "1.8rem" }}>{activeWildy.icon}</span>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: "#e74c3c" }}>{activeWildy.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: 2 }}>
                {activeWildy.type === "combat" ? "⚔️ Combat" : activeWildy.type === "skilling" ? "⛏️ Skilling" : "⚔️⛏️ Combat + Skilling"} · Ends in {minsUntilWildyEnd}m
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "1rem" }}>
            Next: {nextWildy.icon} <span style={{ color: "var(--text)" }}>{nextWildy.name}</span> at {pad((utcH + 1) % 24)}:00 UTC
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Full Rotation (14 events)</div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {WILDFLASH_EVENTS.map((ev, i) => (
              <div key={ev.name} style={{
                display: "flex", gap: "8px", alignItems: "center", padding: "4px 6px",
                borderRadius: 4, marginBottom: 2,
                background: i === activeEventIdx ? "rgba(231,76,60,0.12)" : "transparent",
                border: i === activeEventIdx ? "1px solid rgba(231,76,60,0.3)" : "1px solid transparent",
              }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{ev.icon}</span>
                <span style={{ flex: 1, fontSize: "0.8rem", color: i === activeEventIdx ? "#e74c3c" : "var(--text)" }}>{ev.name}</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", flexShrink: 0 }}>{pad((utcH - activeEventIdx + i + 24) % 24)}:00</span>
                {i === activeEventIdx && <span style={{ fontSize: "0.6rem", color: "#e74c3c", fontFamily: "'Cinzel', serif", flexShrink: 0 }}>NOW</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UTC Clock */}
      <div className="card" style={{ textAlign: "center" }}>
        <div className="card-title">🕐 Current UTC Time</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2.5rem", color: "var(--gold)", letterSpacing: "0.1em" }}>
          {pad(utcH)}:{pad(utcM)}:{pad(utcS)}
        </div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "4px" }}>
          {now.toUTCString().replace(" GMT", " UTC")}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WIKI LINKS
// ============================================================


function WikiLinks() {
  const [search, setSearch] = useState("");
  return (
    <div className="fade-in">
      <div className="section-title">Wiki Quick Links</div>
      <div className="section-desc">Fast access to the most useful RuneScape wiki pages.</div>

      <div className="hiscore-input-row" style={{ maxWidth: 500 }}>
        <input
          placeholder="Search the RS Wiki..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && search.trim()) {
              window.open(`https://runescape.wiki/w/Special:Search?search=${encodeURIComponent(search.trim())}`, "_blank");
            }
          }}
        />
        <button className="btn" onClick={() => {
          if (search.trim()) window.open(`https://runescape.wiki/w/Special:Search?search=${encodeURIComponent(search.trim())}`, "_blank");
        }}>Search →</button>
      </div>

      <div className="grid-3" style={{ marginTop: "1rem" }}>
        {WIKI_LINKS.map(l => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
            className="card" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = "var(--gold-dim)"}
            onMouseOut={e => e.currentTarget.style.borderColor = ""}>
            <span style={{ fontSize: "1.5rem" }}>{l.icon}</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", color: "var(--text)" }}>{l.label}</span>
            <span style={{ marginLeft: "auto", color: "var(--text-dim)", fontSize: "0.75rem" }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── moved outside LogTracker so React doesn't recreate them on every render ──
const GIM_MEMBERS = ["TulakIron", "Nyakatra", "Rawrsial", "GIMAn0nym0us"];
const MEMBER_COLORS = {
  TulakIron:    { color: "#c8a951", bg: "rgba(200,169,81,0.08)",  border: "rgba(200,169,81,0.3)"  },
  Nyakatra:     { color: "#5b8edb", bg: "rgba(91,142,219,0.08)",  border: "rgba(91,142,219,0.3)"  },
  Rawrsial:     { color: "#7ecba1", bg: "rgba(126,203,161,0.08)", border: "rgba(126,203,161,0.3)" },
  GIMAn0nym0us: { color: "#c47de8", bg: "rgba(196,125,232,0.08)", border: "rgba(196,125,232,0.3)" },
};

function MemberHistory({ member, history, viewFilter, setViewFilter, viewTypeFilter, setViewTypeFilter, deleteEntry }) {
  const mc = MEMBER_COLORS[member];
  const bossFilter = viewFilter[member];
  const typeFilter = viewTypeFilter[member];

  const filtered = history
    .filter(e => bossFilter === "all" || e.boss === bossFilter)
    .filter(e => typeFilter === "all" || e.type === typeFilter);

  const bossesSeen = [...new Set(history.map(e => e.boss))];
  const totalDrops = history.reduce((acc, e) => acc + e.drops.length, 0);
  const totalKC = history.reduce((acc, e) => acc + (e.kc || 0), 0);
  const reaperCount = history.filter(e => e.type === "reaper").length;
  const normalCount = history.filter(e => e.type === "normal").length;

  return (
    <div style={{ border: `1px solid ${mc.border}`, borderRadius: 8, overflow: "hidden", background: mc.bg, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "0.75rem 1rem", borderBottom: `1px solid ${mc.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: mc.color, boxShadow: `0 0 6px ${mc.color}`, flexShrink: 0 }}></div>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", fontWeight: 700, color: mc.color, flex: 1 }}>{member}</span>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: `1px solid ${mc.border}` }}>
        {[
          { label: "Total KC", val: totalKC > 0 ? totalKC.toLocaleString() : "—" },
          { label: "Sessions", val: history.length },
          { label: "Drops", val: totalDrops },
        ].map((s, idx) => (
          <div key={s.label} style={{ padding: "0.5rem", textAlign: "center", borderRight: idx < 2 ? `1px solid ${mc.border}` : "none" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: mc.color, fontWeight: 700 }}>{s.val}</div>
            <div style={{ fontSize: "0.6rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ padding: "0.5rem 0.75rem", borderBottom: `1px solid ${mc.border}`, display: "flex", gap: 6 }}>
        <select
          value={bossFilter}
          onChange={e => setViewFilter(prev => ({ ...prev, [member]: e.target.value }))}
          style={{ flex: 1, fontSize: "0.75rem", padding: "4px 6px" }}
        >
          <option value="all">All bosses</option>
          {bossesSeen.map(b => <option key={b} value={b}>{b} ({history.filter(e => e.boss === b).length})</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={e => setViewTypeFilter(prev => ({ ...prev, [member]: e.target.value }))}
          style={{ width: 96, fontSize: "0.75rem", padding: "4px 6px" }}
        >
          <option value="all">All types</option>
          <option value="reaper">☠ Reaper ({reaperCount})</option>
          <option value="normal">⚔ Normal ({normalCount})</option>
        </select>
      </div>

      {/* Entries */}
      <div style={{ overflowY: "auto", maxHeight: 340, flex: 1 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.78rem" }}>
            {history.length === 0 ? "No sessions logged yet" : "Nothing matches filters"}
          </div>
        ) : (
          filtered.map(entry => (
            <div key={entry.id}
              style={{ padding: "0.65rem 0.9rem", borderBottom: `1px solid rgba(255,255,255,0.04)`, transition: "background 0.1s" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", color: mc.color }}>{entry.boss}</span>
                    <span style={{
                      fontSize: "0.6rem", fontFamily: "'Cinzel', serif",
                      padding: "1px 6px", borderRadius: 3,
                      background: entry.type === "reaper" ? "rgba(192,57,43,0.2)" : "rgba(41,128,185,0.2)",
                      border: `1px solid ${entry.type === "reaper" ? "rgba(192,57,43,0.5)" : "rgba(41,128,185,0.5)"}`,
                      color: entry.type === "reaper" ? "#e74c3c" : "#3498db",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {entry.type === "reaper" ? "☠ Reaper" : "⚔ Normal"}
                    </span>
                    {entry.kc && (
                      <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{entry.kc.toLocaleString()} KC</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", marginTop: 2 }}>{entry.date} · {entry.time}</div>
                </div>
                <button onClick={() => deleteEntry(member, entry.id)}
                  style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "0.75rem", padding: "2px 4px", lineHeight: 1, flexShrink: 0 }}
                >✕</button>
              </div>
              {entry.drops.length === 0 ? (
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic" }}>No notable drops</div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {entry.drops.map(d => (
                    <span key={d.item} style={{
                      background: `${mc.color}18`, border: `1px solid ${mc.color}55`,
                      borderRadius: 3, padding: "1px 7px",
                      fontSize: "0.7rem", color: mc.color, fontFamily: "'Cinzel', serif",
                    }}>
                      {d.qty > 1 ? `${d.qty}× ` : ""}{d.item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function LogTracker() {
  const [reaperHistory, setReaperHistory] = useState(() =>
    Object.fromEntries(GIM_MEMBERS.map(m => [m, []]))
  );
  const [collectionLog, setCollectionLog] = useState(() => {
    const saved = {};
    Object.entries(LOG_DATA).forEach(([cat, items]) => {
      saved[cat] = {};
      items.forEach(i => saved[cat][i] = false);
    });
    return saved;
  });
  const [dbReady, setDbReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // "saving" | "saved" | "error"

  // ── Load all data on mount ──
  useEffect(() => {
    async function load() {
      try {
        const sb = supabase();
        // Load boss sessions
        const { data: sessions, error: se } = await sb
          .from("gim_sessions")
          .select("*")
          .order("created_at", { ascending: false });
        if (!se && sessions) {
          const byMember = Object.fromEntries(GIM_MEMBERS.map(m => [m, []]));
          sessions.forEach(row => {
            if (byMember[row.member]) {
              byMember[row.member].push({
                id: row.id,
                boss: row.boss,
                type: row.type,
                kc: row.kc,
                drops: row.drops || [],
                date: row.date,
                time: row.time,
              });
            }
          });
          setReaperHistory(byMember);
        }
        // Load collection log
        const { data: col } = await sb
          .from("gim_collection")
          .select("data")
          .eq("id", 1)
          .single();
        if (col?.data) setCollectionLog(col.data);
      } catch (e) {
        console.error("Supabase load error:", e);
      }
      setDbReady(true);
    }
    load();
  }, []);

  const [viewFilter, setViewFilter] = useState(() =>
    Object.fromEntries(GIM_MEMBERS.map(m => [m, "all"]))
  );
  const [viewTypeFilter, setViewTypeFilter] = useState(() =>
    Object.fromEntries(GIM_MEMBERS.map(m => [m, "all"]))
  );
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBoss, setSelectedBoss] = useState("");
  const [dropInputs, setDropInputs] = useState({});
  const [killCount, setKillCount] = useState("");
  const [sessionType, setSessionType] = useState("reaper");
  const [logTab, setLogTab] = useState("reaper");

  const totalItems = Object.values(LOG_DATA).flat().length;
  const obtained = Object.values(collectionLog).flatMap(cat => Object.values(cat)).filter(Boolean).length;
  const bossData = REAPER_BOSSES.find(b => b.name === selectedBoss);

  // ── Submit a new boss session ──
  const submitTask = async () => {
    if (!selectedMember || !selectedBoss) return;
    setSaveStatus("saving");
    const now = new Date();
    const drops = Object.entries(dropInputs)
      .filter(([, qty]) => Number(qty) > 0)
      .map(([item, qty]) => ({ item, qty: Number(qty) }));
    const row = {
      member: selectedMember,
      boss: selectedBoss,
      type: sessionType,
      kc: Number(killCount) || null,
      drops,
      date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    try {
      const { data, error } = await supabase().from("gim_sessions").insert([row]).select().single();
      if (error) throw error;
      const entry = { ...row, id: data.id };
      setReaperHistory(prev => ({ ...prev, [selectedMember]: [entry, ...prev[selectedMember]] }));
      setSaveStatus("saved");
    } catch (e) {
      console.error("Insert error:", e);
      setSaveStatus("error");
    }
    setDropInputs({});
    setKillCount("");
    setSelectedBoss("");
    setSelectedMember("");
    setSessionType("reaper");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  // ── Delete a session ──
  const deleteEntry = async (member, id) => {
    setReaperHistory(prev => ({ ...prev, [member]: prev[member].filter(e => e.id !== id) }));
    try {
      await supabase().from("gim_sessions").delete().eq("id", id);
    } catch (e) { console.error("Delete error:", e); }
  };

  // ── Toggle collection log item ──
  const toggle = async (cat, item) => {
    const next = {
      ...collectionLog,
      [cat]: { ...collectionLog[cat], [item]: !collectionLog[cat][item] }
    };
    setCollectionLog(next);
    try {
      await supabase().from("gim_collection").upsert({ id: 1, data: next });
    } catch (e) { console.error("Collection save error:", e); }
  };

  if (!dbReady) {
    return (
      <div className="fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12 }}>
        <div style={{ fontSize: "1.5rem" }}>⚗️</div>
        <div style={{ color: "var(--text-dim)", fontFamily: "'Cinzel', serif", fontSize: "0.9rem", letterSpacing: "0.1em" }}>Loading from database…</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-title">Drop Log</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
        <div className="section-desc" style={{ margin: 0 }}>Log boss sessions with kill count, drops, and type — synced across your team.</div>
        {saveStatus === "saving" && <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "'Cinzel', serif" }}>⏳ Saving…</span>}
        {saveStatus === "saved"  && <span style={{ fontSize: "0.78rem", color: "var(--green)",    fontFamily: "'Cinzel', serif" }}>✓ Saved</span>}
        {saveStatus === "error"  && <span style={{ fontSize: "0.78rem", color: "#e74c3c" }}>⚠ Save failed — check console</span>}
      </div>

      <div className="tab-bar">
        {[["reaper", "⚔️ Boss Sessions"], ["collection", "📋 Collection Log"]].map(([id, label]) => (
          <button key={id} className={`tab ${logTab === id ? "active" : ""}`} onClick={() => setLogTab(id)}>{label}</button>
        ))}
      </div>

      {logTab === "reaper" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card">
            <div className="card-title">⚔️ Log a Boss Session</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Member</label>
                <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)} style={{ width: "100%" }}>
                  <option value="">— Select —</option>
                  {GIM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Boss</label>
                <select value={selectedBoss} onChange={e => { setSelectedBoss(e.target.value); setDropInputs({}); }} style={{ width: "100%" }}>
                  <option value="">— Select —</option>
                  {REAPER_BOSSES.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Session Type</label>
                <select value={sessionType} onChange={e => setSessionType(e.target.value)} style={{ width: "100%" }}>
                  <option value="reaper">☠️ Reaper Task</option>
                  <option value="normal">⚔️ Normal Bossing</option>
                </select>
              </div>
            </div>
            <div className="input-group" style={{ maxWidth: 220, marginBottom: "1rem" }}>
              <label>Kill Count this session</label>
              <input type="number" min="1" placeholder="e.g. 50" value={killCount} onChange={e => setKillCount(e.target.value)} />
            </div>
            {bossData && selectedMember ? (
              <>
                <div style={{ marginBottom: "0.6rem", fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Notable drops — leave blank if none
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "6px", maxHeight: 260, overflowY: "auto", paddingRight: 4 }}>
                  {bossData.drops.map(drop => (
                    <div key={drop} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px", background: "var(--bg4)", borderRadius: 4, border: "1px solid var(--border)" }}>
                      <span style={{ flex: 1, fontSize: "0.82rem", color: "var(--text)" }}>{drop}</span>
                      <input
                        type="number" min="0" placeholder="0"
                        value={dropInputs[drop] || ""}
                        onChange={e => setDropInputs(prev => ({ ...prev, [drop]: e.target.value }))}
                        style={{ width: 52, textAlign: "center", padding: "4px 6px", fontSize: "0.85rem" }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "8px" }}>
                  <button className="btn" style={{ flex: 1 }} onClick={submitTask} disabled={saveStatus === "saving"}>
                    {saveStatus === "saving" ? "⏳ Saving…" : "✓ Submit Session"}
                  </button>
                  <button className="btn" onClick={() => { setDropInputs({}); setKillCount(""); }}
                    style={{ background: "rgba(192,57,43,0.15)", borderColor: "var(--red)", color: "#e74c3c" }}>
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding: "1.25rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.85rem", border: "1px dashed var(--border)", borderRadius: 6 }}>
                {!selectedMember ? "Select a member to get started" : "Select a boss to log drops"}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {GIM_MEMBERS.map(m => (
              <MemberHistory
                key={m}
                member={m}
                history={reaperHistory[m]}
                viewFilter={viewFilter}
                setViewFilter={setViewFilter}
                viewTypeFilter={viewTypeFilter}
                setViewTypeFilter={setViewTypeFilter}
                deleteEntry={deleteEntry}
              />
            ))}
          </div>
        </div>
      )}

      {logTab === "collection" && (
        <>
          <div className="card mb-2">
            <div className="flex items-center justify-between mb-1">
              <div className="card-title" style={{ marginBottom: 0 }}>📋 Overall Progress</div>
              <div style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "1rem" }}>{obtained}/{totalItems}</div>
            </div>
            <div className="log-progress">
              <div className="log-progress-fill" style={{ width: `${(obtained / totalItems) * 100}%` }}></div>
            </div>
            <div className="log-stats">
              <span>{Math.round((obtained / totalItems) * 100)}% complete</span>
              <span>{totalItems - obtained} remaining</span>
            </div>
          </div>
          <div className="grid-3">
            {Object.entries(LOG_DATA).map(([cat, items]) => {
              const catObtained = items.filter(i => collectionLog[cat][i]).length;
              return (
                <div className="card" key={cat}>
                  <div className="log-section-title">{cat} ({catObtained}/{items.length})</div>
                  <div className="log-progress" style={{ marginBottom: "8px" }}>
                    <div className="log-progress-fill" style={{ width: `${(catObtained / items.length) * 100}%` }}></div>
                  </div>
                  <div className="log-items">
                    {items.map(item => (
                      <div key={item} className={`log-item ${collectionLog[cat][item] ? "obtained" : ""}`}
                        onClick={() => toggle(cat, item)} style={{ cursor: "pointer" }}>
                        <span className="log-item-name">{item}</span>
                        <div className="log-check">{collectionLog[cat][item] ? "✓" : ""}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// CLUE TRACKER
// ============================================================

function ClueTracker() {
  const [activeTier, setActiveTier] = useState("easy");
  const [dbReady, setDbReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // clueHistory: { [tier]: [ { id, member, drops:[{item,qty}], date, time } ] }
  const [clueHistory, setClueHistory] = useState(() =>
    Object.fromEntries(CLUE_TIERS.map(t => [t.id, []]))
  );
  const [dropInputs, setDropInputs] = useState({});
  const [selectedMember, setSelectedMember] = useState("");
  const [viewMember, setViewMember] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const sb = supabase();
        const { data, error } = await sb
          .from("gim_clues")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) {
          const byTier = Object.fromEntries(CLUE_TIERS.map(t => [t.id, []]));
          data.forEach(row => {
            if (byTier[row.tier] !== undefined) {
              byTier[row.tier].push({ id: row.id, member: row.member, drops: row.drops || [], date: row.date, time: row.time });
            }
          });
          setClueHistory(byTier);
        }
      } catch(e) { console.error("Clue load error:", e); }
      setDbReady(true);
    }
    load();
  }, []);

  const tier = CLUE_TIERS.find(t => t.id === activeTier);

  const submitClue = async () => {
    if (!selectedMember) return;
    setSaveStatus("saving");
    const now = new Date();
    const drops = Object.entries(dropInputs)
      .filter(([, qty]) => Number(qty) > 0)
      .map(([item, qty]) => ({ item, qty: Number(qty) }));
    const row = {
      member: selectedMember,
      tier: activeTier,
      drops,
      date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    try {
      const { data, error } = await supabase().from("gim_clues").insert([row]).select().single();
      if (error) throw error;
      const entry = { ...row, id: data.id };
      setClueHistory(prev => ({ ...prev, [activeTier]: [entry, ...prev[activeTier]] }));
      setSaveStatus("saved");
    } catch(e) { console.error("Clue insert error:", e); setSaveStatus("error"); }
    setDropInputs({});
    setSelectedMember("");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const deleteClue = async (tier, id) => {
    setClueHistory(prev => ({ ...prev, [tier]: prev[tier].filter(e => e.id !== id) }));
    try { await supabase().from("gim_clues").delete().eq("id", id); } catch(e) {}
  };

  // Stats
  const totalByTier = Object.fromEntries(CLUE_TIERS.map(t => [t.id, clueHistory[t.id].length]));
  const totalAll = Object.values(totalByTier).reduce((a, b) => a + b, 0);

  const filteredHistory = clueHistory[activeTier].filter(e => viewMember === "all" || e.member === viewMember);

  if (!dbReady) {
    return (
      <div className="fade-in" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, flexDirection:"column", gap:12 }}>
        <div style={{ fontSize:"1.5rem" }}>📜</div>
        <div style={{ color:"var(--text-dim)", fontFamily:"'Cinzel', serif", fontSize:"0.9rem", letterSpacing:"0.1em" }}>Loading clue data…</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-title">Clue Scroll Tracker</div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1rem" }}>
        <div className="section-desc" style={{ margin:0 }}>Log completed clue scrolls, track drops, and see your team's progress per tier.</div>
        {saveStatus === "saving" && <span style={{ fontSize:"0.78rem", color:"var(--text-dim)", fontFamily:"'Cinzel', serif" }}>⏳ Saving…</span>}
        {saveStatus === "saved"  && <span style={{ fontSize:"0.78rem", color:"var(--green)", fontFamily:"'Cinzel', serif" }}>✓ Saved</span>}
        {saveStatus === "error"  && <span style={{ fontSize:"0.78rem", color:"#e74c3c" }}>⚠ Save failed</span>}
      </div>

      {/* Team summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:"0.75rem", marginBottom:"1.5rem" }}>
        <div className="card" style={{ textAlign:"center", gridColumn:"1" }}>
          <div style={{ fontFamily:"'Cinzel', serif", fontSize:"1.4rem", color:"var(--gold)", fontWeight:700 }}>{totalAll}</div>
          <div style={{ fontSize:"0.65rem", color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Total Clues</div>
        </div>
        {CLUE_TIERS.map(t => (
          <div key={t.id} className="card" style={{ textAlign:"center", border:`1px solid ${t.color}44`, background:`${t.color}08`, cursor:"pointer" }}
            onClick={() => setActiveTier(t.id)}>
            <div style={{ fontSize:"1.2rem" }}>{t.icon}</div>
            <div style={{ fontFamily:"'Cinzel', serif", fontSize:"1.1rem", color:t.color, fontWeight:700 }}>{totalByTier[t.id]}</div>
            <div style={{ fontSize:"0.6rem", color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tier tabs */}
      <div className="tab-bar">
        {CLUE_TIERS.map(t => (
          <button key={t.id} className={`tab ${activeTier === t.id ? "active" : ""}`}
            onClick={() => setActiveTier(t.id)}
            style={activeTier === t.id ? { borderColor: t.color, color: t.color } : {}}>
            {t.icon} {t.label} <span style={{ marginLeft:4, fontSize:"0.7em", opacity:0.7 }}>({totalByTier[t.id]})</span>
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"1.5rem", marginTop:"1rem" }}>

        {/* Log form */}
        <div className="card" style={{ border:`1px solid ${tier.color}44` }}>
          <div className="card-title" style={{ color: tier.color }}>{tier.icon} Log a {tier.label} Clue</div>
          <div className="input-group">
            <label>Who completed it?</label>
            <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)} style={{ width:"100%" }}>
              <option value="">— Select member —</option>
              {GIM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:"0.6rem", fontFamily:"'Cinzel', serif", fontSize:"0.65rem", color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
            Notable drops — leave blank if none
          </div>
          <div style={{ maxHeight:320, overflowY:"auto", display:"flex", flexDirection:"column", gap:4, paddingRight:4, marginBottom:"1rem" }}>
            {tier.rewards.map(item => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"3px 8px", background:"var(--bg4)", borderRadius:4, border:"1px solid var(--border)" }}>
                <span style={{ flex:1, fontSize:"0.8rem", color:"var(--text)" }}>{item}</span>
                <input type="number" min="0" placeholder="0"
                  value={dropInputs[item] || ""}
                  onChange={e => setDropInputs(prev => ({ ...prev, [item]: e.target.value }))}
                  style={{ width:50, textAlign:"center", padding:"3px 6px", fontSize:"0.82rem" }}
                />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn" style={{ flex:1, borderColor: tier.color, color: tier.color, background:`${tier.color}15` }}
              onClick={submitClue} disabled={!selectedMember || saveStatus === "saving"}>
              {saveStatus === "saving" ? "⏳ Saving…" : `✓ Submit ${tier.label} Clue`}
            </button>
            <button className="btn" onClick={() => setDropInputs({})}
              style={{ background:"rgba(192,57,43,0.15)", borderColor:"var(--red)", color:"#e74c3c" }}>
              Clear
            </button>
          </div>
        </div>

        {/* History panel */}
        <div className="card" style={{ border:`1px solid ${tier.color}44` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.75rem" }}>
            <div className="card-title" style={{ color: tier.color, marginBottom:0 }}>{tier.icon} {tier.label} History</div>
            <select value={viewMember} onChange={e => setViewMember(e.target.value)}
              style={{ width:140, fontSize:"0.75rem", padding:"4px 8px" }}>
              <option value="all">All members</option>
              {GIM_MEMBERS.map(m => <option key={m} value={m}>{m} ({clueHistory[activeTier].filter(e => e.member === m).length})</option>)}
            </select>
          </div>

          {/* Per-member mini stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:4, marginBottom:"0.75rem" }}>
            {GIM_MEMBERS.map(m => {
              const mc = MEMBER_COLORS[m];
              const count = clueHistory[activeTier].filter(e => e.member === m).length;
              return (
                <div key={m} style={{ padding:"6px 4px", textAlign:"center", borderRadius:4, background:`${mc.color}10`, border:`1px solid ${mc.border}` }}>
                  <div style={{ fontFamily:"'Cinzel', serif", fontSize:"1rem", color:mc.color, fontWeight:700 }}>{count}</div>
                  <div style={{ fontSize:"0.58rem", color:"var(--text-dim)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m}</div>
                </div>
              );
            })}
          </div>

          <div style={{ overflowY:"auto", maxHeight:400 }}>
            {filteredHistory.length === 0 ? (
              <div style={{ padding:"2rem", textAlign:"center", color:"var(--text-dim)", fontSize:"0.85rem" }}>
                No {tier.label.toLowerCase()} clues logged yet
              </div>
            ) : filteredHistory.map(entry => {
              const mc = MEMBER_COLORS[entry.member] || { color: "var(--gold)", border: "var(--border)" };
              return (
                <div key={entry.id} style={{ padding:"0.6rem 0.75rem", borderBottom:"1px solid rgba(255,255,255,0.04)", borderRadius:4 }}
                  onMouseOver={e => e.currentTarget.style.background="rgba(255,255,255,0.02)"}
                  onMouseOut={e => e.currentTarget.style.background="transparent"}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ width:8, height:8, borderRadius:"50%", background:mc.color, display:"inline-block", flexShrink:0 }}></span>
                      <span style={{ fontFamily:"'Cinzel', serif", fontSize:"0.78rem", color:mc.color }}>{entry.member}</span>
                      <span style={{ fontSize:"0.65rem", color:"var(--text-dim)" }}>{entry.date} · {entry.time}</span>
                    </div>
                    <button onClick={() => deleteClue(activeTier, entry.id)}
                      style={{ background:"none", border:"none", color:"var(--text-dim)", cursor:"pointer", fontSize:"0.75rem", padding:"0 4px" }}>✕</button>
                  </div>
                  {entry.drops.length === 0 ? (
                    <div style={{ fontSize:"0.72rem", color:"var(--text-dim)", fontStyle:"italic", paddingLeft:16 }}>No notable drops</div>
                  ) : (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:3, paddingLeft:16 }}>
                      {entry.drops.map(d => (
                        <span key={d.item} style={{
                          background:`${tier.color}18`, border:`1px solid ${tier.color}55`,
                          borderRadius:3, padding:"1px 7px", fontSize:"0.7rem", color:tier.color, fontFamily:"'Cinzel', serif",
                        }}>
                          {d.qty > 1 ? `${d.qty}× ` : ""}{d.item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HERB PATCH TRACKER
// ============================================================

const HERB_PATCHES = [
  // ── Allotment/Flower/Herb patches ──
  { id: "falador",      name: "Falador",          location: "South of Falador",             teleport: "Explorer's ring",                          category: "standard", icon: "🌿", note: "" },
  { id: "phasmatys",    name: "Port Phasmatys",   location: "West of Port Phasmatys",       teleport: "Ectophial",                                category: "standard", icon: "🌿", note: "" },
  { id: "catherby",     name: "Catherby",          location: "North of Catherby",            teleport: "Catherby lodestone / Camelot Teleport",    category: "standard", icon: "🌿", note: "" },
  { id: "ardougne",     name: "Ardougne",          location: "North of Ardougne",            teleport: "Ardougne lodestone / Ardougne Teleport",   category: "standard", icon: "🌿", note: "" },
  // ── Herb-only patches ──
  { id: "trollheim",    name: "Trollheim",         location: "Roof of Troll Stronghold",     teleport: "Trollheim Farm Teleport",                  category: "special",  icon: "🏔️", note: "My Arm's Big Adventure req · Never diseased" },
  { id: "wilderness",   name: "Wilderness",        location: "Wilderness (level 37)",        teleport: "Wilderness sword",                         category: "special",  icon: "☠️", note: "Bloodweed seeds only plantable here" },
  { id: "prifddinas",   name: "Prifddinas",        location: "Prifddinas (Crwys district)",  teleport: "Prifddinas lodestone",                     category: "special",  icon: "🌆", note: "Plague's End quest req" },
  { id: "alkharid",     name: "Al Kharid",         location: "Al Kharid (Emir's Arena)",     teleport: "Al Kharid lodestone",                      category: "special",  icon: "🏜️", note: "" },
];

function HerbTracker() {
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(HERB_PATCHES.map(p => [p.id, false]))
  );
  const [saving, setSaving] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase().from("gim_herb_runs").select("data").eq("id", 1).single();
        if (data?.data) setChecked(data.data);
      } catch(_) {}
    }
    load();
  }, []);

  // Save to Supabase
  const save = async (next) => {
    setSaving(true);
    try { await supabase().from("gim_herb_runs").upsert({ id: 1, data: next }); } catch(_) {}
    setSaving(false);
  };

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    save(next);
  };

  const clear = () => {
    const next = Object.fromEntries(HERB_PATCHES.map(p => [p.id, false]));
    setChecked(next);
    save(next);
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const total = HERB_PATCHES.length;
  const pct = Math.round((doneCount / total) * 100);

  const standard = HERB_PATCHES.filter(p => p.category === "standard");
  const special  = HERB_PATCHES.filter(p => p.category === "special");

  const PatchCard = ({ patch }) => {
    const done = checked[patch.id];
    return (
      <div
        onClick={() => toggle(patch.id)}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "0.75rem 1rem",
          background: done ? "rgba(39,174,96,0.08)" : "var(--bg4)",
          border: `1px solid ${done ? "rgba(39,174,96,0.35)" : "var(--border)"}`,
          borderRadius: 7,
          cursor: "pointer",
          transition: "all 0.15s",
          userSelect: "none",
          opacity: done ? 0.75 : 1,
        }}
        onMouseOver={e => { if (!done) e.currentTarget.style.borderColor = "var(--gold-dim)"; }}
        onMouseOut={e => { if (!done) e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        {/* Checkbox */}
        <div style={{
          width: 22, height: 22, borderRadius: 4, flexShrink: 0,
          border: `2px solid ${done ? "#27ae60" : "var(--border)"}`,
          background: done ? "#27ae60" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
          fontSize: "0.8rem",
        }}>
          {done && <span style={{ color: "#fff", fontWeight: 700, lineHeight: 1 }}>✓</span>}
        </div>

        {/* Icon */}
        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{patch.icon}</span>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.82rem", fontWeight: 700,
            color: done ? "#27ae60" : "var(--gold)",
            textDecoration: done ? "line-through" : "none",
            marginBottom: 1,
          }}>{patch.name}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            📍 {patch.location}
          </div>
        </div>

        {/* Teleport hint */}
        <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textAlign: "right", flexShrink: 0, maxWidth: 140, lineHeight: 1.4 }}>
          🔗 {patch.teleport}
        </div>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="section-title">🌿 Herb Run Tracker</div>

      {/* Progress bar + controls */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem", gap: 12 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Run Progress
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "1rem" }}>
              {doneCount} / {total}
            </span>
            {saving && <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>⏳</span>}
            <button
              className="btn btn-sm"
              onClick={clear}
              style={{ background: "rgba(192,57,43,0.15)", borderColor: "var(--red)", color: "#e74c3c", letterSpacing: "0.06em" }}
            >
              🗑 Clear All
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 10, background: "var(--bg4)", borderRadius: 99, overflow: "hidden", border: "1px solid var(--border)" }}>
          <div style={{
            height: "100%", borderRadius: 99,
            width: `${pct}%`,
            background: doneCount === total
              ? "linear-gradient(90deg, #27ae60, #2ecc71)"
              : "linear-gradient(90deg, #ff6a00, #c8a951)",
            transition: "width 0.3s ease",
            boxShadow: doneCount === total ? "0 0 8px rgba(46,204,113,0.5)" : "0 0 8px rgba(200,169,81,0.3)",
          }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem", fontSize: "0.7rem", color: "var(--text-dim)" }}>
          <span>{pct}% complete</span>
          {doneCount === total && <span style={{ color: "#2ecc71", fontFamily: "'Cinzel', serif" }}>✓ All patches done!</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Standard patches */}
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ height: 1, flex: 1, background: "var(--border)" }}/>
            <span>Standard Patches ({standard.filter(p => checked[p.id]).length}/{standard.length})</span>
            <span style={{ height: 1, flex: 1, background: "var(--border)" }}/>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {standard.map(p => <PatchCard key={p.id} patch={p} />)}
          </div>
        </div>

        {/* Special patches */}
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ height: 1, flex: 1, background: "var(--border)" }}/>
            <span>Special Patches ({special.filter(p => checked[p.id]).length}/{special.length})</span>
            <span style={{ height: 1, flex: 1, background: "var(--border)" }}/>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {special.map(p => <PatchCard key={p.id} patch={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// OVERLOAD CALCULATOR
// ============================================================

// Full ingredient chain for 1x Overload (4)
// Each extreme potion (3) requires 1x super potion (3) + 1x secondary herb/ingredient
// Super potions: herb (primary) + secondary → 3-dose super
// We need 3-dose extremes, so 1 super (3) each.

const OVERLOAD_CHAIN = {
  // Step 3 — Final combination
  overload: {
    label: "Overload (4)",
    herblore: 96,
    xp: 1000,
    inputs: ["ext_attack", "ext_strength", "ext_defence", "ext_magic", "ext_ranging", "ext_necromancy", "torstol"],
    icon: "🧪",
    color: "#e74c3c",
  },

  // Step 2 — Extreme potions (each needs 1x super (3) + 1x secondary)
  ext_attack: {
    label: "Extreme Attack (3)", herblore: 88, xp: 220,
    inputs: ["sup_attack"],
    secondary: { label: "Clean Avantoe", icon: "🌿", isHerb: true },
    icon: "⚔️", color: "#e67e22",
  },
  ext_strength: {
    label: "Extreme Strength (3)", herblore: 89, xp: 230,
    inputs: ["sup_strength"],
    secondary: { label: "Clean Dwarf Weed", icon: "🌿", isHerb: true },
    icon: "💪", color: "#e67e22",
  },
  ext_defence: {
    label: "Extreme Defence (3)", herblore: 90, xp: 240,
    inputs: ["sup_defence"],
    secondary: { label: "Clean Lantadyme", icon: "🌿", isHerb: true },
    icon: "🛡️", color: "#e67e22",
  },
  ext_magic: {
    label: "Extreme Magic (3)", herblore: 91, xp: 250,
    inputs: ["sup_magic"],
    secondary: { label: "Ground Mud Rune", icon: "🔮", isHerb: false },
    icon: "✨", color: "#e67e22",
  },
  ext_ranging: {
    label: "Extreme Ranging (3)", herblore: 92, xp: 260,
    inputs: ["sup_ranging"],
    secondary: { label: "Grenwall Spikes ×5", icon: "🦔", isHerb: false },
    icon: "🏹", color: "#e67e22",
  },
  ext_necromancy: {
    label: "Extreme Necromancy (3)", herblore: 93, xp: 265,
    inputs: ["sup_necromancy"],
    secondary: { label: "Ground Miasma Rune", icon: "💀", isHerb: false },
    icon: "💀", color: "#e67e22",
  },

  // Step 1 — Super potions (herb + secondary → 3-dose)
  sup_attack: {
    label: "Super Attack (3)", herblore: 45, xp: 100,
    primary: { label: "Clean Irit", icon: "🌿", isHerb: true },
    secondary: { label: "Eye of Newt", icon: "👁️", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },
  sup_strength: {
    label: "Super Strength (3)", herblore: 55, xp: 125,
    primary: { label: "Clean Kwuarm", icon: "🌿", isHerb: true },
    secondary: { label: "Limpwurt Root", icon: "🌱", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },
  sup_defence: {
    label: "Super Defence (3)", herblore: 66, xp: 150,
    primary: { label: "Clean Cadantine", icon: "🌿", isHerb: true },
    secondary: { label: "White Berries", icon: "🫐", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },
  sup_magic: {
    label: "Super Magic Potion (3)", herblore: 76, xp: 172.5,
    primary: { label: "Clean Lantadyme", icon: "🌿", isHerb: true },
    secondary: { label: "Potato Cactus", icon: "🌵", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },
  sup_ranging: {
    label: "Super Ranging Potion (3)", herblore: 72, xp: 162.5,
    primary: { label: "Clean Dwarf Weed", icon: "🌿", isHerb: true },
    secondary: { label: "Wine of Zamorak", icon: "🍷", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },
  sup_necromancy: {
    label: "Super Necromancy (3)", herblore: 79, xp: 177.5,
    primary: { label: "Clean Spirit Weed", icon: "🌿", isHerb: true },
    secondary: { label: "Congealed Blood ×5", icon: "🩸", isHerb: false },
    icon: "⚗️", color: "#3498db",
  },

  torstol: {
    label: "Clean Torstol",
    icon: "🌿", isHerb: true, isRaw: true,
    color: "#27ae60",
  },
};

// All herbs needed for 1 overload (4), from scratch
const HERBS_SUMMARY = [
  { herb: "Torstol", use: "Overload (direct)", step: "Final", qty: 1 },
  { herb: "Avantoe", use: "Extreme Attack", step: "Extreme", qty: 1 },
  { herb: "Dwarf Weed", use: "Extreme Strength + Super Ranging", step: "Extreme + Super", qty: 2 },
  { herb: "Lantadyme", use: "Extreme Defence + Super Magic", step: "Extreme + Super", qty: 2 },
  { herb: "Irit", use: "Super Attack", step: "Super", qty: 1 },
  { herb: "Kwuarm", use: "Super Strength", step: "Super", qty: 1 },
  { herb: "Cadantine", use: "Super Defence", step: "Super", qty: 1 },
  { herb: "Spirit Weed", use: "Super Necromancy", step: "Super", qty: 1 },
];

const GUIDE_STEPS = [
  {
    step: 1, title: "Make Super Potions",
    herblore: "45–79",
    desc: "Make 1× each: Super Attack, Super Strength, Super Defence, Super Magic, Super Ranging, and Super Necromancy — all as 3-dose versions.",
    detail: "Each super needs a primary herb + secondary ingredient. Use a vial of water and the herb first to make an unfinished potion, then add the secondary.",
    icon: "⚗️",
  },
  {
    step: 2, title: "Upgrade to Extreme Potions",
    herblore: "88–93",
    desc: "Use each Super (3) with its extreme secondary ingredient to make 1× each Extreme potion (3-dose).",
    detail: "Ext Attack (+ Clean Avantoe) · Ext Strength (+ Clean Dwarf Weed) · Ext Defence (+ Clean Lantadyme) · Ext Magic (+ Ground Mud Rune) · Ext Ranging (+ Grenwall Spikes ×5) · Ext Necromancy (+ Ground Miasma Rune)",
    icon: "🔥",
  },
  {
    step: 3, title: "Combine into Overload",
    herblore: "96",
    desc: "Use all 6 Extreme potions (3-dose) with a Clean Torstol to create 1× Overload (4). Yields 1,000 XP. Cannot be assisted.",
    detail: "5 empty vials are returned. The overload boosts Attack, Strength, Defence, Ranged, Magic, and Necromancy by 15% + 3 for 6 minutes.",
    icon: "🧪",
  },
];

function OverloadCalc() {
  const [qty, setQty] = useState(1);
  const n = Math.max(1, Math.min(9999, parseInt(qty) || 1));

  const totalHerbs = HERBS_SUMMARY.map(h => ({ ...h, total: h.qty * n }));
  const totalXP = n * (220 + 230 + 240 + 250 + 260 + 265 + 1000); // extremes + overload
  const totalSuperXP = n * (100 + 125 + 150 + 172.5 + 162.5 + 177.5);

  const stepColor = { "Final": "#e74c3c", "Extreme": "#e67e22", "Extreme + Super": "#f39c12", "Super": "#3498db" };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Header + qty picker */}
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div className="card-title" style={{ marginBottom: 4 }}>🧪 Overload (4) Calculator</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
            Requires <span style={{ color: "var(--gold)" }}>96 Herblore</span>. Boosts all combat stats by <span style={{ color: "var(--orange)" }}>15% + 3</span> for 6 minutes. Cannot be traded or assisted.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Overloads</label>
          <input
            type="number" min={1} max={9999} value={qty}
            onChange={e => setQty(e.target.value)}
            style={{ width: 80, background: "var(--bg4)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 5, padding: "6px 10px", fontSize: "1rem", textAlign: "center" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "1.1rem" }}>{totalXP.toLocaleString()}</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>XP (extremes + OVL)</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Cinzel', serif", color: "#3498db", fontSize: "1.1rem" }}>{Math.round(totalSuperXP).toLocaleString()}</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>XP (super pots)</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

        {/* Herb shopping list */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
            <div className="card-title" style={{ marginBottom: 0 }}>🌿 Herbs Needed</div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 2 }}>For {n.toLocaleString()}× Overload (4) from scratch</div>
          </div>
          <div>
            {totalHerbs.map((h, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0.55rem 1rem",
                borderBottom: i < totalHerbs.length - 1 ? "1px solid rgba(42,46,56,0.5)" : "none",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 5, background: `${stepColor[h.step]}22`, border: `1px solid ${stepColor[h.step]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
                  🌿
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.82rem", color: "var(--text)", fontFamily: "'Cinzel', serif" }}>{h.herb}</div>
                  <div style={{ fontSize: "0.67rem", color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.use}</div>
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: stepColor[h.step], fontWeight: 700, flexShrink: 0 }}>
                  ×{h.total.toLocaleString()}
                </div>
              </div>
            ))}
            <div style={{ padding: "0.6rem 1rem", background: "rgba(200,169,81,0.05)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>Total Herbs</span>
              <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "1rem" }}>
                ×{(HERBS_SUMMARY.reduce((a, h) => a + h.qty, 0) * n).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Full ingredient breakdown */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
            <div className="card-title" style={{ marginBottom: 0 }}>📋 All Ingredients</div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 2 }}>Including non-herb secondaries</div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: 340 }}>
            {/* Extremes section */}
            <div style={{ padding: "0.4rem 1rem 0.2rem", borderBottom: "1px solid rgba(42,46,56,0.4)", background: "rgba(230,126,34,0.05)" }}>
              <div style={{ fontSize: "0.6rem", color: "#e67e22", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>Step 2 — Extreme Potions</div>
            </div>
            {["ext_attack","ext_strength","ext_defence","ext_magic","ext_ranging","ext_necromancy"].map(k => {
              const p = OVERLOAD_CHAIN[k];
              return (
                <div key={k} style={{ padding: "0.45rem 1rem", borderBottom: "1px solid rgba(42,46,56,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>{p.label}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>+ {p.secondary.label} · Lv{p.herblore} · {p.xp}xp</div>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#e67e22", fontFamily: "'Cinzel', serif" }}>×{n}</span>
                </div>
              );
            })}
            {/* Supers section */}
            <div style={{ padding: "0.4rem 1rem 0.2rem", borderBottom: "1px solid rgba(42,46,56,0.4)", background: "rgba(52,152,219,0.05)" }}>
              <div style={{ fontSize: "0.6rem", color: "#3498db", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>Step 1 — Super Potions</div>
            </div>
            {["sup_attack","sup_strength","sup_defence","sup_magic","sup_ranging","sup_necromancy"].map(k => {
              const p = OVERLOAD_CHAIN[k];
              return (
                <div key={k} style={{ padding: "0.45rem 1rem", borderBottom: "1px solid rgba(42,46,56,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>{p.label}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>{p.primary.label} + {p.secondary.label} · Lv{p.herblore} · {p.xp}xp</div>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#3498db", fontFamily: "'Cinzel', serif" }}>×{n}</span>
                </div>
              );
            })}
            {/* Torstol */}
            <div style={{ padding: "0.4rem 1rem 0.2rem", borderBottom: "1px solid rgba(42,46,56,0.4)", background: "rgba(231,76,60,0.05)" }}>
              <div style={{ fontSize: "0.6rem", color: "#e74c3c", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>Step 3 — Overload Combination</div>
            </div>
            <div style={{ padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1rem" }}>🌿</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Clean Torstol</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>Combined with all 6 extreme (3) · Lv96 · 1000xp</div>
              </div>
              <span style={{ fontSize: "0.8rem", color: "#e74c3c", fontFamily: "'Cinzel', serif" }}>×{n}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-step guide */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: "1rem" }}>📖 Step-by-Step Guide</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {GUIDE_STEPS.map(s => (
            <div key={s.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg4)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", color: "var(--gold)" }}>Step {s.step} — {s.title}</span>
                  <span style={{ fontSize: "0.62rem", color: "var(--text-dim)", background: "var(--bg4)", border: "1px solid var(--border)", borderRadius: 3, padding: "1px 6px" }}>Herblore {s.herblore}</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text)", marginBottom: 4 }}>{s.desc}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "0.5rem", padding: "0.65rem 1rem", background: "rgba(200,169,81,0.06)", border: "1px solid rgba(200,169,81,0.2)", borderRadius: 6, fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
            💡 <strong style={{ color: "var(--gold)" }}>Tips:</strong> The <strong style={{ color: "var(--text)" }}>Scroll of Cleansing</strong> gives a 10% chance to save a secondary ingredient per overload made. Herblore can be <strong style={{ color: "var(--text)" }}>boosted</strong> (not assisted) to reach 96 for the final combination. Overloads can be converted to <strong style={{ color: "var(--text)" }}>flasks</strong> for 6 doses instead of 4.
          </div>
        </div>
      </div>
    </div>
  );
}

function Calculators() {
  const [calcTab, setCalcTab] = useState("ink");
  const [curLevel, setCurLevel] = useState(90);
  const [targetLevel, setTargetLevel] = useState(99);

  function xpForLevel(l) {
    let xp = 0;
    for (let i = 1; i < l; i++) xp += Math.floor(i + 300 * Math.pow(2, i / 7));
    return Math.floor(xp / 4);
  }

  const xpNeeded = Math.max(0, xpForLevel(Number(targetLevel)) - xpForLevel(Number(curLevel)));

  const methods = [
    { name: "Rituals (Powerful Ink)", xpph: 800000 },
    { name: "Rituals (Greater Ink)", xpph: 400000 },
    { name: "Combat (Slayer)", xpph: 350000 },
    { name: "Soul Obelisk", xpph: 200000 },
    { name: "Summoning Familiars", xpph: 100000 },
  ];

  return (
    <div className="fade-in">
      <div className="section-title">Calculators</div>
      <div className="section-desc">XP, time-to-level, ink crafting, and other useful calculations for your GIM journey.</div>

      <div className="tab-bar">
        {["ink", "xp", "bank", "overload"].map(t => (
          <button key={t} className={`tab ${calcTab === t ? "active" : ""}`} onClick={() => setCalcTab(t)}>
            {t === "ink" ? "⚗️ Ritual Ink" : t === "xp" ? "⭐ XP Calculator" : t === "bank" ? "💰 Bank Value Est." : "🧪 Overload"}
          </button>
        ))}
      </div>

      {calcTab === "ink" && <NecromancyCalc nested />}
      {calcTab === "overload" && <OverloadCalc />}

      {calcTab === "xp" && (
        <div className="card" style={{ maxWidth: 700 }}>
          <div className="card-title">⭐ XP to Level Calculator</div>
          <div className="calc-grid">
            <div className="input-group">
              <label>Current Level</label>
              <input type="number" min="1" max="150" value={curLevel} onChange={e => setCurLevel(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Target Level</label>
              <input type="number" min="1" max="150" value={targetLevel} onChange={e => setTargetLevel(e.target.value)} />
            </div>
          </div>

          <div className="calc-result">
            <div className="xp-row">
              <span>XP Needed</span>
              <span className="xp-val">{xpNeeded.toLocaleString()}</span>
            </div>
            <div className="xp-row">
              <span>Current Level XP</span>
              <span className="xp-val">{xpForLevel(Number(curLevel)).toLocaleString()}</span>
            </div>
            <div className="xp-row">
              <span>Target Level XP</span>
              <span className="xp-val">{xpForLevel(Number(targetLevel)).toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div className="card-title">⏱️ Time Estimates</div>
            {methods.map(m => (
              <div className="xp-row" key={m.name}>
                <span style={{ fontSize: "0.85rem" }}>{m.name}</span>
                <span className="xp-val" style={{ fontSize: "0.85rem" }}>
                  {xpNeeded > 0 ? (xpNeeded / m.xpph).toFixed(1) + "h" : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {calcTab === "bank" && (
        <div className="card" style={{ maxWidth: 700 }}>
          <div className="card-title">💰 Bank Value Estimator</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Paste your most valuable items and quantities to get a rough GP estimate.
          </div>
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-dim)", border: "1px dashed var(--border)", borderRadius: "6px" }}>
            Coming soon — GE price API integration
          </div>
        </div>
      )}
    </div>
  );
}

function Discord({ discordLink, setDiscordLink }) {
  const [saved, setSaved] = useState(false);
  const link = discordLink;
  const setLink = (v) => { setDiscordLink(v); setSaved(false); };

  return (
    <div className="fade-in">
      <div className="section-title">Discord</div>
      <div className="section-desc">Quick access to your GIM Discord server.</div>

      <div className="discord-card">
        <div className="discord-icon">💬</div>
        <div className="discord-info" style={{ flex: 1 }}>
          <div className="discord-name">Group Ironman Discord</div>
          <div className="discord-desc">Stay coordinated with your teammates. Share drops, plan bosses, and track goals together.</div>
          <div className="discord-link-input" style={{ display: "flex", gap: "8px", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <input
              value={link}
              onChange={e => { setLink(e.target.value); setSaved(false); }}
              placeholder="https://discord.gg/..."
              style={{ flex: 1, minWidth: 200 }}
            />
            <button className="btn" onClick={() => setSaved(true)}>{saved ? "✓ Saved" : "Save"}</button>
            {link.startsWith("https://discord") && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="btn" style={{ textDecoration: "none", background: "rgba(88,101,242,0.3)", borderColor: "rgba(88,101,242,0.5)", color: "#7289da" }}>
                Join Server →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <div className="card-title">📣 Useful Bots & Commands</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
          {[
            { cmd: "!price <item>", desc: "Look up GE price" },
            { cmd: "!kc <boss>", desc: "Check kill counts" },
            { cmd: "!lvl <skill>", desc: "Check skill level" },
            { cmd: "!ge <item>", desc: "GE item lookup" },
            { cmd: "!log <item>", desc: "Collection log" },
            { cmd: "!task", desc: "Current slayer task" },
          ].map(b => (
            <div key={b.cmd} style={{ padding: "8px 12px", background: "var(--bg4)", borderRadius: "4px", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: "0.85rem" }}>{b.cmd}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "2px" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================

// ============================================================
// RS3 NEWS FEED
// ============================================================

function RS3News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const RSS_URL = "https://secure.runescape.com/m=news/latest_news.rss";

    function parseXML(text) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = Array.from(xml.querySelectorAll("item")).slice(0, 8);
      return items.map(item => {
        const get = tag => item.querySelector(tag)?.textContent?.trim() || "";
        const encUrl = item.querySelector("enclosure")?.getAttribute("url") || null;
        const imgMatch = get("description").match(/<img[^>]+src=["']([^"']+)["']/i);
        return {
          title: get("title"),
          date: get("pubDate") ? new Date(get("pubDate")).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "",
          link: get("link") || get("guid"),
          category: get("category"),
          thumbnail: encUrl || (imgMatch ? imgMatch[1] : null),
        };
      }).filter(i => i.title);
    }

    async function fetchNews() {
      const proxies = [
        text => parseXML(text), // raw XML parser
      ];
      const urls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
        `https://corsproxy.io/?url=${encodeURIComponent(RSS_URL)}`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=8`,
      ];

      for (const url of urls) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
          if (!res.ok) continue;
          const text = await res.text();

          // rss2json returns JSON
          if (url.includes("rss2json")) {
            const data = JSON.parse(text);
            if (data.status === "ok" && data.items?.length) {
              setNews(data.items.map(item => ({
                title: item.title,
                date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "",
                link: item.link,
                category: item.categories?.[0] || "",
                thumbnail: item.thumbnail || item.enclosure?.link || null,
              })));
              setLoading(false);
              return;
            }
          } else {
            // Raw XML
            const items = parseXML(text);
            if (items.length) {
              setNews(items);
              setLoading(false);
              return;
            }
          }
        } catch { /* try next */ }
      }
      setError(true);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const categoryColor = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("game update") || c.includes("update")) return "#c8a951";
    if (c.includes("patch")) return "#e67e22";
    if (c.includes("behind") || c.includes("dev") || c.includes("blog")) return "#9b59b6";
    if (c.includes("community")) return "#3498db";
    return "var(--text-dim)";
  };

  return (
    <div className="card" style={{ marginTop: "1.5rem", padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="card-title" style={{ marginBottom: 0 }}>📰 RuneScape News</div>
        <a href="https://secure.runescape.com/m=news/" target="_blank" rel="noreferrer"
          style={{ fontSize: "0.7rem", color: "var(--gold-dim)", textDecoration: "none", fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}>
          View all →
        </a>
      </div>
      {loading && (
        <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.8rem" }}>
          ⏳ Loading news...
        </div>
      )}
      {error && !loading && (
        <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.8rem" }}>
          Could not load news feed.{" "}
          <a href="https://secure.runescape.com/m=news/" target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>
            Visit runescape.com/news →
          </a>
        </div>
      )}
      {!loading && !error && (
        <div>
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "0.65rem 1.25rem",
                borderBottom: i < news.length - 1 ? "1px solid rgba(42,46,56,0.5)" : "none",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(200,169,81,0.05)"}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              {item.thumbnail && (
                <img src={item.thumbnail} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4, flexShrink: 0, border: "1px solid var(--border)" }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.82rem", color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {item.category && (
                    <span style={{ fontSize: "0.62rem", color: categoryColor(item.category), fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {item.category}
                    </span>
                  )}
                  <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>{item.date}</span>
                </div>
              </div>
              <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", flexShrink: 0 }}>→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Homepage({ setPage, discordLink, setDiscordLink }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const gameHour = time.getUTCHours();
  const gameMin = time.getUTCMinutes();
  const pad = n => String(n).padStart(2, "0");
  const utcStr = `${pad(gameHour)}:${pad(gameMin)}:${pad(time.getUTCSeconds())} UTC`;

  // Build upcoming events list (next 12 slots)
  const isWildyActive = gameMin < 20 && gameHour % 2 === 0;
  const activeEventIdx = gameHour % WILDFLASH_EVENTS.length;
  const activeDistrict = PRIFF_DISTRICTS[gameHour % PRIFF_DISTRICTS.length];
  const minsUntilPriffSwitch = 60 - gameMin;
  const minsUntilWildyEnd = isWildyActive ? (20 - gameMin) : null;
  const minsUntilNextWildy = isWildyActive ? (20 - gameMin + (60 - 20) + (gameHour % 2 === 0 ? 60 : 0)) : (gameHour % 2 === 0 ? 60 - gameMin : 60 - gameMin);

  // Generate upcoming schedule (next 8 events)
  const upcoming = [];
  // Priff rotations for next 4 hours
  for (let i = 0; i < 5; i++) {
    const hoursFromNow = i;
    const districtIdx = (gameHour + i + 1) % PRIFF_DISTRICTS.length;
    const d = PRIFF_DISTRICTS[districtIdx];
    const minsFrom = i === 0 ? minsUntilPriffSwitch : minsUntilPriffSwitch + i * 60;
    upcoming.push({
      type: "priff",
      label: `${d.icon} ${d.name} District`,
      sub: d.skill,
      minsFrom,
      color: "var(--gold)",
    });
  }
  // Wildy flash events next 4
  for (let i = 0; i < 4; i++) {
    // next even hour starts
    const nextEvenHour = gameHour % 2 === 0
      ? (isWildyActive ? gameHour : gameHour + 2)
      : gameHour + 1;
    const slotHour = (nextEvenHour + i * 2) % 24;
    const eventIdx = Math.floor(slotHour / 2) % WILDFLASH_EVENTS.length;
    const ev = WILDFLASH_EVENTS[eventIdx];
    const minsFrom = isWildyActive
      ? (20 - gameMin) + (60 - 20) + i * 120
      : (gameHour % 2 === 0 ? 60 - gameMin : 60 - gameMin) + i * 120;
    upcoming.push({
      type: "wildy",
      label: `⚡ ${ev}`,
      sub: `Wilderness Flash Event · ${pad(slotHour)}:00 UTC`,
      minsFrom,
      color: "var(--red)",
    });
  }

  // Sort by minsFrom
  upcoming.sort((a, b) => a.minsFrom - b.minsFrom);

  const fmtTime = mins => {
    if (mins < 1) return "Now";
    if (mins < 60) return `${Math.floor(mins)}m`;
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "2.5rem 1rem 2rem",
        position: "relative",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>☠️</div>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
          fontWeight: 900,
          color: "var(--gold)",
          letterSpacing: "0.06em",
          marginBottom: "0.3rem",
        }}>Group Ironman Dashboard</div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
          Your team's hub for hiscores, events, drops, and calculators.
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(200,169,81,0.08)",
          border: "1px solid var(--border-gold)",
          borderRadius: "20px",
          padding: "4px 14px",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.8rem",
          color: "var(--gold)",
        }}>
          <span className="dot dot-green"></span>
          {utcStr}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Left col: Quick nav + Discord */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Quick nav tiles */}
          <div className="card">
            <div className="card-title">🗺️ Quick Navigation</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {[
                { id: "hiscores", icon: "🏆", label: "Hiscores" },
                { id: "events", icon: "⚡", label: "Events" },
                { id: "wiki", icon: "📖", label: "Wiki" },
                { id: "logs", icon: "📋", label: "Drop Log" },
                { id: "calculators", icon: "⚗️", label: "Calculators" },
                { id: "discord", icon: "💬", label: "Discord" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPage(p.id)}
                  style={{
                    background: "var(--bg4)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text)",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "var(--gold-dim)"; e.currentTarget.style.color = "var(--gold)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
                >
                  <span style={{ fontSize: "1rem" }}>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discord card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(88,101,242,0.12), rgba(88,101,242,0.04))",
            border: "1px solid rgba(88,101,242,0.3)",
            borderRadius: "8px",
            padding: "1.25rem",
          }}>
            <div className="card-title" style={{ color: "#7289da" }}>💬 Discord Server</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "0.75rem" }}>
              Quick link to your GIM team Discord.
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={discordLink}
                onChange={e => setDiscordLink(e.target.value)}
                placeholder="https://discord.gg/..."
                style={{ flex: 1 }}
              />
              {discordLink.startsWith("https://discord") && (
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(88,101,242,0.3)",
                    border: "1px solid rgba(88,101,242,0.5)",
                    color: "#7289da",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Join →
                </a>
              )}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "6px" }}>
              Paste your Discord invite to save it here and on the Discord page.
            </div>
          </div>
        </div>

        {/* Right col: Upcoming events scroll */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid var(--border)" }}>
            <div className="card-title" style={{ marginBottom: 0 }}>📅 Upcoming Events</div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: 380 }}>

            {/* ── Prifddinas District ── */}
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              <div style={{ padding: "0.5rem 1.25rem 0.25rem", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em" }}>🌆 Prifddinas District</span>
                <span style={{ height: 1, flex: 1, background: "var(--border)" }} />
              </div>
              {/* Active */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 1.25rem", background: "rgba(200,169,81,0.06)" }}>
                <span className="dot dot-green" style={{ flexShrink: 0 }} />
                <div style={{ minWidth: 36, fontFamily: "'Cinzel', serif", fontSize: "0.68rem", color: "#2ecc71", flexShrink: 0 }}>NOW</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--gold)" }}>{activeDistrict.icon} {activeDistrict.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{activeDistrict.skill} · ends in {minsUntilPriffSwitch}m</div>
                </div>
              </div>
              {/* Next 4 */}
              {Array.from({ length: 4 }, (_, i) => {
                const d = PRIFF_DISTRICTS[(gameHour + i + 1) % PRIFF_DISTRICTS.length];
                const mins = minsUntilPriffSwitch + i * 60;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "5px 1.25rem", borderTop: "1px solid rgba(42,46,56,0.4)" }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(200,169,81,0.04)"}
                    onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1px solid var(--gold-dim)", flexShrink: 0 }} />
                    <div style={{ minWidth: 36, fontFamily: "'Cinzel', serif", fontSize: "0.68rem", color: mins < 15 ? "var(--orange)" : "var(--text-dim)", flexShrink: 0, textAlign: "right" }}>{fmtTime(mins)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.82rem", color: "var(--text)" }}>{d.icon} {d.name}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{d.skill}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ height: "0.5rem" }} />
            </div>

            {/* ── Wilderness Flash Events ── */}
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              <div style={{ padding: "0.5rem 1.25rem 0.25rem", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "#e74c3c", textTransform: "uppercase", letterSpacing: "0.12em" }}>⚡ Wilderness Flash</span>
                <span style={{ height: 1, flex: 1, background: "var(--border)" }} />
              </div>
              {/* Active or countdown */}
              {(() => {
                const activeWildy = WILDFLASH_EVENTS[activeEventIdx];
                const nextIdx = (activeEventIdx + 1) % WILDFLASH_EVENTS.length;
                const nextWildy = WILDFLASH_EVENTS[nextIdx];
                const minsToNext = 60 - gameMin;
                return (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 1.25rem", background: isWildyActive ? "rgba(231,76,60,0.07)" : "transparent" }}>
                      <span className={`dot ${isWildyActive ? "dot-green" : "dot-red"}`} style={{ flexShrink: 0 }} />
                      <div style={{ minWidth: 36, fontFamily: "'Cinzel', serif", fontSize: "0.68rem", color: isWildyActive ? "#2ecc71" : "var(--text-dim)", flexShrink: 0 }}>
                        {isWildyActive ? "NOW" : `${minsToNext}m`}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.85rem", color: isWildyActive ? "#e74c3c" : "var(--text)" }}>
                          {activeWildy.icon} {activeWildy.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>
                          {isWildyActive ? `ends in ${minsUntilWildyEnd}m` : `starts at ${pad(gameHour + 1 > 23 ? 0 : gameHour + 1)}:00 UTC`}
                          {" · "}{activeWildy.type === "combat" ? "⚔️ Combat" : activeWildy.type === "skilling" ? "⛏️ Skilling" : "⚔️⛏️ Both"}
                        </div>
                      </div>
                    </div>
                    {/* Next 4 */}
                    {Array.from({ length: 4 }, (_, i) => {
                      const idx = (activeEventIdx + i + (isWildyActive ? 1 : 1)) % WILDFLASH_EVENTS.length;
                      const ev = WILDFLASH_EVENTS[idx];
                      const startHour = (gameHour + (isWildyActive ? i + 1 : i + 1)) % 24;
                      const mins = isWildyActive
                        ? minsUntilWildyEnd + (60 - 20) + i * 60
                        : minsToNext + i * 60;
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "5px 1.25rem", borderTop: "1px solid rgba(42,46,56,0.4)" }}
                          onMouseOver={e => e.currentTarget.style.background = "rgba(231,76,60,0.04)"}
                          onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1px solid rgba(231,76,60,0.4)", flexShrink: 0 }} />
                          <div style={{ minWidth: 36, fontFamily: "'Cinzel', serif", fontSize: "0.68rem", color: mins < 15 ? "var(--orange)" : "var(--text-dim)", flexShrink: 0, textAlign: "right" }}>{fmtTime(mins)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.82rem", color: "var(--text)" }}>{ev.icon} {ev.name}</div>
                            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>
                              {pad(startHour)}:00 UTC · {ev.type === "combat" ? "⚔️ Combat" : ev.type === "skilling" ? "⛏️ Skilling" : "⚔️⛏️ Both"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
              <div style={{ height: "0.5rem" }} />
            </div>

          </div>
        </div>
      </div>

      {/* RS3 News */}
      <RS3News />
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

const PAGES = [
  { id: "home", label: "Home" },
  { id: "hiscores", label: "Hiscores" },
  { id: "events", label: "Events" },
  { id: "wiki", label: "Wiki" },
  { id: "logs", label: "Drop Log" },
  { id: "clues", label: "Clue Scrolls" },
  { id: "herbs", label: "Herb Runs" },
  { id: "calculators", label: "Calculators" },
  { id: "discord", label: "Discord" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [discordLink, setDiscordLink] = useState("https://discord.gg/MC2q6SQG");

  return (
    <>
      <style>{style}</style>
      <div className="header">
        <div className="header-brand" onClick={() => { setPage("home"); }} title="Completely Cooked — Home">
          {/* SVG Logo */}
          <svg className="logo-flame" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glow ring */}
            <circle cx="26" cy="28" r="18" fill="url(#plateGrad)" opacity="0.15"/>
            {/* Plate */}
            <ellipse cx="26" cy="34" rx="16" ry="5" fill="url(#plateGrad)" opacity="0.7"/>
            <ellipse cx="26" cy="33" rx="13" ry="3.5" fill="#1a1008" opacity="0.9"/>
            {/* Skull body */}
            <ellipse cx="26" cy="26" rx="10" ry="11" fill="url(#skullGrad)"/>
            {/* Skull jaw */}
            <rect x="19" y="31" width="14" height="6" rx="3" fill="url(#skullGrad)"/>
            {/* Skull eyes - hollow dark */}
            <ellipse cx="22" cy="25" rx="3" ry="3.5" fill="#0d0a06"/>
            <ellipse cx="30" cy="25" rx="3" ry="3.5" fill="#0d0a06"/>
            {/* Eye glow - orange fire */}
            <ellipse cx="22" cy="25" rx="1.8" ry="2" fill="url(#eyeGrad)"/>
            <ellipse cx="30" cy="25" rx="1.8" ry="2" fill="url(#eyeGrad)"/>
            {/* Nose cavity */}
            <path d="M25 29 L26 27.5 L27 29 L26.5 30 L25.5 30 Z" fill="#0d0a06" opacity="0.9"/>
            {/* Teeth */}
            <rect x="20" y="32.5" width="2.5" height="3" rx="0.8" fill="#0d0a06"/>
            <rect x="24" y="32.5" width="2.5" height="3.5" rx="0.8" fill="#0d0a06"/>
            <rect x="28.5" y="32.5" width="2.5" height="3" rx="0.8" fill="#0d0a06"/>
            {/* Chef hat base band */}
            <rect x="17" y="17" width="18" height="4" rx="1.5" fill="url(#hatBandGrad)"/>
            {/* Chef hat puff */}
            <ellipse cx="26" cy="11" rx="9" ry="7" fill="url(#hatGrad)"/>
            <ellipse cx="22" cy="10" rx="5" ry="5.5" fill="url(#hatGrad)" opacity="0.6"/>
            <ellipse cx="30" cy="10" rx="5" ry="5.5" fill="url(#hatGrad)" opacity="0.6"/>
            {/* Flame left */}
            <path d="M14 30 C12 24 15 20 13 14 C16 18 15 21 17 24 C17 20 19 17 18 12 C21 16 20 22 22 25 C20 21 21 18 20 14 C23 17 22 24 20 28 C22 26 23 22 24 20 C24 24 22 30 20 32 C18 34 14 36 14 30Z" fill="url(#flameL)" opacity="0.85"/>
            {/* Flame right */}
            <path d="M38 30 C40 24 37 20 39 14 C36 18 37 21 35 24 C35 20 33 17 34 12 C31 16 32 22 30 25 C32 21 31 18 32 14 C29 17 30 24 32 28 C30 26 29 22 28 20 C28 24 30 30 32 32 C34 34 38 36 38 30Z" fill="url(#flameR)" opacity="0.85"/>
            {/* Smoke wisps top */}
            <path d="M23 5 C22 3 24 1 23 0" stroke="#555" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <path d="M26 4 C25 2 27 0 26 -1" stroke="#555" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
            <path d="M29 5 C28 3 30 1 29 0" stroke="#555" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <defs>
              <linearGradient id="skullGrad" x1="26" y1="14" x2="26" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0e8d0"/>
                <stop offset="100%" stopColor="#c8b896"/>
              </linearGradient>
              <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffee55"/>
                <stop offset="60%" stopColor="#ff8800"/>
                <stop offset="100%" stopColor="#cc2200"/>
              </radialGradient>
              <linearGradient id="hatGrad" x1="26" y1="4" x2="26" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="100%" stopColor="#d4cabb"/>
              </linearGradient>
              <linearGradient id="hatBandGrad" x1="17" y1="19" x2="35" y2="19" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff6a00"/>
                <stop offset="50%" stopColor="#ffb347"/>
                <stop offset="100%" stopColor="#ff6a00"/>
              </linearGradient>
              <linearGradient id="plateGrad" x1="10" y1="34" x2="42" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#c8a951" stopOpacity="0"/>
                <stop offset="50%" stopColor="#c8a951"/>
                <stop offset="100%" stopColor="#c8a951" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="flameL" x1="14" y1="12" x2="20" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffee44"/>
                <stop offset="40%" stopColor="#ff7700"/>
                <stop offset="100%" stopColor="#cc2200" stopOpacity="0.2"/>
              </linearGradient>
              <linearGradient id="flameR" x1="38" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffee44"/>
                <stop offset="40%" stopColor="#ff7700"/>
                <stop offset="100%" stopColor="#cc2200" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
          {/* Text */}
          <div style={{ marginLeft: 8 }}>
            <div className="logo-text-main">Completely Cooked</div>
            <div className="logo-text-sub">Group Ironman</div>
          </div>
        </div>
        <nav className="header-nav">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`nav-btn ${page === p.id ? "active" : ""}`}
              onClick={() => setPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="main">
        {/* Mobile tab bar */}
        <div className="tab-bar" style={{ overflowX: "auto" }}>
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`tab ${page === p.id ? "active" : ""}`}
              onClick={() => setPage(p.id)}
              style={{ whiteSpace: "nowrap" }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {page === "home" && <Homepage setPage={setPage} discordLink={discordLink} setDiscordLink={setDiscordLink} />}
        {page === "hiscores" && <Hiscores />}
        {page === "events" && <EventTracker />}
        {page === "wiki" && <WikiLinks />}
        {page === "logs" && <LogTracker />}
        {page === "clues" && <ClueTracker />}
        {page === "herbs" && <HerbTracker />}
        {page === "calculators" && <Calculators />}
        {page === "discord" && <Discord discordLink={discordLink} setDiscordLink={setDiscordLink} />}
      </div>
    </>
  );
}
