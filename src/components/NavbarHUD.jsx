import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, VolumeX, Music, Menu, X, Play, Pause, ChevronLeft, ChevronRight,
  Sun, Moon, Cloud, Heart, Crown, Image as ImageIcon, Mail
} from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';

export default function NavbarHUD({
  currentStationId,
  totalStations = 10,
  isMuted,
  onToggleMute,
  musicTrack,
  onChangeTrack,
  explorationMode,
  onToggleMode,
  lightingTheme,
  onChangeLightingTheme,
  onPrevStation,
  onNextStation,
  isAutoPlay,
  onToggleAutoPlay,
  onOpenLetter,
  onOpenGallery
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none">
      {/* Top Bar HUD */}
      <div className="pointer-events-auto absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Left: Memory Progress Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C1028]/80 backdrop-blur-md border border-gold/40 shadow-lg text-white">
          <Crown className="w-4 h-4 text-gold" />
          <span className="text-xs font-semibold tracking-wide font-sans">
            <span className="text-gold-light">{currentStationId}</span> of {totalStations} memories
          </span>
        </div>

        {/* Right HUD Controls: Mode, Audio, Menu */}
        <div className="flex items-center gap-2">
          {/* Mode Badge Toggle */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              onToggleMode();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1028]/80 backdrop-blur-md border border-white/20 text-xs text-white hover:bg-[#3D1837] transition-all"
            title="Toggle Tour / Free-Walk mode"
          >
            <span>{explorationMode === 'tour' ? '🏰 Tour Mode' : '🌸 Free Walk'}</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className="p-2 rounded-full bg-[#2C1028]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#3D1837] transition-all"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-300" />
            )}
          </button>

          {/* Menu Drawer Toggle */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              setShowMenu(!showMenu);
            }}
            className="p-2 rounded-full bg-[#2C1028]/80 backdrop-blur-md border border-gold/50 text-gold-light hover:bg-[#3D1837] transition-all"
          >
            {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menu Drawer Modal */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="pointer-events-auto absolute top-16 right-4 w-72 p-4 rounded-3xl bg-[#260e23]/95 backdrop-blur-xl border border-gold/40 shadow-2xl text-white space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-serif font-bold text-sm text-gold-light">
                Fairytale Settings
              </span>
              <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
            </div>

            {/* Lighting Theme */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-pink-200/70 font-semibold block mb-1.5">
                Lighting Atmosphere
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'sunset', label: 'Twilight', icon: Moon },
                  { id: 'golden', label: 'Golden', icon: Sun },
                  { id: 'morning', label: 'Morning', icon: Cloud }
                ].map((th) => {
                  const Icon = th.icon;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        onChangeLightingTheme(th.id);
                        soundSystem.playSparkle();
                      }}
                      className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${
                        lightingTheme === th.id
                          ? 'bg-gold/30 border border-gold text-gold-light'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{th.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-pink-200/70 font-semibold block mb-1">
                Quick Shortcuts
              </span>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenLetter();
                }}
                className="w-full text-left p-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-pink-100 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Read Love Letter 💌</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenGallery();
                }}
                className="w-full text-left p-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-pink-100 flex items-center gap-2"
              >
                <ImageIcon className="w-3.5 h-3.5 text-rose" />
                <span>Photo Scrapbook 📸</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Tour Controls (in Tour Mode) */}
      {explorationMode === 'tour' && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full bg-[#2B1028]/90 backdrop-blur-md border border-gold/40 shadow-xl text-white">
          {/* Back Button */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              onPrevStation();
            }}
            disabled={currentStationId <= 1}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/15 disabled:opacity-30 transition-all text-pink-100"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Auto Play Toggle */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              onToggleAutoPlay();
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isAutoPlay
                ? 'bg-gold text-plum-dark font-bold'
                : 'hover:bg-white/15 text-gold-light'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Auto</span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              onNextStation();
            }}
            disabled={currentStationId >= totalStations}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/15 disabled:opacity-30 transition-all text-pink-100"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
