import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface PageHeaderBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  badge,
  title,
  subtitle,
  onNavigateHome,
}) => {
  return (
    <div className="relative pt-32 pb-16 bg-[#080808] border-b border-[rgba(201,162,39,0.25)] overflow-hidden">
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-[radial-gradient(ellipse,rgba(201,162,39,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A6A6A6] mb-4">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#D8C27A] transition-colors uppercase tracking-wider"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A227]" />
          <span className="text-[#D8C27A] uppercase tracking-wider">{title}</span>
        </div>

        {/* Badge */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="w-4 h-[1px] bg-[#C9A227]" />
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D8C27A]">
            {badge}
          </span>
          <span className="w-4 h-[1px] bg-[#C9A227]" />
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-primary text-4xl sm:text-6xl font-black text-[#FFFFFF] uppercase tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm text-[#A6A6A6] max-w-xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
