import { MallConfiguration, StoreItem, DiningItem, EventItem, ServiceItem, HotspotData } from '../types';

export const MALL_CONFIG: MallConfiguration = {
  mallName: "CITY MALL",
  brandTagline: "SHOPPING • DINING • ENTERTAINMENT",
  established: "2026",
  architecturalStyle: "Contemporary Architectural Shopping Destination",
  totalLevels: 3,
  totalStores: 180,
  totalDining: 35,
  address: {
    street: "100 City Mall Boulevard, Central Commercial Hub",
    city: "Metropolis",
    district: "City Center",
    postalCode: "MC-10024",
    country: "International Destination",
    googleMapsQuery: "https://maps.google.com/?q=City+Mall+Boulevard"
  },
  contact: {
    conciergePhone: "+1 (800) 555-CITY",
    generalEmail: "concierge@citymall.com",
    pressEmail: "press@citymall.com",
    leasingEmail: "leasing@citymall.com"
  },
  hours: {
    weekdays: "10:00 AM – 10:00 PM",
    weekends: "10:00 AM – 11:30 PM",
    diningHolidays: "10:00 AM – Midnight"
  },
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  }
};

export const SECTIONS_METADATA = [
  { id: 'hero', name: 'Atrium Opening', shortLabel: '01 Grand Entrance' },
  { id: 'architecture', name: 'The Atrium Architecture', shortLabel: '02 Architecture' },
  { id: 'fashion', name: 'Fashion District', shortLabel: '03 Fashion' },
  { id: 'luxury', name: 'Haute Horlogerie & Luxury', shortLabel: '04 Luxury' },
  { id: 'dining', name: 'Gastronomy Promenade', shortLabel: '05 Dining' },
  { id: 'entertainment', name: 'Entertainment World', shortLabel: '06 Entertainment' },
  { id: 'events', name: 'Events & Experiences', shortLabel: '07 Events' },
  { id: 'services', name: 'Concierge & Amenities', shortLabel: '08 Services' },
  { id: 'visit', name: 'Plan Your Visit', shortLabel: '09 Arrival' },
];

