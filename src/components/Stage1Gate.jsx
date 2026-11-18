import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function Stage1Gate({ onOpenGate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundSystem?.startMusic?.('fairytale');
    soundSystem?.playCelebration?.();
    // After doors swing open and light bursts, transition to Stage 2
    setTimeout(() => {
      onOpenGate();
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10"
    >
      {/* Top Banner Message */}
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg sm:text-2xl text-[#7A445D] font-medium tracking-wide mb-6 sm:mb-8 text-center font-sans"
      >
        {websiteContent.landing.bannerText}
      </motion.p>

      {/* The Grand Castle Gate Container */}
      <div
        onClick={handleOpen}
        className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-88 md:h-[415px] rounded-t-full border-4 border-[#8E5B72] bg-[#3B1F2E] shadow-2xl cursor-pointer perspective-door overflow-hidden group select-none"
      >
        {/* Interior Magical Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFDF5_0%,#FFE6A7_32%,#FFB3C6_68%,#D8B4E2_100%)] flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-36 h-36 rounded-full bg-white/40 blur-xl"
          />
        </div>

        {/* Gate Left Door Panel */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-[#EFA9C5] border-r-2 border-[#8E5B72] door-panel-left flex flex-col justify-between p-3.5 ${
            isOpen ? '-rotate-y-105' : 'rotate-y-0'
          }`}
          style={{
            transform: isOpen ? 'rotateY(-105deg)' : 'rotateY(0deg)',
            background: 'linear-gradient(135deg, #F8DDE8 0%, #EFA9C5 50%, #D885A3 100%)',
          }}
        >
          {/* Wood panel arch lines */}
          <div className="w-full h-full border-2 border-[#8E5B72]/40 rounded-t-full flex flex-col justify-around p-2">
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
          </div>
        </div>

        {/* Gate Right Door Panel */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full bg-[#EFA9C5] border-l-2 border-[#8E5B72] door-panel-right flex flex-col justify-between p-3.5 ${
            isOpen ? 'rotate-y-105' : 'rotate-y-0'
          }`}
          style={{
            transform: isOpen ? 'rotateY(105deg)' : 'rotateY(0deg)',
            background: 'linear-gradient(225deg, #F8DDE8 0%, #EFA9C5 50%, #D885A3 100%)',
          }}
        >
          {/* Wood panel arch lines */}
          <div className="w-full h-full border-2 border-[#8E5B72]/40 rounded-t-full flex flex-col justify-around p-2">
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
            <div className="h-0.5 bg-[#8E5B72]/30 w-full" />
          </div>
        </div>

        {/* Center Lock Ornament (Pops off when opened) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="p-3.5 rounded-full bg-amber-100/90 border-2 border-[#D8B56D] shadow-xl backdrop-blur-sm">
                <svg
                  viewBox="0 0 100 120"
                  fill="none"
                  className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-md"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="20"
                    y="45"
                    width="60"
                    height="65"
                    rx="14"
                    fill="#F497B6"
                    stroke="#8E5B72"
                    strokeWidth="3"
                  />
                  <path
                    d="M32 45 V32 C32 20 40 10 50 10 C60 10 68 20 68 32 V45"
                    stroke="#8E5B72"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="50" cy="72" r="7" fill="#8E5B72" />
                  <path
                    d="M50 78 V92"
                    stroke="#8E5B72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="72" r="3" fill="#FFFDF9" />
                  <path
                    d="M50 83 V89"
                    stroke="#FFFDF9"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="35" cy="58" r="2.5" fill="#FFFDF9" opacity="0.8" />
                  <circle cx="65" cy="58" r="2.5" fill="#FFFDF9" opacity="0.8" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button: "Tap to open the gate ♡" */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 sm:mt-10 px-10 py-3.5 sm:px-12 sm:py-4 rounded-full bg-gradient-to-r from-[#FFF8FA] via-[#FFE8F0] to-[#FFF8FA] text-[#6D3B53] font-bold text-base sm:text-xl shadow-[0_10px_25px_rgba(142,91,114,0.25)] border-2 border-[#F497B6] flex items-center gap-3 transition-transform font-sans"
      >
        <span>{websiteContent.landing.gateButton}</span>
      </motion.button>
    </motion.div>
  );
}
