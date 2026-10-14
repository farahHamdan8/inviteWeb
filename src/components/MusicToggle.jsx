import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

/** Floating gramophone-record toggle (top-right). Spins and releases drifting notes while playing. */
export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      className="fixed right-4 top-4 z-[60] h-14 w-14 rounded-full sm:right-6 sm:top-6"
      style={{
        background: 'radial-gradient(circle at 30% 25%, #6e1220, #3d0b12 70%)',
        boxShadow:
          '0 0 0 1px #c5a059, 0 0 0 4px rgba(61,11,18,.85), 0 0 0 5px rgba(197,160,89,.6), 0 10px 22px rgba(0,0,0,.45)',
      }}
    >
      {/* the record */}
      <span className={`absolute inset-[5px] block rounded-full ${playing ? 'animate-spin-slow' : ''}`}>
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="32" r="31" fill="#150a0c" />
          {[27, 23, 19].map((r) => (
            <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="#c5a059" strokeOpacity=".22" strokeWidth=".7" />
          ))}
          <path d="M8 22 A26 26 0 0 1 22 8" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="11" fill="#c5a059" />
          <circle cx="32" cy="32" r="8.5" fill="none" stroke="#6e1220" strokeWidth=".8" />
          <circle cx="32" cy="32" r="2" fill="#150a0c" />
        </svg>
      </span>

      {/* drifting notes */}
      {playing && (
        <>
          <Music2 className="animate-note-rise pointer-events-none absolute -left-3 -top-2 h-4 w-4 text-gilt-bright" />
          <Music2
            className="animate-note-rise pointer-events-none absolute -bottom-3 left-1 h-3.5 w-3.5 text-gilt"
            style={{ animationDelay: '1.2s' }}
          />
        </>
      )}
    </motion.button>
  );
}