export const FASHION_CATEGORIES = [
  { id: 'couture', title: 'Haute Couture', count: '28 Boutiques', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
  { id: 'footwear', title: 'Designer Footwear', count: '19 Salons', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
  { id: 'accessories', title: 'Leather Goods & Acc.', count: '34 Maisons', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { id: 'beauty', title: 'Prestige Cosmetics', count: '15 Labs', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop' },
  { id: 'lifestyle', title: 'Contemporary Living', count: '22 Studios', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop' }
];

export const LUXURY_COLLECTION = [
  {
    id: 'tanishq',
    name: 'TANISHQ',
    category: 'Fine Jewellery & Diamonds',
    description: 'India’s most trusted fine jewellery: certified 22K gold, solitaire diamonds, and bridal polki collections.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    location: 'Ground Floor · The Gilded Arcade'
  },
  {
    id: 'titan-world',
    name: 'TITAN WORLD',
    category: 'Watches & Precision Complications',
    description: 'World-class chronometry: Titan Edge, Raga, Nebula 18K solid gold watches, and smart wearables.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    location: 'Level 1 · Chrono Promenade'
  },
  {
    id: 'louis-philippe',
    name: 'LOUIS PHILIPPE',
    category: 'Haute Menswear & Tailoring',
    description: 'The Upper Crest of sartorial elegance: precision-tailored blazers, luxury cotton shirts, and silk ties.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    location: 'Level 1 · Fashion Colonnade'
  }
];

export const DINING_HIGHLIGHTS: DiningItem[] = [
  {
    id: 'pizza-hut',
    name: 'PIZZA HUT',
    cuisine: 'Pan Pizzas, Pastas & Italian Sides',
    level: 'Level 2 Food Court',
    description: 'Melt-in-mouth signature pan pizzas, stuffed cheesy crusts, creamy pastas, and crispy garlic bread.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    priceRange: '$$'
  },
  {
    id: 'kfc',
    name: 'KFC',
    cuisine: 'American Crispy Fried Chicken',
    level: 'Level 2 Food Court',
    description: "Colonel Sanders' world-famous crispy chicken buckets, zinger burgers, and spiced hot wings.",
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    priceRange: '$$'
  },
  {
    id: 'barbeque-nation',
    name: 'BARBEQUE NATION (NEARBY)',
    cuisine: 'Live Charcoal Grill & Grand Buffet',
    level: 'Level 2 Dining Terrace',
    description: 'Interactive tableside live charcoal grills, unlimited skewers of spiced kebabs, and extensive dessert counters.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    priceRange: '$$$'
  }
];

export const ENTERTAINMENT_EXPERIENCES = [
  {
    id: 'inox-cinemas',
    title: 'INOX CINEMAS (MULTIPLEX)',
    type: 'Multiplex / Cinema Halls',
    details: 'Luxury Insignia VIP suites with motorized heated recliners, 4K Laser projection, and Dolby Atmos audio.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'vr-odyssey',
    title: 'THE HYPERVERSE VR LAB',
    type: 'Virtual Reality Pavilion',
    details: 'Free-roam warehouse-scale photorealistic simulations with sensory haptic suits and multi-player gaming.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wonder-forest',
    title: 'THE WONDER FOREST PLAY ZONE',
    type: 'Kids & Family Interactive Discovery',
    details: 'Multi-level sensory creative play world, arcade gaming, and boutique celebration rooms.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop'
  }
];

export const EVENT_SCHEDULE: EventItem[] = [
  {
    id: 'art-light',
    title: 'LUMINA SCULPTURA: International Kinetic Art Exhibition',
    date: 'Current – Dec 15',
    time: 'All Day (Curator Talks at 6:00 PM)',
    location: 'Central Atrium Rotunda',
    description: 'Featuring 12 suspended light sculptures interacting with visitor movement and ambient soundwaves.',
    category: 'Art & Design',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'couture-week',
    title: 'AUTUMN HAUTE COUTURE PREVIEW',
    date: 'Friday & Saturday',
    time: '7:30 PM & 9:00 PM',
    location: 'Level 2 Runway Colonnade',
    description: 'Exclusive runway presentations showcasing emerging avant-garde designers and couture maisons.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sommelier-gala',
    title: 'THE GRAND CELLAR VINTAGE TASTING',
    date: 'Next Thursday',
    time: '6:30 PM – 9:30 PM',
    location: 'Level 4 Sky Terrace Pavilion',
    description: 'Guided masterclass tasting rare Bordeaux and Super Tuscan vintages with master sommeliers.',
    category: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop'
  }
];

export const CONCIERGE_SERVICES: ServiceItem[] = [
  {
    id: 'valet',
    iconName: 'Car',
    title: 'VIP Valet & EV Supercharging',
    description: 'White-glove arrival portico with 40 ultra-fast DC charging bays and vehicle detailing.',
    location: 'East & West Portals'
  },
  {
    id: 'personal-shopping',
    iconName: 'ShoppingBag',
    title: 'Private Styling & Personal Shopping',
    description: 'Dedicated multi-lingual fashion consultants and private champagne dressing salons.',
    location: 'Level 2 VIP Lounge'
  },
  {
    id: 'accessibility',
    iconName: 'Accessibility',
    title: 'Universal Accessibility & Mobiles',
    description: 'Seamless ramp architecture, tactile wayfinding, and complimentary electric mobility chairs.',
    location: 'All Concierge Desks'
  },
  {
    id: 'family',
    iconName: 'HeartHandshake',
    title: 'Executive Family Lounges',
    description: 'Calm private nursery suites, complimentary stroller lending, and sensory-friendly rooms.',
    location: 'Levels 1, 2, and 3'
  },
  {
    id: 'hands-free',
    iconName: 'PackageCheck',
    title: 'Hands-Free Concierge Delivery',
    description: 'Have all purchases delivered directly to your vehicle trunk, hotel suite, or residence.',
    location: 'Central Concierge'
  },
  {
    id: 'lounge',
    iconName: 'Sparkles',
    title: 'City Mall Members Lounge',
    description: 'High-speed business workspaces, barista bar, quiet library, and private conference suites.',
    location: 'Level 4 East Wing'
  }
];

export const HOTSPOTS: HotspotData[] = [
  {
    id: 'hotspot-sculpture',
    title: 'The Helios Kinetic Chandelier',
    category: 'Architectural Centerpiece',
    position: [0, 8, -5],
    description: 'A suspended parametric installation consisting of 8 gold-leafed concentric rings that slowly rotate in harmonic equilibrium.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    details: {
      level: 'Suspended Atrium',
      highlights: ['Parametric kinetic motion', 'RGBW dynamic color rendering', 'Central Rotunda']
    }
  },
  {
    id: 'hotspot-fashion',
    title: 'Verve Haute Couture & Promenade',
    category: 'Fashion District',
    position: [-10.5, 2.5, 6],
    description: 'Premier fashion flagships featuring private fitting salons, runway pieces, and handcrafted couture.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
    details: {
      level: 'Ground Floor · Level 0',
      highlights: ['Floor-to-ceiling glass vitrines', 'Personal styling suites', 'Haute couture collections']
    }
  },
  {
    id: 'hotspot-luxury',
    title: 'Chrono Studio & Prism Jewels',
    category: 'Fine Jewelry & Watches',
    position: [-10.5, 8.0, -14],
    description: 'An exclusive galleria showcasing master Swiss horology, high complication timepieces, and certified solitaire gems.',
    image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&auto=format&fit=crop',
    details: {
      level: 'First Floor · Level 1',
      highlights: ['Master watchmakers on-site', 'Private salon viewing', 'High jewelry vaults']
    }
  },
  {
    id: 'hotspot-dining',
    title: 'Food Court & Dining Terrace',
    category: 'Artisan Dining',
    position: [0, 13.0, -32],
    description: 'A culinary destination featuring Masala Craft, The Bean Roastery, Stacks Gourmet Burgers, and Dulce Patisserie.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    details: {
      level: 'Second Floor · Level 2',
      highlights: ['4 artisanal restaurant kitchens', 'Balcony overlook seating', 'Terrace dining']
    }
  },
  {
    id: 'hotspot-entertainment',
    title: 'City Cinemas 4K Laser & Lobby',
    category: 'Entertainment',
    position: [0, 13.2, -56],
    description: 'Premium cinematic experience featuring 4K Laser projection, Dolby Atmos spatial sound, and luxury velvet seating.',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop',
    details: {
      level: 'Second Floor · Level 2',
      highlights: ['IMAX Laser auditorium', 'Gourmet concessions', 'Automated touch kiosks']
    }
  }
];

