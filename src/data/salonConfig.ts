// Asset Imports
import heroImg from '../assets/images/hero_salon_editorial_1791187975249.jpg';
import aboutImg from '../assets/images/about_salon_interior_1791187988414.jpg';
import featureHairImg from '../assets/images/feature_hair_transformation_1791188000259.jpg';
import makeupCardImg from '../assets/images/card_makeup_artistry_1791188012880.jpg';
import nailCardImg from '../assets/images/card_nail_manicure_1791188022901.jpg';
import braidsImg from '../assets/images/gallery_braids_styling_1791188036608.jpg';
import waxingImg from '../assets/images/gallery_waxing_skincare_1791188048986.jpg';
import browImg from '../assets/images/gallery_brow_threading_1791188061000.jpg';

export interface SalonService {
  id: string;
  name: string;
  category: 'Hair' | 'Beauty' | 'Nails' | 'Waxing';
  description: string;
  duration: string;
  featured?: boolean;
}

export interface SalonAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface SalonInfoState {
  name: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  address: string;
  shortAddress: string;
  phone: string;
  phoneTel: string;
  whatsappNumber: string;
  whatsappUrl: string;
  statusText: string;
  hoursDisplay: string;
  announcementNotice: string;
}

export const INITIAL_SALON_INFO: SalonInfoState = {
  name: 'Khusboo Beauty Salon',
  tagline: 'Beauty • Hair • Self-Care',
  rating: 4.1,
  reviewsCount: 77,
  address: '102/A, Block A, Satellite Town, Gujranwala, Pakistan',
  shortAddress: '102/A, Block A, Satellite Town, Gujranwala',
  phone: '0322 6516291',
  phoneTel: 'tel:03226516291',
  whatsappNumber: '03226516291',
  whatsappUrl: 'https://wa.me/923226516291?text=Hello%20Khusboo%20Beauty%20Salon%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment',
  statusText: 'Open · Closes 8 PM',
  hoursDisplay: '10:00 AM – 8:00 PM Daily',
  announcementNotice: 'Welcome to Khusboo Beauty Salon. Book your appointment via WhatsApp or Call.',
};

export const INITIAL_SERVICES: SalonService[] = [
  // Hair (6)
  {
    id: 'hairstyling',
    name: 'Hairstyling',
    category: 'Hair',
    description: 'Precision haircutting, signature blowouts, and luxury styling customized to your facial features and aesthetic.',
    duration: '45 - 60 min',
    featured: true,
  },
  {
    id: 'hair-coloring',
    name: 'Hair Coloring',
    category: 'Hair',
    description: 'Dimensional highlights, rich balayage, gloss treatments, and root touch-ups formulated for radiant shine.',
    duration: '90 - 150 min',
    featured: true,
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Treatment',
    category: 'Hair',
    description: 'Deep conditioning protein smoothing therapy that seals cuticles for frizz-free, mirror-gloss sleekness.',
    duration: '120 - 180 min',
    featured: true,
  },
  {
    id: 'hair-extensions',
    name: 'Hair Extensions',
    category: 'Hair',
    description: 'Seamless volume and length blending using premium extensions for natural movement and effortless elegance.',
    duration: '90 - 120 min',
  },
  {
    id: 'braids',
    name: 'Braids',
    category: 'Hair',
    description: 'Classical and contemporary braiding crafted with clean partings, scalp comfort, and pristine detailing.',
    duration: '45 - 90 min',
  },
  {
    id: 'box-braids',
    name: 'Box Braids',
    category: 'Hair',
    description: 'Precision sectioned protective styling offering durability, balanced tension, and modern elegance.',
    duration: '120 - 240 min',
  },

  // Beauty (3)
  {
    id: 'makeup-services',
    name: 'Make-up Services',
    category: 'Beauty',
    description: 'Bespoke bridal, festive, party, and editorial makeup artistry crafted to accentuate your natural beauty.',
    duration: '60 - 90 min',
    featured: true,
  },
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    category: 'Beauty',
    description: 'Precision 100% cotton threading for clean, balanced, and perfectly sculpted arches.',
    duration: '15 - 20 min',
  },
  {
    id: 'tanning',
    name: 'Tanning',
    category: 'Beauty',
    description: 'Even, streak-free body bronzing service designed to deliver a healthy, sun-kissed golden radiance.',
    duration: '30 - 45 min',
  },

  // Nails (2)
  {
    id: 'manicure',
    name: 'Manicure',
    category: 'Nails',
    description: 'Deluxe hand ritual with gentle exfoliation, cuticle refinement, hand massage, and long-lasting glossy polish.',
    duration: '45 - 60 min',
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    category: 'Nails',
    description: 'Revitalizing foot bath, callus smoothing, nail grooming, relaxing foot massage, and pristine finish.',
    duration: '50 - 70 min',
  },

  // Waxing (3)
  {
    id: 'body-waxing',
    name: 'Body Waxing',
    category: 'Waxing',
    description: 'Comprehensive full-body hair removal using gentle salon wax formulations for silky smoothness with minimal discomfort.',
    duration: '45 - 75 min',
  },
  {
    id: 'brazilian-waxing',
    name: 'Brazilian Waxing',
    category: 'Waxing',
    description: 'Specialized intimate waxing performed in strict hygienic privacy with soothing botanical aftercare.',
    duration: '30 - 45 min',
  },
  {
    id: 'waxing',
    name: 'Waxing',
    category: 'Waxing',
    description: 'Targeted waxing treatments for facial zones, arms, legs, or underarms with soothing aftercare.',
    duration: '20 - 40 min',
  },
];

export const INITIAL_APPOINTMENTS: SalonAppointment[] = [];

export const SALON_MEDIA = {
  hero: heroImg,
  about: aboutImg,
  featureHair: featureHairImg,
  makeup: makeupCardImg,
  nails: nailCardImg,
  braids: braidsImg,
  waxing: waxingImg,
  brows: browImg,
};

export const SALON_GALLERY = [
  { id: 'g-1', title: 'Haute Editorial Hair Styling', category: 'Hair', image: heroImg },
  { id: 'g-2', title: 'Luxury Sanctuary Salon Interior', category: 'Salon', image: aboutImg },
  { id: 'g-3', title: 'Silk Keratin & Hair Transformation', category: 'Hair', image: featureHairImg },
  { id: 'g-4', title: 'Luminous Event Makeup Artistry', category: 'Beauty', image: makeupCardImg },
  { id: 'g-5', title: 'Deluxe Manicure Grooming', category: 'Nails', image: nailCardImg },
  { id: 'g-6', title: 'Artisanal Box Braids', category: 'Hair', image: braidsImg },
  { id: 'g-7', title: 'Botanical Waxing & Body Care', category: 'Waxing', image: waxingImg },
  { id: 'g-8', title: 'Signature Eyebrow Threading', category: 'Beauty', image: browImg },
];
