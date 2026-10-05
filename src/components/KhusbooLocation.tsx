import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, MessageCircle, Compass } from 'lucide-react';
import { SalonInfoState } from '../data/salonConfig';

interface KhusbooLocationProps {
  salonInfo: SalonInfoState;
}

export const KhusbooLocation: React.FC<KhusbooLocationProps> = ({ salonInfo }) => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonInfo.address)}`;

  return (
    <section id="location" className="py-24 lg:py-32 bg-[#080808] text-[#FFFFFF] relative border-b border-[rgba(201,162,39,0.25)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C9A227]" />
              <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
                SALON LOCATION & HOURS
              </span>
            </div>

            <h2 className="font-primary text-3xl sm:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
              VISIT <span className="text-metallic-gold">KHUSBOO</span>
            </h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#C9A227] to-transparent my-6" />

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#111111] border border-[rgba(201,162,39,0.25)]">
                <div className="w-12 h-12 bg-[#080808] border border-[rgba(201,162,39,0.35)] flex items-center justify-center text-[#C9A227] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#D8C27A] mb-1">
                    Salon Address
                  </h3>
                  <p className="text-base text-[#FFFFFF] font-bold">
                    {salonInfo.address}
                  </p>
                  <p className="text-xs text-[#A6A6A6] mt-0.5">
                    Block A, Satellite Town, Gujranwala, Punjab
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#111111] border border-[rgba(201,162,39,0.25)]">
                <div className="w-12 h-12 bg-[#080808] border border-[rgba(201,162,39,0.35)] flex items-center justify-center text-[#C9A227] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#D8C27A] mb-1">
                    Appointments & Inquiries
                  </h3>
                  <a
                    href={salonInfo.phoneTel}
                    className="text-xl text-[#FFFFFF] font-black hover:text-[#D8C27A] transition-colors tabular-nums block"
                  >
                    {salonInfo.phone}
                  </a>
                  <p className="text-xs text-[#A6A6A6] mt-0.5">
                    Tap to call salon reception directly
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#111111] border border-[rgba(201,162,39,0.25)]">
                <div className="w-12 h-12 bg-[#080808] border border-[rgba(201,162,39,0.35)] flex items-center justify-center text-[#C9A227] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      {salonInfo.statusText}
                    </span>
                  </div>
                  <p className="text-base text-[#FFFFFF] font-bold">
                    {salonInfo.hoursDisplay}
                  </p>
                  <p className="text-xs text-[#A6A6A6] mt-0.5">
                    Open throughout the week for hair and beauty appointments
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Directions, Call, WhatsApp */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[rgba(201,162,39,0.2)]">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-black text-[#080808] bg-[#C9A227] hover:bg-[#D8C27A] transition-all flex items-center gap-2 shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={salonInfo.phoneTel}
                className="px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-[#FFFFFF] border border-[#FFFFFF] hover:border-[#C9A227] hover:text-[#C9A227] transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Salon</span>
              </a>

              <a
                href={salonInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-600/50 hover:bg-emerald-900 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Map */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-[rgba(201,162,39,0.35)] shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden">
              <iframe
                title="Khusboo Beauty Salon Location in Satellite Town Gujranwala"
                src="https://maps.google.com/maps?q=102%2FA%2C+Block+A%2C+Satellite+Town%2C+Gujranwala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-4 left-4 bg-[#080808]/95 backdrop-blur-md p-4 border border-[rgba(201,162,39,0.35)] text-xs max-w-xs shadow-lg pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-[#C9A227]" />
                  <span className="font-primary text-sm font-black text-metallic-gold">
                    {salonInfo.name}
                  </span>
                </div>
                <p className="text-[11px] text-[#A6A6A6]">
                  {salonInfo.shortAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
