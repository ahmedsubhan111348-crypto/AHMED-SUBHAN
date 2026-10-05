import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SALON_MEDIA } from '../data/salonConfig';

interface KhusbooFeaturedHairProps {
  onExploreHair: () => void;
}

export const KhusbooFeaturedHair: React.FC<KhusbooFeaturedHairProps> = ({
  onExploreHair,
}) => {
  return (
    <section id="hair-transformation" className="py-24 lg:py-32 bg-[#080808] text-[#FFFFFF] relative overflow-hidden border-b border-[rgba(201,162,39,0.25)] scroll-mt-20">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(201,162,39,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
                HAIR TRANSFORMATION
              </span>
            </div>

            <h2 className="font-primary text-4xl sm:text-6xl font-black text-[#FFFFFF] uppercase leading-[1.05] tracking-tight">
              A LOOK MADE <br />
              <span className="text-metallic-gold font-black">FOR YOU</span>
            </h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#C9A227] to-transparent my-6" />

            <p className="font-primary text-base sm:text-lg text-[#F7F5F0]/90 font-medium leading-relaxed mb-8">
              From sophisticated hairstyling and rich hair color to smooth keratin treatments and extensions, discover a look that complements your style.
            </p>

            {/* Hair Highlights */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs text-[#FFFFFF] mb-10 pb-6 border-b border-[rgba(201,162,39,0.2)]">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Hairstyling & Cuts</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Rich Hair Coloring</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Keratin Smoothing</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Braids & Extensions</span>
              </div>
            </div>

            <div>
              <button
                onClick={onExploreHair}
                className="px-8 py-4 text-xs font-black tracking-[0.22em] uppercase bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] flex items-center gap-2 group whitespace-nowrap"
              >
                <span>EXPLORE HAIR SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[16/10] overflow-hidden border border-[rgba(201,162,39,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.95)] group">
              <img
                src={SALON_MEDIA.featureHair}
                alt="Hair Transformation and Keratin treatment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 p-4 bg-[#080808]/90 backdrop-blur-md border border-[rgba(201,162,39,0.35)] max-w-xs text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227] block mb-0.5">
                  SIGNATURE CARE
                </span>
                <p className="font-bold text-[#FFFFFF]">
                  Custom formulations for glossy, frizz-free, and healthy hair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
