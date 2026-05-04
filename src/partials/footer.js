// Full footer: two Facebook links + Privacy Policy link (index page)
export function footerFull(site) {
  return `<footer>
  <p>
    <strong style="color:#7EB3E8;">${site.name}</strong><br>
    <a href="mailto:${site.contact.email}" data-track="click-footer-email">${site.contact.email}</a> &nbsp;·&nbsp; <a href="${site.contact.phoneTel}" data-track="click-footer-phone">${site.contact.phone}</a> &nbsp;·&nbsp; <a href="${site.contact.facebookPage}" target="_blank" rel="noopener" data-track="click-footer-facebook-page">Facebook Page</a> &nbsp;·&nbsp; <a href="${site.contact.facebookGroup}" target="_blank" rel="noopener" data-track="click-footer-facebook-group">Facebook Group</a><br><br>
    Paid for by the Marshall County Democratic Party. Not authorized by any candidate or candidate's committee.<br>
    <a href="/privacy.html" data-track="click-footer-privacy">Privacy Policy</a><br>
    &copy; <span id="yr"></span> ${site.name} &nbsp;·&nbsp; <a href="http://mcdemocrats.com" data-track="click-footer-website">mcdemocrats.com</a>
  </p>
</footer>`;
}

// Simple footer: one Facebook link, no Privacy Policy link (privacy page)
export function footerSimple(site) {
  return `<footer>
  <p>
    <strong style="color:#7EB3E8;">${site.name}</strong><br>
    <a href="mailto:${site.contact.email}" data-track="click-footer-email">${site.contact.email}</a> &nbsp;·&nbsp; <a href="${site.contact.phoneTel}" data-track="click-footer-phone">${site.contact.phone}</a> &nbsp;·&nbsp; <a href="${site.contact.facebookPage}" target="_blank" rel="noopener" data-track="click-footer-facebook">Facebook</a><br><br>
    Paid for by the Marshall County Democratic Party. Not authorized by any candidate or candidate's committee.<br>
    &copy; <span id="yr"></span> ${site.name} &nbsp;·&nbsp; <a href="http://mcdemocrats.com" data-track="click-footer-website">mcdemocrats.com</a>
  </p>
</footer>`;
}
