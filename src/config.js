// ─────────────────────────────────────────────────────────────
//  Edit this file to personalise the invitation.
// ─────────────────────────────────────────────────────────────

export const invitation = {
  // Couple
  partnerOne: 'Eleanor Rosewood',
  partnerTwo: 'Edmund Ashford',

  // Hosts line shown above the names
  hosts: 'Together with their families',

  // Wedding start — ISO 8601 WITH a UTC offset, so the countdown and the
  // calendar entry are exact for every guest, wherever they are.
weddingDate: '2026-10-18T00:00:00+03:00',
timeZone: 'Asia/Gaza',
  // Length of the celebration in hours (calendar entry)
  durationHours: 7,

  // Venue
  venueName: 'The Grande Ballroom',
  venueNote: 'Established 1878',
  addressLines: ['14 Kensington Gardens', 'London, W2 4BH'],
  // Used to build the Google Maps link
  mapQuery: 'Grande Ballroom, 14 Kensington Gardens, London',

  // Extra lines
  reception: 'We look forward to honoring your presence.',
  dressCode: ' Stay well and blessed.',
};

// Audio: drop a royalty-free track at /public/audio/ambient.mp3.
// If the file is missing, a soft synthesised piano loop is used instead.
export const audio = {
  src: '/audio/ambient.m4a',
  volume: 0.45,
  // Start the music when the guest breaks the wax seal (a user gesture, so
  // browsers allow it). Set to false to keep it strictly opt-in.
  startOnOpen: true,
};
