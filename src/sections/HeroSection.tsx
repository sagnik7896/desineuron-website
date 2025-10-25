
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import AsciiArt from '../components/AsciiArt';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-brand-dark flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        className="absolute w-16 h-16 bg-brand-red-hot rounded-full"
        style={{ x: '-50%', y: '-50%' }}
        animate={{ 
          x: mousePosition.x - 32, 
          y: mousePosition.y - 32,
          transition: { type: 'spring', stiffness: 50, damping: 10 }
        }}
      />
      <motion.svg
        className="absolute w-full h-full"
        style={{ top: 0, left: 0 }}
      >
        <motion.line
          x1={mousePosition.x}
          y1={mousePosition.y}
          x2="50%"
          y2="50%"
          stroke="white"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.svg>

      <div className="z-10 p-8">
        <AsciiArt />
        <div style={{ marginBottom: '2rem' }} />
        <h1 className="text-5xl md:text-7xl font-bold text-brand-light mb-4">The Great Bottleneck is Over.</h1>
        <p className="text-lg md:text-xl text-brand-light max-w-3xl mx-auto mb-8">
          We are building the interface for thought. A new category of personal computing, designed to operate at the speed of the human mind.
        </p>
        <a
          href="#community"
          className="animated-glow-button inline-block px-8 py-4 text-lg font-semibold text-brand-light bg-brand-dark rounded-lg shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3e3e3e] hover:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#3e3e3e] hover:bg-brand-red-hot hover:text-white transition-all duration-300 red-glow"
          style={{ boxShadow: '8px 8px 16px #1a1a1a, -8px -8px 16px #3e3e3e' }}
        >
          Join the Mission
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
