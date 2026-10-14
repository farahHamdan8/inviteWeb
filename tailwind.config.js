/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Display caps for headings & labels
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        // Body copy
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Calligraphic names
        script: ['"Pinyon Script"', '"Cormorant Garamond"', 'cursive'],
      },
      colors: {
        parchment: {
          50: '#FBF8F3',
          100: '#F7F2EB',
          200: '#EFE6D8',
          300: '#E2D3BC',
          400: '#CDB896',
        },
        burgundy: {
          DEFAULT: '#3D0B12',
          crimson: '#4A0E17',
          700: '#5E1420',
          500: '#7A1C2B',
        },
        forest: {
          DEFAULT: '#142B23',
          700: '#1E3E32',
        },
        gilt: {
          DEFAULT: '#C5A059', // burnished gold
          bright: '#D4AF37', // antique gold
          dark: '#8C6B1F', // legible gold for small text on parchment
          pale: '#E8D5A3',
        },
        wood: '#6B4A2B',
      },
      boxShadow: {
        // Engraved / embossed paper rather than flat "card" shadows
        emboss:
          'inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(61,11,18,.18), 0 1px 0 rgba(255,255,255,.4), 0 14px 30px -12px rgba(61,11,18,.45)',
        plate:
          '0 2px 0 rgba(255,255,255,.5) inset, 0 0 0 1px rgba(140,107,31,.55), 0 0 0 7px #F7F2EB, 0 0 0 8px rgba(140,107,31,.5), 0 28px 50px -22px rgba(61,11,18,.55)',
        glow: '0 0 22px rgba(212,175,55,.45)',
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'note-rise': {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(.8)' },
          '30%': { opacity: '.9' },
          '100%': { opacity: '0', transform: 'translateY(-26px) scale(1.1)' },
        },
        shimmer: {
          '0%, 100%': { filter: 'drop-shadow(0 0 0 rgba(212,175,55,0))' },
          '50%': { filter: 'drop-shadow(0 0 10px rgba(212,175,55,.7))' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 5s linear infinite',
        'note-rise': 'note-rise 2.4s ease-out infinite',
        shimmer: 'shimmer 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
