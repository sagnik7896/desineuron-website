
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'Mission', href: '#mission' },
    { name: 'Vision', href: '#vision' },
    { name: 'Community', href: '#community' },
    { name: 'Journey', href: '#journey' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="mx-auto mt-8 max-w-4xl p-4 rounded-full bg-black/20 backdrop-blur-lg">
        <ul className="flex items-center justify-around">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="px-6 py-3 text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-lg md:text-xl"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
