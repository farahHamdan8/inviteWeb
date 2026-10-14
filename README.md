# Victorian Wedding Invitation

An interactive 19th-century-style wedding invitation: a sealed envelope you break open, a gilt-framed
invitation card, a pocket-watch countdown with turning brass gears, and venue details with map and
calendar buttons. Built with **React + Vite + Tailwind CSS + Framer Motion**.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run zip        # re-create project.zip (without node_modules / dist)
```

## Personalise it

Everything personal lives in **`src/config.js`**: names, wedding date/time (with UTC offset, so the
countdown and calendar are exact for every guest), venue, address, map query, extra lines and audio settings.

## File tree

```
victorian-invitation/
├── index.html                    Google Fonts: Cinzel, Cinzel Decorative, Cormorant Garamond, Pinyon Script
├── package.json
├── vite.config.js
├── tailwind.config.js            Victorian fonts, parchment / burgundy / forest / gilt palette, embossed shadows
├── postcss.config.js
├── scripts/make-zip.mjs          `npm run zip`
├── public/
│   ├── favicon.svg
│   ├── audio/                    ← drop ambient.mp3 here (see README.txt)
│   └── assets/
│       ├── hero-seal.png         wax seal cut out of the seal photograph (transparent)
│       ├── hero-parchment.jpg    envelope paper, sampled from the seal photograph
│       ├── hero-wood.jpg         tabletop, sampled from the seal photograph
│       ├── seal-original.jpg     the untouched seal photograph
│       ├── card-frame.jpg        gilt frame, cropped (landscape) — invitation card
│       ├── card-frame-portrait.jpg   same crop rotated 90° for phones
│       ├── frame.jpg             the untouched frame image
│       ├── watch.jpg             pocket watch — countdown section
│       └── venue.jpg             architectural engraving — venue section
└── src/
    ├── main.jsx
    ├── App.jsx                   stage logic: sealed → opened, audio wiring
    ├── config.js                 ← edit me
    ├── styles.css                Tailwind layers, parchment grain, gilt frame, embossed buttons
    ├── hooks/
    │   ├── useAmbientAudio.js    HTML5 Audio + fades; synthesised piano fallback if no mp3
    │   └── useCountdown.js
    ├── utils/
    │   ├── format.js             venue-timezone date formatting
    │   └── calendar.js           Google Calendar link + .ics download
    └── components/
        ├── MusicToggle.jsx       floating spinning-vinyl toggle, top-right
        ├── Envelope.jsx          Section I  — seal, 3D flap, rising letter
        ├── InvitationCard.jsx    Section II — gilt-framed invitation
        ├── Countdown.jsx         Section III — pocket watch + gear dials
        ├── GearDial.jsx
        ├── Venue.jsx             Section IV — engraving, details, map & calendar
        ├── Footer.jsx
        ├── Ornaments.jsx         SVG flourish + sprig
        └── Reveal.jsx            scroll-reveal wrapper
```

## Asset mapping

| Brief file name                          | Your upload                              | Used as                                   |
|------------------------------------------|------------------------------------------|-------------------------------------------|
| `watermarked_img_15383022726334697102`   | `Gemini_Generated_Image_…_3.jpg` (wax seal) | Hero: seal, envelope paper, wooden table |
| `watermarked_img_13125629691814571816`   | `Gemini_Generated_Image_…_2.jpg` (gilt frame) | Invitation card frame                  |
| `watermarked_img_1276289514259325843`    | `Gemini_Generated_Image_…_1.jpg` (pocket watch) | Countdown plate                      |
| `watermarked_img_14210668965624366131`   | `Gemini_Generated_Image_….jpg` (ballroom)  | Venue plate                              |

To swap an image, replace the file in `public/assets/` keeping the same name.

## Music

Put a royalty-free track at `public/audio/ambient.mp3`. Without it, a soft synthesised piano loop plays
instead. Music starts when the guest breaks the seal (set `startOnOpen: false` in `config.js` to make it opt-in)
and can be toggled with the record in the top-right corner.
