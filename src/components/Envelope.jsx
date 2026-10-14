import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../config.js';

/**
 * Section I — the sealed envelope.
 *
 * Opening sequence (≈3.4 s):
 *   crack  → the wax seal splits in two and falls away
 *   flap   → the flap folds back in 3D
 *   card   → the invitation slides up out of the envelope
 *   then   → onOpened() hands over to the page
 *
 * Art: the wax seal is cut out of the supplied wax-seal photograph (hero-seal.png);
 * the envelope paper and wooden table are sampled from the same photograph.
 */

const FLAP = 'polygon(0 0, 100% 0, 50% 100%)';
// The lining face is pre-rotated 180° about the X axis, so its outline is drawn upside-down
// — once the flap has folded back, the wide edge sits on the hinge and the point faces away.
const FLAP_LINING = 'polygon(50% 0, 0 100%, 100% 100%)';
const EASE = [0.22, 1, 0.36, 1];

function PaperPiece({ clip, shade, className = '', style = {} }) {
  // Wrapper carries the drop-shadow (clip-path would cut it off if applied on the same node)
  return (
    <div className={`absolute inset-0 ${className}`} style={{ filter: 'drop-shadow(0 0 2.5px rgba(61,11,18,.38))', ...style }}>
      <div className="envelope-paper absolute inset-0" style={{ clipPath: clip }}>
        <div className="absolute inset-0" style={{ background: shade }} />
      </div>
    </div>
  );
}

