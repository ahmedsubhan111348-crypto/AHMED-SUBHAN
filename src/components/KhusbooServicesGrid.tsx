import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Sparkles,
  Flame,
  Layers,
  Feather,
  Sun,
  Hand,
  Footprints,
  ShieldCheck,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { SalonService } from '../data/salonConfig';

interface KhusbooServicesGridProps {
  services: SalonService[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onBookService: (serviceName: string) => void;
  whatsappUrl: string;
}

export const KhusbooServicesGrid: React.FC<KhusbooServicesGridProps> = ({
  services,
  activeCategory,
  onCategoryChange,
  onBookService,
  whatsappUrl,
}) => {
  const categories = ['ALL', 'HAIR', 'BEAUTY', 'NAILS', 'WAXING'];

  const filteredServices =
    activeCategory === 'ALL'
      ? services
      : services.filter((s) => s.category.toUpperCase() === activeCategory);

  const getServiceIcon = (id: string, category: string) => {
    switch (id) {
      case 'hairstyling':
        return <Scissors className="w-5 h-5 text-[#C9A227]" />;
      case 'hair-coloring':
        return <Flame className="w-5 h-5 text-[#C9A227]" />;
      case 'keratin-treatment':
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
      case 'hair-extensions':
        return <Layers className="w-5 h-5 text-[#C9A227]" />;
      case 'braids':
      case 'box-braids':
        return <Feather className="w-5 h-5 text-[#C9A227]" />;
      case 'makeup-services':
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
      case 'eyebrow-threading':
        return <Scissors className="w-5 h-5 text-[#C9A227]" />;
      case 'tanning':
        return <Sun className="w-5 h-5 text-[#C9A227]" />;
      case 'manicure':
        return <Hand className="w-5 h-5 text-[#C9A227]" />;
      case 'pedicure':
        return <Footprints className="w-5 h-5 text-[#C9A227]" />;
      case 'body-waxing':
      case 'brazilian-waxing':
      case 'waxing':
        return <ShieldCheck className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#080808] text-[#FFFFFF] relative border-b border-[rgba(201,162,39,0.25)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C9A227]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
              CURATED MENU
            </span>
            <span className="w-6 h-[1px] bg-[#C9A227]" />
          </div>

          <h2 className="font-primary text-3xl sm:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
            BEAUTY, HAIR & <span className="text-metallic-gold">SELF-CARE</span>
          </h2>

          <p className="text-sm text-[#A6A6A6] font-medium mt-3">
            Everything you need for your complete beauty routine in Satellite Town, Gujranwala.
          </p>

          {/* Filter Bar with Animated Selection */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const count =
                cat === 'ALL'
                  ? services.length
                  : services.filter((s) => s.category.toUpperCase() === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-5 py-2.5 text-xs font-black tracking-[0.18em] uppercase transition-all duration-300 rounded-sm ${
                    isSelected
                      ? 'bg-[#C9A227] text-[#080808] shadow-[0_0_20px_rgba(201,162,39,0.4)]'
                      : 'bg-[#111111] text-[#FFFFFF] hover:text-[#D8C27A] border border-[rgba(201,162,39,0.25)] hover:border-[#C9A227]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-[#080808]' : 'text-[#D8C27A]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid (White background cards with thin gold borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FFFFFF] text-[#080808] border border-[rgba(201,162,39,0.35)] rounded-xl p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(201,162,39,0.25)] hover:border-[#C9A227] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Service Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#F7F5F0] border border-[rgba(201,162,39,0.25)] flex items-center justify-center group-hover:bg-[#080808] transition-colors duration-300">
                      <div className="transition-colors duration-300 group-hover:[&_svg]:text-[#D8C27A]">
                        {getServiceIcon(service.id, service.category)}
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8F7218] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[rgba(201,162,39,0.25)]">
                      {service.category}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-primary text-xl font-black text-[#080808] uppercase tracking-wide mb-2 group-hover:text-[#8F7218] transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#555555] font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#8F7218] font-bold">
                    {service.duration}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp Inquiry for this exact service */}
                    <a
                      href={`${whatsappUrl}%20regarding%20${encodeURIComponent(service.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="Ask on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>

                    {/* Book Button */}
                    <button
                      onClick={() => onBookService(service.name)}
                      className="px-3.5 py-2 text-[10px] font-black tracking-[0.2em] uppercase bg-[#080808] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#080808] transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap rounded-sm"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>BOOK</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
