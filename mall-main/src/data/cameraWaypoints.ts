import * as THREE from 'three';
import { CameraWaypoint, StoreDirectoryItem } from '../types';

export const CINEMATIC_CHECKPOINTS: CameraWaypoint[] = [
  {
    id: 'exterior',
    name: 'Exterior Approach',
    locationLabel: 'Exterior Grand Plaza',
    floorLabel: 'Arrival Plaza',
    progressStart: 0.0,
    progressEnd: 0.12,
    position: [11.0, 5.4, 38.0],
    target: [-1.8, 4.6, 12.0],
    fov: 46,
    panelAlignment: 'left',
    title: 'CITY MALL',
    subtitle: 'Shopping • Dining • Entertainment',
    category: 'Welcome Arrival',
    description: 'Welcome to City Mall — a contemporary three-level shopping destination combining international retail flagships, artisan dining, and state-of-the-art cinema.',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop',
    features: ['Honed Travertine & Glass Facade', 'Architectural Landscaped Plaza', 'VIP Valet & Concierge Arrival'],
    primaryCtaText: 'Step Inside',
    secondaryCtaText: 'Store Directory'
  },
  {
    id: 'entrance',
    name: 'Main Glass Portal',
    locationLabel: 'Grand Entrance Portal',
    floorLabel: 'Transition Zone',
    progressStart: 0.12,
    progressEnd: 0.24,
    position: [0, 2.8, 22.0],
    target: [0, 3.0, 4.0],
    fov: 50,
    panelAlignment: 'left',
    title: 'GRAND ENTRANCE PORTAL',
    subtitle: 'Seamless Transition to Interior Light',
    category: 'Entrance Portal',
    description: 'Passing through towering floor-to-ceiling glass entrance doors into the luminous interior concourse of City Mall.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    features: ['Multi-Leaf Glass Curtain', 'Polished Stone Floor Inlays', 'Acoustic Atmospheric Damping'],
    primaryCtaText: 'Explore Ground Floor'
  },
  {
    id: 'ground',
    name: 'Ground Floor Shopping',
    locationLabel: 'Level 0 · Main Retail Concourse',
    floorLabel: 'Ground Floor · Level 0',
    progressStart: 0.24,
    progressEnd: 0.38,
    position: [0, 2.4, 4.0],
    target: [0, 2.6, -14.0],
    fov: 50,
    panelAlignment: 'right',
    title: 'GROUND FLOOR PROMENADE',
    subtitle: 'Levi’s, Puma, Adidas, Woodland, Allen Solly & Tanishq',
    category: 'Retail Promenade',
    description: 'Explore premier flagship boutiques — Levi’s Store, Puma, Adidas, Woodland Store, Allen Solly, Tanishq Jewellery, Metro Shoes, Skechers, and Spencer’s Hypermarket.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
    features: ['Levi’s, Adidas & Puma Flagships', 'Tanishq Fine Jewellery Salon', 'Spencer’s Gourmet Department Store'],
    primaryCtaText: 'View Central Atrium',
    secondaryCtaText: 'Store Directory'
  },
  {
    id: 'atrium',
    name: 'The Central Atrium',
    locationLabel: 'Level 0 · Central Rotunda',
    floorLabel: 'Ground Floor · Level 0',
    progressStart: 0.38,
    progressEnd: 0.50,
    position: [-1.5, 2.8, -12.0],
    target: [-3.2, 5.6, -28.0],
    fov: 52,
    panelAlignment: 'left',
    title: 'THE CENTRAL ATRIUM',
    subtitle: 'Monumental Skylight & Kinetic Chandelier',
    category: 'Architectural Centerpiece',
    description: 'Gaze upward into our soaring multi-tier rotunda crowned by a parametric diagrid glass skylight and the rotating kinetic chandelier.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    features: ['24m Vaulted Diagrid Skylight', 'Rotating Kinetic Art Chandelier', 'Tiered Balcony Overlooks'],
    primaryCtaText: 'Ride Up to Level 1'
  },
  {
    id: 'firstfloor',
    name: 'First Floor Galleria',
    locationLabel: 'Level 1 · Retail Galleria',
    floorLabel: 'First Floor · Level 1',
    progressStart: 0.50,
    progressEnd: 0.64,
    position: [-3.2, 7.2, -26.0],
    target: [-3.2, 7.4, -42.0],
    fov: 50,
    panelAlignment: 'right',
    title: 'FIRST FLOOR RETAIL GALLERIA',
    subtitle: 'Louis Philippe, Titan World, W for Woman & Flying Machine',
    category: 'Specialty Retail',
    description: 'The upper galleria overlooks the atrium with glass balustrades, featuring Louis Philippe, Titan World, W for Woman, Flying Machine, Red Chief, Mufti, and Looks Salon.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    features: ['Louis Philippe Haute Menswear', 'Titan World Luxury Horology', 'Looks Salon & Unisex Grooming'],
    primaryCtaText: 'Ascend to Level 2',
    secondaryCtaText: 'Browse Shops'
  },
  {
    id: 'escalator',
    name: 'The Upper Escalator',
    locationLabel: 'Concourse Axis · Escalator Transition',
    floorLabel: 'Level 1 → Level 2',
    progressStart: 0.64,
    progressEnd: 0.74,
    position: [3.2, 9.4, -34.0],
    target: [3.2, 12.2, -48.0],
    fov: 50,
    panelAlignment: 'left',
    title: 'ASCENDING TO LEVEL 2',
    subtitle: 'Express Transit to Dining & Cinema',
    category: 'Vertical Circulation',
    description: 'Gliding along the glowing glass escalator to the second floor, arriving at the vibrant food court and entertainment wing.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop',
    features: ['Multi-Tier Escalator Core', 'Illuminated Glass Balustrades', 'Architectural Sightlines Across All Floors'],
    primaryCtaText: 'Explore Food Court'
  },
  {
    id: 'foodcourt',
    name: 'Second Floor Food Court',
    locationLabel: 'Level 2 · Gastronomy Terrace',
    floorLabel: 'Second Floor · Level 2',
    progressStart: 0.74,
    progressEnd: 0.85,
    position: [0, 12.4, -34.0],
    target: [-8.0, 12.4, -36.0],
    fov: 52,
    panelAlignment: 'right',
    title: 'FOOD COURT & DINING CONCOURSE',
    subtitle: 'Pizza Hut, KFC, Barbeque Nation & Cafes',
    category: 'Dining & Gastronomy',
    description: 'A vibrant dining destination featuring Pizza Hut, KFC, Barbeque Nation (nearby), The Bean Roastery, and communal terrace dining.',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=800&auto=format&fit=crop',
    features: ['Pizza Hut, KFC & Barbeque Nation', 'Indoor Balcony Seating & Greenery', 'Live Charcoal Grill Buffet'],
    primaryCtaText: 'Visit INOX Cinemas',
    secondaryCtaText: 'View Food Outlets'
  },
  {
    id: 'cinema',
    name: 'INOX Cinemas Multiplex',
    locationLabel: 'Level 2 · Entertainment Wing',
    floorLabel: 'Second Floor · Level 2',
    progressStart: 0.85,
    progressEnd: 0.94,
    position: [0, 12.4, -54.0],
    target: [0, 12.8, -68.0],
    fov: 50,
    panelAlignment: 'left',
    title: 'INOX CINEMAS (MULTIPLEX)',
    subtitle: 'Insignia VIP Suites, 4K Laser & Dolby Atmos',
    category: 'Entertainment World',
    description: 'Step into the cinema lobby of INOX Cinemas featuring self-service digital box office kiosks, gourmet concessions, and luxury Insignia VIP recliner auditoriums.',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop',
    features: ['INOX Insignia VIP Recliners', 'Multi-Screen 4K Laser Projection', 'Dolby Atmos Spatial Audio'],
    primaryCtaText: 'View Overlook',
    secondaryCtaText: 'Cinema Info'
  },
  {
    id: 'panoramic',
    name: 'Panoramic Grand Overlook',
    locationLabel: 'Skybridge Overlook · Level 2',
    floorLabel: 'Panoramic Deck · Level 2',
    progressStart: 0.94,
    progressEnd: 1.0,
    position: [0, 13.8, -24.0],
    target: [0, 4.5, 4.0],
    fov: 62,
    panelAlignment: 'center',
    title: 'CITY MALL AT A GLANCE',
    subtitle: 'Three Connected Levels of Shopping & Leisure',
    category: 'Panoramic Finale',
    description: 'Taking in the grand architectural perspective across all three floors — Ground Floor flagships, First Floor boutiques, and Second Floor dining & entertainment.',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
    features: ['3 Fully Connected Mall Levels', '180+ Stores & 35 Dining Venues', 'City Cinemas & Entertainment Wing'],
    primaryCtaText: 'Plan Your Visit',
    secondaryCtaText: 'Explore Directory'
  }
];

