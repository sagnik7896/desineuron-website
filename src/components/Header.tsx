
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'Mission', href: '#mission' },
    { name: 'Vision', href: '#vision' },
    { name: 'Community', href: '#community' },
    { name: 'Journey', href: '#journey' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-8 max-w-4xl p-4 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-between">
        {/* Brand placeholder (can be a logo) */}
        <div className="text-brand-light/80 font-semibold px-2">DESINEURON</div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex">
          <ul className="flex items-center justify-around gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="px-4 py-3 text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-lg md:text-xl"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button (mobile) */}
        <button
          aria-label="Open menu"
          className="block sm:hidden px-3 py-2"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <div className="relative w-7 h-5">
            <motion.span
              className="absolute left-0 right-0 h-0.5 bg-white"
              animate={{ y: isMenuOpen ? 8 : 0, rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 right-0 h-0.5 bg-white"
              animate={{ opacity: isMenuOpen ? 0 : 1, y: 8 }}
              transition={{ duration: 0.2 }}
              style={{ top: 0 }}
            />
            <motion.span
              className="absolute left-0 right-0 h-0.5 bg-white"
              animate={{ y: isMenuOpen ? 8 : 16, rotate: isMenuOpen ? -45 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <motion.div
        initial={false}
        animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-brand-dark/80 backdrop-blur-lg sm:hidden"
        onClick={() => setIsMenuOpen(false)}
      >
        <button
          aria-label="Close menu"
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-0.5"></span>
          <span className="block w-6 h-0.5 bg-white -rotate-45 -translate-y-0.5 -ml-6"></span>
        </button>
        <div className="h-full w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <ul className="space-y-6 text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-2xl text-brand-light/90 hover:text-brand-light px-6 py-3 inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
