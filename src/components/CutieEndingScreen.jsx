import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Send, ImageIcon, Heart, X, Trash2, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { websiteContent } from '../data/websiteContent';
import { soundSystem } from '../utils/audioEngine';
import { compressImage, savePhotoToStorage, getAllStoredPhotos, deleteStoredPhoto } from '../utils/photoStorage';

export default function CutieEndingScreen({ onRevisitCastle }) {
  const [showPhotoInCard, setShowPhotoInCard] = useState(true);
  const [showScrapbookModal, setShowScrapbookModal] = useState(false);
  const [photos, setPhotos] = useState(websiteContent.gallery);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load photos
  React.useEffect(() => {
    async function load() {
      const stored = await getAllStoredPhotos();
      if (stored && stored.length > 0) {
        const existingIds = new Set(websiteContent.gallery.map(p => p.id));
        const customPhotos = stored.filter(p => !existingIds.has(p.id));
        setPhotos([...customPhotos, ...websiteContent.gallery]);
      }
    }
    load();
  }, []);

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
        category: 'Our Beautiful Memories',
        caption: 'A precious memory with my princess ❤️',
        rotation: `${(Math.random() * 4 - 2).toFixed(1)}deg`
      };
      await savePhotoToStorage(photoItem);
      newItems.push(photoItem);
    }
    setPhotos((prev) => [...newItems, ...prev]);
    setIsUploading(false);
  };

  const handleDeletePhoto = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Remove this photo?')) return;
    await deleteStoredPhoto(id);
    setPhotos((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-[#FFF9F5] text-[#2A2226] p-6 select-none font-sans overflow-x-hidden">
      {/* Top Title */}
      <div className="relative z-10 pt-4 md:pt-8 text-center">
        <h2 className="font-script text-4xl md:text-5xl text-[#D84A6E]">
          Forever my princess
        </h2>
      </div>

      {/* Center Card */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-sm w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-[32px] bg-white border border-[#F6EBE5] shadow-[0_16px_40px_rgba(216,74,110,0.12)] p-7 flex flex-col items-center text-center"
        >
          {/* Card Top Artwork / Photo */}
          <div
            onClick={() => setShowPhotoInCard(!showPhotoInCard)}
            className="w-56 h-56 rounded-2xl overflow-hidden bg-[#FFF9F5] border border-pink-100 flex items-center justify-center cursor-pointer shadow-sm relative group"
            title="Click to toggle photo / doodle"
          >
            {showPhotoInCard ? (
              <img
                src="/photos/couple-portrait.jpg"
                alt="Us together"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-6xl animate-bounce">
                👑🧸
              </div>
            )}
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-semibold text-[#D84A6E] shadow">
              {showPhotoInCard ? 'View doodle' : 'View our photo'}
            </span>
          </div>

          {/* Heartfelt Message */}
          <p className="font-sans text-xs md:text-sm text-[#57474E] mt-5 leading-relaxed font-normal">
            Happy Princess Day to the one who rules my heart. Thank you for turning my life into a fairytale.
          </p>

          <span className="font-script text-2xl text-[#D84A6E] mt-3">
            With all my love, Faheem ❤️
          </span>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full mt-6 space-y-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent("I walked all over my castle and got my crown! 👑 Thank you, I love it.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundSystem.playRosePick()}
            className="w-full py-3.5 rounded-full bg-[#D84A6E] hover:bg-[#C23B5E] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(216,74,110,0.25)] flex items-center justify-center gap-2 transition-all block"
          >
            <Send className="w-4 h-4" />
            <span>Reply to me</span>
          </a>

          <button
            onClick={() => {
              soundSystem.playSparkle();
              setShowScrapbookModal(true);
            }}
            className="w-full py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-[#2A2226] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-[#D84A6E]" />
            <span>View Our Photo Scrapbook 📸</span>
          </button>

          <button
            onClick={() => {
              soundSystem.playSparkle();
              onRevisitCastle();
            }}
            className="w-full py-3 rounded-full text-xs text-gray-500 hover:text-[#2A2226] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Visit the castle again</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 pb-4 text-center text-xs text-gray-400">
        Farheena • Princess Day 2026 👑
      </div>

      {/* PHOTO SCRAPBOOK MODAL */}
      <AnimatePresence>
        {showScrapbookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh] bg-[#FFF9F5] rounded-[36px] border border-[#F6EBE5] p-6 md:p-8 overflow-y-auto shadow-2xl relative text-[#2A2226]"
            >
              <button
                onClick={() => setShowScrapbookModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h3 className="font-script text-4xl md:text-5xl text-[#D84A6E]">
                  Our Memories & Polaroids
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Every photo is a treasure of our love story.
                </p>

                {/* Upload Button */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-full bg-[#D84A6E] text-white text-xs font-semibold shadow hover:bg-[#C23B5E] flex items-center gap-1.5 transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload More Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploading && (
                    <span className="text-xs text-[#D84A6E] animate-pulse">Saving...</span>
                  )}
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
                {photos.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="bg-white p-3.5 pb-5 rounded-2xl shadow-sm border border-[#F6EBE5] flex flex-col items-center cursor-pointer group relative"
                  >
                    {item.id.startsWith('user-') && (
                      <button
                        onClick={(e) => handleDeletePhoto(item.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 z-10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <div className="w-full h-56 rounded-xl overflow-hidden bg-pink-50 mb-3">
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#D84A6E] tracking-wider mb-1">
                      {item.category}
                    </span>
                    <p className="font-handwritten text-base text-[#57474E] text-center px-1">
                      {item.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="max-w-2xl max-h-[85vh] flex flex-col items-center">
              <img
                src={photos[activeLightboxIndex]?.src}
                alt="Enlarged"
                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="font-handwritten text-2xl text-pink-100 mt-4 text-center">
                {photos[activeLightboxIndex]?.caption}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
