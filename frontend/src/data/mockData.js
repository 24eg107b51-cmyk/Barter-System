// Mock Data for CampusSwap

export const CURRENT_USER = {
  id: 'usr_me',
  name: 'Alex Chen',
  college: 'UC Berkeley',
  email: 'alex.chen@berkeley.edu',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
  memberSince: 'August 2024',
  activeListingsCount: 3,
  completedTransactionsCount: 14,
  campusLocation: 'Unit 2 Residence Halls, Rm 412',
  bio: 'Junior studying CS & Economics. Big fan of thrifting, clean desks, and helping fellow Bears save money.'
};

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'textbooks', name: 'Textbooks & Notes', icon: 'BookOpen' },
  { id: 'electronics', name: 'Electronics & Tech', icon: 'Laptop' },
  { id: 'dorm', name: 'Dorm & Living', icon: 'Home' },
  { id: 'lab', name: 'Lab Gear & Stationery', icon: 'FlaskConical' },
  { id: 'sports', name: 'Bikes & Sports', icon: 'Bike' },
  { id: 'clothing', name: 'Campus Merch & Clothes', icon: 'Shirt' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    title: 'Campbell Biology (12th Edition) + Study Guide',
    description: 'Clean hardcover copy used for BIO 1A. Minimal highlighting in chapters 1-4, rest is completely clean. Includes unused online access card and companion summary sheets.',
    category: 'textbooks',
    condition: 'Like New',
    transactionType: 'exchange',
    exchangeFor: 'Organic Chemistry as a Second Language or Chem 1A lab notebook',
    price: null,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_sarah',
      name: 'Sarah Miller',
      college: 'UC Berkeley (Pre-Med)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      tradesCount: 18
    },
    location: 'Moffitt Library 3rd Floor / Valley Life Sciences',
    createdAt: '2026-10-10T09:30:00Z',
    status: 'available',
    isFeatured: true,
    views: 89
  },
  {
    id: 'prod_2',
    title: 'Sony WH-1000XM4 Noise Canceling Headphones',
    description: 'Perfect for cramming in noisy libraries or roommate study sessions. 30hr battery life, pristine audio, includes original hard travel case and 3.5mm cable. Clean earcups.',
    category: 'electronics',
    condition: 'Good',
    transactionType: 'rent',
    price: null,
    rentalRate: 4,
    rentalPeriod: 'Available for finals week (up to 14 days max)',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_marcus',
      name: 'Marcus Vance',
      college: 'UC Berkeley (Engineering)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 5.0,
      tradesCount: 22
    },
    location: 'Hearst Memorial Mining Bldg',
    createdAt: '2026-10-11T14:15:00Z',
    status: 'available',
    isFeatured: true,
    views: 142
  },
  {
    id: 'prod_3',
    title: 'White Cotton Lab Coat (Size M) + ANSI Safety Goggles',
    description: 'Graduating this semester, giving away my official chemistry department 100% heavy cotton lab coat and splash-proof goggles. Washed and sanitized, ready for Chem 1AL or Chem 3AL.',
    category: 'lab',
    condition: 'Good',
    transactionType: 'free',
    price: 0,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_priya',
      name: 'Priya Sharma',
      college: 'UC Berkeley (ChemE)',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.8,
      tradesCount: 9
    },
    location: 'Latimer Hall Plaza',
    createdAt: '2026-10-12T11:00:00Z',
    status: 'available',
    isFeatured: true,
    views: 210
  },
  {
    id: 'prod_4',
    title: 'TI-84 Plus CE Color Graphing Calculator (Mint)',
    description: 'Rechargeable color screen calculator with Python support. Comes with USB charging wire and protective slide case. Battery holds charge for weeks.',
    category: 'electronics',
    condition: 'Like New',
    transactionType: 'sale',
    price: 65,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_me',
      name: 'Alex Chen (You)',
      college: 'UC Berkeley',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      tradesCount: 14
    },
    location: 'Unit 2 Residence Halls courtyard',
    createdAt: '2026-10-09T18:20:00Z',
    status: 'available',
    isFeatured: false,
    views: 64
  },
  {
    id: 'prod_5',
    title: 'Single-Speed Commuter Road Bike (54cm Frame)',
    description: 'Super reliable campus cruiser. Flat-resistant tires, front brake, rear flip-flop hub. Ideal for riding up Telegraph Ave and getting between North and South campus swiftly.',
    category: 'sports',
    condition: 'Good',
    transactionType: 'sale',
    price: 90,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_jordan',
      name: 'Jordan Lee',
      college: 'UC Berkeley (Architecture)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.7,
      tradesCount: 11
    },
    location: 'Wurster Hall Bike Racks',
    createdAt: '2026-10-08T15:45:00Z',
    status: 'available',
    isFeatured: false,
    views: 180
  },
  {
    id: 'prod_6',
    title: 'Anker Compact Dorm Desk Lamp with Wireless Qi Charger',
    description: '3 color temperatures, dimmable LED eye-care lamp. The base is an inductive fast wireless phone charger, keeps study tables wire-free.',
    category: 'dorm',
    condition: 'Like New',
    transactionType: 'exchange',
    exchangeFor: 'Desk fan, extension surge protector, or HDMI monitor cable',
    price: null,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_emily',
      name: 'Emily Zhao',
      college: 'UC Berkeley (Design)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 5.0,
      tradesCount: 7
    },
    location: 'Unit 1 Putnam Hall lobby',
    createdAt: '2026-10-12T08:10:00Z',
    status: 'available',
    isFeatured: true,
    views: 95
  },
  {
    id: 'prod_7',
    title: 'Essential Calculus: Early Transcendentals (Stewart)',
    description: 'Giving this away to any freshman taking Math 1A/1B! Spine is solid, cover has light wear but all pages are legible without missing exercises.',
    category: 'textbooks',
    condition: 'Fair',
    transactionType: 'free',
    price: 0,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_kevin',
      name: 'Kevin Wu',
      college: 'UC Berkeley (Math)',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      tradesCount: 15
    },
    location: 'Evans Hall 2nd Floor breezeway',
    createdAt: '2026-10-11T12:00:00Z',
    status: 'available',
    isFeatured: false,
    views: 133
  },
  {
    id: 'prod_8',
    title: 'Mini Dorm Projector 1080p with Tripod & HDMI',
    description: 'Great for weekend movie nights or projecting presentations in dorm common rooms. Connects to laptops, Nintendo Switch, or Chromecast. Rent by the day or weekend.',
    category: 'electronics',
    condition: 'Like New',
    transactionType: 'rent',
    price: null,
    rentalRate: 6,
    rentalPeriod: '1 to 5 days rental. Refundable student ID deposit.',
    images: [
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_me',
      name: 'Alex Chen (You)',
      college: 'UC Berkeley',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      tradesCount: 14
    },
    location: 'Unit 2 Residence Halls',
    createdAt: '2026-10-07T10:00:00Z',
    status: 'available',
    isFeatured: false,
    views: 112
  },
  {
    id: 'prod_9',
    title: 'Vintage Cal Berkeley Golden Bears Crewneck (Size L)',
    description: 'Thrifted heavyweight cotton navy crewneck sweater with classic gold embroidery. Super comfy, oversized aesthetic. Selling because I have too many sweaters.',
    category: 'clothing',
    condition: 'Good',
    transactionType: 'sale',
    price: 28,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_chloe',
      name: 'Chloe Davis',
      college: 'UC Berkeley (Letters & Sci)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 5.0,
      tradesCount: 26
    },
    location: 'MLK Student Union Steps',
    createdAt: '2026-10-12T16:30:00Z',
    status: 'available',
    isFeatured: false,
    views: 78
  },
  {
    id: 'prod_10',
    title: 'Keurig K-Mini Single Serve Coffee Maker',
    description: 'Only 5 inches wide, ideal for cramped dorm counters. Makes 6-12 oz cups in under 90 seconds. Barely used this semester.',
    category: 'dorm',
    condition: 'Like New',
    transactionType: 'exchange',
    exchangeFor: 'Electric kettle, Brita water pitcher, or French press',
    price: null,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_daniel',
      name: 'Daniel Kim',
      college: 'UC Berkeley (EECS)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.8,
      tradesCount: 16
    },
    location: 'Soda Hall 4th Floor Lounge',
    createdAt: '2026-10-10T19:00:00Z',
    status: 'available',
    isFeatured: true,
    views: 99
  },
  {
    id: 'prod_11',
    title: 'Adjustable Heavy-Duty Ironing Board + Steam Iron',
    description: 'Free to whoever needs it for dorm move-in or business fraternity interviews. Both work perfectly.',
    category: 'dorm',
    condition: 'Good',
    transactionType: 'free',
    price: 0,
    rentalRate: null,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_sam',
      name: 'Samantha Roy',
      college: 'UC Berkeley (Haas)',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      tradesCount: 8
    },
    location: 'Haas Courtyard',
    createdAt: '2026-10-11T07:45:00Z',
    status: 'available',
    isFeatured: false,
    views: 82
  },
  {
    id: 'prod_12',
    title: 'DeWalt 20V Cordless Power Drill & Bit Set',
    description: 'Perfect for lofting dorm beds, assembling IKEA furniture, or engineering design projects. Includes 2 lithium batteries and high-torque drill bits.',
    category: 'electronics',
    condition: 'Like New',
    transactionType: 'rent',
    price: null,
    rentalRate: 5,
    rentalPeriod: '1 to 3 days rental. Great for weekend dorm setup.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'usr_jordan',
      name: 'Jordan Lee',
      college: 'UC Berkeley (Architecture)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      verifiedStudent: true,
      rating: 4.7,
      tradesCount: 11
    },
    location: 'Wurster Hall Wood Shop',
    createdAt: '2026-10-09T13:10:00Z',
    status: 'available',
    isFeatured: true,
    views: 118
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req_1',
    listingId: 'prod_4',
    listingTitle: 'TI-84 Plus CE Color Graphing Calculator (Mint)',
    listingImage: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=400&q=80',
    type: 'sale',
    direction: 'incoming', // someone requesting from current user
    user: {
      id: 'usr_sarah',
      name: 'Sarah Miller',
      college: 'UC Berkeley (Pre-Med)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    },
    priceOffer: 60,
    requestedDates: null,
    exchangeOffer: null,
    message: 'Hey Alex! Would you be willing to do $60? I can meet at Unit 2 courtyard today at 4 PM right after my chem lecture.',
    status: 'pending',
    createdAt: '2026-10-12T15:20:00Z',
  },
  {
    id: 'req_2',
    listingId: 'prod_8',
    listingTitle: 'Mini Dorm Projector 1080p with Tripod & HDMI',
    listingImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
    type: 'rent',
    direction: 'incoming',
    user: {
      id: 'usr_daniel',
      name: 'Daniel Kim',
      college: 'UC Berkeley (EECS)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
    },
    priceOffer: 12,
    requestedDates: 'Oct 17 - Oct 19 (2 days)',
    exchangeOffer: null,
    message: 'Need this for our dorm hall Super Smash Bros tournament Friday night! Can pick it up directly from your hall.',
    status: 'accepted',
    createdAt: '2026-10-11T18:00:00Z',
  },
  {
    id: 'req_3',
    listingId: 'prod_1',
    listingTitle: 'Campbell Biology (12th Edition) + Study Guide',
    listingImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    type: 'exchange',
    direction: 'sent', // current user requested from Sarah
    user: {
      id: 'usr_sarah',
      name: 'Sarah Miller',
      college: 'UC Berkeley (Pre-Med)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    },
    priceOffer: null,
    requestedDates: null,
    exchangeOffer: 'Offering: Chem 1A Laboratory Notebook + unopened molecular model kit',
    message: 'Hi Sarah, I saw you were looking for Chem 1A materials. I have the official lab manual and model set in mint condition!',
    status: 'pending',
    createdAt: '2026-10-12T13:40:00Z',
  },
  {
    id: 'req_4',
    listingId: 'prod_3',
    listingTitle: 'White Cotton Lab Coat (Size M) + ANSI Safety Goggles',
    listingImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    type: 'free',
    direction: 'sent', // current user requested free item from Priya
    user: {
      id: 'usr_priya',
      name: 'Priya Sharma',
      college: 'UC Berkeley (ChemE)',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    },
    priceOffer: 0,
    requestedDates: null,
    exchangeOffer: null,
    message: 'Hello Priya! I start organic chem lab next Tuesday and this would save me so much bookstore hassle. Can meet at Latimer anytime!',
    status: 'completed',
    createdAt: '2026-10-10T16:00:00Z',
  }
];
