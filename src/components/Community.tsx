
import React from 'react';
import { motion } from 'framer-motion';

const Community: React.FC = () => {
  return (
    <section id="community" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-light mb-8">Join the Alpha Fleet</h2>
          <p className="text-xl md:text-2xl text-brand-light/80 max-w-3xl mx-auto mb-12">
            While incumbents build closed systems in secret, we are building a public park. Our strategy is to build our tribe before we build our product. We are looking for the makers, the developers, the researchers, and the rebels to join our 'Alpha Fleet' and help us build the future.
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-light mt-16 mb-8">Become a Co-Creator</h3>
          <form className="max-w-xl mx-auto">
            <div className="mb-8">
              <input type="email" placeholder="Email Address" className="w-full bg-brand-dark-light/20 border border-brand-light/20 rounded-lg py-3 px-4 text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary neo-inset-form-field" />
            </div>
            <div className="mb-8">
              <textarea placeholder="Why are you here? What do you want to build?" className="w-full bg-brand-dark-light/20 border border-brand-light/20 rounded-lg py-3 px-4 text-brand-light placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-primary neo-inset-form-field h-32 resize-none"></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-brand-light font-bold py-3 px-8 rounded-full text-lg neo-outset-button transition-all duration-300"
            >
              I'm In
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
