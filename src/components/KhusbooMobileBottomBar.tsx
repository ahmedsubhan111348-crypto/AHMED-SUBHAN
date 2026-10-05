import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { SalonInfoState } from '../data/salonConfig';

interface KhusbooMobileBottomBarProps {
  salonInfo: SalonInfoState;
  onOpenBooking: () => void;
}

export const KhusbooMobileBottomBar: React.FC<KhusbooMobileBottomBarProps> = ({
  salonInfo,
  onOpenBooking,
}) => {
  return (
    <aside
      aria-label="Mobile Navigation and Booking Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080808]/95 backdrop-blur-md border-t border-[rgba(201,162,39,0.35)] px-3 py-2 max-h-[60px] shadow-[0_-5px_25px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-center gap-2">
        {/* Call button */}
        <a
          href={salonInfo.phoneTel}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#111111] border border-[rgba(201,162,39,0.3)] text-[#FFFFFF] text-[11px] font-bold uppercase tracking-wider rounded-sm min-h-[44px]"
        >
          <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Call</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={salonInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-[11px] font-bold uppercase tracking-wider rounded-sm min-h-[44px]"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        {/* Book button */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.3] flex items-center justify-center gap-1.5 py-2.5 bg-[#C9A227] text-[#080808] text-[11px] font-black uppercase tracking-wider rounded-sm shadow-md min-h-[44px] whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>
      </div>
    </aside>
  );
};
