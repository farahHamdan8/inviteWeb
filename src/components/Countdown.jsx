import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { invitation } from '../config.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { Flourish, Sprig } from './Ornaments.jsx';
import GearDial from './GearDial.jsx';
import Reveal from './Reveal.jsx';

/** Section III — the pocket-watch countdown. */
export default function Countdown() {
  const left = useCountdown(invitation.weddingDate);
  const plateRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: plateRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="countdown" className="relative px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Sprig className="mx-auto mb-4 h-7 w-28" />
          <h2 className="font-display text-3xl tracking-[0.06em] text-burgundy-crimson engraved sm:text-4xl md:text-5xl">
            The Hours Draw Near
          </h2>
          <Flourish className="mx-auto mt-5 w-56" />
        </Reveal>

        {/* pocket-watch plate */}
        <Reveal y={50} className="mx-auto mt-14 max-w-[760px]">
          <div ref={plateRef} className="plate overflow-hidden">
            <motion.div style={{ y, scale: 1.1 }}>
              <img
                src="/assets/watch.jpg"
                alt="An antique brass pocket watch resting on lace, dried roses and a burgundy wax seal"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Reveal>

        {/* gear dials */}
        <Reveal delay={0.1} className="relative mx-auto -mt-6 max-w-4xl sm:-mt-10">
          {left.done ? (
            <p className="py-10 text-center font-script text-5xl text-burgundy-crimson">The day is here — we cannot wait to see you.</p>
          ) : (
            <div
              role="timer"
              aria-live="off"
              className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 pt-14 md:grid-cols-4"
            >
              <GearDial value={left.days} label="Days" period={46} />
              <GearDial value={left.hours} label="Hours" period={36} reverse teeth={18} />
              <GearDial value={left.minutes} label="Minutes" period={46} teeth={22} />
              <GearDial value={left.seconds} label="Seconds" period={36} reverse teeth={16} />
            </div>
          )}
          <p className="mt-12 text-center font-serif text-xl italic text-burgundy/80">
            …until we are made one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
