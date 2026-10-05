import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Shield, Menu, X, Calendar } from 'lucide-react';
import { SalonInfoState } from '../data/salonConfig';

interface KhusbooNavbarProps {
  salonInfo: SalonInfoState;
  currentPage: string;
  onNavigatePage: (page: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const KhusbooNavbar: React.FC<KhusbooNavbarProps> = ({
  salonInfo,
  currentPage,
  onNavigatePage,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = [
    { id: 'home', name: 'HOME' },
    { id: 'services', name: 'SERVICES' },
    { id: 'hair', name: 'HAIR STUDIO' },
    { id: 'bridal-beauty', name: 'BRIDAL & MAKEUP' },
    { id: 'nails-waxing', name: 'NAILS & WAXING' },
    { id: 'gallery', name: 'GALLERY' },
    { id: 'contact', name: 'VISIT US' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigatePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[rgba(201,162,39,0.3)] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'bg-[#080808]/85 backdrop-blur-sm border-b border-[rgba(201,162,39,0.2)] py-4 sm:py-4.5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo in Archivo 900 with Gold Accent */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group focus:outline-none"
            aria-label={`${salonInfo.name} Homepage`}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-primary text-xl sm:text-2xl font-black tracking-[0.22em] text-[#FFFFFF] group-hover:text-[#D8C27A] transition-colors uppercase">
                KHUSBOO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] shadow-[0_0_8px_#C9A227]" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#D8C27A] font-bold -mt-0.5">
              BEAUTY SALON · GUJRANWALA
            </span>
          </button>

          {/* Navigation Links for Multiple Pages */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-bold tracking-[0.16em] text-[#FFFFFF]">
            {navPages.map((page) => {
              const isActive = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handleNavClick(page.id)}
                  className={`relative py-1 transition-colors uppercase cursor-pointer ${
                    isActive
                      ? 'text-[#C9A227] font-black'
                      : 'text-[#FFFFFF] hover:text-[#D8C27A]'
                  }`}
                >
                  <span>{page.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Phone, WhatsApp, Book, Admin Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone */}
            <a
              href={salonInfo.phoneTel}
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#FFFFFF] hover:text-[#D8C27A] px-3.5 py-2 transition-all border border-[rgba(201,162,39,0.3)] hover:border-[#C9A227] rounded-full bg-[#111111]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="tabular-nums font-mono">{salonInfo.phone}</span>
            </a>

            {/* WhatsApp Direct Action Button */}
            <a
              href={salonInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-600/50 rounded-full transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-black tracking-[0.2em] uppercase bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_30px_rgba(201,162,39,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap rounded-sm"
            >
              Book Visit
            </button>

            {/* Admin Portal Toggle Icon */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full bg-[#111111] hover:bg-[#C9A227] text-[#A6A6A6] hover:text-[#080808] transition-all border border-[rgba(201,162,39,0.3)] hover:border-[#C9A227]"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-1 text-[#FFFFFF] hover:text-[#C9A227]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#111111] border-l border-[rgba(201,162,39,0.3)] p-6 sm:p-8 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[rgba(201,162,39,0.25)]">
                  <div>
                    <span className="font-primary text-xl font-black tracking-[0.2em] text-[#FFFFFF]">
                      KHUSBOO
                    </span>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#D8C27A] font-bold">
                      BEAUTY SALON
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[#FFFFFF] hover:text-[#C9A227]"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2.5 mt-6">
                  {navPages.map((page) => {
                    const isActive = currentPage === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handleNavClick(page.id)}
                        className={`text-left text-sm font-bold tracking-[0.2em] py-2.5 px-3 border-b border-white/5 transition-all flex items-center justify-between uppercase ${
                          isActive
                            ? 'text-[#C9A227] bg-[#161412] border-l-2 border-l-[#C9A227]'
                            : 'text-[#FFFFFF] hover:text-[#C9A227]'
                        }`}
                      >
                        <span>{page.name}</span>
                        <span className="text-[#C9A227] text-xs">→</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 p-4 rounded bg-[#080808] border border-[rgba(201,162,39,0.2)] text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{salonInfo.statusText}</span>
                  </div>
                  <p className="text-[#A6A6A6]">{salonInfo.shortAddress}</p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[rgba(201,162,39,0.25)]">
                <a
                  href={salonInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-600/50 rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp {salonInfo.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-black text-[#080808] bg-[#C9A227] shadow-lg rounded-sm"
                >
                  Book Appointment
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 text-[11px] uppercase tracking-wider font-bold text-[#D8C27A] border border-[rgba(201,162,39,0.3)] flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
