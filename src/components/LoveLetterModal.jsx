import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ArrowRight } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function LoveLetterModal({ onClose, onProceedToCelebration }) {
  const [isOpen, setIsOpen] = useState(false);
  const letter = websiteContent.loveLetter;

  const handleOpenEnvelope = () => {
    soundSystem.playRosePick();
    setIsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#2B1055]/85 via-[#57364F]/85 to-[#EFA9C5]/85 backdrop-blur-md select-none overflow-y-auto">
      {/* Background Floating Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300 opacity-60 text-lg animate-float-slow"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-lg my-auto flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope */
            <motion.div
              key="sealed-envelope"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              onClick={handleOpenEnvelope}
              className="w-full max-w-md h-64 md:h-72 rounded-2xl bg-gradient-to-br from-[#FCE7B2] via-[#F8DDE8] to-[#EFA9C5] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-2 border-gold cursor-pointer group flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-pink-300/40 transform origin-top group-hover:scale-y-95 transition-transform" />

              {/* Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#9e1b32] via-[#c41e3a] to-[#e63946] border-2 border-gold shadow-2xl flex flex-col items-center justify-center text-white z-10"
              >
                <Heart className="w-8 h-8 fill-white text-white drop-shadow" />
                <span className="text-[9px] font-serif uppercase tracking-widest text-gold-light mt-0.5">
                  Farheena
                </span>
              </motion.div>

              <div className="mt-6 text-center z-10">
                <p className="font-serif italic text-plum-dark text-lg font-bold">
                  A Letter Straight From My Heart
                </p>
                <span className="text-xs text-plum font-sans flex items-center justify-center gap-1 mt-1 group-hover:text-rose-800 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  Tap to break the seal & read
                </span>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Handwritten Letter */
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full rounded-3xl bg-[#FFFDF9] border-4 border-gold shadow-[0_25px_60px_rgba(87,54,79,0.4)] p-6 md:p-8 text-[#421C3A] flex flex-col"
            >
              {/* Wax seal header icon */}
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💌</span>
                  <span className="font-serif text-sm font-semibold text-rose-800 tracking-wider uppercase">
                    Royal Decree & Love Letter
                  </span>
                </div>
                <span className="text-xs text-gold font-mono font-bold">
                  {websiteContent.princess.date}
                </span>
              </div>

              {/* Handwritten font styling */}
              <div className="font-handwritten text-xl md:text-2xl text-[#3c1737] space-y-4 leading-relaxed tracking-wide">
                <p className="font-bold text-2xl md:text-3xl text-plum">
                  {letter.salutation}
                </p>
                <p className="text-rose-700 font-bold">
                  {letter.greeting}
                </p>

                {letter.body.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}

                <div className="pt-4 text-right">
                  <p className="italic text-rose-800">{letter.closing}</p>
                  <p className="font-bold text-2xl text-plum">{letter.signature}</p>
                </div>
              </div>

              {/* Bottom CTA to Celebration */}
              <div className="mt-8 pt-4 border-t border-pink-200/80 flex items-center justify-end">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    soundSystem.playFirework();
                    onProceedToCelebration();
                  }}
                  className="py-3 px-6 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-plum" />
                  <span>Grand Royal Celebration 🎆</span>
                  <ArrowRight className="w-4 h-4 text-plum" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
