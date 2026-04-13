export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
  sizes?: string[];
  colors?: string[];
  createdAt: number;
}

export const categories = [
  'Shoes',
  'Jerseys',
  'Gym Wear',
  'Accessories',
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Performance Running Shoes',
    price: 45000,
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for speed and comfort on any terrain.',
    category: 'Shoes',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    ],
    isAvailable: true,
    isFeatured: true,
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black', 'White', 'Red'],
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Elite Training Jersey',
    price: 15000,
    description: 'Moisture-wicking jersey with ergonomic fit. Perfect for intense training sessions and matches.',
    category: 'Jerseys',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    isAvailable: true,
    isFeatured: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Green'],
    createdAt: Date.now(),
  },
  {
    id: '3',
    name: 'Pro Basketball Sneakers',
    price: 55000,
    description: 'High-performance basketball shoes with superior ankle support and responsive cushioning for explosive movements.',
    category: 'Shoes',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    ],
    isAvailable: true,
    isFeatured: true,
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['White', 'Black/Red'],
    createdAt: Date.now(),
  },
  {
    id: '4',
    name: 'Compression Gym Shorts',
    price: 12000,
    description: 'Premium compression shorts with moisture management technology. Ideal for training and recovery.',
    category: 'Gym Wear',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    createdAt: Date.now(),
  },
  {
    id: '5',
    name: 'Performance Gym Tank',
    price: 8500,
    description: 'Breathable tank top with anti-odor technology. Lightweight and perfect for high-intensity workouts.',
    category: 'Gym Wear',
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    createdAt: Date.now(),
  },
  {
    id: '6',
    name: 'Sport Duffle Bag',
    price: 18000,
    description: 'Spacious duffle bag with multiple compartments. Water-resistant material and padded shoulder straps.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
    createdAt: Date.now(),
  },
  {
    id: '7',
    name: 'Football Training Jersey',
    price: 16500,
    description: 'Professional-grade football jersey with advanced ventilation system and ergonomic fit.',
    category: 'Jerseys',
    images: [
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'White'],
    createdAt: Date.now(),
  },
  {
    id: '8',
    name: 'Training Sneakers',
    price: 38000,
    description: 'Versatile training shoes designed for gym workouts and cross-training. Maximum stability and grip.',
    category: 'Shoes',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Black', 'White', 'Grey'],
    createdAt: Date.now(),
  },
  {
    id: '9',
    name: 'Sports Water Bottle',
    price: 4500,
    description: 'Insulated stainless steel water bottle. Keeps drinks cold for 24 hours. BPA-free and leak-proof.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['750ml'],
    colors: ['Black', 'Silver', 'Blue'],
    createdAt: Date.now(),
  },
  {
    id: '10',
    name: 'Athletic Joggers',
    price: 19500,
    description: 'Premium joggers with tapered fit and zippered pockets. Perfect for training and casual wear.',
    category: 'Gym Wear',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    ],
    isAvailable: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    createdAt: Date.now(),
  },
  {
    id: '11',
    name: 'Wireless Sport Earbuds',
    price: 25000,
    description: 'Sweat-resistant wireless earbuds with secure fit and premium sound quality. Perfect for workouts.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['One Size'],
    colors: ['Black', 'White'],
    createdAt: Date.now(),
  },
  {
    id: '12',
    name: 'Running Shorts',
    price: 9500,
    description: 'Lightweight running shorts with built-in liner and reflective details for visibility.',
    category: 'Gym Wear',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    ],
    isAvailable: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    createdAt: Date.now(),
  },
];

export interface Settings {
  whatsappNumber: string;
}

export const defaultSettings: Settings = {
  whatsappNumber: '+2348012345678',
};
