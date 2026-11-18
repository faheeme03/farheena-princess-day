import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';

export default function Stage4Memories({ onOpenLetter }) {
  const cards = websiteContent.memories.cards;
  // Duplicate array for seamless infinite marquee loop
  const marqueeCards = [...cards, ...cards];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen py-8 z-10 w-full overflow-hidden select-none"
    >
      {/* Heading & Subtitle */}
      <div className="text-center px-4 mb-6 sm:mb-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-script text-4xl sm:text-6xl text-[#6D3B53] font-semibold"
        >
          {websiteContent.memories.heading}
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#7A445D] text-base sm:text-lg font-medium mt-1 font-sans"
        >
          {websiteContent.memories.subtitle}
        </motion.p>
      </div>

      {/* Infinite Scrolling Polaroid Marquee Track */}
      <div className="w-full relative py-6 overflow-hidden">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FFF5F7] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FFF0F4] to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee flex gap-5 sm:gap-7 items-center">
          {marqueeCards.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="flex-shrink-0 w-56 sm:w-68 bg-white rounded-2xl p-3 pb-8 shadow-lg border border-pink-100/80 flex flex-col items-center transition-transform hover:scale-105 hover:z-30 cursor-pointer"
              style={{
                transform: `rotate(${card.rotation})`,
              }}
            >
              {/* Cute Washi Tape at Top */}
              <div className="w-14 h-4 bg-pink-100/80 border-x border-pink-200/60 shadow-xs -mt-5 mb-2.5 rounded-xs" />

              {/* Photo */}
              <div className="w-full h-64 sm:h-76 rounded-xl overflow-hidden bg-pink-50 relative group">
                <img
                  src={card.photo}
                  alt={`Memory ${card.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Clean blank polaroid bottom without any date or text */}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button: "Read My Letter >" */}
      <motion.button
        onClick={onOpenLetter}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 sm:mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F497B6] to-[#D885A3] text-white font-semibold text-base sm:text-lg shadow-lg flex items-center gap-2 hover:brightness-105 transition-all font-sans"
      >
        <span>{websiteContent.memories.buttonText}</span>
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
