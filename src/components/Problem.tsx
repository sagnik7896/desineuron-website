
import React from 'react';
import { motion } from 'framer-motion';

const Problem: React.FC = () => {
  return (
    <section id="problem" className="min-h-screen py-20 flex items-center bg-brand-dark">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-light mb-8">We Think in Universes<br/>We Speak in Atoms</h2>
          <p className="text-xl md:text-2xl text-brand-light/80 max-w-3xl">
            Human thought moves at hundreds of words per minute. Yet we are forced to translate our most complex ideas through the clumsy mechanics of fingers on a keyboard. This is The Great Bottleneck. In the age of AI, this is no longer an inconvenience; it is a fundamental barrier to progress. We have built digital gods, but we are still controlling them with levers from the stone age.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
