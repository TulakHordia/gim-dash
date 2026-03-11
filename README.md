# 🧪 Completely Cooked — GIM Dashboard

A private web dashboard for the **Completely Cooked** Group Ironman team in RuneScape 3. Built with React, deployed on Vercel, and backed by Supabase for real-time shared state across all group members.

> **Live site:** [hord.dev](https://hord.dev)

---

## 👥 Members

| IGN | Colour |
|---|---|
| TulakIron | 🟡 Gold |
| Nyakatra | 🔵 Blue |
| Rawrsial | 🟢 Green |
| GIMAn0nym0us | 🟣 Purple |
| Real Netto | 🟠 Orange |

---

## ✨ Features

### 🏠 Home
- Live UTC clock
- RS3 news feed pulled from the official RSS feed (with multi-proxy CORS fallback)
- Upcoming events panel — Prifddinas district rotations and Wilderness Flash Events, each in their own section with live countdowns

### 🏆 Hiscores
- Pulls live stats from the RS3 Hiscores API for all 5 group members
- Displays total level, XP, and individual skill breakdowns
- Per-member colour-coded panels

### ⚡ Events
- **Prifddinas Districts** — current active district with skill, icon, and full 8-slot rotation schedule with UTC times
- **Wilderness Flash Events** — all 14 events in correct fixed sequence, current event highlighted, full rotation list with next start times

### 📖 Wiki Quick Links
- Curated links to commonly used RS3 wiki pages, grouped by category

### 🌿 Herb Run Tracker
- Tick off herb patches as you complete your run
- 8 patches: 4 standard (Falador, Catherby, Ardougne, Port Phasmatys) + 4 special (Trollheim, Wilderness, Prifddinas, Al Kharid)
- Progress bar, patch locations and teleport hints
- State saved to Supabase — shared across all members in real time
- "Clear All" button to reset for the next run

### ⚗️ Calculators
Three sub-tabs:

#### 🧪 Overload Calculator
- Enter quantity of Overloads to make
- Shows exact herbs needed with quantities (Torstol, Avantoe, Dwarf Weed, Lantadyme, Irit, Kwuarm, Cadantine, Spirit Weed)
- Full ingredient breakdown including non-herb secondaries (Grenwall Spikes, Ground Mud Rune, Ground Miasma Rune, etc.)
- Correct XP totals for super potions, extreme potions, and the final combination
- Step-by-step brewing guide with Herblore level requirements (Lv45–96)

#### ⭐ XP Calculator
- Time-to-level calculator for any RS3 skill
- Supports multiple training methods with XP/hr estimates

#### 💰 Bank Value Estimator
- Quick estimation tool for group bank value

#### 🔮 Necromancy Ritual Ink Calculator
- Calculate how many inks (Regular / Greater / Powerful) you need for any ritual tier and quantity

### 💬 Discord
- Displays the group Discord invite link
- Editable — any member can update it and it persists

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (single JSX file, no build-time dependencies beyond Vite) |
| Styling | Inline styles + CSS variables (dark RS-themed palette) |
| Database | [Supabase](https://supabase.com) (hosted Postgres, REST + realtime) |
| Hosting | [Vercel](https://vercel.com) |
| Domain | GoDaddy → hord.dev |
| RS Data | RS3 Hiscores API, RS3 RSS news feed |

---

## 🗄 Database

All persistent state lives in Supabase. Three tables are used:

| Table | Purpose |
|---|---|
| `gim_sessions` | Boss/reaper session logs (legacy, unused in current UI) |
| `gim_collection` | Shared collection log data |
| `gim_herb_runs` | Herb patch tick states (single shared row, id=1) |

### Setup

Run the SQL files in order in the **Supabase SQL Editor**:

```sql
-- 1. Main tables (if starting fresh)
-- Run: supabase_setup.sql

-- 2. Herb runs table only (if other tables already exist)
-- Run: supabase_herb_table.sql
```

All tables use Row Level Security with an "allow all" policy for the anon key — this is intentional for a private group tool.

---

## 🚀 Deployment

### Prerequisites

- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- A Supabase project (free tier is fine)

### Local development

```bash
npm install
npm run dev
```

### Deploy to production

```bash
npm run build
npx vercel deploy dist --prod
```

### Environment

The Supabase URL and anon key are hardcoded in `src/App.jsx` (fine for a private group tool with RLS). If you fork this for your own group, replace them at the top of the file:

```js
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_KEY = "your-anon-key";
```

### Domain (GoDaddy → Vercel)

In GoDaddy DNS:
- **A record** → `76.76.21.21`
- **CNAME** `www` → `cname.vercel-dns.com`
- Remove any domain forwarding rules (they override Vercel)

---

## 📁 Project Structure

```
/
├── index.html              # Entry point — loads Supabase CDN + React app
├── src/
│   └── App.jsx             # Entire application (single file)
├── public/
└── vite.config.js
```

The entire app is intentionally a single JSX file for simplicity — easy to copy, deploy, and modify without a complex build setup.

---

## 📋 SQL Files

| File | Purpose |
|---|---|
| `supabase_setup.sql` | Full schema — all 3 tables from scratch |
| `supabase_new_table_only.sql` | Adds `gim_clues` only (legacy) |
| `supabase_herb_table.sql` | Adds `gim_herb_runs` only |

---

## 🔧 Known Quirks

- **RS3 news feed** — fetched via public CORS proxies (allorigins → corsproxy.io → rss2json). If all three are down the card falls back to a direct link.
- **Hiscores** — the RS3 API does not allow CORS, so requests are proxied through a public endpoint. Occasional timeouts are expected.
- **Wilderness Flash Events** — use UTC offset 8 from the 14-event fixed sequence. If Jagex ever changes the rotation order, update `WILDFLASH_EVENTS` and the offset in `EventTracker`.

---

*Made for the Completely Cooked GIM group. Not affiliated with Jagex.*
