import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Heart, ArrowRight, Crown } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function MemoryCardModal({
  station,
  totalStations = 10,
  onClose,
  onNextMemory,
  onOpenLetter
}) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 30 }}
        className="relative w-full max-w-sm md:max-w-md rounded-3xl bg-[#FFFDF9] text-[#421C3A] border-4 border-gold shadow-[0_0_60px_rgba(216,181,109,0.5)] overflow-hidden p-6 md:p-7 flex flex-col items-center text-center"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-pink-100/60 hover:bg-pink-200 text-plum transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-800 text-[11px] font-bold tracking-widest uppercase mb-3 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{isLast ? 'You found them all' : `Memory ${station.id} of ${totalStations}`}</span>
        </div>

        {/* Golden Gilded Photo Frame */}
        <div className="relative w-56 h-56 md:w-64 md:h-64 my-2 p-2 rounded-2xl bg-gradient-to-tr from-[#D8B56D] via-[#FFF3B0] to-[#D8B56D] shadow-xl">
          <div className="w-full h-full rounded-xl overflow-hidden bg-rose/20 relative group">
            <img
              src={station.photo}
              alt={station.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 right-2 text-2xl filter drop-shadow">
              {station.doodle}
            </div>
          </div>
        </div>

        {/* Title & Caption */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-plum mt-3">
          {station.title}
        </h3>
        <p className="text-xs uppercase tracking-widest font-semibold text-rose-700 mt-0.5">
          {station.caption}
        </p>

        {/* Heartfelt Message */}
        <p className="font-sans text-xs md:text-sm text-[#57364F] mt-3 leading-relaxed px-2 font-normal italic">
          "{station.message}"
        </p>

        {/* Action Button */}
        <div className="w-full mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLast ? (
              <>
                <Crown className="w-4 h-4 text-plum" />
                <span>Read Your Love Letter 💌</span>
              </>
            ) : (
              <>
                <span>Next Station</span>
                <ArrowRight className="w-4 h-4 text-plum" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
