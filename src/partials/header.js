const LOGO_STAR_INNER = `<circle cx="16" cy="16" r="15" fill="#1B4F8A" stroke="#3D7CC9" stroke-width="1"/>
        <path d="M16 7 L17.8 13.2 H24.3 L18.7 16.9 L20.5 23.1 L16 19.4 L11.5 23.1 L13.3 16.9 L7.7 13.2 H14.2 Z" fill="#FFFFFF"/>`;

function logoStarClass() {
  return `<svg class="logo-star" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${LOGO_STAR_INNER}
      </svg>`;
}

function logoStarSized(w, h) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 32 32" fill="none">
      ${LOGO_STAR_INNER}
    </svg>`;
}

// Index page header — full nav
export function headerMain(site) {
  const navLinks = site.nav
    .map(l => `      <a href="${l.href}" data-track="${l.track}">${l.label}</a>`)
    .join('\n');

  return `<header>
  <div class="header-inner">
    <a href="#" class="logo" data-track="click-logo">
      ${logoStarClass()}
      <div class="logo-text">
        ${site.name}
        <span>mcdemocrats.com</span>
      </div>
    </a>
    <nav>
${navLinks}
      <a href="${site.forms.volunteer}" target="_blank" rel="noopener" class="nav-cta" data-track="click-nav-get-involved">Get Involved</a>
    </nav>
  </div>
</header>`;
}

// Precincts page header — back link
export function headerMap(site) {
  return `<header>
  <a href="index.html" class="logo" data-track="click-logo">
    ${logoStarSized(28, 28)}
    <div class="logo-text">
      ${site.name}
      <span>Precinct Map</span>
    </div>
  </a>
  <a href="/" class="back-link" data-track="click-back-home">← Back to Home</a>
</header>`;
}

// Privacy page header — logo only
export function headerSimple(site) {
  return `<header>
  <div class="header-inner">
    <a href="/" class="logo" data-track="click-logo">
      ${logoStarClass()}
      <div class="logo-text">
        ${site.name}
        <span>mcdemocrats.com</span>
      </div>
    </a>
  </div>
</header>`;
}
