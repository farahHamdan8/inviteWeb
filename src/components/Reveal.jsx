import { motion } from 'framer-motion';

/** Scroll reveal: fades up from a small y-offset the first time it enters the viewport. */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '' }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
