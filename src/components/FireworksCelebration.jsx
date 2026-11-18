import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, Heart, ArrowRight } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function FireworksCelebration({ onSeeTheRest }) {
  useEffect(() => {
    // Launch fireworks sound
    soundSystem.playFirework();
    const soundInterval = setInterval(() => {
      soundSystem.playFirework();
    }, 1800);

    // Heart Confetti Cannons
    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#EFA9C5', '#D8B56D', '#FF69B4', '#FFF3B0', '#FFFFFF'],
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EFA9C5', '#D8B56D', '#FF69B4', '#FFF3B0', '#FFFFFF'],
        shapes: ['circle', 'square'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      clearInterval(soundInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#1b0826] via-[#3d1437] to-[#14061a] text-white select-none overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-gold-light text-xs font-semibold"
      >
        <Crown className="w-4 h-4 text-gold animate-bounce" />
        <span>Coronation Fireworks Display</span>
      </motion.div>

      {/* Central Calligraphy Fireworks Statement */}
      <div className="relative z-10 my-auto text-center max-w-2xl px-4 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl mb-4 animate-float-medium"
        >
          👑
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-royal text-3xl md:text-6xl font-bold royal-gold-text mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] leading-tight"
        >
          Long live my princess
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-script text-4xl md:text-6xl text-rose mb-6"
        >
          Farheena ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-serif italic text-sm md:text-lg text-pink-100 max-w-lg leading-relaxed"
        >
          "{websiteContent.celebration.finalLoveMessage}"
        </motion.p>
      </div>

      {/* Bottom Button to View Scrapbook & Extended Hub */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 pb-6 w-full max-w-xs"
      >
        <button
          onClick={() => {
            soundSystem.playSparkle();
            onSeeTheRest();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(255,215,0,0.7)] hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <span>See the rest 💝</span>
          <ArrowRight className="w-4 h-4 text-plum" />
        </button>
      </motion.div>
    </div>
  );
}
