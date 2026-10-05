import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MessageCircle, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SalonInfoState, SalonService, SALON_MEDIA } from '../data/salonConfig';
import { PageHeaderBanner } from '../components/PageHeaderBanner';

interface NailsWaxingPageProps {
  salonInfo: SalonInfoState;
  services: SalonService[];
  onOpenBooking: (serviceName?: string) => void;
  onNavigateHome: () => void;
}

export const NailsWaxingPage: React.FC<NailsWaxingPageProps> = ({
  salonInfo,
  services,
  onOpenBooking,
  onNavigateHome,
}) => {
  const nailAndWaxServices = services.filter(
    (s) => s.category === 'Nails' || s.category === 'Waxing'
  );

  const nailsWaxWhatsAppUrl = `https://wa.me/923226516291?text=${encodeURIComponent(
    'Hello Khusboo Beauty Salon,\n\nI would like to inquire about booking a Manicure / Pedicure / Waxing appointment at your Satellite Town, Gujranwala salon.\n\nCould you please share your available time slots?\n\nThank you!'
  )}`;

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-primary">
      {/* Header Banner */}
      <PageHeaderBanner
        badge="NAIL CARE & WAXING"
        title="NAIL RITUALS & SILK WAXING"
        subtitle="Hygienic manicure, pedicure, and gentle full-body waxing performed in private, soothing treatment suites."
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Spotlight Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 bg-[#111111] border border-[rgba(201,162,39,0.3)] p-8 sm:p-12 rounded-xl">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C9A227]">
              HYGIENE & PRIVACY FIRST
            </span>

            <h2 className="font-primary text-3xl sm:text-5xl font-black uppercase text-[#FFFFFF] leading-tight">
              PURE RELAXATION & <br />
              <span className="text-metallic-gold">SILKY SMOOTHNESS</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
              Experience therapeutic hand and foot grooming combined with gentle, botanical waxing. We prioritize clinical sterilization, gentle waxes, and strict client privacy for intimate treatments.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#FFFFFF]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>Medical-grade sterilization for all manicure instruments</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FFFFFF]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>Sensitive skin wax blends for minimal redness</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FFFFFF]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>Dedicated private suites for Brazilian & body waxing</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking('Manicure')}
                className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] font-black uppercase tracking-wider text-xs shadow-lg transition-all"
              >
                Book Nail & Waxing Slot
              </button>

              <a
                href={nailsWaxWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-950/70 border border-emerald-600/50 hover:bg-emerald-900 text-emerald-300 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[rgba(201,162,39,0.35)] shadow-xl">
              <img
                src={SALON_MEDIA.nails}
                alt="Manicure & Nail rituals"
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[rgba(201,162,39,0.35)] shadow-xl">
              <img
                src={SALON_MEDIA.waxing}
                alt="Body waxing and skincare"
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-primary text-2xl sm:text-4xl font-black uppercase text-[#FFFFFF]">
              TREATMENT <span className="text-metallic-gold">MENU</span>
            </h3>
            <p className="text-xs text-[#A6A6A6] mt-2">
              Manicures, pedicures, Brazilian and full-body waxing options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nailAndWaxServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#FFFFFF] text-[#080808] border border-[rgba(201,162,39,0.35)] rounded-xl p-7 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F7218] bg-[#F7F5F0] px-3 py-1 rounded-full border border-[rgba(201,162,39,0.2)]">
                      {service.category}
                    </span>
                    <span className="text-xs text-[#8F7218] font-bold">{service.duration}</span>
                  </div>

                  <h4 className="font-primary text-xl font-black uppercase text-[#080808] mb-2">
                    {service.name}
                  </h4>

                  <p className="text-xs text-[#555555] font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <a
                    href={`https://wa.me/923226516291?text=${encodeURIComponent(
                      `Hello Khusboo Beauty Salon, I would like to inquire about booking a ${service.name} treatment.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded text-xs font-bold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenBooking(service.name)}
                    className="px-4 py-2 bg-[#080808] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#080808] text-xs font-black uppercase tracking-wider rounded transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
