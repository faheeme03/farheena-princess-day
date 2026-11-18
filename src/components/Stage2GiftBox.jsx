import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function Stage2GiftBox({ onContinueToMemories }) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const handleUnwrap = () => {
    if (isUnwrapped) return;
    setIsUnwrapped(true);
    soundSystem?.playChime?.();
    soundSystem?.playCelebration?.();

    // Trigger sweet heart & golden sparkle confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F497B6', '#FFB3C6', '#FFD54F', '#D885A3'],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10 select-none text-center"
    >
      {/* Dynamic Heading based on unwrapped state */}
      <AnimatePresence mode="wait">
        {!isUnwrapped ? (
          <motion.div
            key="guess-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-script text-5xl sm:text-6xl text-[#6D3B53] font-semibold">
              {websiteContent.giftBox.heading}
            </h1>
            <p className="text-[#7A445D] text-base sm:text-lg font-medium mt-2 font-sans">
              {websiteContent.giftBox.subtitle}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            className="flex flex-col items-center mb-2 sm:mb-4"
          >
            <h1 className="font-script text-5xl sm:text-7xl font-bold text-[#6D3B53] drop-shadow-sm">
              {websiteContent.reveal.heading}
            </h1>

            {/* Decorative Heart Divider */}
            <div className="flex items-center gap-3 my-2.5">
              <span className="w-12 sm:w-16 h-0.5 bg-[#F497B6]/60 rounded-full" />
              <Heart className="w-5 h-5 text-[#C86D8A] fill-[#FFB3C6]" />
              <span className="w-12 sm:w-16 h-0.5 bg-[#F497B6]/60 rounded-full" />
            </div>

            {/* Nickname Pill Badge */}
            <div className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-[#F497B6] shadow-sm text-lg sm:text-xl font-bold text-[#8E5B72]">
              {websiteContent.princess.nickname}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gift Box Container with generous top spacing so crown never covers text */}
      <div className={`relative ${isUnwrapped ? 'mt-24 sm:mt-28' : 'mt-8 sm:mt-12'} flex flex-col items-center justify-center transition-all duration-500`}>
        {/* Rotating Conic Light Glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.7),transparent,rgba(255,255,255,0.7),transparent)] rounded-full pointer-events-none z-0"
        />

        {/* Floating Crown when unwrapped - Hovering cleanly right above box, NOT touching text above */}
        <AnimatePresence>
          {isUnwrapped && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.4 }}
              animate={{
                y: [-6, -14, -6],
                opacity: 1,
                scale: 1,
              }}
              transition={{
                y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
                duration: 0.7,
                type: 'spring',
                bounce: 0.4,
              }}
              className="absolute -top-16 sm:-top-20 z-30 pointer-events-none flex flex-col items-center"
            >
              {/* Royal Golden Crown SVG */}
              <svg
                viewBox="0 0 160 110"
                fill="none"
                className="w-24 h-18 sm:w-30 sm:h-22 drop-shadow-[0_8px_16px_rgba(245,158,11,0.35)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="50%" stopColor="#FFD54F" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                  <linearGradient id="gemPink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8DA1" />
                    <stop offset="100%" stopColor="#E83D66" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 85 L28 35 L55 60 L80 20 L105 60 L132 35 L140 85 Z"
                  fill="url(#crownGold)"
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
                  fill="url(#crownGold)"
                  stroke="#B78103"
                  strokeWidth="3"
                />
                <ellipse cx="80" cy="92" rx="6" ry="4" fill="url(#gemPink)" />
                <circle cx="45" cy="92" r="3.5" fill="url(#gemPink)" />
                <circle cx="115" cy="92" r="3.5" fill="url(#gemPink)" />
                <circle cx="28" cy="35" r="5" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
                <circle cx="80" cy="20" r="6" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
                <circle cx="132" cy="35" r="5" fill="#FFE082" stroke="#B78103" strokeWidth="2" />
                <circle cx="80" cy="20" r="3" fill="#FFF9C4" />
                <circle cx="28" cy="35" r="2.5" fill="#FFF9C4" />
                <circle cx="132" cy="35" r="2.5" fill="#FFF9C4" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Radial Heart Burst Particles on Unwrap */}
        <AnimatePresence>
          {isUnwrapped && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {[...Array(10)].map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                const tx = Math.cos(angle) * 125;
                const ty = Math.sin(angle) * 95 - 35;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{ x: tx, y: ty, scale: [0, 1.2, 0.9], opacity: [1, 1, 0] }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Heart className="w-5 h-5 text-[#F497B6] fill-[#FFB3C6]" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Interactive Gift Box Elements */}
        <motion.div
          onClick={handleUnwrap}
          animate={!isUnwrapped ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className={`relative z-20 cursor-pointer flex flex-col items-center ${
            !isUnwrapped ? 'hover:scale-105 active:scale-95' : ''
          } transition-transform`}
        >
          {/* Box Lid (pops off when unwrapped) */}
          <AnimatePresence>
            {!isUnwrapped && (
              <motion.div
                key="box-lid"
                exit={{
                  y: -140,
                  x: 45,
                  rotate: 28,
                  scale: 0.6,
                  opacity: 0,
                  transition: { duration: 0.55, ease: 'easeOut' },
                }}
                className="relative z-30 flex flex-col items-center"
              >
                {/* Ribbon Bow SVG */}
                <svg viewBox="0 0 140 70" className="w-36 h-20 sm:w-44 sm:h-24 -mb-3.5">
                  <path
                    d="M68 42 C45 10, 12 16, 18 42 C22 58, 52 52, 68 44 Z"
                    fill="#D8B4E2"
                    stroke="#7A445D"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M72 42 C95 10, 128 16, 122 42 C118 58, 88 52, 72 44 Z"
                    fill="#D8B4E2"
                    stroke="#7A445D"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M70 34 C64 26, 52 30, 56 41 C59 48, 70 54, 70 56 C70 54, 81 48, 84 41 C88 30, 76 26, 70 34 Z"
                    fill="#FFE680"
                    stroke="#7A445D"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Box Lid Horizontal Bar */}
                <div className="w-44 sm:w-52 h-10 sm:h-11 rounded-xl bg-gradient-to-r from-[#FF9EBB] via-[#FFB3C6] to-[#FF9EBB] border-2 border-[#7A445D] shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-9 h-full bg-[#D8B4E2] border-x-2 border-[#7A445D]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Box Body */}
          <div className="relative z-20 w-40 sm:w-48 h-32 sm:h-36 -mt-1 rounded-b-2xl rounded-t-md bg-gradient-to-b from-[#FFB3C6] to-[#F497B6] border-2 border-[#7A445D] shadow-xl flex items-center justify-center overflow-hidden">
            {isUnwrapped && (
              <div className="absolute top-0 inset-x-0 h-3 bg-[#C86D8A]/50 border-b border-[#7A445D]/40" />
            )}
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3 opacity-30 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-white fill-white" />
              ))}
            </div>
            <div className="relative w-9 h-full bg-[#D8B4E2] border-x-2 border-[#7A445D]" />
          </div>
        </motion.div>
      </div>

      {/* Action Prompts / Buttons */}
      <div className="mt-8 sm:mt-10 min-h-[56px] flex items-center justify-center">
        {!isUnwrapped ? (
          <motion.button
            onClick={handleUnwrap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-white/70 border border-[#F497B6] shadow-sm text-[#C86D8A] text-sm font-semibold tracking-wider uppercase font-sans hover:bg-white"
          >
            {websiteContent.giftBox.tapBadge}
          </motion.button>
        ) : (
          <motion.button
            onClick={onContinueToMemories}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.4 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F497B6] to-[#D885A3] text-white font-semibold text-base sm:text-lg shadow-lg flex items-center gap-2 hover:brightness-105 transition-all font-sans"
          >
            <span>{websiteContent.reveal.continueButton}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
