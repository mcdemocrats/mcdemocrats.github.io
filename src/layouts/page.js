import { posthog } from '../partials/posthog.js';

const FAVICON = `  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />`;

const FONT_BASE = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@';

function fonts(weights = '300;400;600') {
  return `  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONT_BASE}${weights}&display=swap" rel="stylesheet" />`;
}

function ogMeta({ url, title, description, image }) {
  return `  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Marshall County Democrats" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />

  <!-- General -->
  <meta name="description" content="${description}" />`;
}

/**
 * Renders a full HTML page.
 *
 * @param {object} site   - site-wide data from src/data.js
 * @param {object} page   - page-specific options:
 *   title        {string}  - <title> content
 *   description  {string}  - meta description (defaults to site.description)
 *   bodyClass    {string}  - class on <body> (e.g. 'map-page')
 *   fontWeights  {string}  - Source Sans 3 weight list (default '300;400;600')
 *   headExtra    {string}  - additional HTML injected before </head>
 *   header       {string}  - rendered header HTML
 *   body         {string}  - main page content
 *   footer       {string}  - rendered footer HTML (omit for map page)
 *   scripts      {string}  - <script> block injected before </body>
 */
export function renderPage(site, page) {
  const {
    title,
    description = site.description,
    bodyClass = '',
    fontWeights = '300;400;600',
    headExtra = '',
    header,
    body,
    footer = '',
    scripts = '',
  } = page;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

${FAVICON}

${ogMeta({ url: `${site.url}/`, title: 'Marshall County Democrats', description, image: site.ogImage })}

${fonts(fontWeights)}
  <link rel="stylesheet" href="/styles.css" />${headExtra ? '\n' + headExtra : ''}

${posthog(site.posthog)}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>

${header}

${body}

${footer}
${scripts}
</body>
</html>`;
}
