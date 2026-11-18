import React, { useEffect, useState } from 'react';

export default function CursorHearts() {
  const [trails, setTrails] = useState([]);
  const [clickHearts, setClickHearts] = useState([]);

  useEffect(() => {
    // Only enable mouse trail on devices with fine pointer (desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime > 65) {
        lastTime = now;
        const newTrail = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          emoji: ['✨', '💖', '🌸', '⭐'][Math.floor(Math.random() * 4)],
          size: Math.random() * 12 + 10,
        };
        setTrails((prev) => [...prev.slice(-12), newTrail]);
      }
    };

    const handleClick = (e) => {
      const newHearts = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX + (Math.random() * 40 - 20),
        y: e.clientY + (Math.random() * 40 - 20),
        emoji: ['💖', '👑', '✨', '🌹', '💕'][i % 5],
        size: Math.random() * 14 + 14,
      }));
      setClickHearts((prev) => [...prev.slice(-15), ...newHearts]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const cleanupInterval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
      setClickHearts((prev) => prev.slice(2));
    }, 280);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {trails.map((t) => (
        <span
          key={t.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-out select-none animate-float-fast"
          style={{
            left: t.x,
            top: t.y,
            fontSize: `${t.size}px`,
            opacity: 0.85,
          }}
        >
          {t.emoji}
        </span>
      ))}
      {clickHearts.map((h) => (
        <span
          key={h.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out select-none animate-bounce"
          style={{
            left: h.x,
            top: h.y,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
