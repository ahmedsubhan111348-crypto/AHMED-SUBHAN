import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ChevronUp, Sparkles, Send } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  whatsappNumber?: string;
  phoneDisplay: string;
  currentPage?: string;
  currentServiceName?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  whatsappNumber = '923226516291',
  phoneDisplay,
  currentPage = 'home',
  currentServiceName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Dynamically format professional inquiry message based on context
  const getContextualTemplate = (topic?: string) => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    let inquirySubject = 'booking an appointment';

    if (currentServiceName) {
      inquirySubject = `${currentServiceName} treatment`;
    } else if (topic) {
      inquirySubject = topic;
    } else {
      switch (currentPage) {
        case 'hair':
          inquirySubject = 'Hair Styling & Keratin Treatment';
          break;
        case 'bridal-beauty':
          inquirySubject = 'Bridal & Party Makeup Services';
          break;
        case 'nails-waxing':
          inquirySubject = 'Manicure, Pedicure & Waxing Services';
          break;
        case 'services':
          inquirySubject = 'Salon Services & Consultation';
          break;
        default:
          inquirySubject = 'booking a beauty consultation';
      }
    }

    const baseMessage = `Hello Khusboo Beauty Salon,

I would like to inquire about ${inquirySubject} at your salon in Satellite Town, Gujranwala.

${customNote.trim() ? `Note: ${customNote.trim()}\n\n` : ''}Could you please share your available time slots and service details?

Thank you!`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(baseMessage)}`;
  };

  const handleQuickTopicClick = (topic: string) => {
    const url = getContextualTemplate(topic);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDirectSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getContextualTemplate();
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomNote('');
  };

  const quickTopics = [
    { label: 'Hair & Keratin', query: 'Hair Styling & Keratin Treatment' },
    { label: 'Bridal Makeup', query: 'Bridal & Festive Makeup' },
    { label: 'Nails & Waxing', query: 'Manicure, Pedicure & Waxing' },
    { label: 'Book Appointment', query: 'booking an appointment' },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex flex-col items-end gap-3 font-primary">
      {/* Dynamic Inquiry Template Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-[#111111] border-2 border-[rgba(201,162,39,0.45)] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(201,162,39,0.2)] rounded-2xl p-5 text-[#FFFFFF] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(201,162,39,0.2)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-[#FFFFFF] tracking-wider">
                    WhatsApp Inquiry
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Reception Online · {phoneDisplay}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#A6A6A6] hover:text-[#FFFFFF] transition-colors"
                aria-label="Close WhatsApp prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Inquiry Template Chips */}
            <div className="py-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8C27A] block mb-2">
                Quick Inquiry Topics:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleQuickTopicClick(topic.query)}
                    className="p-2 text-left rounded bg-[#080808] hover:bg-[#1A1614] border border-[rgba(201,162,39,0.25)] hover:border-[#C9A227] text-[11px] font-bold text-[#FFFFFF] hover:text-[#D8C27A] transition-all"
                  >
                    {topic.label} →
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Note Input */}
            <form onSubmit={handleDirectSend} className="space-y-2.5 pt-1">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#A6A6A6] block mb-1">
                  Optional Request / Service:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Saturday 3 PM blowout appointment..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] focus:border-[#C9A227] p-2 text-xs text-[#FFFFFF] outline-none rounded transition-colors placeholder:text-[#555555]"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white text-xs font-black uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch WhatsApp Chat</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2.5">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#111111]/95 border border-[rgba(201,162,39,0.4)] shadow-[0_10px_25px_rgba(0,0,0,0.8)] rounded-full text-xs hover:border-[#C9A227] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#FFFFFF] font-bold">Chat with Salon</span>
            <span className="text-[#D8C27A] font-mono text-[11px] font-bold">0322 6516291</span>
          </button>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              // Direct click opens WhatsApp with default contextual template if already open or toggles popup
              const url = getContextualTemplate();
              window.open(url, '_blank', 'noopener,noreferrer');
            }
          }}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] text-[#FFFFFF] shadow-[0_8px_25px_rgba(37,211,102,0.45),0_0_20px_rgba(201,162,39,0.35)] border-2 border-[#D8C27A] flex items-center justify-center transition-all duration-300"
          aria-label="Connect with Khusboo Beauty Salon on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span
            className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none"
            style={{ animationDuration: '3s' }}
          />

          <MessageCircle className="w-7 h-7 drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>
      </div>
    </div>
  );
};
