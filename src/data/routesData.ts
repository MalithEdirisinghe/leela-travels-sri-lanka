import type { RouteItem, VehicleType } from '../types';

export const VEHICLE_OPTIONS: VehicleType[] = [
  {
    id: 'sedan',
    name: 'Comfort Sedan (Toyota Prius / Allion)',
    capacity: '1 - 3 Passengers + 3 Bags',
    priceMultiplier: 1.0,
    description: 'Air-conditioned luxury sedan ideal for couples or solo travelers seeking supreme comfort.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'suv',
    name: 'Executive SUV (Toyota Montero / Land Cruiser)',
    capacity: '1 - 4 Passengers + 4 Bags',
    priceMultiplier: 1.25,
    description: 'Elevated ride with panoramic views, perfect for mountain routes and rougher safari terrain.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van',
    name: 'Luxury Passenger Van (Toyota KDH)',
    capacity: '1 - 7 Passengers + 7 Bags',
    priceMultiplier: 1.45,
    description: 'Spacious high-roof van tailored for families, small groups, or extra luggage requirements.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  }
];

export const SRI_LANKAN_ROUTES: RouteItem[] = [
  {
    id: 1,
    name: "Colombo → Kandy",
    from: "Colombo",
    to: "Kandy",
    duration: "3.5 Hours",
    distance: "115 km",
    priceUSD: 45,
    priceLKR: 14000,
    popular: true,
    category: "Cultural Triangle",
    image: "/assets/colombo-kandy1.jpg",
    images: [
      "/assets/colombo-kandy1.jpg",
      "/assets/colombo-kandy2.jpg"
    ],
    description: "Travel from the vibrant capital of Colombo to the sacred hill capital of Kandy. Enjoy scenic hill views, rubber plantations, and lush greenery along the way.",
    highlights: [
      "Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)",
      "Pinnawala Elephant Orphanage / Transit Sanctuary stop",
      "Royal Botanical Gardens Peradeniya",
      "Kandy Lake scenic drive & upper lake viewpoint"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "English-speaking Professional Driver",
      "Expressway & Highway Tolls",
      "Chilled Mineral Water Bottled Daily",
      "Door-to-Door Pickup & Drop-off",
      "Fuel & Parking Fees Included"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 2,
    name: "Kandy → Nuwara Eliya",
    from: "Kandy",
    to: "Nuwara Eliya",
    duration: "3.0 Hours",
    distance: "78 km",
    priceUSD: 50,
    priceLKR: 15500,
    popular: true,
    category: "Hill Country",
    image: "/assets/kandy-ne1.jpg",
    images: [
      "/assets/kandy-ne1.jpg",
      "/assets/kandy-ne2.jpg"
    ],
    description: "Ascend into the cool misty mountains of Ceylon tea country. Drive past tumbling waterfalls, endless emerald tea estates, and colonial-era architecture.",
    highlights: [
      "Ramboda Falls scenic viewpoint",
      "Guided Ceylon Tea Factory tour & fresh tea tasting",
      "Gregory Lake promenade & Victoria Park",
      "Colonial Little England post office & architecture"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "English-speaking Professional Chauffeur",
      "Tea Estate & Factory Stopovers",
      "Cold Bottled Mineral Water",
      "Hotel Pickup & Drop-off",
      "Flexible Photo Stops along the pass"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 3,
    name: "Nuwara Eliya → Ella",
    from: "Nuwara Eliya",
    to: "Ella",
    duration: "2.5 Hours",
    distance: "55 km",
    priceUSD: 40,
    priceLKR: 12500,
    popular: true,
    category: "Hill Country",
    image: "/assets/kandy-ne2.jpg",
    images: [
      "/assets/kandy-ne2.jpg",
      "/assets/kandy-ella1.jpg"
    ],
    description: "A breathtaking road voyage through Sri Lanka's central highlands leading to the bohemian mountain village of Ella.",
    highlights: [
      "Iconic Nine Arch Bridge view point",
      "Little Adam's Peak trailhead access",
      "Ravana Waterfalls roadside view & story",
      "Panoramas of Ella Gap"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "Professional English Chauffeur",
      "Luggage transfer & assistance",
      "Bottled Water",
      "Door-to-door hotel delivery"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 4,
    name: "Ella → Yala",
    from: "Ella",
    to: "Yala",
    duration: "2.5 Hours",
    distance: "95 km",
    priceUSD: 55,
    priceLKR: 17000,
    popular: false,
    category: "Wildlife Safari",
    image: "/assets/ella-yala1.jpg",
    images: [
      "/assets/ella-yala1.jpg",
      "/assets/ella-yala2.jpg"
    ],
    description: "Descend from the cool Ella mountains into the dry zone plains of Yala, home to the world's highest density of wild leopards and Asian elephants.",
    highlights: [
      "Ravana Falls base stop",
      "Transition from mountain pass to dry safari wilderness",
      "Yala National Park entrance or lodge direct drop-off",
      "Optional safari jeep reservation support"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "Dedicated Chauffeur Guide",
      "Safeguarded Luggage Storage",
      "Bottled Water",
      "Direct Lodge / Camp Drop"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 5,
    name: "Yala → Mirissa",
    from: "Yala",
    to: "Mirissa",
    duration: "3.0 Hours",
    distance: "120 km",
    priceUSD: 60,
    priceLKR: 18500,
    popular: false,
    category: "Coastal",
    image: "/assets/yala-mirissa1.jpg",
    images: [
      "/assets/yala-mirissa1.jpg",
      "/assets/yala-mirissa2.jpg"
    ],
    description: "Drive along the southern coastal line connecting the wild animal reserves of Yala with the pristine golden beaches and turquoise ocean of Mirissa.",
    highlights: [
      "Southern expressway & scenic coastal road",
      "Coconut Tree Hill photo spot arrival",
      "Weligama Stilt Fishermen observation point",
      "Mirissa Beach resort drop"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "English-speaking Chauffeur",
      "Express Highway Tolls",
      "Chilled Water",
      "Direct Beach Resort Drop"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 6,
    name: "Mirissa → Galle",
    from: "Mirissa",
    to: "Galle",
    duration: "1.0 Hour",
    distance: "35 km",
    priceUSD: 25,
    priceLKR: 7500,
    popular: false,
    category: "Coastal",
    image: "/assets/mirissa-galle1.jpg",
    images: [
      "/assets/mirissa-galle1.jpg",
      "/assets/mirissa-galle2.jpg"
    ],
    description: "A short, scenic coastal drive passing tropical palm groves, surfing points, and coastal villages to the historic UNESCO World Heritage Galle Dutch Fort.",
    highlights: [
      "Galle Dutch Fort ramparts & lighthouse",
      "Weligama Bay surfing strip",
      "Unawatuna Beach coastal drive",
      "Colonial architecture streets"
    ],
    inclusions: [
      "Private Air-Conditioned Transfer",
      "Friendly Local Chauffeur",
      "Bottled Water",
      "Hotel or Fort Gate Drop"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 7,
    name: "Galle → Colombo",
    from: "Galle",
    to: "Colombo",
    duration: "2.0 Hours",
    distance: "125 km",
    priceUSD: 45,
    priceLKR: 14000,
    popular: false,
    category: "Coastal",
    image: "/assets/galle-colombo1.jpg",
    images: [
      "/assets/galle-colombo1.jpg",
      "/assets/galle-colombo2.jpg"
    ],
    description: "Smooth, rapid expressway transfer connecting historic Galle to Colombo city or Bandaranaike International Airport (CMB).",
    highlights: [
      "Southern Expressway fast transfer",
      "Bentota River bridge & coastal glimpses",
      "Colombo City skyline or Airport terminal direct drop",
      "Lotus Tower & Galle Face Green proximity"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "Experienced Expressway Chauffeur",
      "Southern Expressway Tolls Paid",
      "Chilled Mineral Water",
      "Airport or Hotel Drop-off"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 8,
    name: "Colombo → Sigiriya",
    from: "Colombo",
    to: "Sigiriya",
    duration: "4.0 Hours",
    distance: "175 km",
    priceUSD: 70,
    priceLKR: 21500,
    popular: true,
    category: "Cultural Triangle",
    image: "/assets/colombo-sigiri1.jpg",
    images: [
      "/assets/colombo-sigiri1.jpg",
      "/assets/colombo-sigiri2.jpg"
    ],
    description: "Head into the ancient Cultural Triangle to visit Sigiriya Rock Fortress, the 5th-century palace in the sky built by King Kashyapa.",
    highlights: [
      "UNESCO Sigiriya Lion Rock Fortress site",
      "Dambulla Cave Golden Temple complex",
      "Kurunegala Elephant rock vistas",
      "Village safari & lotus tank vistas"
    ],
    inclusions: [
      "Private Long-Distance Air-Conditioned Chauffeur",
      "Highway & Tolls Included",
      "Cold Towels & Refreshment Water",
      "Flexible Sightseeing Rest Stops",
      "Hotel Drop-off"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 9,
    name: "Sigiriya → Kandy",
    from: "Sigiriya",
    to: "Kandy",
    duration: "2.5 Hours",
    distance: "90 km",
    priceUSD: 45,
    priceLKR: 14000,
    popular: false,
    category: "Cultural Triangle",
    image: "/assets/sigiri-kandy1.jpg",
    images: [
      "/assets/sigiri-kandy1.jpg",
      "/assets/sigiri-kandy2.jpg"
    ],
    description: "Travel south from the ancient citadel of Sigiriya through spice gardens and the Dambulla cave complex into Kandy's mountain ring.",
    highlights: [
      "Dambulla Cave Temple UNESCO site stop",
      "Matale Herbal & Spice Gardens tour",
      "Nalanda Gedige ancient temple site",
      "Kandy valley panoramic entry"
    ],
    inclusions: [
      "Private AC Chauffeur Vehicle",
      "English-speaking Guide Chauffeur",
      "Spice Garden Tour Stop",
      "Mineral Water",
      "Hotel Delivery"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  },
  {
    id: 10,
    name: "Kandy → Ella",
    from: "Kandy",
    to: "Ella",
    duration: "4.5 Hours",
    distance: "135 km",
    priceUSD: 65,
    priceLKR: 20000,
    popular: false,
    category: "Hill Country",
    image: "/assets/kandy-ella1.jpg",
    images: [
      "/assets/kandy-ella1.jpg",
      "/assets/kandy-ella2.jpg"
    ],
    description: "The ultimate road trip across Sri Lanka's high mountain spine. Drive past tea plantations, pine forests, cascades, and dramatic gorges.",
    highlights: [
      "Panoramic views of Uva Province mountains",
      "Diyaluma Waterfalls viewpoint access",
      "Nuwara Eliya highland pass",
      "Ella Gap arrival point"
    ],
    inclusions: [
      "Private Air-Conditioned Vehicle",
      "Full Day Mountain Driving Specialist Chauffeur",
      "Luggage handling & safe storage",
      "Bottled Water",
      "Hotel or Villa Drop-off"
    ],
    vehicleTypes: ["Sedan", "SUV", "Van"]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Comfortable Travel",
    description: "Clean, air-conditioned executive sedans, SUVs, and luxury vans with ample space for luggage.",
    icon: "ShieldCheck"
  },
  {
    title: "Local Routes Expertise",
    description: "Experienced English-speaking chauffeurs who know every scenic shortcut, view, and mountain pass.",
    icon: "Compass"
  },
  {
    title: "Flexible Trips",
    description: "Pause for photos, tea tasting, or local meals whenever you wish without extra hidden charges.",
    icon: "Clock"
  },
  {
    title: "Personal Chauffeur Service",
    description: "Dedicated 24/7 support and friendly driver-guides committed to your safety and comfort.",
    icon: "UserCheck"
  }
];
