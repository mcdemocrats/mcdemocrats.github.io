# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for the Marshall County Democratic Party (Oklahoma), hosted via GitHub Pages at `mcdemocrats.com`. No build system, no dependencies, no package manager — CSS lives in `styles.css`, JS is inline in each HTML file.

## Development

Open files directly in a browser. No build step, no server required. To preview locally with correct relative paths (needed for `marshall-precincts.geojson` fetch in `precincts.html`):

```bash
python -m http.server 8000
# or
npx serve .
```

Deploy is automatic: push to `main` → GitHub Pages publishes to `mcdemocrats.com` (configured via `CNAME`).

## Architecture

Two standalone HTML pages sharing a single `styles.css`. JS remains inline in each page.

- **`index.html`** — Main site. Sections: Hero, Meeting Banner, Get Involved, Find Your Precinct (teaser), Meetings, Voter Resources, Contact, Footer. Uses IntersectionObserver for `.reveal` scroll animations.

- **`precincts.html`** — Interactive precinct map. Split-panel layout: 360px sidebar + full-height Leaflet map. Loads `marshall-precincts.geojson` via `fetch()` at runtime. Geocodes addresses through the Nominatim API (OpenStreetMap), then does point-in-polygon matching client-side using a ray-casting algorithm.

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

Both pages fire identical events to GA4 and PostHog in parallel. A single delegated `click` listener on `document` reads `data-track` attributes and calls both SDKs. Two events in `precincts.html` are fired directly from JS (not via `data-track`) because they need a `precinct_name` parameter resolved at runtime:

```js
// delegated (all data-track elements)
if (typeof gtag !== 'undefined') gtag('event', el.dataset.track, params);
if (typeof posthog !== 'undefined') posthog.capture(el.dataset.track, params);

// direct (precincts page only)
gtag('event', 'click-precinct-map', { precinct_name: name });
posthog.capture('click-precinct-map', { precinct_name: name });
```

Events that carry `precinct_name` use `data-precinct-name` on the element (set dynamically by `showFoundState()` for the sidebar CTA, and injected into the Leaflet popup template string). All event names are kebab-case.

- **Google Analytics 4** — measurement ID `G-8BF7036TMF`
- **PostHog** — project key `phc_wAtyDUxEMvLY6Pwc3s2aY4QR4ZUfZTHZXCTLUYS9ywVw`, host `us.i.posthog.com`

## Key External Dependencies

- **Leaflet 1.9.4** (CDN) — map rendering in `precincts.html`
- **Google Fonts** — Playfair Display + Source Sans 3
- **Nominatim API** — address geocoding (no API key required, but rate-limited)
- **Google Forms** (`forms.gle/eVAyfFj7He2GyoqdA`) — volunteer sign-up; (`forms.gle/b8UpdVnUXjaKmRqU7`) — precinct officer interest form

## Content

Meeting details are hardcoded in `index.html`: second Tuesday of each month, 6:00 PM, 14 S Main St, Kingston, OK 73439. Update the meeting band and the meeting card section together when details change.

Contact: `info@mcdemocrats.com` / `(580) 440-0055` / Facebook `groups/mcdemocrats`
