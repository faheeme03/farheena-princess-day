import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Sparkles, Heart, Crown } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function OpeningScreen({ onEnter, isMuted, onToggleMute, musicTrack, onChangeTrack }) {
  const [storyStep, setStoryStep] = useState(0);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  // Automatically advance the romantic opening story sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setStoryStep(1), 2200);
    const timer2 = setTimeout(() => setStoryStep(2), 5200);
    const timer3 = setTimeout(() => setStoryStep(3), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnterClick = () => {
    soundSystem.playRosePick();
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#2B1055] via-[#57364F] to-[#EFA9C5] text-white p-6 select-none">
      {/* Night Sky / Sunset Clouds & Glowing Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing Moon */}
        <div className="absolute top-10 right-12 md:right-24 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#FCE7B2] shadow-[0_0_60px_rgba(255,243,176,0.85)] flex items-center justify-center opacity-90 animate-pulse-glow">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/40" />
        </div>

        {/* Twinkling Stars */}
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-sparkle"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1.5}px`,
              height: `${Math.random() * 3 + 1.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}

        {/* Floating Rose Petals */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-rose-300 opacity-70 select-none text-xl"
            initial={{
              y: -50,
              x: `${Math.random() * 100}vw`,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: '110vh',
              x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 60}px)`,
              rotate: 360,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'linear',
            }}
          >
            🌸
          </motion.div>
        ))}

        {/* Animated Butterflies */}
        <motion.div
          className="absolute text-2xl select-none"
          animate={{
            x: ['-10vw', '40vw', '75vw', '110vw'],
            y: ['70vh', '45vh', '60vh', '30vh'],
            rotate: [15, -15, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          🦋
        </motion.div>
        <motion.div
          className="absolute text-xl select-none"
          animate={{
            x: ['110vw', '60vw', '25vw', '-10vw'],
            y: ['35vh', '55vh', '30vh', '65vh'],
            rotate: [-15, 20, -10, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        >
          ✨
        </motion.div>
      </div>

      {/* Top Header: Floating Badge & Audio Controls */}
      <div className="relative z-20 w-full max-w-5xl flex items-center justify-between pt-4">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-lg text-xs md:text-sm tracking-wide text-pink-100 font-sans"
        >
          <Crown className="w-4 h-4 text-gold animate-bounce" />
          <span>{websiteContent.welcome.badge}</span>
        </motion.div>

        {/* Audio Toggle / Preset Selector */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMusicMenu(!showMusicMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white/90 hover:bg-white/25 transition-all"
            >
              <Music className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline">Music</span>
            </button>
            <button
              onClick={onToggleMute}
              className="p-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/90 hover:bg-white/25 transition-all"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>
          </div>

          {/* Music Menu Dropdown */}
          <AnimatePresence>
            {showMusicMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-64 bg-[#391E36]/90 backdrop-blur-xl border border-pink-300/30 rounded-2xl p-3 shadow-2xl z-30 text-left text-xs text-white space-y-2"
              >
                <div className="font-semibold text-gold border-b border-white/10 pb-1.5 flex items-center justify-between">
                  <span>Romantic Soundtracks</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                </div>
                {websiteContent.musicPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onChangeTrack(preset.id);
                      setShowMusicMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      musicTrack === preset.id ? 'bg-rose/40 text-gold-light font-medium' : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <span>{preset.title}</span>
                    {musicTrack === preset.id && <Heart className="w-3 h-3 text-rose fill-rose" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center Hero: Cinematic Fairytale Castle & Emotional Text */}
      <div className="relative z-20 my-auto text-center max-w-3xl flex flex-col items-center px-4">
        {/* Animated Fairytale Castle Vector Silhouette / Artwork */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative mb-6 cursor-pointer group"
          onClick={() => soundSystem.playSparkle()}
        >
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-pink-400/30 via-purple-300/20 to-gold/30 backdrop-blur-md flex items-center justify-center p-4 border border-white/30 shadow-[0_0_50px_rgba(239,169,197,0.4)] animate-float-medium group-hover:scale-105 transition-transform">
            {/* Castle SVG Illustration */}
            <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
              {/* Stars */}
              <circle cx="35" cy="40" r="3" fill="#FFF3B0" />
              <circle cx="165" cy="45" r="2.5" fill="#FFF3B0" />
              {/* Back towers */}
              <rect x="50" y="70" width="22" height="70" rx="3" fill="#8E5D87" />
              <polygon points="46,70 61,35 76,70" fill="#EFA9C5" />
              <rect x="128" y="70" width="22" height="70" rx="3" fill="#8E5D87" />
              <polygon points="124,70 139,35 154,70" fill="#EFA9C5" />
              {/* Central keep */}
              <rect x="75" y="55" width="50" height="85" rx="4" fill="#A875A1" />
              <polygon points="68,55 100,15 132,55" fill="#FCE7B2" />
              {/* Flag on top */}
              <line x1="100" y1="15" x2="100" y2="4" stroke="#D8B56D" strokeWidth="2" />
              <polygon points="100,4 115,9 100,14" fill="#FF69B4" />
              {/* Gate & Arches */}
              <path d="M 88 140 A 12 12 0 0 1 112 140 Z" fill="#421C3A" />
              <circle cx="100" cy="80" r="8" fill="#FFF3B0" opacity="0.9" />
              {/* Glowing windows */}
              <rect x="56" y="90" width="10" height="16" rx="5" fill="#FFF8E7" opacity="0.85" />
              <rect x="134" y="90" width="10" height="16" rx="5" fill="#FFF8E7" opacity="0.85" />
            </svg>
          </div>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gold text-plum-dark text-[11px] font-bold tracking-wider uppercase shadow-md">
            Princess Day 2026
          </span>
        </motion.div>

        {/* Storytelling Progression or Direct Headline */}
        <AnimatePresence mode="wait">
          {storyStep < 3 ? (
            <motion.div
              key={`story-${storyStep}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="min-h-[110px] flex flex-col items-center justify-center"
            >
              <h2 className="font-serif italic text-2xl md:text-4xl text-pink-100 max-w-xl leading-relaxed">
                "{websiteContent.welcome.openingStory[storyStep]}"
              </h2>
              <p className="text-xs text-pink-200/60 mt-3 font-sans tracking-widest uppercase">
                A True Love Story
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="main-cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight royal-gold-text mb-4 drop-shadow-lg">
                {websiteContent.welcome.heading}
              </h1>

              <p className="text-sm md:text-lg text-pink-100/90 font-sans max-w-xl mb-8 leading-relaxed font-light">
                {websiteContent.welcome.subheading}
              </p>

              {/* Enter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnterClick}
                className="relative group px-9 py-4 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-base md:text-lg tracking-wide shadow-[0_0_35px_rgba(216,181,109,0.7)] hover:shadow-[0_0_55px_rgba(255,215,0,0.9)] transition-all flex items-center gap-3 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <Sparkles className="w-5 h-5 text-plum" />
                <span>{websiteContent.welcome.buttonText}</span>
                <Heart className="w-5 h-5 text-rose-800 fill-rose-800 animate-pulse" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-20 text-center pb-2 text-xs md:text-sm text-pink-200/75 font-serif italic"
      >
        "{websiteContent.princess.tagline}"
      </motion.div>
    </div>
  );
}
