import { renderPage } from '../layouts/page.js';
import { headerMain } from '../partials/header.js';
import { footerFull } from '../partials/footer.js';
import { analyticsTracking, yearScript, scrollRevealScript } from '../partials/scripts.js';

function hero(site) {
  return `<!-- ── HERO ────────────────────────────────────────────── -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">Marshall County &nbsp;·&nbsp; Oklahoma</div>
    <h1>Building a Stronger<br><em>Marshall County</em></h1>
    <p>We're neighbors working together for better schools, higher wages, and a more effective government that represents everyone in Marshall County, Oklahoma. Join us.</p>
    <div class="hero-actions">
      <a href="${site.contact.phoneSms}" class="btn-primary" data-track="click-hero-sms">Text HOWDY to 580-440-0055</a>
      <a href="/meeting.ics" class="btn-ghost" data-track="click-hero-next-meeting">Add to Calendar</a>
    </div>
  </div>
</section>`;
}

function meetingBand(site) {
  return `<!-- ── MEETING BAND ─────────────────────────────────────── -->
<div class="meeting-band">
  <p>📅 &nbsp;<strong>Next Meeting:</strong> ${site.meeting.schedule} &nbsp;·&nbsp; ${site.meeting.time} &nbsp;·&nbsp; ${site.meeting.address}, ${site.meeting.city} — <a href="#meetings" style="color:#fff;text-decoration:underline;" data-track="click-banner-meeting-details">Details ↓</a></p>
</div>`;
}

function contactSection(site) {
  return `<!-- ── CONTACT ───────────────────────────────────────────── -->
<section class="contact" id="contact">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Reach Out</div>
      <h2 class="section-title">Contact Us</h2>
      <div class="rule"></div>
      <p class="section-body">Have a question, want to get involved, or just want to say hello? Reach out — we'd love to hear from you.</p>
    </div>
    <div class="contact-grid reveal" style="transition-delay:0.15s">
      <a href="${site.forms.volunteer}" class="contact-item" target="_blank" rel="noopener" data-track="click-contact-email">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7EB3E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <div class="contact-info">
          <strong>Email</strong>
          <span>${site.contact.email}</span>
        </div>
      </a>
      <a href="${site.contact.phoneTel}" class="contact-item" data-track="click-contact-phone">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7EB3E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
          </svg>
        </div>
        <div class="contact-info">
          <strong>Phone</strong>
          <span>${site.contact.phone}</span>
        </div>
      </a>
      <a href="${site.contact.facebookPage}" class="contact-item" target="_blank" rel="noopener" data-track="click-contact-facebook-page">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7EB3E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </div>
        <div class="contact-info">
          <strong>Facebook Page</strong>
          <span>Follow Us</span>
        </div>
      </a>
      <a href="${site.contact.facebookGroup}" class="contact-item" target="_blank" rel="noopener" data-track="click-contact-facebook-group">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7EB3E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </div>
        <div class="contact-info">
          <strong>Facebook Group</strong>
          <span>Join the Conversation</span>
        </div>
      </a>
    </div>
  </div>
</section>`;
}

function precinctCta() {
  return `<!-- ── FIND YOUR PRECINCT ────────────────────────────────── -->
<section class="precinct-cta" id="precincts">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Organize Your Neck of the Woods</div>
      <h2 class="section-title">Find Your Precinct</h2>
      <div class="rule"></div>
      <p class="section-body">Marshall County is divided into 9 voting precincts. Every precinct needs Democratic Precinct Officers — leaders who knocks doors, turns out voters, and represent their community. Find yours and see how you can help.</p>
      <a href="precincts.html" class="btn-primary" style="display:inline-block; margin-top:1.5rem;" data-track="click-precinct-cta-open-map">Open the Precinct Map →</a>
    </div>
    <div class="precinct-map-preview reveal" style="transition-delay:0.15s">
      <div class="precinct-map-preview-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>Interactive Precinct Map</span>
      </div>
      <div class="precinct-map-preview-body">
        <p>Enter your address to instantly see which of Marshall County's 9 voting precincts you live in — then sign up to become a Precinct Officer.</p>
        <ul class="precinct-steps">
          <li><span class="step-num">1</span> Enter your Marshall County address</li>
          <li><span class="step-num">2</span> Your precinct is highlighted on the map</li>
          <li><span class="step-num">3</span> Click to become a Precinct Officer candidate</li>
        </ul>
        <a href="precincts.html" class="btn-primary" style="display:block; text-align:center;" data-track="click-precinct-preview-open-map">Open Precinct Map →</a>
      </div>
    </div>
  </div>
</section>`;
}

