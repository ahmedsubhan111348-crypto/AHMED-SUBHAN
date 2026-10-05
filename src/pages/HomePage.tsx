import React from 'react';
import { SalonInfoState, SalonService } from '../data/salonConfig';
import { KhusbooHero } from '../components/KhusbooHero';
import { KhusbooBrandStatement } from '../components/KhusbooBrandStatement';
import { KhusbooCategories } from '../components/KhusbooCategories';
import { KhusbooServicesGrid } from '../components/KhusbooServicesGrid';
import { KhusbooFeaturedHair } from '../components/KhusbooFeaturedHair';
import { KhusbooGallery } from '../components/KhusbooGallery';
import { KhusbooReviews } from '../components/KhusbooReviews';
import { KhusbooLocation } from '../components/KhusbooLocation';

interface HomePageProps {
  salonInfo: SalonInfoState;
  services: SalonService[];
  onOpenBooking: (serviceName?: string) => void;
  onNavigatePage: (page: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  salonInfo,
  services,
  onOpenBooking,
  onNavigatePage,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div>
      {/* 1. Cinematic Luxury Hero */}
      <KhusbooHero
        salonInfo={salonInfo}
        onOpenBooking={() => onOpenBooking()}
        onExploreServices={() => onNavigatePage('services')}
      />

      {/* 2. Brand Statement: "WHERE BEAUTY MEETS CONFIDENCE." */}
      <KhusbooBrandStatement />

      {/* 3. Featured Disciplines Cards with Direct Page Navigation */}
      <KhusbooCategories
        onSelectCategory={(category) => {
          if (category === 'Hair') onNavigatePage('hair');
          else if (category === 'Beauty') onNavigatePage('bridal-beauty');
          else if (category === 'Nails' || category === 'Waxing') onNavigatePage('nails-waxing');
          else onNavigatePage('services');
        }}
      />

      {/* 4. Curated Services Grid (All 14 Services) */}
      <KhusbooServicesGrid
        services={services}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        onBookService={(name) => onOpenBooking(name)}
        whatsappUrl={salonInfo.whatsappUrl}
      />

      {/* 5. Editorial Hair Transformation Section */}
      <KhusbooFeaturedHair
        onExploreHair={() => onNavigatePage('hair')}
      />

      {/* 6. Photo Gallery */}
      <KhusbooGallery />

      {/* 7. Client Reviews (4.1 Rating, 77 Reviews) */}
      <KhusbooReviews salonInfo={salonInfo} />

      {/* 8. Location & Directions */}
      <KhusbooLocation salonInfo={salonInfo} />
    </div>
  );
};
