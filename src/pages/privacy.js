import { renderPage } from '../layouts/page.js';
import { headerSimple } from '../partials/header.js';
import { footerSimple } from '../partials/footer.js';
import { analyticsTracking, yearScript } from '../partials/scripts.js';

const INLINE_STYLES = `  <style>
    .privacy-page { max-width: 720px; margin: 0 auto; padding: 4rem 2rem 6rem; }
    .privacy-page h2 { font-family: var(--serif); font-size: 1.4rem; font-weight: 700; color: var(--navy); margin: 2.5rem 0 0.6rem; }
    .privacy-page p, .privacy-page li { font-size: 1rem; font-weight: 300; color: #3a3a3a; line-height: 1.8; }
    .privacy-page ul { padding-left: 1.25rem; margin: 0.5rem 0; }
    .privacy-page li { margin-bottom: 0.4rem; }
    .privacy-page a { color: var(--sky); }
    .privacy-page a:hover { text-decoration: underline; }
    .last-updated { font-size: 0.8rem; color: var(--mist); margin-top: 0.25rem; }
  </style>`;

const privacyBody = `<div class="privacy-page">
  <div class="section-label">Legal</div>
  <h1 class="section-title">Privacy Policy</h1>
  <p class="last-updated">Last updated: May 2026</p>
  <div class="rule"></div>

  <p>The Marshall County Democratic Party operates mcdemocrats.com. This page explains what information we collect when you visit our site and how we use it.</p>

  <h2>What we collect</h2>
  <p>We do not collect your name, email address, or any other personal information unless you choose to contact us or submit a volunteer form. When you visit the site, two analytics tools automatically collect anonymous usage data:</p>
  <ul>
    <li><strong>Google Analytics 4</strong> — records pages visited, time on site, general geographic region (city/state level), device type, and browser. Google may set cookies in your browser to recognize return visits.</li>
    <li><strong>PostHog</strong> — records the same categories of anonymous usage data and which buttons or links you click. PostHog is configured to build visitor profiles only for users who have identified themselves (e.g., by submitting a form), not for anonymous visitors.</li>
  </ul>
  <p>Neither tool gives us your name, IP address, or any information that identifies you personally.</p>

  <h2>How we use it</h2>
  <p>We use anonymous analytics solely to understand how people find and use our site — for example, which pages are most visited, whether the precinct map is working well, and how people navigate to our volunteer form. We do not sell, share, or trade this data with any third party.</p>

  <h2>Cookies</h2>
  <p>Google Analytics sets cookies (named <code>_ga</code> and <code>_ga_*</code>) that persist for up to two years. PostHog sets a session cookie. These cookies do not contain personal information and are used only to distinguish new visits from return visits in aggregate reports.</p>

  <h2>Opt out</h2>
  <p>You can prevent analytics data from being collected in a few ways:</p>
  <ul>
    <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out browser add-on</a></li>
    <li>Use a browser with tracking protection enabled (Firefox, Brave, Safari)</li>
    <li>Enable "Do Not Track" in your browser settings — PostHog respects this signal</li>
  </ul>

  <h2>Third-party links</h2>
  <p>Our site links to Google Forms, Google Maps, the Oklahoma Voter Portal, and Facebook. Those services have their own privacy policies, which we do not control.</p>

  <h2>Contact</h2>
  <p>Questions about this policy? Email us at <a href="mailto:info@mcdemocrats.com">info@mcdemocrats.com</a>.</p>
</div>`;

export function render(site) {
  const scripts = `<script>
${yearScript}

${analyticsTracking}
</script>`;

  return renderPage(site, {
    title: 'Privacy Policy · Marshall County Democrats',
    headExtra: INLINE_STYLES,
    header: headerSimple(site),
    body: privacyBody,
    footer: footerSimple(site),
    scripts,
  });
}
