
import React from 'react';
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: FaTwitter, href: 'https://x.com/desi_neuron' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/desineuron-labs/' },
    { icon: FaYoutube, href: '#' },
  ];

  return (
    <footer className="bg-brand-dark text-brand-light/60 py-8">
      <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} DESINEURON LABS LLP. All Rights Reserved.</p>
        <div className="flex space-x-6">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors duration-300">
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
