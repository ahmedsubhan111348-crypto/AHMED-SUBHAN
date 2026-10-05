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
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { SalonInfoState, SalonService } from '../data/salonConfig';
import { PageHeaderBanner } from '../components/PageHeaderBanner';

interface ServicesPageProps {
  salonInfo: SalonInfoState;
  services: SalonService[];
  onOpenBooking: (serviceName?: string) => void;
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  salonInfo,
  services,
  onOpenBooking,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'HAIR', 'BEAUTY', 'NAILS', 'WAXING'];

  const filteredServices =
    selectedCategory === 'ALL'
      ? services
      : services.filter((s) => s.category.toUpperCase() === selectedCategory);

  const getServiceWhatsAppUrl = (serviceName: string) => {
    const text = `Hello Khusboo Beauty Salon,\n\nI would like to inquire about booking an appointment for ${serviceName} at your Satellite Town, Gujranwala salon.\n\nCould you please let me know your available slots?\n\nThank you!`;
    const cleanNumber = salonInfo.whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber.startsWith('92') ? cleanNumber : `92${cleanNumber.startsWith('0') ? cleanNumber.slice(1) : cleanNumber}`}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-primary">
      {/* Banner */}
      <PageHeaderBanner
        badge="SALON MENU"
        title="OUR SERVICES"
        subtitle="Explore all 14 curated hair, makeup, nail, and waxing disciplines delivered with premium salon products in Gujranwala."
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const count =
              cat === 'ALL'
                ? services.length
                : services.filter((s) => s.category.toUpperCase() === cat).length;
            const active = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FFFFFF] text-[#080808] border border-[rgba(201,162,39,0.35)] rounded-xl p-7 shadow-xl hover:shadow-[0_15px_40px_rgba(201,162,39,0.25)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8F7218] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[rgba(201,162,39,0.25)]">
                      {service.category}
                    </span>
                    <span className="text-xs text-[#8F7218] font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  <h3 className="font-primary text-xl font-black text-[#080808] uppercase tracking-wide mb-2 group-hover:text-[#8F7218] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#555555] font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
                  <a
                    href={getServiceWhatsAppUrl(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center gap-1.5 text-xs font-bold transition-colors"
                    title="Inquire via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenBooking(service.name)}
                    className="px-4 py-2.5 text-xs font-black tracking-[0.2em] uppercase bg-[#080808] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#080808] transition-all rounded-sm flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quality Standards & Salon Hygiene */}
        <div className="bg-[#111111] border border-[rgba(201,162,39,0.3)] p-8 sm:p-12 rounded-xl text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
              OUR SALON COMMITMENT
            </span>
          </div>

          <h3 className="font-primary text-2xl sm:text-4xl font-black uppercase text-[#FFFFFF] mb-4">
            STANDARDS OF <span className="text-metallic-gold">EXCELLENCE</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-2xl mx-auto leading-relaxed mb-8">
            Every service at Khusboo Beauty Salon follows strict sanitization procedures, high-grade cosmetic formulations, and respectful client attention in private suites.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all"
            >
              Book Your Appointment
            </button>

            <a
              href={salonInfo.phoneTel}
              className="px-8 py-4 border border-[rgba(201,162,39,0.4)] hover:border-[#C9A227] text-[#FFFFFF] hover:text-[#D8C27A] text-xs font-bold uppercase tracking-[0.2em] transition-all"
            >
              Call Salon Reception
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
