import React from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { SalonInfoState } from '../data/salonConfig';

interface KhusbooReviewsProps {
  salonInfo: SalonInfoState;
}

export const KhusbooReviews: React.FC<KhusbooReviewsProps> = ({ salonInfo }) => {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#111111] text-[#FFFFFF] relative border-b border-[rgba(201,162,39,0.25)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C9A227]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
              CLIENT REPUTATION
            </span>
            <span className="w-6 h-[1px] bg-[#C9A227]" />
          </div>

          <h2 className="font-primary text-3xl sm:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
            LOVED BY <span className="text-metallic-gold">OUR CLIENTS</span>
          </h2>

          <p className="text-sm text-[#A6A6A6] font-medium mt-3">
            Verified ratings from our valued clients in Satellite Town, Gujranwala.
          </p>
        </div>

        {/* Central Rating Showcase Card */}
        <div className="max-w-3xl mx-auto bg-[#080808] border-2 border-[rgba(201,162,39,0.4)] p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.85)] text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="font-primary text-6xl sm:text-8xl font-black text-metallic-gold tracking-tight tabular-nums">
              {salonInfo.rating}
              <span className="text-3xl sm:text-4xl text-[#FFFFFF]/50 font-light"> / 5</span>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-[#D8C27A]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current drop-shadow-[0_0_8px_rgba(216,194,122,0.8)]" />
              ))}
              <Star className="w-6 h-6 fill-current opacity-60" />
            </div>

            <p className="text-base sm:text-lg uppercase tracking-[0.25em] text-[#FFFFFF] font-black mt-4">
              {salonInfo.reviewsCount} Google Reviews
            </p>

            <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-md mx-auto mt-2 font-normal">
              Verified community ratings for Khusboo Beauty Salon, 102/A Block A, Satellite Town, Gujranwala.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Khusboo+Beauty+Salon+Satellite+Town+Gujranwala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.2em] font-black text-[#080808] bg-[#C9A227] hover:bg-[#D8C27A] transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_35px_rgba(201,162,39,0.6)] group"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-14">
          <div className="bg-[#080808] border border-[rgba(201,162,39,0.25)] p-6 text-center">
            <div className="w-12 h-12 border border-[rgba(201,162,39,0.35)] flex items-center justify-center mx-auto mb-4 text-[#C9A227]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-primary text-lg font-black text-[#FFFFFF] uppercase mb-2">
              Hygiene & Care
            </h4>
            <p className="text-xs text-[#A6A6A6] leading-relaxed">
              Sterilized beauty equipment, fresh single-use disposables, and clean salon stations.
            </p>
          </div>

          <div className="bg-[#080808] border border-[rgba(201,162,39,0.25)] p-6 text-center">
            <div className="w-12 h-12 border border-[rgba(201,162,39,0.35)] flex items-center justify-center mx-auto mb-4 text-[#C9A227]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-primary text-lg font-black text-[#FFFFFF] uppercase mb-2">
              14 Beauty Disciplines
            </h4>
            <p className="text-xs text-[#A6A6A6] leading-relaxed">
              Hairstyling, coloring, smoothing, extensions, braids, makeup, nails, and gentle waxing under one roof.
            </p>
          </div>

          <div className="bg-[#080808] border border-[rgba(201,162,39,0.25)] p-6 text-center">
            <div className="w-12 h-12 border border-[rgba(201,162,39,0.35)] flex items-center justify-center mx-auto mb-4 text-[#C9A227]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-primary text-lg font-black text-[#FFFFFF] uppercase mb-2">
              Warm Hospitality
            </h4>
            <p className="text-xs text-[#A6A6A6] leading-relaxed">
              Welcoming ambiance designed to make every client feel comfortable, respected, and radiant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
