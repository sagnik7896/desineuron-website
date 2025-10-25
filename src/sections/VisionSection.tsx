
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VisionSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const particleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section id="vision" ref={targetRef} className="relative h-[300vh] bg-brand-gunmetal">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center text-brand-light overflow-hidden">
        <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0 z-0">
          {/* Placeholder for ethereal particle system */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <p className="text-white/20">[Placeholder: Ethereal particle system reacting to scroll]</p>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ opacity, scale, position: 'relative' }} 
          className="z-10 p-8 max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 -m-8 bg-black/20 backdrop-blur-md rounded-xl z-0"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">The Interface for Thought.</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Imagine a future where your intent flows directly into digital action. Where technology is not a tool you hold, but a seamless extension of your will. We are architecting the next foundational platform of human-computer interaction. This is not science fiction. This is the next step.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(44, 44, 44, 0.8), transparent, rgba(44, 44, 44, 0.8))',
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])
          }}
        />
      </div>
    </section>
  );
};

export default VisionSection;
