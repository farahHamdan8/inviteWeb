import { useId, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Build a toothed-gear outline as an SVG path. */
function gearPath(cx, cy, rOuter, rRoot, teeth) {
  const step = (Math.PI * 2) / teeth;
  const pt = (r, a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = '';
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    d += `${i === 0 ? 'M' : 'L'}${pt(rRoot, a - step * 0.3)} L${pt(rOuter, a - step * 0.16)} L${pt(rOuter, a + step * 0.16)} L${pt(rRoot, a + step * 0.3)} `;
  }
  return `${d}Z`;
}

/**
 * One antique countdown dial: a slowly turning brass gear around a still parchment face.
 * `period` is seconds per revolution; `reverse` makes neighbouring gears mesh visually.
 */
export default function GearDial({ value, label, period = 40, reverse = false, teeth = 20 }) {
  const uid = useId().replace(/:/g, '');
  const path = useMemo(() => gearPath(100, 100, 98, 88, teeth), [teeth]);
  const text = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-[min(40vw,190px)]">
        {/* turning gear */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full drop-shadow-[0_10px_10px_rgba(61,11,18,0.35)]"
          style={{
            animation: `gear-spin ${period}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1dd9a" />
              <stop offset=".35" stopColor="#c5a059" />
              <stop offset=".7" stopColor="#8c6b1f" />
              <stop offset="1" stopColor="#d4af37" />
            </linearGradient>
          </defs>
          <path d={path} fill={`url(#g${uid})`} stroke="#5e4412" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#5e4412" strokeOpacity=".55" strokeWidth="1" />
          <circle cx="100" cy="100" r="74" fill="none" stroke="#f6e7b0" strokeOpacity=".7" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            return (
              <circle key={i} cx={100 + 77 * Math.cos(a)} cy={100 + 77 * Math.sin(a)} r="2.1" fill="#5e4412" fillOpacity=".75" />
            );
          })}
        </svg>

        {/* still face */}
        <div
          className="absolute inset-[15%] flex items-center justify-center overflow-hidden rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 28%, #fbf8f3 0%, #f1e7d3 60%, #e2d3bc 100%)',
            boxShadow: 'inset 0 4px 10px rgba(61,11,18,.35), inset 0 -2px 4px rgba(255,255,255,.7), 0 0 0 2px #8c6b1f, 0 0 0 4px #e8d5a3',
          }}
        >
          <div className="pointer-events-none absolute inset-[7%] rounded-full border border-dashed border-gilt-dark/40" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text}
              initial={{ y: '55%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-55%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.9rem,8.5vw,3.1rem)] font-bold leading-none text-burgundy-crimson engraved"
              aria-hidden="true"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <p className="small-caps-label mt-4 text-gilt-dark">
        <span className="sr-only">{value} </span>
        {label}
      </p>
    </div>
  );
}