function meetingsSection(site) {
  return `<!-- ── MEETINGS ──────────────────────────────────────────── -->
<section class="meeting" id="meetings">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Monthly Meetings</div>
      <h2 class="section-title">Come to a Meeting</h2>
      <div class="rule"></div>
      <p class="section-body">Our regular monthly meetings are open to all Democrats and interested community members in Marshall County. Come hear what we're working on, meet your neighbors, and have a voice in local Democratic Party decisions.</p>
      <p class="section-body" style="margin-top:1rem;">No registration required — just show up.</p>
    </div>
    <div class="meeting-card reveal" style="transition-delay:0.15s">
      <div class="meeting-card-header">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <h3>Regular Meeting Details</h3>
      </div>
      <div class="meeting-card-body">
        <div class="meeting-detail">
          <div class="detail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="detail-text">
            <strong>When</strong>
            <span>${site.meeting.schedule}</span>
          </div>
        </div>
        <div class="meeting-detail">
          <div class="detail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="detail-text">
            <strong>Time</strong>
            <span>${site.meeting.time}</span>
          </div>
        </div>
        <div class="meeting-detail">
          <div class="detail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="detail-text">
            <strong>Location</strong>
            <span>${site.meeting.address}</span>
            <a href="${site.meeting.mapsUrl}" target="_blank" rel="noopener" data-track="click-meeting-view-map">${site.meeting.city} — View Map ↗</a>
          </div>
        </div>
        <div class="meeting-detail" style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid #eee">
          <div class="detail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0232C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="detail-text">
            <strong>Questions?</strong>
            <a href="mailto:${site.contact.email}" data-track="click-meeting-email">${site.contact.email}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function resourcesSection() {
  return `<!-- ── VOTER RESOURCES ──────────────────────────────────── -->
<section class="resources" id="register">
  <div class="section-inner">
    <div class="resources-intro reveal">
      <div class="section-label">Civic Participation</div>
      <h2 class="section-title">Your Voice Matters</h2>
      <div class="rule"></div>
      <p class="section-body">Democracy works when everyone participates. Make sure you're registered, stay informed about upcoming elections, and encourage your neighbors to do the same.</p>
    </div>

    <div class="resource-card reveal" style="transition-delay:0.1s">
      <div class="resource-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      </div>
      <h3>Register to Vote</h3>
      <p>Oklahoma makes it easy to register or update your voter registration online. Check your registration status and sign up at the official Oklahoma Voter Registration Portal.</p>
      <a href="https://okvoterportal.okelections.gov/" target="_blank" rel="noopener" class="resource-link" data-track="click-resource-voter-portal">
        Oklahoma Voter Portal
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>

    <div class="resource-card red-top reveal" style="transition-delay:0.2s">
      <div class="resource-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0232C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <h3>Upcoming Elections</h3>
      <p>Stay informed about every election on your ballot — from local races to statewide and national contests. The Oklahoma State Election Board posts official dates and information.</p>
      <a href="https://oklahoma.gov/elections/elections-results/next-election.html" target="_blank" rel="noopener" class="resource-link" style="color:var(--red)" data-track="click-resource-next-election">
        View Next Election
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>

    <div class="resource-card reveal" style="transition-delay:0.3s">
      <div class="resource-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
      <h3>Find Your Precinct</h3>
      <p>Enter your address on our interactive precinct map to see which voting precinct you live in — and find out how you can help lead Democrats in your neighborhood as a Precinct Officer.</p>
      <a href="precincts.html" class="resource-link" data-track="click-resource-precinct-map">
        Open Precinct Map
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </div>
</section>`;
}

export function render(site) {
  const body = [
    hero(site),
    meetingBand(site),
    contactSection(site),
    precinctCta(),
    meetingsSection(site),
    resourcesSection(),
  ].join('\n\n');

  const scripts = `<script>
${analyticsTracking}

  // Year
${yearScript}

  // Scroll reveal
${scrollRevealScript}
</script>`;

  return renderPage(site, {
    title: 'Marshall County Democrats',
    header: headerMain(site),
    body,
    footer: footerFull(site),
    scripts,
  });
}
