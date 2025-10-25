
import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="min-h-screen py-20 flex items-center bg-brand-dark">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-light mb-8">The Interface for Thought</h2>
          <p className="text-xl md:text-2xl text-brand-light/80 max-w-4xl">
            Imagine a future where your intent flows directly into digital action. Where technology is not a tool you hold, but a seamless extension of your will. We are architecting the next foundational platform of human-computer interaction. This is not science fiction. This is the next step.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
