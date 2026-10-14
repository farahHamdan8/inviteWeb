import { motion } from 'framer-motion';
import { invitation } from '../config.js';
import { dateParts } from '../utils/format.js';
import { Flourish } from './Ornaments.jsx';
import Reveal from './Reveal.jsx';

/**
 * Section II — the invitation proper, set inside the gilt-framed art.
 * Everything inside the frame is sized in `cqw` (container width) so it scales
 * with the card instead of reflowing.
 */
export default function InvitationCard() {
  const d = dateParts(invitation);

  return (
    <section id="invitation" className="relative px-4 pb-10 pt-24 sm:px-8 sm:pt-28 md:pt-32">
      <Reveal className="mx-auto mb-10 text-center md:mb-14">
        <p className="small-caps-label text-gilt-dark">By the Pleasure of Two Families</p>
      </Reveal>

      <Reveal y={46}>
        <motion.div
          className="frame-card"
          style={{ containerType: 'inline-size' }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="frame-card__content">
            <p className="hidden font-cinzel uppercase tracking-[0.2em] text-gilt-dark md:block md:text-[1.3cqw]">
              {invitation.hosts}
            </p>

            <h2 className="font-script text-[7.4cqw] leading-[1.05] text-burgundy-crimson engraved md:mt-[0.9cqw] md:text-[4.9cqw]">
              {invitation.partnerOne}
            </h2>
            <span
              className="gold-text my-[0.3cqw] font-display text-[5.2cqw] leading-none md:text-[3cqw]"
              aria-label="and"
            >
              &amp;
            </span>
            <h2 className="font-script text-[7.4cqw] leading-[1.05] text-burgundy-crimson engraved md:text-[4.9cqw]">
              {invitation.partnerTwo}
            </h2>

            <Flourish className="my-[1.6cqw] w-[26cqw] md:my-[0.8cqw] md:w-[16cqw]" />

            <p className="max-w-[96%] font-serif text-[3.9cqw] italic leading-[1.26] text-burgundy md:text-[1.9cqw]">
              request the pleasure of your company at the celebration of their union
            </p>

            <p className="mt-[2cqw] font-cinzel text-[2.7cqw] uppercase leading-[1.5] tracking-[0.12em] text-burgundy-crimson md:mt-[0.9cqw] md:text-[1.35cqw] md:tracking-[0.16em]">
              {d.weekday}, {d.dayOrdinal} {d.month}
              <br className="md:hidden" /> <span className="hidden md:inline">·</span> {d.year} · {d.time}
            </p>

            <p className="mt-[0.5cqw] hidden font-serif text-[1.5cqw] italic text-gilt-dark md:block">
              {invitation.reception}
            </p>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
