
import React from 'react';
import { motion } from 'framer-motion';

const JourneySection: React.FC = () => {
  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 10,
      boxShadow: '0px 30px 40px rgba(0,0,0,0.4)',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <section id="journey" className="bg-brand-gunmetal text-brand-light py-24">
      <div className="container mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Design Notes.</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-16">
            This is our public journal. Our commitment is to radical transparency. Here, we will document every breakthrough, every failure, every philosophical debate, and every step of our journey...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <motion.div
              key={post}
              variants={cardVariants as any}
              whileHover="hover"
              className="relative h-80 rounded-lg bg-brand-dark p-8 flex flex-col justify-end items-start text-left overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: 'url(https://via.placeholder.com/400x300)' }} // Placeholder image
              ></div>
              <div className="relative z-20">
                <h3 className="text-2xl font-bold">Post 00{post}: The First Principles...</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <a
            href="#" // Placeholder for YouTube link
            target="_blank"
            rel="noopener noreferrer"
            className="animated-glow-button inline-block px-8 py-4 text-lg font-semibold text-brand-light bg-brand-red-hot rounded-lg shadow-lg hover:bg-brand-red-warn transition-colors duration-300"
          >
            Follow the Journey on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
