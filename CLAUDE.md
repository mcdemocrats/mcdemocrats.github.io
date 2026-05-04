# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for the Marshall County Democratic Party (Oklahoma), hosted via GitHub Pages at `mcdemocrats.com`. Built with a Node.js static site generator (`build.js`) — no frameworks, no npm dependencies, just ES modules and template literals.

**Source lives in `src/`.** The root `.html` files are the old hand-authored versions kept for reference; the authoritative output is `dist/` produced by the build.

## Development

```bash
node build.js        # generate dist/
npm run dev          # build + serve dist/ locally (requires npx)
```

For the precinct map's `marshall-precincts.geojson` fetch to work, you need a local server (not `file://`). `npm run dev` handles this.

Deploy is automatic: push to `main` → GitHub Actions runs `node build.js` → deploys `dist/` to GitHub Pages via the Pages artifact API (see `.github/workflows/deploy.yml`). **GitHub Pages must be configured to use GitHub Actions as the source** (Settings → Pages → Source: GitHub Actions).

## Architecture

### Build system

```
src/
  data.js              site-wide config (contact, meeting, PostHog, forms, nav)
  layouts/
    page.js            renderPage() — wraps any page in html/head/body
  partials/
    posthog.js         PostHog init snippet (identical on all pages)
    header.js          headerMain(), headerMap(), headerSimple()
    footer.js          footerFull() (index), footerSimple() (privacy)
    scripts.js         shared JS snippets (analytics, year, scroll reveal)
  pages/
    index.js           render(site) → full index page HTML
    precincts.js       render(site) → full precincts page HTML
    privacy.js         render(site) → full privacy page HTML
build.js               renders all pages, copies static assets → dist/
```

Static assets (`styles.css`, `marshall-precincts.geojson`, favicons, `og-image.png`, `meeting.ics`, `CNAME`) are copied from the root into `dist/` unchanged.

### Pages

- **`src/pages/index.js`** — Main site. Sections: Hero, Meeting Banner, Contact, Find Your Precinct (teaser), Meetings, Voter Resources. Uses IntersectionObserver for `.reveal` scroll animations.

- **`src/pages/precincts.js`** — Interactive precinct map. Split-panel layout: 360px sidebar + full-height Leaflet map. Loads `marshall-precincts.geojson` via `fetch()` at runtime. Geocodes addresses through the Nominatim API (OpenStreetMap), then does point-in-polygon matching client-side using a ray-casting algorithm.

- **`src/pages/privacy.js`** — Privacy policy page.

- **`marshall-precincts.geojson`** — Marshall County's 9 voting precincts. GeoJSON `FeatureCollection`. Properties read by JS: `PRECINCT`, `PRECINCT_I`, `PRECINCT_N`, `DIST_NAME`, `OBJECTID`. The JS handles multiple possible property name variants for compatibility with different GIS exports.

## Design System

All styles live in `styles.css`, shared by both pages. `precincts.html` adds `class="map-page"` to `<body>` to scope its full-viewport layout overrides (header height 60px vs 64px, `body { height: 100% }`, sidebar/map grid).

CSS custom properties defined in `:root`:

| Variable | Value | Usage |
|---|---|---|
| `--navy` | `#0D2340` | Primary dark bg, header |
| `--blue` | `#1B4F8A` | Card headers, accents |
| `--sky` | `#3D7CC9` | Interactive highlights |
| `--red` | `#C0232C` | CTAs, accents |
| `--cream` | `#F5F0E8` | Page background |
| `--sand` | `#E8DFD0` | Section backgrounds |
| `--serif` | Playfair Display | Headings |
| `--sans` | Source Sans 3 | Body, UI |

## Analytics

All pages fire events to PostHog. A single delegated `click` listener on `document` reads `data-track` attributes. Two events in `precincts.html` are fired directly from JS (not via `data-track`) because they need a `precinct_name` parameter resolved at runtime:

```js
// delegated (all data-track elements)
if (typeof posthog !== 'undefined') posthog.capture(el.dataset.track, params);

// direct (precincts page only)
posthog.capture('click-precinct-map', { precinct_name: name });
```

Events that carry `precinct_name` use `data-precinct-name` on the element (set dynamically by `showFoundState()` for the sidebar CTA, and injected into the Leaflet popup template string). All event names are kebab-case.

- **PostHog** — project key `phc_wAtyDUxEMvLY6Pwc3s2aY4QR4ZUfZTHZXCTLUYS9ywVw`, host `us.i.posthog.com`

## Key External Dependencies

- **Leaflet 1.9.4** (CDN) — map rendering in `precincts.html`
- **Google Fonts** — Playfair Display + Source Sans 3
- **Nominatim API** — address geocoding (no API key required, but rate-limited)
- **Google Forms** (`forms.gle/eVAyfFj7He2GyoqdA`) — volunteer sign-up; (`forms.gle/b8UpdVnUXjaKmRqU7`) — precinct officer interest form

## Content

All site-wide content is centralized in **`src/data.js`**:
- Meeting schedule, time, and location → `site.meeting.*`
- Contact email, phone, Facebook links → `site.contact.*`
- Form URLs (volunteer, precinct officer) → `site.forms.*`
- Nav links → `site.nav`
- PostHog config → `site.posthog`

After editing `src/data.js`, run `node build.js` to regenerate `dist/`.

Contact: `info@mcdemocrats.com` / `(580) 440-0055` / Facebook `groups/mcdemocrats`
