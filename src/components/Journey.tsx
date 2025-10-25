
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface CarouselItemProps {
  video: {
    id: number;
    title: string;
    thumbnailUrl: string;
  };
  scale: number;
  margin: string;
  isSelected: boolean;
}


const CarouselItem: React.FC<CarouselItemProps> = ({ video, scale, margin, isSelected }) => {
  return (
    <motion.div
      key={video.id}
      className="glass-gradient p-8 text-center flex-shrink-0 mx-4"
      style={{
        borderRadius: '30px',
        clipPath: 'inset(0 0 0 0 round 30px)',
        width: '400px',
        height: '400px',
        boxShadow: isSelected ? '0 0 60px 25px rgba(255, 255, 255, 0.1)' : 'none',
      }}
      animate={{ scale, margin }}
      transition={{ type: 'spring', stiffness: 700, damping: 80 }}
    >
      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover pointer-events-none" style={{ borderRadius: '20px' }} />
      <h3 className="text-2xl font-bold text-brand-light mb-4 mt-8">{video.title}</h3>
    </motion.div>
  );
};


const Journey: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    fetch('/src/data/videos.json')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos));
  }, []);

  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const calculateWidths = () => {
        const container = carouselRef.current;
        if (container && container.firstChild) {
          const firstItem = container.firstChild as HTMLDivElement;
          const newContainerWidth = container.offsetWidth;
          const newItemWidth = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginLeft) + parseInt(getComputedStyle(firstItem).marginRight);
          
          setContainerWidth(newContainerWidth);
          setItemWidth(newItemWidth);
        }
      };

      calculateWidths();
      window.addEventListener('resize', calculateWidths);
      return () => window.removeEventListener('resize', calculateWidths);
    }
  }, [videos]);

  useEffect(() => {
    if (itemWidth > 0) {
      const centeredPosition = -currentIndex * itemWidth + (containerWidth - itemWidth) / 2;
      controls.start({ x: centeredPosition }, { type: 'spring', stiffness: 500, damping: 50 });
    }
  }, [currentIndex, videos, controls, itemWidth, containerWidth]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <section id="journey" className="min-h-screen py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-8">
        <h2 className="text-5xl md:text-6xl font-bold text-brand-light mb-8 text-center">The Design Notes</h2>
        <p className="text-xl md:text-2xl text-brand-light/80 max-w-3xl mx-auto mb-16 text-center">
          This is our public journal. Our commitment is to radical transparency. Here, we will document every breakthrough, every failure, every philosophical debate, and every step of our journey.
        </p>
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="flex"
            ref={carouselRef}
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{
              left: -itemWidth * (videos.length - 1) + (containerWidth - itemWidth) / 2,
              right: (containerWidth - itemWidth) / 2,
            }}
            onDragEnd={(_e, info) => {
              void _e;
              const { offset, velocity } = info;
              const swipe = Math.abs(offset.x) * velocity.x;

              if (swipe < -10000) {
                handleNext();
              } else if (swipe > 10000) {
                handlePrev();
              } else {
                const newIndex = Math.round((x.get() + offset.x) / -itemWidth);
                setCurrentIndex(Math.max(0, Math.min(newIndex, videos.length - 1)));
              }
            }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CarouselItem
                  video={video}
                  scale={index === currentIndex ? 1.1 : hoveredIndex === index ? 1.05 : 1}
                  margin={index === currentIndex ? '0 3rem' : '0'}
                  isSelected={index === currentIndex}
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-8">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full mx-2 ${index === currentIndex ? 'bg-brand-light' : 'bg-brand-light/50'}`}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button onClick={handlePrev} className="text-brand-light/50 hover:text-brand-light transition-colors duration-300 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button onClick={handleNext} className="text-brand-light/50 hover:text-brand-light transition-colors duration-300 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-center">
          <motion.a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-brand-light font-bold py-4 px-10 rounded-full text-xl neo-outset-button transition-all duration-300 mt-12 inline-block"
          >
            Follow the Journey on YouTube
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Journey;
