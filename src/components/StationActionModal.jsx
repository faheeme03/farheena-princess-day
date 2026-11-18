import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart } from 'lucide-react';
import { soundSystem } from '../utils/audioEngine';

export default function StationActionModal({ station, onCompleteAction }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Press-and-Hold mechanic for Station 10 (Coronation)
  useEffect(() => {
    let timer;
    if (isHolding && station.key === 'coronation') {
      timer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            handleTriggerAction();
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

  const handleTriggerAction = () => {
    if (isDone) return;
    setIsDone(true);

    // Play appropriate sound effect
    switch (station.key) {
      case 'gates':
        soundSystem.playGateOpen();
        break;
      case 'roses':
        soundSystem.playRosePick();
        break;
      case 'tea':
        soundSystem.playTeaPour();
        break;
      case 'dragon':
        soundSystem.playDragonChirp();
        break;
      case 'wishing-well':
        soundSystem.playCoinToss();
        break;
      case 'swan-boat':
        soundSystem.playSwanBoat();
        break;
      case 'portrait':
        soundSystem.playSparkle();
        break;
      case 'dance':
        soundSystem.playRosePick();
        break;
      case 'tower':
        soundSystem.playSparkle();
        break;
      case 'coronation':
        soundSystem.playCoronationFanfare();
        break;
      default:
        soundSystem.playSparkle();
    }

    setTimeout(() => {
      onCompleteAction(station);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4 select-none pointer-events-auto"
    >
      <div className="p-5 rounded-3xl bg-[#2E1229]/90 backdrop-blur-xl border border-gold/50 shadow-[0_0_35px_rgba(216,181,109,0.35)] text-center text-white flex flex-col items-center">
        {/* Landmark Title Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-light text-[11px] font-bold tracking-wider uppercase mb-2">
          <span>{station.doodle}</span>
          <span>{station.title}</span>
        </div>

        <p className="text-sm font-serif italic text-pink-100 mb-4">
          "{station.caption}"
        </p>

        {/* Action Button */}
        {station.key === 'coronation' ? (
          /* Hold to Crown Radial Indicator */
          <div className="flex flex-col items-center">
            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-gold via-rose to-gold flex items-center justify-center text-plum-dark shadow-[0_0_30px_rgba(255,215,0,0.6)] active:scale-95 transition-all"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#FFF3B0"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="226"
                  strokeDashoffset={226 - (226 * holdProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <Crown className="w-8 h-8 text-plum animate-bounce" />
            </button>
            <span className="text-xs text-gold-light mt-2.5 font-medium tracking-wide">
              {holdProgress > 0 ? `Crowning... ${holdProgress}%` : 'Hold to crown Farheena 👑'}
            </span>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTriggerAction}
            disabled={isDone}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-plum" />
            <span>{station.actionText}</span>
            <Heart className="w-4 h-4 text-rose-800 fill-rose-800" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
