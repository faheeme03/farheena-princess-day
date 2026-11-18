import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Footprints, Compass, Mail, ImageIcon, RotateCcw } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function CutieMenuDrawer({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
  explorationMode,
  onToggleMode,
  onSkipToLetter,
  onOpenScrapbook,
  onReplayTour
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm select-none">
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-lg mx-auto bg-white rounded-t-[32px] p-6 shadow-2xl text-[#2A2226] font-sans flex flex-col space-y-4"
          >
            {/* Drag Pill */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-2" />

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg font-semibold text-[#2A2226]">
                Settings & Navigation
              </h3>
              <span className="text-xs text-[#D84A6E] font-medium">Farheena's Fairytale</span>
            </div>

            {/* Music Toggle */}
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Music className="w-4 h-4 text-[#D84A6E]" />
                <span className="text-sm font-medium">Background Music</span>
              </div>
              <button
                onClick={onToggleMute}
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  !isMuted ? 'bg-[#D84A6E] justify-end' : 'bg-gray-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Mode Switcher */}
            <button
              onClick={() => {
                onToggleMode();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left text-sm hover:text-[#D84A6E] transition-colors border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                {explorationMode === 'tour' ? <Footprints className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                <span>{explorationMode === 'tour' ? 'Switch to free walking' : 'Switch to royal tour'}</span>
              </div>
              <span className="text-xs text-gray-400">Toggle</span>
            </button>

            {/* Skip to Love Letter */}
            <button
              onClick={() => {
                onSkipToLetter();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left text-sm hover:text-[#D84A6E] transition-colors border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D84A6E]" />
                <span>Skip to the love letter</span>
              </div>
              <span className="text-xs text-gray-400">Open</span>
            </button>

            {/* Open Photo Scrapbook */}
            <button
              onClick={() => {
                onOpenScrapbook();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left text-sm hover:text-[#D84A6E] transition-colors border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-[#D84A6E]" />
                <span>Our Photo Scrapbook & Memories</span>
              </div>
              <span className="text-xs text-gray-400">View</span>
            </button>

            {/* Replay Tour */}
            <button
              onClick={() => {
                onReplayTour();
                onClose();
              }}
              className="w-full flex items-center justify-between py-2.5 text-left text-sm hover:text-[#D84A6E] transition-colors"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-gray-400" />
                <span>Replay from beginning</span>
              </div>
              <span className="text-xs text-gray-400">Restart</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2A2226] font-semibold text-sm transition-colors mt-2"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
