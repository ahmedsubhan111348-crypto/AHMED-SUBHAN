import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { SALON_GALLERY } from '../data/salonConfig';

export const KhusbooGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const activeItem = activeIdx !== null ? SALON_GALLERY[activeIdx] : null;

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % SALON_GALLERY.length);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + SALON_GALLERY.length) % SALON_GALLERY.length);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#080808] text-[#FFFFFF] relative border-b border-[rgba(201,162,39,0.25)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C9A227]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
              PORTFOLIO OF EXCELLENCE
            </span>
            <span className="w-6 h-[1px] bg-[#C9A227]" />
          </div>

          <h2 className="font-primary text-3xl sm:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
            THE KHUSBOO <span className="text-metallic-gold">GALLERY</span>
          </h2>

          <p className="text-sm text-[#A6A6A6] font-medium mt-3">
            A visual reflection of elegance, hair transformations, and refined beauty.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {SALON_GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setActiveIdx(index)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111111] border border-[rgba(201,162,39,0.25)] hover:border-[#C9A227] transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-[#080808]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full border border-[#C9A227] flex items-center justify-center text-[#C9A227]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-primary text-sm font-bold text-[#FFFFFF] uppercase">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveIdx(null)}
          >
            {/* Top Bar */}
            <div
              className="absolute top-6 left-6 right-6 flex items-center justify-between z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs uppercase font-bold tracking-widest text-[#D8C27A]">
                {activeIdx! + 1} / {SALON_GALLERY.length} · {activeItem.category}
              </span>

              <button
                onClick={() => setActiveIdx(null)}
                className="p-2 text-[#FFFFFF] hover:text-[#C9A227]"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[rgba(201,162,39,0.4)] hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#080808] text-[#FFFFFF] flex items-center justify-center transition-all z-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[rgba(201,162,39,0.4)] hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#080808] text-[#FFFFFF] flex items-center justify-center transition-all z-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Box */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain border border-[rgba(201,162,39,0.4)] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="mt-4 text-sm font-bold text-[#FFFFFF] uppercase tracking-wider text-center">
                {activeItem.title}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
