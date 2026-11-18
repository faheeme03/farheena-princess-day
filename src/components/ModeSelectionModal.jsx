import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Footprints, Sparkles, Crown, ArrowRight } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function ModeSelectionModal({ onSelectMode }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handlePick = (mode) => {
    soundSystem.playSparkle();
    onSelectMode(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          /* Loading State: Lowering the drawbridge */
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md p-8 rounded-3xl bg-[#351631]/90 border border-gold/30 text-center shadow-2xl flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-3xl mb-4 animate-bounce">
              👑
            </div>
            <h3 className="font-serif text-2xl text-pink-100 font-semibold mb-2">
              Lowering the drawbridge...
            </h3>
            <p className="text-xs text-pink-200/70 mb-6 font-sans">
              Preparing Farheena's magical 3D fairytale castle
            </p>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-gold/30">
              <motion.div
                className="h-full bg-gradient-to-r from-gold via-rose to-gold rounded-full"
                style={{ width: `${loadingProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="text-[11px] text-gold-light/80 mt-2 font-mono">
              {loadingProgress}%
            </span>
          </motion.div>
        ) : (
          /* Exploration Choice Modal */
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg p-7 md:p-9 rounded-3xl bg-[#32132D]/95 border border-gold/40 shadow-[0_0_50px_rgba(216,181,109,0.35)] text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold-light text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Choose Your Adventure</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 royal-gold-text">
              How do you want to explore?
            </h2>
            <p className="text-xs md:text-sm text-pink-200/80 mb-7 max-w-sm mx-auto">
              Your castle has 10 enchanted memory stations waiting for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: The Royal Tour */}
              <button
                onClick={() => handlePick('tour')}
                className="group relative text-left p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border-2 border-gold/60 hover:border-gold transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="absolute -top-3 right-3 px-2 py-0.5 rounded-full bg-gold text-plum-dark text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-xl mb-3 text-gold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-pink-100 group-hover:text-gold-light transition-colors">
                    Take the royal tour 🏰
                  </h4>
                  <p className="text-xs text-pink-200/70 mt-1.5 leading-relaxed font-sans">
                    A smooth, guided cinematic camera journey gliding between all 10 stations with story controls.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-gold font-semibold">
                  <span>Begin Tour</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 2: Walk around */}
              <button
                onClick={() => handlePick('walk')}
                className="group text-left p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-pink-300/60 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose/20 flex items-center justify-center text-xl mb-3 text-rose">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-pink-100 group-hover:text-rose transition-colors">
                    Walk around 🌸
                  </h4>
                  <p className="text-xs text-pink-200/70 mt-1.5 leading-relaxed font-sans">
                    Free-roam exploration with an on-screen joystick or tap/drag to walk anywhere on the island.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-pink-300 font-semibold">
                  <span>Explore Freely</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
