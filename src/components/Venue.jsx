import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarPlus, ChevronDown, Download, MapPin } from 'lucide-react';
import { invitation } from '../config.js';
import { dateParts } from '../utils/format.js';
import { buildEvent, downloadIcs, googleCalendarUrl } from '../utils/calendar.js';
import { Flourish, Sprig } from './Ornaments.jsx';
import Reveal from './Reveal.jsx';

/** Section IV — venue, date and the two actions. */
export default function Venue() {
  const d = dateParts(invitation);
  const event = buildEvent(invitation);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // close the calendar menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <section id="venue" className="relative md:text-left text-center  px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-12  md:gap-8">
        {/* architectural engraving — slightly askew, like a tipped-in plate */}
        <Reveal y={50} className="md:col-span-7 mt-16">
          <div className="plate -rotate-[1.2deg] overflow-hidden">
            <img
              src="/assets/venue.jpg"
              alt="Architectural elevation of the Grande Ballroom façade, established 1878"
              loading="lazy"
            />
          </div>
          <div className='flex gap-0 items-center justify-center'>
            <div className="plate -rotate-[1.2deg] overflow-hidden mt-10 w-[30%] h-full">
            <img
              src="/assets/venue2.jpg"
              alt="Architectural elevation of the Grande Ballroom façade, established 1878"
              loading="lazy"
            />
          </div>
            <div className="plate -rotate-[1.2deg] overflow-hidden mt-10 w-[30%] h-full">
            <img
              src="/assets/venue3.jpg"
              alt="Architectural elevation of the Grande Ballroom façade, established 1878"
              loading="lazy"
            />
          </div>
            <div className="plate -rotate-[1.2deg] overflow-hidden mt-10 w-[30%] h-full">
            <img
              src="/assets/venue2.jpg"
              alt="Architectural elevation of the Grande Ballroom façade, established 1878"
              loading="lazy"
            />
          </div>
          </div>
          
        </Reveal>

        <div className="md:col-span-5 mt-16   mx-auto  md:pl-6 lg:pl-10  ">
          <Reveal delay={0.1} className="text-center">
            <Sprig className="mb-4 h-7 w-28 mx-auto" />
            <p className="small-caps-label text-gilt-dark">The Celebration</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-[0.04em] text-burgundy-crimson engraved sm:text-4xl">
              {invitation.venueName}
            </h2>
            <p className="mt-2 font-serif text-xl italic text-gilt-dark">{invitation.venueNote}</p>
            <Flourish className="my-7 w-52 mx-auto" />
          </Reveal>

          <Reveal delay={0.2} className="text-center">
            <div className="flex items-center justify-center gap-5">
              <span className="gold-text font-display text-7xl font-bold leading-none sm:text-8xl">{d.day}</span>
              <div className="pb-2 font-cinzel uppercase leading-snug tracking-[0.18em] text-burgundy-crimson">
                <div className="text-sm">{d.weekday}</div>
                <div className="text-lg">{d.month}</div>
                <div className="text-sm text-gilt-dark">{d.year}</div>
              </div>
            </div>

            <p className="mt-6 font-serif text-xl text-burgundy">
              Ceremony at <strong className="font-semibold">{d.time}</strong>
            </p>
            <address className="mt-3 not-italic font-serif text-lg leading-relaxed text-burgundy/85">
              {invitation.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-5 font-serif text-lg italic text-burgundy/75">{invitation.reception}</p>
            <p className="font-serif text-lg italic text-burgundy/75">{invitation.dressCode}</p>
          </Reveal>

          
        </div>
      </div>
    </section>
  );
}
