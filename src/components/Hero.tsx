
import React from 'react';
import { motion } from 'framer-motion';

import AsciiArt from './AsciiArt';
import IndicRainBackdrop from './IndicRainBackdrop';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center bg-brand-dark">
      {/* Full-bleed Indic rain backdrop */}
      <IndicRainBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <AsciiArt disableRain />
        <div style={{ marginBottom: '2rem' }} />
        <h1 className="text-5xl md:text-7xl font-bold text-brand-light">The Great Bottleneck is Over</h1>
        <p className="text-2xl md:text-3xl text-brand-light/80 mt-4 max-w-3xl mx-auto">We are building the interface for thought. A new category of personal computing, designed to operate at the speed of the human mind.</p>
        <motion.a 
          href="#community"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-brand-light font-bold py-4 px-10 rounded-full text-xl neo-outset-button transition-all duration-300 mt-12 inline-block red-glow"
        >
          Join the Mission
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
