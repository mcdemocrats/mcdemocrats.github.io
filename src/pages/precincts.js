import { renderPage } from '../layouts/page.js';
import { headerMap } from '../partials/header.js';
import { analyticsTrackingWithParams } from '../partials/scripts.js';

const LEAFLET_CSS = `  <!-- Leaflet -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>`;

const mapBody = `<!-- MAIN LAYOUT -->
<div class="page">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-head">
      <h1>Find Your Precinct</h1>
      <p>Enter your Marshall County address to highlight your voting precinct, then click it to express interest in becoming a precinct Officer.</p>
    </div>

    <div class="search-area">
      <label class="search-label" for="addr-input">Your address</label>
      <div class="search-row">
        <input
          id="addr-input"
          class="search-input"
          type="text"
          placeholder="e.g. 123 Main St, Madill"
          autocomplete="off"
        />
        <button class="search-btn" id="search-btn" onclick="geocodeAddress()" data-track="click-search-precinct">Find</button>
      </div>
      <p class="search-hint">Street address in Marshall County, OK</p>
    </div>

    <div class="result-panel" id="result-panel">
      <!-- idle state -->
      <div class="status-idle" id="state-idle">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <p>Enter your address above to highlight your precinct on the map.</p>
      </div>
      <!-- loading state (hidden) -->
      <div class="status-loading" id="state-loading" style="display:none">
        <div class="spinner"></div>
        <p id="loading-msg">Looking up your address…</p>
      </div>
      <!-- error state (hidden) -->
      <div class="status-error" id="state-error" style="display:none"></div>
      <!-- found state (hidden) -->
      <div id="state-found" style="display:none">
        <div class="precinct-card" id="found-card">
          <div class="precinct-card-top">
            <div class="label">Your Precinct</div>
            <h2 id="found-name">—</h2>
          </div>
          <div class="precinct-card-body">
            <p>You live in this voting precinct. Click the button below to let us know you're interested in serving as a Precinct Officer — no experience required!</p>
            <a id="found-cta" href="#" class="cta-btn" data-track="click-become-officer-sidebar">Become Precinct Officer →</a>
          </div>
        </div>

        <div class="precinct-list-head">All Precincts</div>
        <div id="precinct-list"></div>
      </div>
    </div>
  </aside>

  <!-- MAP -->
  <div id="map"></div>
</div>`;

