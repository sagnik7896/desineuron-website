
import React from 'react';
import { motion } from 'framer-motion';

const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="bg-brand-dark text-brand-light py-24">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">We Think in Universes. We Speak in Atoms.</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Human thought moves at hundreds of words per minute. Yet we are forced to translate our most complex ideas through the clumsy mechanics of fingers on a keyboard. This is The Great Bottleneck. In the age of AI, this is no longer an inconvenience; it is a fundamental barrier to progress. We have built digital gods, but we are still controlling them with levers from the stone age.
            </p>
          </motion.div>
          <motion.div
            className="w-full h-96 bg-brand-gunmetal rounded-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-brand-light/50">[Placeholder: High-contrast, slow-motion video of typing]</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
