import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function CutieCoverScreen({ onEnter, isMuted, onToggleMute }) {
  const [showPhoto, setShowPhoto] = useState(false);

  const handleEnter = () => {
    soundSystem.playSparkle();
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-[#FFF9F5] text-[#2A2226] p-6 select-none overflow-hidden font-sans">
      {/* Floating Gentle Pink Rose Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute rounded-full bg-pink-300/40"
            style={{
              width: `${Math.random() * 10 + 6}px`,
              height: `${Math.random() * 14 + 10}px`,
              borderRadius: '60% 40% 60% 40%',
              left: `${Math.random() * 100}vw`,
              top: -30,
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [`${Math.sin(i) * 30}px`, `${Math.sin(i + 2) * 60}px`],
              rotate: [0, 360],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 9,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 pt-4 md:pt-8 flex flex-col items-center">
        <div className="px-5 py-1.5 rounded-full border border-[#F3D7DF] bg-white/70 backdrop-blur-sm text-[11px] md:text-xs font-semibold tracking-widest uppercase text-[#D84A6E] shadow-sm">
          A WHOLE CASTLE, JUST FOR HER
        </div>
      </div>

      {/* Main Center Card with Pinned Golden Crown */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-md w-full px-4 text-center">
        {/* Pinned Card */}
        <div className="relative mb-6">
          {/* Tilted Cute Crown Sticker */}
          <div className="absolute -top-7 -left-5 z-20 transform -rotate-12 filter drop-shadow-md cursor-pointer hover:scale-110 transition-transform">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <path
                d="M12 44L8 20L24 32L32 12L40 32L56 20L52 44H12Z"
                fill="#F7C844"
                stroke="#664614"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="19" r="3" fill="#D84A6E" />
              <circle cx="32" cy="11" r="3.5" fill="#D84A6E" />
              <circle cx="56" cy="19" r="3" fill="#D84A6E" />
            </svg>
          </div>

          {/* White Rounded Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowPhoto(!showPhoto)}
            className="w-64 h-64 md:w-72 md:h-72 rounded-[36px] bg-white border border-[#F6EBE5] shadow-[0_16px_40px_rgba(216,74,110,0.12)] p-6 flex flex-col items-center justify-between cursor-pointer relative overflow-hidden"
            title="Click to toggle between cute doodle & your photo!"
          >
            <span className="font-sans font-extrabold text-xs md:text-sm tracking-wider text-[#2A2226] uppercase mt-2">
              HAPPY PRINCESS DAY!
            </span>

            {/* Doodle or Farheena Photo */}
            <div className="my-auto w-36 h-36 flex items-center justify-center">
              {!showPhoto ? (
                /* Cute Doodle Kitten with Tiara & Rose (CutiePage style) */
                <svg viewBox="0 0 140 140" className="w-full h-full">
                  {/* Hearts around */}
                  <path d="M25 45 C25 40, 35 40, 35 45 C35 52, 25 58, 25 58 C25 58, 15 52, 15 45 C15 40, 25 40, 25 45" fill="#F8B4C4" />
                  <path d="M115 45 C115 40, 125 40, 125 45 C125 52, 115 58, 115 58 C115 58, 105 52, 105 45 C105 40, 115 40, 115 45" fill="#F8B4C4" />
                  {/* Kitten head */}
                  <ellipse cx="70" cy="72" rx="42" ry="36" fill="#FFFFFF" stroke="#33222B" strokeWidth="3" />
                  {/* Ears */}
                  <polygon points="40,46 32,24 54,38" fill="#FFFFFF" stroke="#33222B" strokeWidth="3" strokeLinejoin="round" />
                  <polygon points="100,46 108,24 86,38" fill="#FFFFFF" stroke="#33222B" strokeWidth="3" strokeLinejoin="round" />
                  {/* Little Tiara on Kitten */}
                  <polygon points="56,38 62,28 70,36 78,28 84,38" fill="#F7C844" stroke="#664614" strokeWidth="2" strokeLinejoin="round" />
                  {/* Cute Eyes & Nose */}
                  <ellipse cx="58" cy="70" rx="3" ry="4" fill="#33222B" />
                  <ellipse cx="82" cy="70" rx="3" ry="4" fill="#33222B" />
                  <polygon points="68,75 72,75 70,78" fill="#D84A6E" />
                  <path d="M66,80 Q70,84 74,80" fill="none" stroke="#33222B" strokeWidth="2" strokeLinecap="round" />
                  {/* Blush */}
                  <ellipse cx="50" cy="76" rx="5" ry="3" fill="#FFC0CB" opacity="0.8" />
                  <ellipse cx="90" cy="76" rx="5" ry="3" fill="#FFC0CB" opacity="0.8" />
                  {/* Body & paws holding rose */}
                  <path d="M50 102 C50 88, 90 88, 90 102" fill="#FFFFFF" stroke="#33222B" strokeWidth="3" />
                  {/* Red rose */}
                  <circle cx="70" cy="98" r="8" fill="#D84A6E" />
                  <line x1="70" y1="106" x2="70" y2="120" stroke="#487A4C" strokeWidth="2.5" />
                  <line x1="70" y1="112" x2="76" y2="108" stroke="#487A4C" strokeWidth="2" />
                </svg>
              ) : (
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#D84A6E] shadow-sm">
                  <img src="/photos/farheena-princess.jpg" alt="Farheena" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <span className="text-[10px] text-gray-400 font-sans tracking-wide">
              {showPhoto ? "Tap for doodle" : "Tap to view photo"}
            </span>
          </motion.div>
        </div>

        {/* Headings */}
        <h2 className="font-script text-5xl md:text-6xl text-[#D84A6E] leading-none mb-1">
          Farheena,
        </h2>
        <h1 className="font-serif text-2xl md:text-4xl font-normal text-[#2A2226] tracking-tight leading-snug mb-3">
          happy princess day, your castle is waiting
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#57474E] max-w-xs md:max-w-sm mx-auto leading-relaxed mb-7 font-normal">
          Roses, a baby dragon, a swan boat and a crown with your name on it. Tap Enter and walk with me.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnter}
          className="w-full max-w-[280px] py-4 rounded-full bg-[#D84A6E] hover:bg-[#C4385C] text-white font-sans font-semibold text-base shadow-[0_8px_24px_rgba(216,74,110,0.32)] transition-all tracking-wide"
        >
          Enter the castle
        </motion.button>
      </div>

      {/* Floating Audio Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={onToggleMute}
          className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-pink-100 flex items-center justify-center text-[#D84A6E] hover:scale-105 active:scale-95 transition-transform"
          title={isMuted ? 'Play music' : 'Mute music'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Music className="w-5 h-5 animate-pulse" />}
        </button>
      </div>
    </div>
  );
}
