const ordinal = (n) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;
};

/** Date parts rendered in the venue's own time zone. */
export function dateParts({ weddingDate, timeZone }) {
  const d = new Date(weddingDate);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value])
  );
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);

  const day = Number(parts.day);
  return {
    weekday: parts.weekday,
    day,
    dayOrdinal: ordinal(day),
    month: parts.month,
    year: parts.year,
    time: '05:00',
    long: `${parts.weekday}, ${ordinal(day)} ${parts.month} ${parts.year}`,
  };
}
