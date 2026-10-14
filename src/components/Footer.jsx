import { invitation } from '../config.js';
import { Flourish } from './Ornaments.jsx';
import Reveal from './Reveal.jsx';

export default function Footer() {
  const first = (n) => n.split(' ')[0];
  return (
    <footer className="relative px-6 pb-24 pt-10 text-center">
      <Reveal>
        <div className="flex flex-wrap gap-4 justify-center items-center mb-10" >
          <div className="plate -rotate-[1.2deg] overflow-hidden w-24 rounded-full h-24">
            <img src="public/assets/img1.jpg" alt="image" className="mx-auto w-24 rounded-full h-24" />
          </div>
          <div className="plate -rotate-[1.2deg] overflow-hidden w-24 rounded-full h-24">
            <img src="public/assets/img2.jpg" alt="image" className="mx-auto w-24 rounded-full h-24" />
          </div>
          <div className="plate -rotate-[1.2deg] overflow-hidden w-24 rounded-full h-24">
            <img src="public/assets/img3.jpg" alt="image" className="mx-auto w-24 rounded-full h-24" />
          </div>
          <div className="plate -rotate-[1.2deg] overflow-hidden w-24 rounded-full h-24">
            <img src="public/assets/img4.jpg" alt="image" className="mx-auto w-24 rounded-full h-24" />
          </div>
          <div className="plate -rotate-[1.2deg] overflow-hidden w-24 rounded-full h-24">
            <img src="public/assets/img5.jpg" alt="image" className="mx-auto w-24 rounded-full h-24" />
          </div>
         </div>
      </Reveal>
      <Reveal>
        <Flourish className="mx-auto w-64" />
        <p className="mt-8 font-script text-5xl text-burgundy-crimson engraved sm:text-6xl">
          {first(invitation.partnerOne)} <span className="gold-text">&amp;</span> {first(invitation.partnerTwo)}
        </p>
        <p className="small-caps-label mt-5 text-gilt-dark">With love &amp; anticipation</p>
      </Reveal>
    </footer>
  );
}
