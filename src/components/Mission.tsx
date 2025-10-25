
import React from 'react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
  return (
    <section id="mission" className="min-h-screen py-20 flex items-center bg-brand-dark">
      <div className="container mx-auto px-8 text-right">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-light mb-8">Augment<br/>Don't Outsource</h2>
          <p className="text-xl md:text-2xl text-brand-light/80 max-w-3xl ml-auto">
            The current path of AI risks making us intellectually lazy. We are building the counter-movement. A technology that serves as a cognitive gymnasium, not a crutch. A system that rewards deep thought and makes its user smarter with every interaction. We are building the bicycle for the mind.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
