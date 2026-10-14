/** Ornamental divider: two scrolling curls either side of a gilt diamond. */
export function Flourish({ className = '', color = '#C5A059' }) {
  return (
    <svg
      viewBox="0 0 320 24"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 12 H112" />
      <path d="M208 12 H314" />
      <path d="M112 12 C122 12 126 5 134 5 C141 5 142 12 137 13 C132 14 131 9 135 9" />
      <path d="M208 12 C198 12 194 5 186 5 C179 5 178 12 183 13 C188 14 189 9 185 9" />
      <path d="M112 12 C122 12 126 19 134 19 C141 19 142 12 137 11 C132 10 131 15 135 15" />
      <path d="M208 12 C198 12 194 19 186 19 C179 19 178 12 183 11 C188 10 189 15 185 15" />
      <path d="M160 2.5 L169 12 L160 21.5 L151 12 Z" fill={color} stroke="none" />
      <circle cx="3" cy="12" r="1.6" fill={color} stroke="none" />
      <circle cx="317" cy="12" r="1.6" fill={color} stroke="none" />
      <circle cx="145" cy="12" r="1.3" fill={color} stroke="none" />
      <circle cx="175" cy="12" r="1.3" fill={color} stroke="none" />
    </svg>
  );
}

/** Small laurel-ish sprig used above section titles. */
export function Sprig({ className = '', color = '#8C6B1F' }) {
  return (
    <svg viewBox="0 0 120 28" className={className} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <path d="M60 26 V8" />
      <path d="M60 8 C52 8 48 3 44 2 C45 8 50 12 60 12" fill={color} fillOpacity=".25" />
      <path d="M60 8 C68 8 72 3 76 2 C75 8 70 12 60 12" fill={color} fillOpacity=".25" />
      <path d="M60 18 C48 18 40 12 30 12 C34 20 46 23 60 22" fill={color} fillOpacity=".18" />
      <path d="M60 18 C72 18 80 12 90 12 C86 20 74 23 60 22" fill={color} fillOpacity=".18" />
      <path d="M4 22 H34 M86 22 H116" />
    </svg>
  );
}
