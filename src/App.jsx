import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { audio as audioConfig } from './config.js';
import { useAmbientAudio } from './hooks/useAmbientAudio.js';
import MusicToggle from './components/MusicToggle.jsx';
import Envelope from './components/Envelope.jsx';
import InvitationCard from './components/InvitationCard.jsx';
import Countdown from './components/Countdown.jsx';
import Venue from './components/Venue.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useAmbientAudio({ src: audioConfig.src, volume: audioConfig.volume });

  // Lock scrolling while the envelope is sealed; start at the top once opened.
  useEffect(() => {
    document.body.classList.toggle('is-sealed', !opened);
    if (opened) window.scrollTo({ top: 0, behavior: 'instant' });
    return () => document.body.classList.remove('is-sealed');
  }, [opened]);

  const handleBreak = useCallback(() => {
    if (audioConfig.startOnOpen) music.play();
  }, [music]);

  return (
    <>
      <MusicToggle playing={music.playing} onToggle={music.toggle} />

      <AnimatePresence>
        {!opened && <Envelope key="envelope" onBreak={handleBreak} onOpened={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <motion.main
          className="paper-grain vignette relative min-h-screen overflow-x-clip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          <InvitationCard />
           <Venue />
          <Countdown />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
