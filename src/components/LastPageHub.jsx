import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Heart, Sparkles, Send, RotateCcw, Upload, Image as ImageIcon,
  Trash2, X, ChevronLeft, ChevronRight, Star, Clock, Eye
} from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';
import { compressImage, savePhotoToStorage, getAllStoredPhotos, deleteStoredPhoto } from '../utils/photoStorage';

export default function LastPageHub({ onRevisitCastle }) {
  // Photos state (pre-populated + stored)
  const [photos, setPhotos] = useState(websiteContent.gallery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Our Beautiful Memories');
  const [isUploading, setIsUploading] = useState(false);

  // 10 Reasons flipped state
  const [flippedCards, setFlippedCards] = useState({});

  // 11:11 Wish state
  const [wishMade, setWishMade] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);

  // Secret Easter Egg: Click crown 5 times
  const [crownClicks, setCrownClicks] = useState(0);
  const [showCrownSecret, setShowCrownSecret] = useState(false);

  // Secret Heart Easter Egg
  const [showSecretHeartNote, setShowSecretHeartNote] = useState(false);

  const categories = [
    'All',
    'My Favourite Picture of You',
    'Our Beautiful Memories',
    'The Moments I Never Want to Forget',
    'My Favourite Smile',
    'Us Together'
  ];

  // Load any previously uploaded photos from IndexedDB
  useEffect(() => {
    async function loadStorage() {
      const stored = await getAllStoredPhotos();
      if (stored && stored.length > 0) {
        // Merge stored with defaults without duplicates
        const existingIds = new Set(websiteContent.gallery.map(p => p.id));
        const customPhotos = stored.filter(p => !existingIds.has(p.id));
        setPhotos([...customPhotos, ...websiteContent.gallery]);
      }
    }
    loadStorage();
  }, []);

  // Handle Photo Upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    soundSystem.playSparkle();

    const newItems = [];
    for (let file of files) {
      const compressedDataUrl = await compressImage(file);
      const photoItem = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        src: compressedDataUrl,
        category: uploadCategory,
        caption: uploadCaption.trim() || 'A magical memory with my princess ❤️',
        rotation: `${(Math.random() * 6 - 3).toFixed(1)}deg`
      };
      await savePhotoToStorage(photoItem);
      newItems.push(photoItem);
    }

    setPhotos((prev) => [...newItems, ...prev]);
    setIsUploading(false);
    setShowUploadModal(false);
    setUploadCaption('');
  };

  const handleDeletePhoto = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Remove this photo from the scrapbook?')) return;
    await deleteStoredPhoto(id);
    setPhotos((prev) => prev.filter(p => p.id !== id));
  };

  // Flip Reason Card
  const toggleFlip = (id) => {
    soundSystem.playSparkle();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Trigger 11:11 Wish
  const handleMakeWish = () => {
    soundSystem.playCoinToss();
    setShootingStar(true);
    setTimeout(() => {
      setWishMade(true);
      setShootingStar(false);
    }, 1200);
  };

  // Crown Easter Egg
  const handleCrownClick = () => {
    soundSystem.playSparkle();
    const next = crownClicks + 1;
    setCrownClicks(next);
    if (next >= 5) {
      soundSystem.playCoronationFanfare();
      setShowCrownSecret(true);
      setCrownClicks(0);
    }
  };

  // Filter photos
  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFF8F0] via-[#F8DDE8] to-[#FFF8F0] text-[#57364F] py-12 px-4 md:px-8 select-none overflow-x-hidden">

      {/* Secret Crown Easter Egg Modal */}
      <AnimatePresence>
        {showCrownSecret && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-md p-7 rounded-3xl bg-[#FFFDF9] border-4 border-gold text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowCrownSecret(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 hover:bg-pink-200"
              >
                <X className="w-4 h-4 text-plum" />
              </button>
              <div className="text-5xl mb-3 animate-bounce">👑✨</div>
              <h3 className="font-serif text-2xl font-bold text-plum">
                You Found The Royal Secret!
              </h3>
              <p className="font-sans text-sm text-[#57364F] mt-3 leading-relaxed italic">
                "Farheena, you tapped the crown five times — just like the five letters of love. You are not only my princess for today, but the permanent queen of my heart."
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Heart Note Modal */}
      <AnimatePresence>
        {showSecretHeartNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-md p-7 rounded-3xl bg-[#FFFDF9] border-4 border-rose text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowSecretHeartNote(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 hover:bg-pink-200"
              >
                <X className="w-4 h-4 text-plum" />
              </button>
              <div className="text-4xl mb-3">💖</div>
              <h3 className="font-serif text-xl font-bold text-plum">
                A Secret Whisper For You
              </h3>
              <p className="font-handwritten text-2xl text-rose-800 mt-3 leading-relaxed">
                "Whenever I think of my future, your face is the only one I see. Thank you for being my person."
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-24">

        {/* 1. THE CLOSING RECAP CARD ("LAST PAGE") */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl glass-panel p-8 md:p-12 text-center border-2 border-gold shadow-2xl max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-8xl opacity-10 pointer-events-none">
            👑
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-bold tracking-widest uppercase mb-4">
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>Forever My Princess</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-plum mb-4">
            Happy Princess Day, Farheena! 👑❤️
          </h2>

          <p className="font-sans text-sm md:text-base text-[#57364F] max-w-xl mx-auto leading-relaxed mb-8">
            "Happy Princess Day to the one who rules my heart. Thank you for turning my life into a fairytale. You will always have a special place in my little world."
          </p>

          {/* Action Buttons: Visit castle again & Reply on WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                soundSystem.playSparkle();
                onRevisitCastle();
              }}
              className="py-3 px-6 rounded-full bg-white border border-gold text-plum font-sans font-bold text-sm tracking-wide shadow-md hover:bg-gold/10 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-gold" />
              <span>Visit the Castle Again</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent("I walked all over my castle and got my crown! 👑 Thank you, I love it.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundSystem.playRosePick()}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Reply: "I got my crown!" 👑</span>
            </a>
          </div>
        </motion.div>

        {/* 2. THE PRINCESS REVEAL SECTION */}
        <section className="text-center relative">
          <div className="flex flex-col items-center">
            {/* Crown with 5-click easter egg */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCrownClick}
              className="cursor-pointer text-5xl md:text-6xl mb-3 select-none filter drop-shadow-md"
              title="Click me 5 times for a royal surprise!"
            >
              👑
            </motion.div>

            <span className="text-xs uppercase tracking-widest font-semibold text-rose-800">
              Introducing the Princess of My World
            </span>

            <h2 className="font-royal text-4xl md:text-6xl font-black royal-gold-text tracking-wide mt-2 mb-4">
              {websiteContent.princess.name.toUpperCase()}
            </h2>

            <p className="font-serif italic text-base md:text-xl text-[#57364F] max-w-xl mx-auto mb-8 leading-relaxed">
              "{websiteContent.princess.quote}"
            </p>

            {/* Glowing 3D Tilt Portrait Frame */}
            <motion.div
              whileHover={{ scale: 1.03, rotateZ: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative w-64 h-80 md:w-80 md:h-96 p-3 rounded-3xl bg-gradient-to-tr from-gold via-rose to-gold shadow-[0_15px_40px_rgba(216,181,109,0.5)] cursor-pointer"
              onClick={() => soundSystem.playSparkle()}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img
                  src={websiteContent.princess.portrait}
                  alt={websiteContent.princess.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-serif italic text-sm">
                    My Forever Princess ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. OUR LITTLE UNIVERSE – PHOTO GALLERY & SCRAPBOOK */}
        <section>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-800">
              Scrapbook of Memories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-plum mt-1">
              Our Little Universe 📸✨
            </h2>
            <p className="text-xs md:text-sm text-[#57364F] mt-2 max-w-md mx-auto">
              Polaroids from our fairytale. Click any photo to enlarge or add your own pictures anytime!
            </p>

            {/* Category Filter Pills & Upload Button */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundSystem.playSparkle();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-rose text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-plum border border-pink-200'
                  }`}
                >
                  {cat}
                </button>
              ))}

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold to-rose text-plum-dark text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 ml-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
              </button>
            </div>
          </div>

          {/* Polaroid Scrapbook Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {filteredPhotos.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.04, rotate: '0deg', zIndex: 10 }}
                style={{ transform: `rotate(${item.rotation || '0deg'})` }}
                onClick={() => {
                  soundSystem.playSparkle();
                  setActiveLightboxIndex(idx);
                }}
                className="relative bg-white p-4 pb-6 rounded-2xl shadow-xl border border-pink-100 hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
              >
                {/* Washi tape sticker on top of polaroid */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 rounded-sm transform -rotate-2 pointer-events-none" />

                {/* Delete button if user uploaded */}
                {item.id.startsWith('user-') && (
                  <button
                    onClick={(e) => handleDeletePhoto(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 z-10 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Photo frame */}
                <div className="w-full h-64 rounded-xl overflow-hidden bg-pink-50 relative">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Polaroid Caption */}
                <div className="mt-4 px-1 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark block mb-1">
                    {item.category}
                  </span>
                  <p className="font-handwritten text-lg md:text-xl text-plum leading-snug">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. REASONS WHY YOU'RE MY PRINCESS (3D FLIP CARDS) */}
        <section>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-800">
              Straight From My Heart
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-plum mt-1">
              10 Reasons Why You're My Princess 💖
            </h2>
            <p className="text-xs md:text-sm text-[#57364F] mt-2">
              Tap any card to flip and reveal why you rule my heart.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {websiteContent.reasons.map((reason) => {
              const isFlipped = flippedCards[reason.id];
              return (
                <div
                  key={reason.id}
                  onClick={() => toggleFlip(reason.id)}
                  className="w-full h-44 cursor-pointer perspective-1000 select-none"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full relative transform-style-preserve-3d"
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-white via-pink-50 to-[#F8DDE8] border-2 border-gold/40 shadow-lg p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl mb-2">{reason.icon}</span>
                      <span className="font-serif font-bold text-sm text-plum">
                        {reason.title}
                      </span>
                      <span className="text-[10px] text-rose-600 mt-2 font-sans tracking-wide">
                        Tap to reveal ✨
                      </span>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#4A203F] to-[#2B1028] text-white border-2 border-gold shadow-xl p-4 flex flex-col items-center justify-center text-center">
                      <Heart className="w-4 h-4 text-rose fill-rose mb-1.5" />
                      <p className="font-sans text-xs text-pink-100 leading-relaxed font-light">
                        {reason.text}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. OUR LOVE STORY – TIMELINE */}
        <section>
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-800">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-plum mt-1">
              Our Love Story Timeline ⏳❤️
            </h2>
            <p className="text-xs md:text-sm text-[#57364F] mt-2">
              Every chapter with you is my favourite chapter.
            </p>
          </div>

          <div className="relative border-l-2 border-gold/60 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
            {websiteContent.timeline.map((mile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-gold border-4 border-white shadow flex items-center justify-center text-xs">
                  💖
                </div>

                {/* Milestone Card */}
                <div className="rounded-2xl bg-white p-5 md:p-6 shadow-md border border-pink-100 hover:shadow-xl transition-all flex flex-col md:flex-row gap-5 items-start">
                  {/* Photo if available */}
                  {mile.photo && (
                    <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-pink-100 shadow">
                      <img src={mile.photo} alt={mile.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-rose-800 font-bold text-[11px]">
                        {mile.tag}
                      </span>
                      <span className="text-xs text-gold-dark font-mono font-semibold">
                        {mile.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-plum mt-1">
                      {mile.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#57364F] mt-1.5 leading-relaxed font-sans">
                      {mile.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. THE INTERACTIVE 11:11 WISH SECTION ✨ */}
        <section className="rounded-3xl bg-gradient-to-b from-[#1b0826] to-[#3a1435] text-white p-8 md:p-14 text-center relative overflow-hidden shadow-2xl border-2 border-gold/40">
          {/* Night Sky Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-sparkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2.5 + 1}px`,
                  height: `${Math.random() * 2.5 + 1}px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Shooting Star Animation */}
          {shootingStar && (
            <motion.div
              initial={{ x: '-10vw', y: '10vh', opacity: 1 }}
              animate={{ x: '100vw', y: '60vh', opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute z-20 w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-gold shadow-[0_0_20px_#fff]"
            />
          )}

          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
            {/* Glowing 11:11 Clock */}
            <div className="px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-gold/50 shadow-[0_0_25px_rgba(255,215,0,0.4)] mb-4">
              <span className="font-mono text-3xl md:text-4xl font-bold royal-gold-text tracking-widest animate-pulse">
                {websiteContent.wishSection.time}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-pink-100 mb-2">
              The 11:11 Princess Wish
            </h3>
            <p className="font-sans text-xs md:text-sm text-pink-200/80 mb-6 leading-relaxed">
              "{websiteContent.wishSection.subtext}"
            </p>

            <AnimatePresence mode="wait">
              {!wishMade ? (
                <motion.button
                  key="wish-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMakeWish}
                  className="py-3 px-8 rounded-full bg-gradient-to-r from-gold via-rose to-gold text-plum-dark font-sans font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.8)] transition-all flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-plum fill-plum" />
                  <span>{websiteContent.wishSection.buttonText}</span>
                </motion.button>
              ) : (
                <motion.div
                  key="wish-revealed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-gold/40 text-center"
                >
                  <Heart className="w-6 h-6 text-rose fill-rose mx-auto mb-2 animate-bounce" />
                  <p className="font-serif italic text-base md:text-lg text-gold-light leading-relaxed">
                    "{websiteContent.wishSection.revealedMessage}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom Footer & Secret Heart */}
        <footer className="text-center pt-8 border-t border-pink-200/60 flex flex-col items-center">
          <p className="font-serif italic text-sm text-[#57364F]">
            Made with all my love for Farheena • Princess Day 2026 👑❤️
          </p>

          {/* Secret Heart Icon */}
          <button
            onClick={() => {
              soundSystem.playSparkle();
              setShowSecretHeartNote(true);
            }}
            className="mt-4 p-2 rounded-full hover:bg-pink-100 transition-colors text-rose"
            title="A secret heart..."
          >
            <Heart className="w-4 h-4 fill-rose" />
          </button>
        </footer>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredPhotos[activeLightboxIndex]?.src}
                alt="Enlarged memory"
                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl border-2 border-gold/60"
              />
              <p className="font-handwritten text-2xl text-pink-100 mt-4 text-center">
                {filteredPhotos[activeLightboxIndex]?.caption}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PHOTO UPLOAD MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-3xl bg-[#FFFDF9] border-2 border-gold shadow-2xl relative text-left"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-plum transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-xl font-bold text-plum mb-1 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold" />
                <span>Add Photos to Scrapbook</span>
              </h3>
              <p className="text-xs text-[#57364F] mb-4">
                Choose one or multiple pictures from your phone or laptop.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-plum block mb-1">
                    Select Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pink-200 text-xs bg-white text-plum focus:outline-none focus:border-rose"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-plum block mb-1">
                    Custom Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., That sweet smile that makes my day..."
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pink-200 text-xs bg-white text-plum focus:outline-none focus:border-rose"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-plum block mb-1">
                    Choose Image Files
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-plum file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose file:text-white hover:file:bg-pink-600 cursor-pointer"
                  />
                </div>

                {isUploading && (
                  <p className="text-xs text-rose-700 font-semibold text-center animate-pulse">
                    Compressing and saving your photos safely...
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
