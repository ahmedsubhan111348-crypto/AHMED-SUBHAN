import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SALON_MEDIA } from '../data/salonConfig';

interface KhusbooCategoriesProps {
  onSelectCategory: (category: string) => void;
}

export const KhusbooCategories: React.FC<KhusbooCategoriesProps> = ({
  onSelectCategory,
}) => {
  const cards = [
    {
      id: 'cat-hair',
      category: 'Hair',
      title: 'HAIR TRANSFORMATION',
      desc: 'Styling, rich color, smoothing keratin, extensions, and braids.',
      image: SALON_MEDIA.featureHair,
    },
    {
      id: 'cat-beauty',
      category: 'Beauty',
      title: 'BESPOKE MAKEUP',
      desc: 'Polished looks for your most important bridal and celebratory moments.',
      image: SALON_MEDIA.makeup,
    },
    {
      id: 'cat-nails',
      category: 'Nails',
      title: 'NAIL RITUALS',
      desc: 'Beautifully finished deluxe manicures and revitalizing pedicures.',
      image: SALON_MEDIA.nails,
    },
    {
      id: 'cat-waxing',
      category: 'Waxing',
      title: 'SILK WAXING',
      desc: 'Hygienic, gentle body, facial, and Brazilian waxing in private care.',
      image: SALON_MEDIA.waxing,
    },
  ];

  return (
    <section id="categories" className="py-24 lg:py-32 bg-[#080808] text-[#FFFFFF] relative border-b border-[rgba(201,162,39,0.25)]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C9A227]" />
              <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#D8C27A]">
                THE DETAILS MATTER
              </span>
            </div>
            <h2 className="font-primary text-3xl sm:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
              FEATURED <span className="text-metallic-gold">DISCIPLINES</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-sm tracking-wider font-medium">
            Discover four pillars of self-care delivered with exacting standards in Gujranwala.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectCategory(card.category)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111111] border border-[rgba(201,162,39,0.25)] hover:border-[#C9A227] hover:shadow-[0_15px_40px_rgba(201,162,39,0.25)] transition-all duration-500 cursor-pointer flex flex-col justify-end p-6 sm:p-7"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              <div className="relative z-10">
                <h3 className="font-primary text-xl font-black text-[#D8C27A] group-hover:text-[#FFFFFF] uppercase tracking-wide transition-colors leading-tight mb-2">
                  {card.title}
                </h3>

                <div className="h-[1.5px] bg-[#C9A227] w-12 group-hover:w-full transition-all duration-500 my-3" />

                <p className="text-xs text-[#FFFFFF]/80 font-medium leading-relaxed mb-5 line-clamp-2">
                  {card.desc}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C9A227] group-hover:text-[#FFFFFF] uppercase transition-colors"
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
