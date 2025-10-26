import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Mission from './components/Mission';
import Vision from './components/Vision';
import Journey from './components/Journey';
import Community from './components/Community';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

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
    <div className="bg-brand-dark text-brand-light font-sans overflow-x-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(224, 29, 29, 0.20), transparent 80%)`,
        }}
      />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Mission />
        <Vision />
        <Journey />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default App;