function mapScript(site) {
  return `<script>
  // ── Config ────────────────────────────────────────────────────
  const CONTACT_EMAIL = '${site.contact.email}';
  const COUNTY_FIPS   = '40095'; // Oklahoma Marshall County

  // Marshall County center & bounds
  const CENTER   = [34.02, -96.77];
  const BOUNDS   = [[33.84, -97.15], [34.19, -96.40]];

  // ── Map init ─────────────────────────────────────────────────
  const map = L.map('map', {
    center: CENTER,
    zoom: 10,
    maxBounds: L.latLngBounds([[33.6, -97.4], [34.5, -96.1]]),
    maxBoundsViscosity: 0.85,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // ── State ────────────────────────────────────────────────────
  let precinctLayer   = null;
  let highlightLayer  = null;
  let allFeatures     = [];
  let activePrecinctId = null;
  let userMarker       = null;

  // ── Color helpers ────────────────────────────────────────────
  const COLORS = ['#1B4F8A','#2E6BA8','#3D7CC9','#5490D4','#6AA3DF','#82B5E8','#9AC6F0','#B3D6F7'];
  const colorMap = {};
  let colorIdx = 0;
  function precinctColor(id) {
    if (!colorMap[id]) { colorMap[id] = COLORS[colorIdx++ % COLORS.length]; }
    return colorMap[id];
  }

  function defaultStyle(feature) {
    const id = precinctId(feature);
    return {
      fillColor: precinctColor(id),
      fillOpacity: 0.22,
      color: '#0D2340',
      weight: 1.5,
      opacity: 0.7,
    };
  }
  function highlightStyle(feature) {
    return {
      fillColor: '#C0232C',
      fillOpacity: 0.45,
      color: '#8B0000',
      weight: 2.5,
      opacity: 1,
    };
  }
  function dimStyle(feature) {
    return {
      fillColor: '#AAAAAA',
      fillOpacity: 0.08,
      color: '#999',
      weight: 1,
      opacity: 0.4,
    };
  }

  function precinctId(feature) {
    const p = feature.properties;
    return p.PRECINCT || p.PRECINCT_I || p.OBJECTID || 'unknown';
  }
  function precinctName(feature) {
    const p = feature.properties;
    return p.PRECINCT_N || p.DIST_NAME || \`Precinct \${p.PRECINCT}\` || 'Unknown Precinct';
  }

  function emailHref(pName) {
    return '${site.forms.precinctOfficer}';
  }

  function renderPrecincts(data) {
    if (precinctLayer) map.removeLayer(precinctLayer);

    precinctLayer = L.geoJSON(data, {
      style: defaultStyle,
      onEachFeature(feature, layer) {
        const name = precinctName(feature);
        const id   = precinctId(feature);

        layer.on('click', (e) => { L.DomEvent.stopPropagation(e); selectPrecinct(id, feature, layer); });
        layer.on('mouseover', function() {
          if (id !== activePrecinctId) this.setStyle({ fillOpacity: 0.38, weight: 2 });
          this.bindTooltip(name, { sticky: true, className: 'precinct-tip' }).openTooltip();
        });
        layer.on('mouseout', function() {
          if (id !== activePrecinctId) precinctLayer.resetStyle(this);
          this.closeTooltip();
        });
      }
    }).addTo(map);

    try { map.fitBounds(precinctLayer.getBounds(), { padding: [20, 20] }); } catch(e) {}

    map.on('click', () => {
      if (!activePrecinctId) return;
      activePrecinctId = null;
      precinctLayer.eachLayer(l => precinctLayer.resetStyle(l));
      document.querySelectorAll('.precinct-list-item').forEach(el => el.classList.remove('active'));
    });
  }

  function renderList() {
    const container = document.getElementById('precinct-list');
    container.innerHTML = '';
    const sorted = [...allFeatures].sort((a, b) => precinctName(a).localeCompare(precinctName(b)));
    sorted.forEach(feature => {
      const id   = precinctId(feature);
      const name = precinctName(feature);
      const el   = document.createElement('div');
      el.className = 'precinct-list-item';
      el.id = \`list-item-\${id}\`;
      el.innerHTML = \`<span>\${name}</span><span class="num">\${allFeatures.indexOf(feature)+1}</span>\`;
      el.addEventListener('click', () => {
        if (typeof posthog !== 'undefined') posthog.capture('click-precinct-list-item', { precinct_name: name });
        precinctLayer.eachLayer(layer => {
          if (precinctId(layer.feature) === id) {
            selectPrecinct(id, feature, layer);
            map.fitBounds(layer.getBounds(), { padding: [40, 40] });
          }
        });
      });
      container.appendChild(el);
    });
  }

  function selectPrecinct(id, feature, layer) {
    activePrecinctId = id;
    const name = precinctName(feature);
    if (typeof posthog !== 'undefined') posthog.capture('click-precinct-map', { precinct_name: name });

    // Reset all styles
    precinctLayer.eachLayer(l => {
      if (precinctId(l.feature) === id) {
        l.setStyle(highlightStyle());
      } else {
        l.setStyle(dimStyle());
      }
    });

    // List highlight
    document.querySelectorAll('.precinct-list-item').forEach(el => el.classList.remove('active'));
    const listEl = document.getElementById(\`list-item-\${id}\`);
    if (listEl) { listEl.classList.add('active'); listEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

    // Show popup on map
    const center = layer.getBounds().getCenter();
    L.popup({ closeButton: true, offset: [0, -5] })
      .setLatLng(center)
      .setContent(\`
        <div class="popup-inner">
          <div class="popup-head">
            <div class="sub">Marshall County Democrats</div>
            <h3>\${name}</h3>
          </div>
          <div class="popup-body">
            <p>Want to help lead Democrats in \${name}? Precinct Officers are the backbone of local organizing.</p>
            <a class="popup-cta" href="\${emailHref(name)}" data-track="click-become-officer-popup" data-precinct-name="\${name}">Become Precinct Officer →</a>
          </div>
        </div>
      \`)
      .addTo(map);

    // Show found state if not already visible
    showFoundState(name, id);
  }

  function showFoundState(name, id) {
    setState('found');
    document.getElementById('found-name').textContent = name;
    document.getElementById('found-cta').href = emailHref(name);
    document.getElementById('found-cta').dataset.precinctName = name;
  }

  // ── Address geocoding ────────────────────────────────────────
  async function geocodeAddress() {
    const raw = document.getElementById('addr-input').value.trim();
    if (!raw) return;

    // Append county+state if not present
    const query = raw.toLowerCase().includes('oklahoma') || raw.toLowerCase().includes(', ok')
      ? raw : \`\${raw}, Marshall County, Oklahoma\`;

    setState('loading');
    document.getElementById('loading-msg').textContent = 'Looking up your address…';

    let lat, lon;
    try {
      const url = \`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=\${encodeURIComponent(query)}&countrycodes=us&viewbox=-97.15,34.19,-96.40,33.84&bounded=1\`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const results = await res.json();

      if (!results || results.length === 0) {
        // Try without bounded
        const url2 = \`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=\${encodeURIComponent(query)}&countrycodes=us\`;
        const res2 = await fetch(url2, { headers: { 'Accept-Language': 'en' } });
        const results2 = await res2.json();
        if (!results2 || results2.length === 0) throw new Error('Address not found. Try including your street number and city.');
        lat = parseFloat(results2[0].lat);
        lon = parseFloat(results2[0].lon);
      } else {
        lat = parseFloat(results[0].lat);
        lon = parseFloat(results[0].lon);
      }
    } catch(e) {
      setState('error', e.message || 'Could not look up that address. Please check the spelling and try again.');
      return;
    }

    // Place marker
    if (userMarker) map.removeLayer(userMarker);
    const markerIcon = L.divIcon({
      html: \`<div style="background:#C0232C;width:14px;height:14px;border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.35)"></div>\`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: '',
    });
    userMarker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);

    // Find which precinct contains the point
    document.getElementById('loading-msg').textContent = 'Finding your precinct…';
    const pt = L.latLng(lat, lon);
    let matched = false;

    map.setView([lat, lon], 12);

    precinctLayer.eachLayer(layer => {
      if (matched) return;
      try {
        if (isPointInLayer(pt, layer)) {
          matched = true;
          const id   = precinctId(layer.feature);
          const name = precinctName(layer.feature);
          selectPrecinct(id, layer.feature, layer);
          map.fitBounds(layer.getBounds(), { padding: [60, 60] });
        }
      } catch(e) {}
    });

    if (!matched) {
      setState('error', 'Your address was found on the map, but we couldn\'t match it to a precinct. This may mean the address is outside Marshall County, or there\'s a gap in our precinct data. Try clicking a precinct directly on the map.');
    }
  }

  // Point-in-polygon using Leaflet bounds + ray casting
  function isPointInLayer(pt, layer) {
    if (!layer.getBounds().contains(pt)) return false;
    if (layer.feature.geometry.type === 'Polygon') {
      return pointInPolygon([pt.lng, pt.lat], layer.feature.geometry.coordinates[0]);
    }
    if (layer.feature.geometry.type === 'MultiPolygon') {
      return layer.feature.geometry.coordinates.some(poly =>
        pointInPolygon([pt.lng, pt.lat], poly[0])
      );
    }
    return false;
  }

  function pointInPolygon(point, polygon) {
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  // ── UI state helpers ─────────────────────────────────────────
  function setState(state, msg) {
    ['idle', 'loading', 'error', 'found'].forEach(s => {
      const el = document.getElementById(\`state-\${s}\`);
      if (el) el.style.display = 'none';
    });
    const target = document.getElementById(\`state-\${state}\`);
    if (target) target.style.display = '';
    if (state === 'error' && msg) target.textContent = msg;
  }

  // keyboard enter on search
  document.getElementById('addr-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') geocodeAddress();
  });

  // ── Boot ─────────────────────────────────────────────────────
  async function loadPrecincts() {
    let data = null;
    try {
      const res = await fetch('./marshall-precincts.geojson');
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      data = await res.json();
    } catch(e) {
      document.getElementById('state-error').textContent = 'Could not load precinct data. Make sure marshall-precincts.geojson is in the same folder as this page.';
      document.getElementById('state-error').style.display = '';
      document.getElementById('state-idle').style.display = 'none';
      return;
    }
    allFeatures = data.features;
    renderPrecincts(data);
    renderList();
  }

${analyticsTrackingWithParams}

  loadPrecincts();
</script>`;
}

export function render(site) {
  return renderPage(site, {
    title: 'Precinct Map · Marshall County Democrats',
    description: 'Neighbors working together for better schools, good jobs, and a government that represents everyone in Marshall County, Oklahoma.',
    bodyClass: 'map-page',
    fontWeights: '300;400;600;700',
    headExtra: LEAFLET_CSS,
    header: headerMap(site),
    body: mapBody,
    footer: '',
    scripts: mapScript(site),
  });
}
