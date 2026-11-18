import React from 'react';
import { motion } from 'framer-motion';
import { soundSystem } from '../utils/audioEngine';

export default function CutieModeSelectionModal({ onSelectMode }) {
  const handlePick = (mode) => {
    soundSystem.playSparkle();
    onSelectMode(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px] select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-[32px] bg-white border border-[#F6EBE5] shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-center text-[#2A2226] flex flex-col items-center"
      >
        <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#2A2226] mb-6">
          How do you want to explore?
        </h2>

        <div className="w-full flex flex-col gap-3">
          {/* Option 1: Walk around */}
          <button
            onClick={() => handlePick('walk')}
            className="w-full py-3.5 rounded-full bg-[#D84A6E] hover:bg-[#C23B5E] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(216,74,110,0.25)] transition-all"
          >
            Walk around
          </button>

          {/* Option 2: Take the royal tour */}
          <button
            onClick={() => handlePick('tour')}
            className="w-full py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-[#2A2226] font-semibold text-sm shadow-sm transition-all"
          >
            Take the royal tour
          </button>
        </div>
      </motion.div>
    </div>
  );
}
