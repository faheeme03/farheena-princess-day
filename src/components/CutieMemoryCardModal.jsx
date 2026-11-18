import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function CutieMemoryCardModal({
  station,
  totalStations = 10,
  onClose,
  onNextMemory,
  onOpenLetter
}) {
  const [showPhoto, setShowPhoto] = useState(true);
  const isLast = station.id === totalStations;

  const handleNext = () => {
    soundSystem.playSparkle();
    if (isLast) {
      onOpenLetter();
    } else {
      onNextMemory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm rounded-[32px] bg-white text-[#2A2226] border border-[#F6EBE5] shadow-[0_20px_50px_rgba(216,74,110,0.18)] p-6 md:p-7 flex flex-col items-center text-center font-sans overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Image Box: Real Photo / Cute Doodle */}
        <div className="w-full max-w-[280px] h-60 my-2 rounded-2xl overflow-hidden bg-[#FFF9F5] border border-pink-100 flex items-center justify-center relative shadow-sm">
          {showPhoto && station.photo ? (
            <img
              src={station.photo}
              alt={station.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl flex flex-col items-center justify-center gap-2">
              <span>{station.doodle}</span>
              <span className="text-xs text-[#D84A6E] font-medium font-sans">
                Station {station.id}
              </span>
            </div>
          )}

          {/* Toggle between real photo & doodle */}
          {station.photo && (
            <button
              onClick={() => setShowPhoto(!showPhoto)}
              className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-semibold text-[#D84A6E] shadow border border-pink-100 hover:bg-white"
            >
              {showPhoto ? 'View Doodle' : 'View Our Photo'}
            </button>
          )}
        </div>

        {/* Station Label */}
        <span className="text-[11px] font-bold tracking-widest text-[#8A7B84] uppercase mt-3 block">
          {station.title}
        </span>

        {/* Script Heading */}
        <h3 className="font-script text-3xl md:text-4xl text-[#D84A6E] mt-0.5 leading-tight">
          {station.caption}
        </h3>

        {/* Message Body */}
        <p className="font-sans text-xs md:text-sm text-[#57474E] mt-2.5 leading-relaxed font-normal">
          {station.message}
        </p>

        {/* Bottom CTA Button */}
        <div className="w-full mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-full bg-[#D84A6E] hover:bg-[#C4385C] text-white font-sans font-semibold text-sm shadow-[0_6px_20px_rgba(216,74,110,0.3)] transition-all"
          >
            {isLast ? 'Read your love letter' : 'Next memory'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
