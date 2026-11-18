import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function AudioPlayerToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // When audio engine changes
    const checkState = () => {
      setIsPlaying(!soundSystem.isMuted && soundSystem.isPlaying);
    };
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    if (!soundSystem.isPlaying) {
      soundSystem.startMusic('fairytale');
      setIsPlaying(true);
    } else {
      const muted = soundSystem.toggleMute();
      setIsPlaying(!muted);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 p-2.5 sm:p-3 rounded-full bg-white/80 backdrop-blur-md border border-[#F497B6]/50 shadow-md text-[#6D3B53] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3 px-1">
            <span className="w-1 bg-[#D885A3] h-full rounded-full animate-pulse" />
            <span className="w-1 bg-[#D885A3] h-2 rounded-full animate-pulse delay-75" />
            <span className="w-1 bg-[#D885A3] h-3 rounded-full animate-pulse delay-150" />
          </div>
          <Volume2 className="w-4 h-4 text-[#D885A3]" />
        </>
      ) : (
        <VolumeX className="w-4 h-4 text-[#8E5B72]" />
      )}
    </button>
  );
}
