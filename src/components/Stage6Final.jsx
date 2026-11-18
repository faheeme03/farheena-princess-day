import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { websiteContent } from '../data/websiteContent';

export default function Stage6Final({ onReplay }) {
  useEffect(() => {
    // Joyful celebration confetti burst on arrival
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#F497B6', '#FFB3C6', '#FFE680', '#D885A3', '#E83D66'],
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10 select-none text-center"
    >
      {/* Floating Crown at Top */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="mb-3"
      >
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-24 h-18 sm:w-32 sm:h-22 drop-shadow-[0_10px_20px_rgba(245,158,11,0.35)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="crownGoldFinal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
            <linearGradient id="gemPinkFinal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8DA1" />
              <stop offset="100%" stopColor="#E83D66" />
            </linearGradient>
          </defs>
          <path
            d="M20 85 L28 35 L55 60 L80 20 L105 60 L132 35 L140 85 Z"
            fill="url(#crownGoldFinal)"
            stroke="#B78103"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect
            x="20"
            y="85"
            width="120"
            height="14"
            rx="7"
            fill="url(#crownGoldFinal)"
            stroke="#B78103"
            strokeWidth="3"
          />
          <ellipse cx="80" cy="92" rx="6" ry="4" fill="url(#gemPinkFinal)" />
          <circle cx="45" cy="92" r="3.5" fill="url(#gemPinkFinal)" />
          <circle cx="115" cy="92" r="3.5" fill="url(#gemPinkFinal)" />
          <circle cx="28" cy="35" r="5" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
          <circle cx="80" cy="20" r="6" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
          <circle cx="132" cy="35" r="5" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
          <circle cx="80" cy="20" r="3" fill="#FFF9C4" />
          <circle cx="28" cy="35" r="2.5" fill="#FFF9C4" />
          <circle cx="132" cy="35" r="2.5" fill="#FFF9C4" />
        </svg>
      </motion.div>

      {/* Heading: "Always My Princess" */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-script text-6xl sm:text-7xl font-bold text-[#6D3B53] leading-[1.15]"
      >
        {websiteContent.final.heading}
      </motion.h1>

      {/* Subtitle: "Today, tomorrow, and always..." */}
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-lg sm:text-2xl text-[#7A445D] font-bold mt-2.5 tracking-wide font-sans"
      >
        {websiteContent.final.subtitle}
      </motion.p>

      {/* Adorable Animated Bear Character with Beating Heart */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6, type: 'spring' }}
        className="my-6 relative flex items-center justify-center"
      >
        {/* Soft Pink Radial Aura */}
        <div className="absolute w-56 h-56 rounded-full bg-pink-200/50 blur-2xl pointer-events-none" />

        {/* Floating Hearts Rising from Bear */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${35 + i * 10}%`,
              top: '40%',
            }}
            animate={{
              y: [-10, -70 - i * 15],
              x: [0, (i % 2 === 0 ? 1 : -1) * 15],
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              delay: i * 0.7,
              ease: 'easeOut',
            }}
          >
            <Heart className="w-5 h-5 text-[#F497B6] fill-[#FFB3C6]" />
          </motion.div>
        ))}

        {/* Animated Cute Teddy Bear SVG */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 filter drop-shadow-[0_12px_24px_rgba(142,91,114,0.18)]"
        >
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Bear Ears */}
            <circle cx="42" cy="45" r="20" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />
            <circle cx="42" cy="45" r="11" fill="#FFC4D6" />
            <circle cx="118" cy="45" r="20" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />
            <circle cx="118" cy="45" r="11" fill="#FFC4D6" />

            {/* Bear Body */}
            <path
              d="M45 105 C32 120, 35 150, 58 152 L102 152 C125 150, 128 120, 115 105 Z"
              fill="#FFFDF9"
              stroke="#8E5B72"
              strokeWidth="3.5"
            />

            {/* Bear Head */}
            <rect x="30" cy="40" y="40" width="100" height="78" rx="39" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />

            {/* Rosy Cheeks */}
            <ellipse cx="48" cy="85" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />
            <ellipse cx="112" cy="85" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />

            {/* Sparkling Anime Eyes */}
            <circle cx="58" cy="74" r="5.5" fill="#4A2537" />
            <circle cx="56" cy="72" r="1.8" fill="#FFFFFF" />
            <circle cx="102" cy="74" r="5.5" fill="#4A2537" />
            <circle cx="100" cy="72" r="1.8" fill="#FFFFFF" />

            {/* Cute Snout */}
            <ellipse cx="80" cy="80" rx="8" ry="6" fill="#FFE5EC" />
            <ellipse cx="80" cy="78" rx="4" ry="2.8" fill="#8E5B72" />

            {/* Happy Little Smile */}
            <path d="M80 81 C80 85, 75 86, 73 84" stroke="#8E5B72" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M80 81 C80 85, 85 86, 87 84" stroke="#8E5B72" strokeWidth="2.5" strokeLinecap="round" />

            {/* Little Crown on Bear's Head */}
            <path
              d="M68 38 L72 26 L80 34 L88 26 L92 38 Z"
              fill="#FFD54F"
              stroke="#B78103"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="30" r="1.5" fill="#FF8DA1" />

            {/* Glowing Big Beating Heart in Paws */}
            <g transform="translate(0, 5)">
              <path
                d="M80 102 C68 86, 44 94, 52 114 C58 128, 80 140, 80 142 C80 140, 102 128, 108 114 C116 94, 92 86, 80 102 Z"
                fill="#FF8DA1"
                stroke="#8E5B72"
                strokeWidth="3"
              />
              <circle cx="68" cy="104" r="3" fill="#FFFDF9" opacity="0.6" />
            </g>

            {/* Paws Holding Heart */}
            <ellipse cx="54" cy="116" rx="11" ry="8.5" transform="rotate(25 54 116)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3" />
            <ellipse cx="106" cy="116" rx="11" ry="8.5" transform="rotate(-25 106 116)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Button: "Replay ↺ ♡" */}
      <motion.button
        onClick={onReplay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3.5 rounded-full bg-white/95 backdrop-blur-sm text-[#6D3B53] font-bold text-base shadow-[0_8px_20px_rgba(142,91,114,0.18)] border-2 border-[#F497B6] flex items-center gap-2.5 hover:bg-white transition-all font-sans"
      >
        <RotateCcw className="w-4 h-4 text-[#D885A3]" />
        <span>{websiteContent.final.replayButton}</span>
      </motion.button>
    </motion.div>
  );
}
