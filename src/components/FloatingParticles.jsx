import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  // Predefined floating pastel hearts and sparkles
  const particles = [
    { id: 1, type: 'heart', top: '10%', left: '8%', size: 22, delay: 0, duration: 4.5 },
    { id: 2, type: 'sparkle', top: '18%', right: '12%', size: 18, delay: 0.8, duration: 3.8 },
    { id: 3, type: 'heart', top: '35%', left: '4%', size: 16, delay: 1.5, duration: 5.2 },
    { id: 4, type: 'sparkle', top: '42%', right: '8%', size: 24, delay: 0.3, duration: 4.2 },
    { id: 5, type: 'heart', bottom: '22%', left: '10%', size: 26, delay: 1.2, duration: 4.8 },
    { id: 6, type: 'sparkle', bottom: '15%', right: '14%', size: 20, delay: 1.9, duration: 3.5 },
    { id: 7, type: 'heart', top: '8%', right: '28%', size: 14, delay: 0.5, duration: 4.0 },
    { id: 8, type: 'sparkle', bottom: '32%', left: '22%', size: 16, delay: 2.1, duration: 5.0 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-6, 6, -6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#F497B6"
              className="opacity-60 drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#FFE680"
              className="opacity-75 drop-shadow-sm"
            >
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
