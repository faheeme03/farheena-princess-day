import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function CutieStationActionButton({ station, onCompleteAction }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isHolding && station.key === 'coronation') {
      timer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            triggerAction();
            return 100;
          }
          return prev + 6;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(timer);
  }, [isHolding, station.key]);

  const triggerAction = () => {
    switch (station.key) {
      case 'gates': soundSystem.playGateOpen(); break;
      case 'roses': soundSystem.playRosePick(); break;
      case 'tea': soundSystem.playTeaPour(); break;
      case 'dragon': soundSystem.playDragonChirp(); break;
      case 'wishing-well': soundSystem.playCoinToss(); break;
      case 'swan-boat': soundSystem.playSwanBoat(); break;
      case 'portrait': soundSystem.playSparkle(); break;
      case 'dance': soundSystem.playRosePick(); break;
      case 'tower': soundSystem.playSparkle(); break;
      case 'coronation': soundSystem.playCoronationFanfare(); break;
      default: soundSystem.playSparkle();
    }

    setTimeout(() => {
      onCompleteAction(station);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 select-none font-sans"
    >
      {station.key === 'coronation' ? (
        <button
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className="relative py-4 px-8 rounded-full bg-[#D84A6E] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(216,74,110,0.35)] active:scale-95 transition-all flex items-center gap-2 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-[#A62F4E] transition-all"
            style={{ width: `${holdProgress}%` }}
          />
          <Crown className="w-4 h-4 text-white relative z-10" />
          <span className="relative z-10">
            {holdProgress > 0 ? `Crowning... ${holdProgress}%` : 'Hold to crown Farheena 👑'}
          </span>
        </button>
      ) : (
        <button
          onClick={triggerAction}
          className="py-4 px-8 rounded-full bg-[#D84A6E] hover:bg-[#C23B5E] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(216,74,110,0.35)] hover:scale-105 active:scale-95 transition-all"
        >
          {station.actionText}
        </button>
      )}
    </motion.div>
  );
}
