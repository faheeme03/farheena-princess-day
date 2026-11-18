import React from 'react';
import { motion } from 'framer-motion';
import { websiteContent } from '../data/websiteContent';

export default function Stage5LoveLetter({ onCloseLetter }) {
  const { salutation, greeting, paragraphs, signOff, signature, closeButton } = websiteContent.loveLetter;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F6] to-[#FFEBF2] p-7 sm:p-10 shadow-2xl border-2 border-[#F497B6]/50 my-auto"
      >
        {/* Top Pinned Ribbon Bow SVG */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none">
          <svg viewBox="0 0 100 80" fill="none" className="w-16 h-12" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 38 C42 22 18 16 12 30 C6 44 28 52 46 42 Z"
              fill="#FF8DA1"
              stroke="#8E5B72"
              strokeWidth="2.5"
            />
            <path
              d="M50 38 C58 22 82 16 88 30 C94 44 72 52 54 42 Z"
              fill="#FF8DA1"
              stroke="#8E5B72"
              strokeWidth="2.5"
            />
            <path
              d="M44 44 C38 54 30 70 24 76 C28 66 38 56 46 46 Z"
              fill="#FF8DA1"
              stroke="#8E5B72"
              strokeWidth="2"
            />
            <path
              d="M56 44 C62 54 70 70 76 76 C72 66 62 56 54 46 Z"
              fill="#FF8DA1"
              stroke="#8E5B72"
              strokeWidth="2"
            />
            <circle cx="50" cy="40" r="7" fill="#F497B6" stroke="#8E5B72" strokeWidth="2.5" />
            <circle cx="48" cy="38" r="2" fill="#FFFDF9" />
          </svg>
        </div>

        {/* Salutation & Greeting */}
        <div className="mt-2 text-center sm:text-left">
          <h2 className="font-script text-3xl sm:text-4xl text-[#6D3B53] font-bold">
            {salutation}
          </h2>
          {greeting && (
            <p className="font-script text-2xl sm:text-3xl text-[#D885A3] font-semibold mt-1">
              {greeting}
            </p>
          )}
        </div>

        {/* Letter Body - Smooth Scrollable */}
        <div className="mt-4 space-y-4 max-h-[58vh] sm:max-h-[62vh] overflow-y-auto pr-2 text-sm sm:text-base font-medium text-[#7A445D] leading-relaxed font-sans">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}

          {/* Sign-off */}
          <div className="pt-4 border-t border-[#F497B6]/30">
            <p className="font-script text-2xl text-[#6D3B53]">{signOff}</p>
            <p className="font-script text-2xl sm:text-3xl text-[#D885A3] font-bold mt-1">
              {signature}
            </p>
          </div>
        </div>

        {/* Cute Animated Bear Holding Heart SVG at Bottom-Right */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute -bottom-6 -right-3 pointer-events-none hidden sm:block"
        >
          <svg viewBox="0 0 130 130" fill="none" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="36" r="16" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.8" />
            <circle cx="34" cy="36" r="9" fill="#FAD2E1" />
            <circle cx="96" cy="36" r="16" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.8" />
            <circle cx="96" cy="36" r="9" fill="#FAD2E1" />
            <path
              d="M35 82 C25 95, 28 118, 45 120 L85 120 C102 118, 105 95, 95 82 Z"
              fill="#FFFDF9"
              stroke="#8E5B72"
              strokeWidth="2.8"
            />
            <rect x="24" y="32" width="82" height="64" rx="32" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.8" />
            <ellipse cx="39" cy="68" rx="7" ry="4.5" fill="#FFB3C6" opacity="0.7" />
            <ellipse cx="91" cy="68" rx="7" ry="4.5" fill="#FFB3C6" opacity="0.7" />
            <circle cx="46" cy="59" r="4" fill="#5E3A4D" />
            <circle cx="44.5" cy="57.5" r="1.3" fill="#FFFFFF" />
            <circle cx="84" cy="59" r="4" fill="#5E3A4D" />
            <circle cx="82.5" cy="57.5" r="1.3" fill="#FFFFFF" />
            <ellipse cx="65" cy="64" rx="6" ry="4.5" fill="#FFE5EC" />
            <ellipse cx="65" cy="62.5" rx="3" ry="2" fill="#8E5B72" />
            <path d="M65 64.5 C65 68, 61 69, 59 67" stroke="#8E5B72" strokeWidth="2" strokeLinecap="round" />
            <path d="M65 64.5 C65 68, 69 69, 71 67" stroke="#8E5B72" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M65 84 C55 72, 36 78, 42 94 C46 105, 65 114, 65 116 C65 114, 84 105, 88 94 C94 78, 75 72, 65 84 Z"
              fill="#FF9EBB"
              stroke="#8E5B72"
              strokeWidth="2.5"
            />
            <ellipse cx="43" cy="93" rx="9" ry="7" transform="rotate(20 43 93)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.5" />
            <ellipse cx="87" cy="93" rx="9" ry="7" transform="rotate(-20 87 93)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* Action Button: "Close the letter ♡" */}
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={onCloseLetter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFFDF9] to-[#FFEBF2] text-[#6D3B53] font-bold text-base sm:text-lg shadow-lg border-2 border-[#F497B6] flex items-center gap-2 hover:bg-white transition-all font-sans"
          >
            <span>{closeButton}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
