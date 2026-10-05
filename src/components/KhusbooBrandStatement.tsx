import React from 'react';
import { motion } from 'motion/react';

export const KhusbooBrandStatement: React.FC = () => {
  return (
    <section id="about" className="py-28 lg:py-36 bg-[#F7F5F0] text-[#080808] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Small label: "THE KHUSBOO EXPERIENCE" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-8 h-[1px] bg-[#C9A227]" />
          <span className="text-xs uppercase font-bold tracking-[0.35em] text-[#8F7218]">
            THE KHUSBOO EXPERIENCE
          </span>
          <span className="w-8 h-[1px] bg-[#C9A227]" />
        </motion.div>

        {/* Large Heading: "WHERE BEAUTY MEETS CONFIDENCE." */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-primary text-4xl sm:text-6xl lg:text-7xl font-black text-[#080808] uppercase leading-[1.08] tracking-tight max-w-4xl mx-auto"
        >
          WHERE BEAUTY <br />
          <span className="font-editorial italic font-normal text-[#8F7218]">
            MEETS CONFIDENCE.
          </span>
        </motion.h2>

        {/* Thin Gold Underline Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-48 sm:w-72 mx-auto my-8 origin-center"
        />

        {/* Description from the brief */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-primary text-base sm:text-lg text-[#333333] font-medium max-w-3xl mx-auto leading-relaxed"
        >
          At Khusboo Beauty Salon, every visit is designed around beauty, care and confidence.
          From refined hairstyling and coloring to professional makeup, nails and waxing services,
          our salon offers a complete beauty experience in a welcoming environment in Satellite Town, Gujranwala.
        </motion.p>
      </div>
    </section>
  );
};
