import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, MessageCircle, Sparkles, Phone } from 'lucide-react';
import { SalonInfoState, SALON_MEDIA } from '../data/salonConfig';

interface KhusbooHeroProps {
  salonInfo: SalonInfoState;
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const KhusbooHero: React.FC<KhusbooHeroProps> = ({
  salonInfo,
  onOpenBooking,
  onExploreServices,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#080808] text-[#FFFFFF] pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center overflow-hidden border-b border-[rgba(201,162,39,0.25)]"
    >
      {/* Ambient Gold Radial Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(201,162,39,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(216,194,122,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small uppercase label */}
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-[1.5px] bg-[#C9A227]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D8C27A]">
                KHUSBOO BEAUTY SALON · GUJRANWALA
              </span>
            </motion.div>

            {/* Headline: "TIMELESS BEAUTY." */}
            <motion.h1
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="font-primary text-5xl sm:text-7xl lg:text-8xl font-black text-[#FFFFFF] leading-[0.98] tracking-tight uppercase"
            >
              TIMELESS
              <br />
              <span className="text-metallic-gold drop-shadow-[0_0_35px_rgba(201,162,39,0.4)]">
                BEAUTY.
              </span>
            </motion.h1>

            {/* Gold Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-[2px] bg-gradient-to-r from-[#C9A227] via-[#D8C27A] to-transparent w-44 my-8"
            />

            {/* Supporting Copy */}
            <motion.p
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.23, ease: [0.16, 1, 0.3, 1] }}
              className="font-primary text-base sm:text-lg text-[#F7F5F0]/90 font-medium leading-relaxed max-w-xl mb-10"
            >
              Professional beauty, hair and self-care services designed to make you
              feel confident, beautiful and unforgettable.
            </motion.p>

            {/* Action Buttons: Book Appointment, WhatsApp, Explore */}
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-12"
            >
              {/* Primary Book Button */}
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 text-xs font-black tracking-[0.22em] uppercase bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] transition-all duration-300 shadow-[0_0_25px_rgba(201,162,39,0.35)] hover:shadow-[0_0_40px_rgba(201,162,39,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* WhatsApp Button */}
              <a
                href={salonInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[#111111] hover:bg-[#1A1614] border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP SALON</span>
              </a>

              {/* Explore Services Button */}
              <button
                onClick={onExploreServices}
                className="px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-transparent border border-white/40 hover:border-[#C9A227] hover:text-[#C9A227] text-[#FFFFFF] transition-all duration-300 transform hover:-translate-y-0.5 text-center whitespace-nowrap"
              >
                SERVICES
              </button>
            </motion.div>

            {/* Trust Details with Rating & 14 Services */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-8 border-t border-[rgba(201,162,39,0.25)] flex flex-wrap items-center gap-6 sm:gap-8"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span className="text-[#D8C27A] tabular-nums font-black">4.1 ★</span>
                <span className="text-[#A6A6A6]">GOOGLE RATING</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span className="text-[#D8C27A] tabular-nums font-black">77+</span>
                <span className="text-[#A6A6A6]">CLIENT REVIEWS</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span className="text-[#D8C27A] tabular-nums font-black">14</span>
                <span className="text-[#A6A6A6]">BEAUTY SERVICES</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Editorial Image with Gold Glow & Floating Google Rating */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden border border-[rgba(201,162,39,0.35)] shadow-[0_20px_60px_rgba(0,0,0,0.95)] group"
            >
              <img
                src={SALON_MEDIA.hero}
                alt="Khusboo Beauty Salon hair and beauty treatment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />

              {/* Floating Google Rating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#080808]/95 backdrop-blur-md border border-[rgba(201,162,39,0.4)] flex items-center justify-between shadow-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-primary text-2xl font-black text-metallic-gold tabular-nums">
                      4.1
                    </span>
                    <div className="flex text-[#D8C27A]">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <Star className="w-3.5 h-3.5 fill-current opacity-60" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#A6A6A6] mt-0.5">
                    77 GOOGLE REVIEWS · SATELLITE TOWN
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#111111] border border-[rgba(201,162,39,0.3)] flex items-center justify-center text-[#C9A227]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