export const STORE_DIRECTORY: StoreDirectoryItem[] = [
  // =========================================================================
  // ENTERTAINMENT & CINEMA
  // =========================================================================
  {
    id: 'dir-inox',
    name: 'INOX Cinemas',
    category: 'Luxury Cinema & IMAX Multiplex',
    floor: 'Second Floor · Level 2',
    checkpointId: 'cinema',
    progress: 0.90,
    tagline: 'Premier multiplex with Insignia VIP suites, laser projection, and Dolby Atmos audio.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // FASHION & APPAREL BRANDS
  // =========================================================================
  {
    id: 'dir-levis',
    name: "Levi's Store",
    category: 'Denim & Heritage Apparel',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.26,
    tagline: 'Iconic 501® original denim, trucker jackets, and timeless authentic American style.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-louis-philippe',
    name: 'Louis Philippe',
    category: 'Luxury Formal Suiting & Tuxedos',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.54,
    tagline: 'The Upper Crest of menswear: precision-tailored suits, formal shirts, and silk ties.',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-allen-solly',
    name: 'Allen Solly',
    category: 'Smart Casuals & Friday Dressing',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.30,
    tagline: 'Pioneering Friday Dressing: colorful polos, smart chinos, and contemporary workwear.',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-puma',
    name: 'Puma',
    category: 'Sportswear & Performance Athletic',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.32,
    tagline: 'Forever Faster sportswear, performance athletic gear, and lifestyle sneaker collabs.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-adidas',
    name: 'Adidas',
    category: 'Performance Sports & Athleisure',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.34,
    tagline: 'Iconic three-stripes performance athletics, Ultraboost footwear, and Originals streetwear.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-w-for-woman',
    name: 'W for Woman',
    category: 'Contemporary Ethnic Couture',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.58,
    tagline: 'Contemporary Indian ethnic wear, stylish kurtas, palazzos, and modern fusion drapes.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-flying-machine',
    name: 'Flying Machine',
    category: 'Youth Streetwear & Urban Denim',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.62,
    tagline: "India's first homegrown youth denim brand: cool jackets, graphic tees, and streetwear.",
    image: 'https://images.unsplash.com/photo-1497644083578-611b798c60f3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-mufti',
    name: 'Mufti',
    category: 'Alternative Casual Menswear',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.64,
    tagline: 'Expressive alternative metropolitan casuals, bold printed shirts, and stretch denim.',
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // FOOTWEAR
  // =========================================================================
  {
    id: 'dir-woodland',
    name: 'Woodland Store',
    category: 'Outdoor & Adventure Gear',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.28,
    tagline: 'Extreme outdoor adventure leather boots, all-weather jackets, and rugged exploration gear.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-skechers',
    name: 'Skechers',
    category: 'Athletic Footwear & Comfort Shoes',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.36,
    tagline: 'Memory Foam lifestyle and walking sneakers with cutting-edge comfort technology.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-metro-shoes',
    name: 'Metro Shoes',
    category: 'Designer Footwear & Accessories',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.29,
    tagline: 'Premier handcrafted wedding, party, and everyday formal footwear for the entire family.',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-red-chief',
    name: 'Red Chief',
    category: 'Genuine Leather Shoes & Boots',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.60,
    tagline: 'Tough, 100% genuine pure leather boots, formal shoes, and rugged outdoor accessories.',
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // JEWELLERY & ACCESSORIES
  // =========================================================================
  {
    id: 'dir-tanishq',
    name: 'Tanishq',
    category: 'Fine Jewellery & 22K/24K Gold',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'ground',
    progress: 0.33,
    tagline: 'India’s most trusted fine jewellery: certified 22K gold, solitaire diamonds, and bridal sets.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-titan-world',
    name: 'Titan World',
    category: 'Luxury Horology & Timepieces',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.56,
    tagline: 'World of Titan: Edge, Raga, Nebula gold watches, smartwatches, and luxury eyewear.',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // BEAUTY, PERSONAL CARE & SERVICES
  // =========================================================================
  {
    id: 'dir-looks-salon',
    name: 'Looks Salon',
    category: 'Luxury Hair & Grooming Salon',
    floor: 'First Floor · Level 1',
    checkpointId: 'firstfloor',
    progress: 0.66,
    tagline: 'Luxury unisex grooming salon: master hair styling, rejuvenating facials, and beauty rituals.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-arjun-mehendi',
    name: 'Arjun Mehendi Art',
    category: 'Traditional Mehendi & Bridal Art',
    floor: 'Ground Floor · Central Concourse',
    checkpointId: 'atrium',
    progress: 0.40,
    tagline: 'Master bridal and designer henna artistry, intricate organic dark-stain henna creations.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // RETAIL & DEPARTMENT STORES
  // =========================================================================
  {
    id: 'dir-spencers',
    name: "Spencer Retail Limited / Spencer's",
    category: 'Gourmet Hypermarket & Department',
    floor: 'Ground Floor · Anchor Concourse',
    checkpointId: 'ground',
    progress: 0.25,
    tagline: 'Flagship hypermarket featuring gourmet imported foods, fresh organics, lifestyle, and home.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // FOOD & DINING
  // =========================================================================
  {
    id: 'dir-pizza-hut',
    name: 'Pizza Hut',
    category: 'Artisanal Pizza & Italian Casual',
    floor: 'Second Floor · Level 2',
    checkpointId: 'foodcourt',
    progress: 0.78,
    tagline: 'Hot, freshly baked pan pizzas, stuffed crusts, garlic bread, wings, and creamy pastas.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-kfc',
    name: 'KFC',
    category: 'Crispy Chicken & Quick Service',
    floor: 'Second Floor · Level 2',
    checkpointId: 'foodcourt',
    progress: 0.82,
    tagline: "Colonel Sanders' world-famous 11 secret herbs & spices crispy fried chicken and zingers.",
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-barbeque-nation',
    name: 'Barbeque Nation (nearby)',
    category: 'Live Charcoal Grill & Buffet',
    floor: 'Second Floor · Dining Terrace',
    checkpointId: 'foodcourt',
    progress: 0.84,
    tagline: 'Live tableside charcoal grill experience with unlimited skewers and grand buffet spread.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop'
  },

  // =========================================================================
  // ATRIUM & LANDMARKS
  // =========================================================================
  {
    id: 'dir-atrium',
    name: 'Central Rotunda & Chandelier',
    category: 'Atrium Centerpiece',
    floor: 'Ground Floor · Level 0',
    checkpointId: 'atrium',
    progress: 0.42,
    tagline: 'Monumental skylight, fluted travertine columns, and kinetic sculpture.',
    image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dir-panorama',
    name: 'Skybridge Panorama',
    category: 'Panoramic Overlook',
    floor: 'Second Floor · Level 2',
    checkpointId: 'panoramic',
    progress: 0.98,
    tagline: 'Spectacular elevated overlook taking in the entire illuminated three-floor mall.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
  }
];

// Keyframes along the continuous physical path
// [progress, posX, posY, posZ, tgtX, tgtY, tgtZ, fov]
const KEYFRAMES: [number, number, number, number, number, number, number, number][] = [
  // 0. Exterior Arrival Plaza
  [0.00, 0, 4.2, 34,    0, 5.2, 16, 54],
  [0.08, 0, 3.4, 28,    0, 4.2, 16, 52],

  // 1. Entrance Doors (passing right through glass portal at Z=20)
  [0.14, 0, 2.8, 20.5,  0, 3.0, 10, 50],
  [0.20, 0, 2.5, 14,    0, 2.8, 0,  50],

  // 2. Ground Floor Shopping Concourse (viewing left & right shops)
  [0.26, -1.8, 2.4, 4,  -11, 2.6, 2, 48],
  [0.32, 1.8, 2.4, -4,   11, 2.6, -6, 48],

  // 3. Central Atrium Reveal (looking up at monumental skylight & kinetic art)
  [0.38, 0, 3.2, -6,     0, 8.5, -12, 58],
  [0.44, 0, 3.4, -12,    0, 8.0, -12, 56],

  // 4. Escalator 1 Ascent: Ground (Y=0) -> Level 1 (Y=6.0)
  [0.50, -3.2, 3.8, -20, -3.2, 5.5, -30, 48],
  [0.56, -3.2, 7.2, -28, -3.2, 7.4, -36, 48],

  // 5. First Floor Concourse (Level 1, Y=7.2, viewing upper shops)
  [0.62, -3.5, 7.2, -14, -12, 7.5, -14, 46],
  [0.66, 3.5, 7.2, -18,   12, 7.5, -18, 46],

  // 6. Escalator 2 Ascent: Level 1 (Y=6.0) -> Level 2 Food Court (Y=11.5)
  [0.72, 3.2, 9.2, -32,  3.2, 11.8, -42, 48],
  [0.76, 1.0, 12.2, -36, 0, 12.4, -44, 50],

  // 7. Second Floor Food Court & Dining Concourse (Y=12.2)
  [0.82, -2.5, 12.2, -40, -11, 12.5, -42, 50],
  [0.86, 0, 12.2, -48,   0, 12.5, -58, 50],

  // 8. Cinema Lobby & Entertainment (City Cinemas, Y=12.4)
  [0.90, 0, 12.4, -58,   0, 13.0, -70, 50],
  [0.94, 0, 12.4, -66,   0, 12.8, -78, 48],

  // 9. Final Panoramic Grand Overlook (Level 2 elevated view across the 3 connected floors)
  [0.98, 0, 14.0, -22,   0, 5.0, 6, 62],
  [1.00, 0, 14.2, -22,   0, 5.0, 6, 62]
];

// Reusable static vectors to avoid per-frame allocations
const _staticPos = new THREE.Vector3();
const _staticTarget = new THREE.Vector3();

/**
 * High-performance camera interpolation using zero per-frame object allocation.
 * Returns shared vectors to eliminate garbage collection pauses.
 */
export function getInterpolatedCinematicCamera(
  progress: number,
  isMobile: boolean = false,
  outPosition: THREE.Vector3 = _staticPos,
  outTarget: THREE.Vector3 = _staticTarget
): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  activeCheckpoint: CameraWaypoint;
  checkpointWeight: number;
} {
  const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;

  // Find segment
  let segIndex = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i][0] && p <= KEYFRAMES[i + 1][0]) {
      segIndex = i;
      break;
    }
  }

  const k1 = KEYFRAMES[segIndex];
  const k2 = KEYFRAMES[segIndex + 1] || KEYFRAMES[segIndex];
  const segProgress = k2[0] === k1[0] ? 0 : (p - k1[0]) / (k2[0] - k1[0]);

  // Smooth Hermite cubic easing
  const t = segProgress * segProgress * (3 - 2 * segProgress);

  const mobileY = isMobile ? 0.35 : 0;
  const mobileFovBoost = isMobile ? 6 : 0;

  outPosition.set(
    k1[1] + (k2[1] - k1[1]) * t,
    k1[2] + (k2[2] - k1[2]) * t + mobileY,
    k1[3] + (k2[3] - k1[3]) * t
  );

  outTarget.set(
    k1[4] + (k2[4] - k1[4]) * t,
    k1[5] + (k2[5] - k1[5]) * t,
    k1[6] + (k2[6] - k1[6]) * t
  );

  const fov = k1[7] + (k2[7] - k1[7]) * t + mobileFovBoost;

  // Determine active checkpoint
  let activeCheckpoint = CINEMATIC_CHECKPOINTS[0];
  let checkpointWeight = 1.0;

  for (let i = 0; i < CINEMATIC_CHECKPOINTS.length; i++) {
    const cp = CINEMATIC_CHECKPOINTS[i];
    if (p >= cp.progressStart && p <= cp.progressEnd) {
      activeCheckpoint = cp;
      const mid = (cp.progressStart + cp.progressEnd) * 0.5;
      const span = (cp.progressEnd - cp.progressStart) * 0.5;
      const dist = Math.abs(p - mid);
      checkpointWeight = dist >= span ? 0 : 1 - dist / span;
      break;
    }
  }

  return {
    position: outPosition,
    target: outTarget,
    fov,
    activeCheckpoint,
    checkpointWeight
  };
}
