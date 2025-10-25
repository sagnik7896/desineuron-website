
import React from 'react';
import { motion } from 'framer-motion';

const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="relative bg-brand-dark text-brand-light py-24 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-red-hot"></div>
      <div className="absolute inset-0 w-full h-full bg-brand-dark/50 z-0"></div>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
        <p className="text-brand-light/10 text-sm">[Placeholder: Looping background video of abstract architecture sketch]</p>
      </div>
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Augment. Don't Outsource.</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-16">
            The current path of AI risks making us intellectually lazy. We are building the counter-movement. A technology that serves as a cognitive gymnasium, not a crutch. A system that rewards deep thought and makes its user smarter with every interaction. We are building the bicycle for the mind.
          </p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">A Sovereign Future, Built in India.</h3>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            In an era where sovereignty is defined by who controls the code, we are building the world's first sovereign computing platform. An indigenous, open-source ecosystem that ensures technological self-reliance. The future, from India, for the world.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
