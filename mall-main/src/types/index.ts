export interface CameraWaypoint {
  id: string;
  name: string;
  locationLabel: string;
  floorLabel: string;
  progressStart: number;
  progressEnd: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  panelAlignment: 'left' | 'right' | 'center';
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  features?: string[];
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export interface StoreDirectoryItem {
  id: string;
  name: string;
  category: string;
  floor: string;
  checkpointId: string;
  progress: number;
  tagline: string;
  image: string;
}

export interface HotspotData {
  id: string;
  title: string;
  category: string;
  position: [number, number, number];
  description: string;
  image?: string;
  details?: {
    level: string;
    highlights: string[];
    hours?: string;
  };
}

export interface StoreItem {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  image: string;
  tagline?: string;
  hours?: string;
  featured?: boolean;
}

export interface DiningItem {
  id: string;
  name: string;
  cuisine: string;
  level: string;
  description: string;
  image: string;
  rating?: number;
  priceRange?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  location: string;
}

export interface MallConfiguration {
  mallName: string;
  brandTagline: string;
  established?: string;
  architecturalStyle: string;
  totalLevels: number;
  totalStores: number;
  totalDining: number;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    googleMapsQuery: string;
  };
  contact: {
    conciergePhone: string;
    generalEmail: string;
    pressEmail: string;
    leasingEmail?: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
    diningHolidays?: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
}
