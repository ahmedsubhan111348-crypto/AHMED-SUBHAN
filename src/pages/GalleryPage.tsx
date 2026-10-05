import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SALON_GALLERY } from '../data/salonConfig';
import { PageHeaderBanner } from '../components/PageHeaderBanner';

interface GalleryPageProps {
  onOpenBooking: () => void;
  onNavigateHome: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenBooking,
  onNavigateHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const categories = ['ALL', 'HAIR', 'BEAUTY', 'NAILS', 'SALON'];

  const filteredItems =
    activeCategory === 'ALL'
      ? SALON_GALLERY
      : SALON_GALLERY.filter((item) => item.category.toUpperCase() === activeCategory);

  const activeItem = activeIdx !== null ? filteredItems[activeIdx] : null;

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-primary">
      <PageHeaderBanner
        badge="PORTFOLIO"
        title="PHOTO GALLERY"
        subtitle="A visual showcase of transformations, hair artistry, luminous makeup, and salon interior in Satellite Town, Gujranwala."
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const count =
              cat === 'ALL'
                ? SALON_GALLERY.length
                : SALON_GALLERY.filter((i) => i.category.toUpperCase() === cat).length;
            const active = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-black tracking-[0.18em] uppercase transition-all duration-300 rounded-sm ${
                  active
                    ? 'bg-[#C9A227] text-[#080808] shadow-[0_0_20px_rgba(201,162,39,0.4)]'
                    : 'bg-[#111111] text-[#FFFFFF] hover:text-[#D8C27A] border border-[rgba(201,162,39,0.25)] hover:border-[#C9A227]'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-1.5 text-[10px] ${active ? 'text-[#080808]' : 'text-[#D8C27A]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveIdx(index)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111111] border border-[rgba(201,162,39,0.3)] hover:border-[#C9A227] shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-[#080808]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full border border-[#C9A227] flex items-center justify-center text-[#C9A227]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-primary text-base font-bold text-[#FFFFFF] uppercase">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-10 border-t border-[rgba(201,162,39,0.2)]">
          <p className="text-xs uppercase tracking-widest text-[#D8C27A] mb-3 font-bold">
            READY FOR YOUR OWN TRANSFORMATION?
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveIdx(null)}
          >
            <div
              className="absolute top-6 left-6 right-6 flex items-center justify-between z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs uppercase font-bold tracking-widest text-[#D8C27A]">
                {activeIdx! + 1} / {filteredItems.length} · {activeItem.category}
              </span>
              <button
                onClick={() => setActiveIdx(null)}
                className="p-2 text-[#FFFFFF] hover:text-[#C9A227]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[rgba(201,162,39,0.4)] hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#080808] text-[#FFFFFF] flex items-center justify-center z-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[rgba(201,162,39,0.4)] hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#080808] text-[#FFFFFF] flex items-center justify-center z-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

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
    </div>
  );
};