export default function Envelope({ onBreak, onOpened }) {
  const [phase, setPhase] = useState('idle'); // idle | crack | flap | card
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = useCallback(() => {
    if (phase !== 'idle') return;
    onBreak?.();
    setPhase('crack');
    timers.current.push(
      setTimeout(() => setPhase('flap'), 550),
      setTimeout(() => setPhase('card'), 1650),
      setTimeout(() => onOpened?.(), 3500)
    );
  }, [phase, onBreak, onOpened]);

  const flapOpen = phase === 'flap' || phase === 'card';
  const cardUp = phase === 'card';
  const cracked = phase !== 'idle';

  return (
    <motion.section
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "url('/assets/hero-wood.jpg') center / 100% 100% no-repeat, #5b3d22",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
      transition={{ duration: 1.1, ease: EASE }}
      aria-label="Sealed invitation envelope"
    >
      {/* candle-lit vignette over the table */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(255,214,150,.22) 0%, transparent 55%), radial-gradient(ellipse at center, transparent 40%, rgba(20,8,4,.7) 100%)',
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: cracked ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: cracked ? 0 : 0.4 }}
        className="relative mb-[7vh] px-6 text-center font-display text-[0.8rem] uppercase tracking-[0.42em] text-parchment-200"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,.7)' }}
      >
        A letter awaits
      </motion.p>

      {/* ── the envelope ── */}
      <motion.div
        className="relative"
        style={{ width: 'min(88vw, 680px)', aspectRatio: '7 / 5', perspective: 1500, containerType: 'inline-size' }}
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: cracked ? 0 : -1.2 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* soft contact shadow on the table */}
        <div
          className="absolute -bottom-[7%] left-[6%] right-[6%] h-[14%] rounded-[50%] bg-black/60 blur-2xl"
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={!cracked ? { y: [0, -7, 0] } : { y: 0 }}
          transition={!cracked ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.6 }}
        >
          {/* back panel — forest-green lining shows once the flap lifts */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(45deg, rgba(197,160,89,.10) 0 1px, transparent 1px 11px), repeating-linear-gradient(-45deg, rgba(197,160,89,.10) 0 1px, transparent 1px 11px), linear-gradient(180deg, #1e3e32, #142b23)',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,.8)',
              clipPath: 'inset(0 round 3px)',
            }}
          />

          {/* the letter */}
          <motion.div
            className="absolute"
            style={{
              left: '6%',
              right: '6%',
              top: '9%',
              aspectRatio: '975 / 650',
              zIndex: 10,
              background: "url('/assets/card-frame.jpg') center / 100% 100% no-repeat",
              filter: 'drop-shadow(0 8px 10px rgba(0,0,0,.35))',
            }}
            initial={false}
            animate={{ y: cardUp ? '-46%' : '0%' }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            <div className="absolute inset-[26%_22%] flex flex-col items-center justify-center text-center">
              <span className="font-cinzel text-[1.7cqw] uppercase tracking-[0.34em] text-gilt-dark">You are invited</span>
              <span className="mt-[0.8cqw] font-script text-[5.2cqw] leading-none text-burgundy-crimson">
                {invitation.partnerOne.split(' ')[0]} <span className="gold-text">&amp;</span> {invitation.partnerTwo.split(' ')[0]}
              </span>
            </div>
          </motion.div>

          {/* front pocket: left, right, bottom folds */}
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            <PaperPiece
              clip="polygon(0 0, 52% 55%, 0 100%)"
              shade="linear-gradient(100deg, rgba(61,11,18,.18), rgba(255,255,255,.05) 70%)"
            />
            <PaperPiece
              clip="polygon(100% 0, 48% 55%, 100% 100%)"
              shade="linear-gradient(260deg, rgba(61,11,18,.2), rgba(255,255,255,.05) 70%)"
            />
            <PaperPiece
              clip="polygon(-1% 100.5%, 50% 47%, 101% 100.5%)"
              shade="linear-gradient(0deg, rgba(61,11,18,.22), rgba(255,255,255,.12) 80%)"
            />
          </div>

          {/* flap — two faces so the inside is visible after the fold */}
          <motion.div
            className="absolute left-0 right-0 top-0"
            style={{ height: '58%', transformOrigin: '50% 0%', transformStyle: 'preserve-3d', zIndex: 30 }}
            initial={false}
            animate={{ rotateX: flapOpen ? 180 : 0, zIndex: flapOpen ? 5 : 30 }}
            transition={{
              rotateX: { duration: 1.15, ease: [0.5, 0, 0.2, 1] },
              zIndex: { delay: flapOpen ? 0.5 : 0, duration: 0 },
            }}
          >
            {/* outside face */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', filter: 'drop-shadow(0 6px 5px rgba(61,11,18,.4))' }}
            >
              <div className="envelope-paper absolute inset-0" style={{ clipPath: FLAP }}>
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.14), rgba(61,11,18,.16))' }}
                />
              </div>
            </div>
            {/* inside (lining) face */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath: FLAP_LINING,
                  background:
                    'repeating-linear-gradient(45deg, rgba(197,160,89,.12) 0 1px, transparent 1px 11px), repeating-linear-gradient(-45deg, rgba(197,160,89,.12) 0 1px, transparent 1px 11px), linear-gradient(0deg, #1e3e32, #142b23)',
                }}
              />
            </div>
          </motion.div>

          {/* ── the wax seal ── */}
          <div
            className="absolute"
            style={{ left: '50%', top: '55%', width: 'max(23%, 96px)', aspectRatio: '1', transform: 'translate(-50%, -50%)', zIndex: 40 }}
          >
            {!cracked ? (
              <motion.button
                type="button"
                onClick={open}
                onDragEnd={(_, info) => Math.hypot(info.offset.x, info.offset.y) > 55 && open()}
                drag
                dragSnapToOrigin
                dragElastic={0.3}
                whileHover={{ scale: 1.07, rotate: -3 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Break the wax seal to open the invitation"
                className="animate-shimmer relative block h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0"
                style={{ touchAction: 'none' }}
              >
                <img
                  src="/assets/hero-seal.png"
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none"
                  style={{ filter: 'drop-shadow(0 8px 8px rgba(0,0,0,.55))' }}
                />
              </motion.button>
            ) : (
              <>
                {['left', 'right'].map((side) => (
                  <motion.img
                    key={side}
                    src="/assets/hero-seal.png"
                    alt=""
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none"
                    style={{
                      clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
                      transformOrigin: side === 'left' ? '30% 80%' : '70% 80%',
                      filter: 'drop-shadow(0 8px 8px rgba(0,0,0,.55))',
                    }}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      x: side === 'left' ? '-34%' : '34%',
                      y: '95%',
                      rotate: side === 'left' ? -28 : 28,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.95, ease: [0.4, 0, 0.9, 0.6] }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: cracked ? 0 : 1 }}
        transition={{ duration: 0.8, delay: cracked ? 0 : 1.4 }}
        className="relative mt-[8vh] px-6 text-center font-serif text-lg italic tracking-wide text-parchment-200"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,.7)' }}
      >
        Touch the seal to unfold your invitation
      </motion.p>
    </motion.section>
  );
}
