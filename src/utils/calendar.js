// Calendar helpers — all times are written in UTC (…Z) so they're exact everywhere.

const pad = (n) => String(n).padStart(2, '0');
const toUtc = (d) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
  `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

export function buildEvent(inv) {
  const start = new Date(inv.weddingDate);
  const end = new Date(start.getTime() + inv.durationHours * 3600 * 1000);
  return {
    title: `Wedding of ${inv.partnerOne} & ${inv.partnerTwo}`,
    start,
    end,
    location: `${inv.venueName}, ${inv.addressLines.join(', ')}`,
    details: `${inv.hosts} — you are cordially invited to celebrate the union of ${inv.partnerOne} and ${inv.partnerTwo}. ${inv.reception}. ${inv.dressCode}.`,
  };
}

export function googleCalendarUrl(ev) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${toUtc(ev.start)}/${toUtc(ev.end)}`,
    details: ev.details,
    location: ev.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

export function downloadIcs(ev, filename = 'wedding-invitation.ics') {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Victorian Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${toUtc(ev.start)}-victorian-invitation@local`,
    `DTSTAMP:${toUtc(new Date())}`,
    `DTSTART:${toUtc(ev.start)}`,
    `DTEND:${toUtc(ev.end)}`,
    `SUMMARY:${esc(ev.title)}`,
    `DESCRIPTION:${esc(ev.details)}`,
    `LOCATION:${esc(ev.location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:The wedding is tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
