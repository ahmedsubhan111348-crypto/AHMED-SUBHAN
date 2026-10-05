import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Shield, Sparkles } from 'lucide-react';
import { SalonInfoState } from '../data/salonConfig';

interface KhusbooFooterProps {
  salonInfo: SalonInfoState;
  onNavigatePage: (page: string) => void;
  onOpenAdmin: () => void;
}

export const KhusbooFooter: React.FC<KhusbooFooterProps> = ({
  salonInfo,
  onNavigatePage,
  onOpenAdmin,
}) => {
  const handlePageClick = (pageId: string) => {
    onNavigatePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerWhatsAppUrl = `https://wa.me/923226516291?text=${encodeURIComponent(
    'Hello Khusboo Beauty Salon,\n\nI would like to inquire about booking an appointment at your salon located in 102/A, Block A, Satellite Town, Gujranwala.\n\nCould you please share your service availability?\n\nThank you!'
  )}`;

  return (
    <footer className="bg-[#080808] text-[#FFFFFF] pt-20 pb-28 md:pb-16 border-t border-[rgba(201,162,39,0.25)] relative overflow-hidden font-primary">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(201,162,39,0.2)]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-primary text-2xl sm:text-3xl font-black tracking-[0.2em] text-[#FFFFFF] uppercase">
                {salonInfo.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_8px_#C9A227]" />
            </div>

            <p className="text-xs uppercase font-bold tracking-[0.3em] text-[#D8C27A] mb-5">
              {salonInfo.tagline}
            </p>

            <p className="text-xs text-[#A6A6A6] font-medium leading-relaxed max-w-sm mb-6">
              A premier beauty sanctuary in Satellite Town, Gujranwala, providing bespoke hair coloring,
              keratin smoothing, radiant makeup, nail rituals, and private waxing services.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={footerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-600/50 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {salonInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="md:col-span-3 sm:col-span-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D8C27A] mb-5">
              EXPLORE PAGES
            </h4>
            <ul className="space-y-3 text-xs text-[#A6A6A6] font-medium">
              <li>
                <button
                  onClick={() => handlePageClick('home')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('services')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Services Menu (All 14)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('hair')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Hair Studio & Keratin
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('bridal-beauty')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Bridal & Festive Makeup
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('nails-waxing')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Nail Rituals & Waxing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('gallery')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="hover:text-[#FFFFFF] transition-colors uppercase tracking-wider"
                >
                  Visit & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Salon Details */}
          <div className="md:col-span-4 sm:col-span-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D8C27A] mb-5">
              SALON DETAILS
            </h4>
            <div className="space-y-4 text-xs text-[#A6A6A6]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-[#FFFFFF] font-bold">{salonInfo.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <a
                  href={salonInfo.phoneTel}
                  className="text-base text-[#FFFFFF] font-black tabular-nums hover:text-[#D8C27A]"
                >
                  {salonInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>{salonInfo.hoursDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6A6A6] gap-4">
          <p className="tracking-wider">
            © 2026 Khusboo Beauty Salon. All rights reserved. Satellite Town, Gujranwala.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest text-[#D8C27A] hover:text-[#FFFFFF] transition-colors bg-[#111111] px-3.5 py-1.5 border border-[rgba(201,162,39,0.3)] hover:border-[#C9A227] rounded"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
