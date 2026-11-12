// ============================================================================
// CITY MALL OFFICIAL BRAND DIRECTORY & 3D SHOWCASE DATABASE
// 27 Iconic Brands · 216 Verified High-Resolution Visuals · 0 Cross-Brand Duplication
// ============================================================================

export interface MallBrand {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  department: string;
  floor: string;
  unit: string;
  accentColor: string;
  timing: string;
  altText: string;
  storyHighlight: string;
  features: string[];
  images: string[];
}

export const ALL_MALL_BRANDS: MallBrand[] = [
  {
    "id": "brand-inox",
    "name": "INOX Cinemas",
    "category": "Luxury Cinema & IMAX Multiplex",
    "categorySlug": "cinema",
    "department": "Entertainment & Leisure",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Multiplex Suite 201",
    "accentColor": "#0f766e",
    "timing": "10:00 AM \u2013 Midnight",
    "altText": "INOX Cinemas luxury multiplex cinema hall with Insignia VIP suites and IMAX laser screen",
    "storyHighlight": "Dual 4K commercial laser projectors with floor-to-ceiling curved silver screens and motorized heated Italian leather recliners.",
    "features": [
      "IMAX\u00ae 4K Laser Projection",
      "Dolby Atmos 128-Channel Audio",
      "Insignia VIP Butler Service",
      "Private Director's Screening Salon"
    ],
    "images": [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-levis",
    "name": "Levi's Store",
    "category": "Denim & Heritage Apparel",
    "categorySlug": "denim",
    "department": "Fashion & Haute Couture",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Promenade Unit G-104",
    "accentColor": "#c5a059",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Levi's Store authentic denim collection, jeans stacks, and modern casual apparel",
    "storyHighlight": "The world authority in denim craftsmanship, featuring iconic 501\u00ae originals, bespoke Tailor Shop distressing, and premium selvedge collections.",
    "features": [
      "501\u00ae Original Heritage Fit",
      "Live Master Tailor Studio",
      "Premium Selvedge Denim",
      "Sustainable Water<Less\u00ae Craft"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-woodland",
    "name": "Woodland Store",
    "category": "Outdoor & Adventure Gear",
    "categorySlug": "outdoor",
    "department": "Footwear & Outdoor",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Boulevard Unit G-110",
    "accentColor": "#aa820a",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Woodland Store premium outdoor footwear, rugged adventure boots, and leather jackets",
    "storyHighlight": "Engineered for extreme expedition durability with waterproof nubuck leathers, heavy-duty Vibram outsoles, and technical apparel.",
    "features": [
      "Waterproof Nubuck Handcraft",
      "Vibram Traction Outsoles",
      "All-Weather Expedition Gear",
      "Eco-Tanned Full-Grain Leather"
    ],
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470549638415-0a0755be0619?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-puma",
    "name": "Puma",
    "category": "Sportswear & Performance Athletic",
    "categorySlug": "sportswear",
    "department": "Activewear & Sports",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Sports Concourse G-120",
    "accentColor": "#e11d48",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Puma modern athletic sportswear, performance sneakers, and urban training fashion",
    "storyHighlight": "Forever Faster sports innovation uniting Olympic-grade NITRO\u2122 foam velocity runners, motorsport collaborations, and high-fashion streetwear.",
    "features": [
      "NITRO\u2122 Foam Track Innovation",
      "Select High-Fashion Collabs",
      "Motorsport Scuderia Editions",
      "Seamless Training Ergonomics"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-titan-world",
    "name": "Titan World",
    "category": "Luxury Horology & Timepieces",
    "categorySlug": "watches",
    "department": "Jewellery & Horology",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Chrono Colonnade 1-102",
    "accentColor": "#d97706",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Titan World luxury horology, precision chronographs, and haute complications",
    "storyHighlight": "Mastery of ultra-slim mechanical horology: Titan Edge, Nebula solid 18K gold chronometers, and artisanal enamel dials.",
    "features": [
      "Titan Edge Ultra-Slim Calibre",
      "Nebula 18K Solid Gold Vault",
      "Bespoke Diamond Horology",
      "Sapphire Crystal Anti-Reflective Complications"
    ],
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-skechers",
    "name": "Skechers",
    "category": "Athletic Footwear & Comfort Shoes",
    "categorySlug": "footwear",
    "department": "Footwear & Outdoor",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Sports Promenade G-126",
    "accentColor": "#0284c7",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Skechers comfort sneakers, memory foam walking shoes, and lifestyle trainers",
    "storyHighlight": "The Comfort Technology Company\u2122 featuring Hands Free Slip-ins\u00ae, podiatrist-certified Arch Fit\u00ae ergonomics, and ultra-lightweight cushioning.",
    "features": [
      "Hands Free Slip-ins\u00ae Tech",
      "Podiatrist-Certified Arch Fit\u00ae",
      "Hyper Burst\u00ae Responsive Cushioning",
      "Air-Cooled Memory Foam Insole"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-w-for-woman",
    "name": "W for Woman",
    "category": "Contemporary Ethnic Couture",
    "categorySlug": "ethnic",
    "department": "Fashion & Haute Couture",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Galleria Suite 1-108",
    "accentColor": "#db2777",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "W for Woman contemporary Indian ethnic wear, designer kurtas, and festive fusion wear",
    "storyHighlight": "Contemporary Indian fusion fashion blending artisanal handloom chanderi, fine zari embroidery, and modern silhouette tailoring.",
    "features": [
      "Handloom Chanderi & Tussar Silk",
      "Contemporary Silhouette Drapes",
      "Artisanal Zari Threadwork",
      "Festive Capsule Curations"
    ],
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-flying-machine",
    "name": "Flying Machine",
    "category": "Youth Streetwear & Urban Denim",
    "categorySlug": "streetwear",
    "department": "Fashion & Haute Couture",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Youth Galleria 1-114",
    "accentColor": "#2563eb",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Flying Machine edgy youth streetwear, washed graphic denim, and urban jackets",
    "storyHighlight": "India's first homegrown denim brand crafting raw youth streetwear, distressed flex denim jackets, and futuristic cyber graphic tees.",
    "features": [
      "HyperFlex Motion Denim",
      "Graphic Street Culture Hoodies",
      "Oversized Raw Wash Jackets",
      "Urban Cyberwear Editions"
    ],
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-red-chief",
    "name": "Red Chief",
    "category": "Genuine Leather Shoes & Boots",
    "categorySlug": "leather-shoes",
    "department": "Footwear & Outdoor",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Leather Arcade 1-120",
    "accentColor": "#b91c1c",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Red Chief genuine leather shoes, casual rugged boots, and premium belts",
    "storyHighlight": "Genuine top-grain leather footwear and accessories built with rugged Goodyear welting, cushioned comfort footbeds, and Italian styling.",
    "features": [
      "100% Genuine Top-Grain Hide",
      "Goodyear Welting Durability",
      "Executive Derby & Monkstrap Brogues",
      "Handcrafted Full-Hide Belts"
    ],
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-mufti",
    "name": "Mufti",
    "category": "Alternative Casual Menswear",
    "categorySlug": "mens-casuals",
    "department": "Fashion & Haute Couture",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Fashion Concourse 1-124",
    "accentColor": "#4f46e5",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Mufti alternative casual shirts, stretch denim trousers, and contemporary menswear",
    "storyHighlight": "Pioneering alternative menswear with expressively washed linen shirts, stretch dobby trousers, and sophisticated evening separates.",
    "features": [
      "Washed Linen Tailoring",
      "Stretch Dobby Denim Trousers",
      "Subtle Tone-on-Tone Patterns",
      "Evening Smart-Casual Separates"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-allen-solly",
    "name": "Allen Solly",
    "category": "Smart Casuals & Friday Dressing",
    "categorySlug": "smart-casuals",
    "department": "Fashion & Haute Couture",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Promenade Suite G-132",
    "accentColor": "#059669",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Allen Solly smart casuals, Friday dressing blazers, and corporate shirts",
    "storyHighlight": "The originators of Friday Dressing in India: crisp non-iron pinpoint shirts, pastel chinos, and unstructured lightweight work blazers.",
    "features": [
      "Unstructured Summer Wool Blazers",
      "Non-Iron Supima Cotton Shirts",
      "Tailored Comfort Chinos",
      "Signature Stag Embroidery"
    ],
    "images": [
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-louis-philippe",
    "name": "Louis Philippe",
    "category": "Luxury Formal Suiting & Tuxedos",
    "categorySlug": "formal-suiting",
    "department": "Fashion & Haute Couture",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Haute Colonnade 1-130",
    "accentColor": "#9333ea",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Louis Philippe precision tailored suits, bespoke blazers, and French cuff shirts",
    "storyHighlight": "The Upper Crest of sartorial sophistication: Super 150s Merino wool suits, pure mulberry silk neckwear, and made-to-measure ceremonies.",
    "features": [
      "Super 150s Wool Tuxedos",
      "Made-to-Measure Suiting Salon",
      "French Cuff Egyptian Cotton Shirts",
      "Pure Mulberry Silk Neckwear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-adidas",
    "name": "Adidas",
    "category": "Performance Sports & Athleisure",
    "categorySlug": "athleisure",
    "department": "Activewear & Sports",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Sports Flagship G-116",
    "accentColor": "#0284c7",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Adidas performance sportswear, Ultraboost runners, and three-stripes apparel",
    "storyHighlight": "Global sportswear titan showcasing Ultraboost Light energy return, Originals Trefoil streetwear, and high-performance soccer boot flagships.",
    "features": [
      "Ultraboost Light Dynamic Cushioning",
      "Originals Trefoil Streetwear Vault",
      "Continental\u2122 Natural Rubber Grip",
      "Primeknit Recycled Upper Weave"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-tanishq",
    "name": "Tanishq",
    "category": "Fine Jewellery & 22K/24K Gold",
    "categorySlug": "jewellery",
    "department": "Jewellery & Horology",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "The Gilded Arcade G-102",
    "accentColor": "#b45309",
    "timing": "10:30 AM \u2013 09:30 PM",
    "altText": "Tanishq certified 22K gold bridal necklaces, solitaires, and diamond polki collections",
    "storyHighlight": "India's revered fine jewellery maison: certified 22K temple gold, VVS solitaire diamonds, handcrafted bridal kundan polki, and gemstone suites.",
    "features": [
      "Certified 22K Hallmark Gold Vault",
      "Solitaire Diamond Engagement Salon",
      "Heritage Kundan & Polki Bridal Suites",
      "Karatmeter Live Purity Guarantee"
    ],
    "images": [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-metro-shoes",
    "name": "Metro Shoes",
    "category": "Designer Footwear & Accessories",
    "categorySlug": "designer-footwear",
    "department": "Footwear & Outdoor",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Shoe Galleria G-124",
    "accentColor": "#be123c",
    "timing": "10:00 AM \u2013 10:00 PM",
    "altText": "Metro Shoes handcrafted leather formal shoes, party stilettos, and comfort sandals",
    "storyHighlight": "Contemporary multi-brand shoe boutique showcasing Italian leather oxfords, crystal-embellished evening stilettos, and comfort loafers.",
    "features": [
      "Crystal-Embellished Evening Stilettos",
      "Handcrafted Burnished Leather Oxfords",
      "Orthopedic Insole Cushioned Slippers",
      "Designer Clutch Pairings"
    ],
    "images": [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-looks-salon",
    "name": "Looks Salon",
    "category": "Luxury Hair & Grooming Salon",
    "categorySlug": "salon-grooming",
    "department": "Wellness & Beauty",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Wellness Suite 1-136",
    "accentColor": "#ec4899",
    "timing": "10:00 AM \u2013 09:00 PM",
    "altText": "Looks Salon luxury hair spa, unisex grooming lounge, and bespoke bridal makeup",
    "storyHighlight": "Premier luxury unisex grooming destination featuring K\u00e9rastase bespoke hair rituals, master skin therapists, and bridal makeup suites.",
    "features": [
      "K\u00e9rastase Chronologiste Hair Rituals",
      "Private VIP Facial Styling Suites",
      "Master Barbering & Hot Towel Shaves",
      "High-Definition Bridal Cosmetics"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-arjun-mehendi",
    "name": "Arjun Mehendi Art",
    "category": "Traditional Mehendi & Bridal Art",
    "categorySlug": "bridal-art",
    "department": "Wellness & Beauty",
    "floor": "First Floor \u00b7 Level 1",
    "unit": "Artisan Kiosk K-104",
    "accentColor": "#047857",
    "timing": "11:00 AM \u2013 09:00 PM",
    "altText": "Arjun Mehendi Art traditional bridal henna, intricate Indian patterns, and Arabic designs",
    "storyHighlight": "Master bridal henna artist crafting organic dark-stain henna creations, intricate Rajasthani figures, and contemporary Arabic geometric florals.",
    "features": [
      "100% Organic Cold-Pressed Henna",
      "Intricate Rajasthani Bridal Motifs",
      "Arabic Fusion Geometric Strokes",
      "Guaranteed Deep Mahogany Stain"
    ],
    "images": [
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-spencers",
    "name": "Spencer's",
    "category": "Gourmet Hypermarket & Department",
    "categorySlug": "hypermarket",
    "department": "Retail & Lifestyle",
    "floor": "Ground Floor \u00b7 Level 0",
    "unit": "Anchor Concourse G-140",
    "accentColor": "#15803d",
    "timing": "09:00 AM \u2013 10:30 PM",
    "altText": "Spencer's gourmet hypermarket, fresh imported produce, organic bakery, and home essentials",
    "storyHighlight": "Comprehensive gourmet supermarket concourse featuring imported artisanal cheeses, live patisserie, fresh hydroponic greens, and home essentials.",
    "features": [
      "Artisanal European Fromagerie",
      "Live Sourdough Bakery & Patisserie",
      "Hydroponic Organic Greens Cellar",
      "Curated Global Pantry Imports"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506484381205-f7945653044d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-pind-balluchi",
    "name": "Pind Balluchi",
    "category": "North Indian Heritage Dining",
    "categorySlug": "heritage-dining",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Gastronomy Terrace 2-102",
    "accentColor": "#c2410c",
    "timing": "11:30 AM \u2013 11:00 PM",
    "altText": "Pind Balluchi authentic North Indian Punjabi village dining, dal makhani, and clay tandoor naans",
    "storyHighlight": "Immersive rustic Punjabi village atmosphere serving slow-simmered Dal Balluchi, hand-pounded Bhatti Murgh, and clay oven breads.",
    "features": [
      "Signature Slow-Simmered Dal Balluchi",
      "Clay Tandoor Bhatti Murgh",
      "Rustic Punjabi Village Decor",
      "Chilled Clay Kulhad Lassi"
    ],
    "images": [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-mirch-masala",
    "name": "The Mirch Masala Restaurant",
    "category": "Royal Mughlai & Tandoor Cuisine",
    "categorySlug": "mughlai-dining",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Terrace Suite 2-106",
    "accentColor": "#dc2626",
    "timing": "11:30 AM \u2013 11:00 PM",
    "altText": "The Mirch Masala sizzling Mughlai curries, fragrant dum biryani, and live charcoal kebabs",
    "storyHighlight": "Regal Awadhi and Mughlai culinary banquet featuring aromatic saffron dum pukht biryanis, Kakori seekh kebabs, and rich shahi curries.",
    "features": [
      "Sealed Copper Pot Dum Biryani",
      "Melt-in-Mouth Kakori Kebabs",
      "Royal Brass Thali Service",
      "Artisanal Spiced Gravies"
    ],
    "images": [
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-barbeque-nation",
    "name": "Barbeque Nation",
    "category": "Live Charcoal Grill & Buffet",
    "categorySlug": "charcoal-grill",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Dining Terrace 2-110",
    "accentColor": "#b91c1c",
    "timing": "12:00 PM \u2013 11:00 PM",
    "altText": "Barbeque Nation live tableside grill skewers, grand buffet feast, and dessert station",
    "storyHighlight": "The pioneer of interactive tableside live charcoal grilling, unlimited smoking skewers, international buffet spreads, and live kulfi counters.",
    "features": [
      "Embedded Tableside Charcoal Grills",
      "Unlimited Smoked Skewer Feasts",
      "Grand 60+ Item Global Buffet",
      "Live Kulfi Nation Dessert Parlour"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-cinnamon",
    "name": "Cinnamon Restaurant",
    "category": "Multi-Cuisine Fine Dining & Bistro",
    "categorySlug": "fine-dining",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Fine Dining Arcade 2-114",
    "accentColor": "#7c2d12",
    "timing": "12:00 PM \u2013 11:30 PM",
    "altText": "Cinnamon contemporary fine dining, curated pan-Asian dishes, and signature mocktails",
    "storyHighlight": "Sophisticated contemporary pan-Asian and Indian haute cuisine, candlelit banquettes, sommelier-curated mocktails, and decadent desserts.",
    "features": [
      "Artisan Pan-Asian Dim Sum Bar",
      "Candlelit Intimate Banquette Seating",
      "Molecular Herb-Infused Mocktails",
      "Single-Origin Belgian Chocolate Gateau"
    ],
    "images": [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-subrasa",
    "name": "Subrasa Orion Mall",
    "category": "Authentic Pure Veg Thali & Dining",
    "categorySlug": "pure-veg",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Gourmet Pavilion 2-118",
    "accentColor": "#ca8a04",
    "timing": "11:00 AM \u2013 11:00 PM",
    "altText": "Subrasa pure vegetarian regional Indian delicacies, royal thali, and heritage sweets",
    "storyHighlight": "Pure vegetarian royal dining experience featuring the 32-item Grand Maharaja Thali, Gujarati and Rajasthani heritage preparations.",
    "features": [
      "32-Course Grand Maharaja Thali",
      "Strict 100% Pure Vegetarian Kitchen",
      "Traditional Ghee Dal Baati Churma",
      "Fresh Malai Rabri & Jalebi"
    ],
    "images": [
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-rangrezza",
    "name": "Rangrezza Restaurant & Banquet Hall",
    "category": "Grand Banquets & Celebratory Feasts",
    "categorySlug": "banquets",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Banquet Colonnade 2-122",
    "accentColor": "#be185d",
    "timing": "11:00 AM \u2013 11:30 PM",
    "altText": "Rangrezza opulent multi-cuisine royal banquet hall, celebration feasts, and luxury events",
    "storyHighlight": "Opulent crystal-chandelier banquet hall and dining room hosting royal weddings, corporate galas, and bespoke multi-cuisine buffets.",
    "features": [
      "Crystal Chandelier Grand Ballroom",
      "Dedicated Private VIP Banquet Salon",
      "Custom Curated Multi-Cuisine Menus",
      "Live Mocktail & Appetizer Stations"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-pizza-hut",
    "name": "Pizza Hut",
    "category": "Artisanal Pizza & Italian Casual",
    "categorySlug": "pizza-italian",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Food Court Suite 2-104",
    "accentColor": "#e11d48",
    "timing": "11:00 AM \u2013 11:00 PM",
    "altText": "Pizza Hut freshly baked pan pizzas, cheese stuffed crusts, garlic breadsticks, and pastas",
    "storyHighlight": "World-famous signature pan pizzas with golden crisp crusts, molten 100% mozzarella cheese pulls, pasta bakes, and cheesy garlic bread.",
    "features": [
      "Signature Crispy Pan Pizza Base",
      "Cheese Stuffed Crust Specialties",
      "Creamy Baked Penne & Fusilli",
      "Family Sharing Feast Combos"
    ],
    "images": [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-dosa-plaza",
    "name": "Dosa Plaza",
    "category": "South Indian Specialty Delicacies",
    "categorySlug": "south-indian",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Food Court Suite 2-112",
    "accentColor": "#059669",
    "timing": "10:00 AM \u2013 10:30 PM",
    "altText": "Dosa Plaza crispy golden paper dosas, 104 fusion dosa varieties, and South Indian filter coffee",
    "storyHighlight": "World-famous innovators of 104 distinct crispy dosa variations, Mexican Salsa Dosas, Paneer Chilli Dosas, and authentic filter kaapi.",
    "features": [
      "104 World Fusion Dosa Flavors",
      "Crispy Paper-Thin Golden Griddles",
      "Trio of Fresh Chutneys & Piping Sambar",
      "Traditional Brass Filter Kaapi Tumbler"
    ],
    "images": [
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    "id": "brand-kfc",
    "name": "KFC",
    "category": "Crispy Chicken & Quick Service",
    "categorySlug": "quick-service",
    "department": "Dining & Gastronomy",
    "floor": "Second Floor \u00b7 Level 2",
    "unit": "Food Court Suite 2-116",
    "accentColor": "#ea580c",
    "timing": "11:00 AM \u2013 11:30 PM",
    "altText": "KFC world-famous crispy fried chicken bucket, spicy zinger burgers, and crunchy tenders",
    "storyHighlight": "Colonel Sanders' legendary 11 secret herbs and spices recipe: iconic crispy fried chicken buckets, spicy Zinger burgers, and popcorn bites.",
    "features": [
      "Original Recipe 11 Secret Herbs",
      "Spicy Zinger Crunch Burger",
      "Hot & Crispy Family Bucket",
      "Crispy Popcorn Chicken Bites"
    ],
    "images": [
      "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export const getBrandById = (id: string): MallBrand | undefined => {
  return ALL_MALL_BRANDS.find((b) => b.id === id);
};

export const getBrandsByCategory = (categorySlug: string): MallBrand[] => {
  if (!categorySlug || categorySlug === 'all') return ALL_MALL_BRANDS;
  return ALL_MALL_BRANDS.filter((b) => b.categorySlug === categorySlug);
};

export const getRelatedBrands = (categorySlug: string, currentId: string, limit: number = 4): MallBrand[] => {
  const sameCategory = ALL_MALL_BRANDS.filter((b) => b.categorySlug === categorySlug && b.id !== currentId);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const otherBrands = ALL_MALL_BRANDS.filter((b) => b.id !== currentId && !sameCategory.includes(b));
  return [...sameCategory, ...otherBrands].slice(0, limit);
};
