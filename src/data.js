export const site = {
  name: 'Marshall County Democrats',
  url: 'https://mcdemocrats.com',
  description:
    'Neighbors working together for better schools, higher wages, and a more effective government that represents everyone in Marshall County, Oklahoma.',
  ogImage: 'https://mcdemocrats.com/og-image.png',

  contact: {
    email: 'info@mcdemocrats.com',
    phone: '(580) 440-0055',
    phoneTel: 'tel:+15804400055',
    phoneSms: 'sms:+15804400055',
    facebookPage: 'https://www.facebook.com/profile.php?id=61588854121722',
    facebookGroup: 'https://www.facebook.com/groups/mcdemocrats',
  },

  meeting: {
    schedule: 'Second Tuesday of every month',
    time: '6:00 PM',
    address: '14 S Main St',
    city: 'Kingston, OK 73439',
    mapsUrl: 'https://maps.google.com/?q=14+S+Main+St+Kingston+OK+73439',
  },

  posthog: {
    key: 'phc_wAtyDUxEMvLY6Pwc3s2aY4QR4ZUfZTHZXCTLUYS9ywVw',
    host: 'https://us.i.posthog.com',
    defaults: '2026-01-30',
  },

  forms: {
    volunteer: 'https://forms.gle/eVAyfFj7He2GyoqdA',
    precinctOfficer: 'https://forms.gle/b8UpdVnUXjaKmRqU7',
  },

  nav: [
    { href: '#precincts', label: 'Find Your Precinct', track: 'click-nav-find-precinct' },
    { href: '#meetings',  label: 'Meetings',            track: 'click-nav-meetings' },
    { href: '#register',  label: 'Vote',                track: 'click-nav-vote' },
    { href: '#contact',   label: 'Contact',             track: 'click-nav-contact' },
  ],
};
