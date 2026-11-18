import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingParticles from './components/FloatingParticles';
import AudioPlayerToggle from './components/AudioPlayerToggle';
import CursorHearts from './components/CursorHearts';
import Stage1Gate from './components/Stage1Gate';
import Stage2GiftBox from './components/Stage2GiftBox';
import Stage4Memories from './components/Stage4Memories';
import Stage5LoveLetter from './components/Stage5LoveLetter';
import Stage6Final from './components/Stage6Final';

export default function App() {
  // Stages: 'gate' | 'giftbox' | 'memories' | 'final'
  const [currentStage, setCurrentStage] = useState('gate');
  const [showLoveLetter, setShowLoveLetter] = useState(false);

  const handleOpenGate = () => {
    setCurrentStage('giftbox');
  };

  const handleContinueToMemories = () => {
    setCurrentStage('memories');
  };

  const handleOpenLetter = () => {
    setShowLoveLetter(true);
  };

  const handleCloseLetter = () => {
    setShowLoveLetter(false);
    setCurrentStage('final');
  };

  const handleReplay = () => {
    setShowLoveLetter(false);
    setCurrentStage('gate');
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#FFF0F4] font-sans antialiased text-[#6D3B53] flex flex-col justify-center">
      {/* Background Floating Elements */}
      <FloatingParticles />

      {/* Floating Audio Toggle in Top Right */}
      <AudioPlayerToggle />

      {/* Interactive Cursor Hearts & Sparkles */}
      <CursorHearts />

      {/* Stage Views with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {currentStage === 'gate' && (
          <Stage1Gate key="stage-gate" onOpenGate={handleOpenGate} />
        )}

        {currentStage === 'giftbox' && (
          <Stage2GiftBox
            key="stage-giftbox"
            onContinueToMemories={handleContinueToMemories}
          />
        )}

        {currentStage === 'memories' && (
          <Stage4Memories
            key="stage-memories"
            onOpenLetter={handleOpenLetter}
          />
        )}

        {currentStage === 'final' && (
          <Stage6Final key="stage-final" onReplay={handleReplay} />
        )}
      </AnimatePresence>

      {/* Love Letter Modal (Stage 5) */}
      <AnimatePresence>
        {showLoveLetter && (
          <Stage5LoveLetter
            key="stage-letter"
            onCloseLetter={handleCloseLetter}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
