import React from 'react';
import { Music, VolumeX, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function CutieNavbarHUD({
  currentStationId,
  totalStations = 10,
  onOpenMenu,
  isMuted,
  onToggleMute,
  explorationMode,
  onPrevStation,
  onNextStation,
  isAutoPlay,
  onToggleAutoPlay
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none font-sans">
      {/* Top Bar HUD */}
      <div className="pointer-events-auto absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Left: Memory Counter */}
        <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-xs font-semibold text-[#2A2226]">
          {currentStationId - 1} of {totalStations} memories
        </div>

        {/* Right: Menu Pill Button */}
        <button
          onClick={() => {
            soundSystem.playSparkle();
            onOpenMenu();
          }}
          className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-xs font-semibold text-[#2A2226] hover:bg-white active:scale-95 transition-all"
        >
          Menu
        </button>
      </div>

      {/* Floating Audio Button at bottom-right */}
      <div className="pointer-events-auto absolute bottom-6 right-6">
        <button
          onClick={onToggleMute}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#D84A6E] hover:scale-105 active:scale-95 transition-transform"
          title={isMuted ? 'Play music' : 'Mute music'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Music className="w-4 h-4" />}
        </button>
      </div>

      {/* Tour Navigation Controls (in Tour Mode) */}
      {explorationMode === 'tour' && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-[#2A2226]">
          <button
            onClick={() => {
              soundSystem.playSparkle();
              onPrevStation();
            }}
            disabled={currentStationId <= 1}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
            title="Previous Station"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundSystem.playSparkle();
              onToggleAutoPlay();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              isAutoPlay ? 'bg-[#D84A6E] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>Auto</span>
          </button>

          <button
            onClick={() => {
              soundSystem.playSparkle();
              onNextStation();
            }}
            disabled={currentStationId >= totalStations}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
            title="Next Station"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
