import { Product, Review } from './types';

const img = (label: string, w = 600, h = 800) =>
  `https://placehold.co/${w}x${h}/171512/c9a24b?text=${encodeURIComponent(label)}&font=playfair-display`;
const productImages = [
  "/images/03128a450f7513e4201190c55b4f6b3b.jpg",
  "/images/0873993090d1d84b327978e5bcd7910b.jpg",
  "/images/0ba1ec382dc3b41464cb2c819dc7a16f.jpg",
  "/images/0d78c4dc58fe5c6ece5d4e87f08b7729.jpg",
  "/images/13fc67d630058a29fe2faaddfb7b4079.jpg",
  "/images/21347ac2416fa863ae7c5b1e18178905.jpg",
  "/images/28d25e8aea79c70d6b2a30df12ca7293.jpg",
  "/images/3830978dc02025894e3b9cf226b19341.jpg",
  "/images/497a6c1d60428e28e140a748ce5ff328.jpg",
  "/images/69f49c9ecc0dc02959214b0b07532a66.jpg",
  "/images/7d550944c60295f271129ab695bdd89b.jpg",
  "/images/IMG-20251227-WA0022.jpg",
  "/images/IMG_20260708_235330.jpg",
  "/images/IMG_20260708_235353.jpg",
  "/images/cce8b5c6a719b0c1c9048d9d2607ab7c.jpg",
  "/images/cd1178f0ca5e2b41e180d7db74b4ff99.jpg",
  "/images/d0a5fa545875fff3834430d646b4b26a.jpg",
  "/images/dec3e3000265e46cb12ca9b4dc3679cb.jpg",
];

export const categories = [
  { name: 'Lawn Collection', slug: 'lawn-collection', tagline: 'Breathable elegance for every day', image: img('Lawn Collection', 800, 1000) },
  { name: 'Pret Wear', slug: 'pret-wear', tagline: 'Ready-to-wear refinement', image: img('Pret Wear', 800, 1000) },
  { name: 'Luxury Formals', slug: 'luxury-formals', tagline: 'Statement pieces for grand occasions', image: img('Luxury Formals', 800, 1000) },
  { name: 'Abayas', slug: 'abayas', tagline: 'Modest silhouettes, timeless grace', image: img('Abayas', 800, 1000) },
  { name: 'Casual Wear', slug: 'casual-wear', tagline: 'Effortless everyday luxury', image: img('Casual Wear', 800, 1000) },
  { name: 'Party Wear', slug: 'party-wear', tagline: 'Dazzling looks for the night', image: img('Party Wear', 800, 1000) },
  { name: 'Eid Collection', slug: 'eid-collection', tagline: 'Celebration dressed in gold', image: img('Eid Collection', 800, 1000) },
  { name: 'Summer Collection', slug: 'summer-collection', tagline: 'Light fabrics, radiant hues', image: img('Summer Collection', 800, 1000) },
  { name: 'Winter Collection', slug: 'winter-collection', tagline: 'Rich textures for cooler days', image: img('Winter Collection', 800, 1000) },
];

const names = [
  'Zarqash Embroidered Lawn Suit', 'Anaya Silk Pret Set', 'Mahira Chikankari Formal', 'Noorani Abaya Kaftan',
  'Sable Cotton Casual Kurta', 'Elham Sequined Party Gown', 'Farah Eid Gharara Set', 'Laiba Linen Summer Shirt',
  'Rania Velvet Winter Shawl Set', 'Zoya Organza Formal Gown', 'Meherma Printed Lawn 3pc', 'Alvina Net Party Maxi',
  'Sana Digital Print Pret', 'Khadija Chiffon Abaya', 'Iman Jacquard Winter Coord', 'Dur-e-Shahwar Bridal Formal',
  'Nashwa Cambric Casual Set', 'Ayesha Raw Silk Eid Suit',
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const products: Product[] = names.map((name, i) => {
  const category = categories[i % categories.length];
  const base = 4500 + Math.round(seededRandom(i + 1) * 12000);
  const hasDiscount = i % 3 === 0;
  const price = hasDiscount ? Math.round(base * 0.78) : base;
  return {
    id: `p${i + 1}`,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    category: category.name,
    price,
    oldPrice: hasDiscount ? base : undefined,
    rating: Math.round((3.5 + seededRandom(i * 3 + 2) * 1.5) * 10) / 10,
    reviewsCount: 8 + Math.floor(seededRandom(i * 5 + 1) * 220),
    image: productImages[i],
images: [productImages[i]],
    colors: ['#0a0a0a', '#c9a24b', '#e8e1d3', '#7a1f2b'].slice(0, 2 + (i % 3)),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: i % 7 !== 0,
    isNew: i % 4 === 0,
    description:
      `The ${name} is crafted from the finest fabrics, blending traditional Pakistani artistry with contemporary silhouettes. Each piece is finished by hand, designed for the woman who wears her heritage with quiet confidence.`,
    fabric: ['Pure Lawn', 'Silk Blend', 'Chiffon', 'Velvet', 'Organza', 'Linen', 'Cambric', 'Raw Silk'][i % 8],
  };
});

export const reviews: Review[] = [
  { id: 'r1', name: 'Ayesha Khan', avatar: img('AK', 100, 100), rating: 5, comment: 'The fabric quality is beyond anything I\u2019ve bought locally. Syeda Clothing feels like a true luxury house.', date: 'June 2026' },
  { id: 'r2', name: 'Sana Malik', avatar: img('SM', 100, 100), rating: 5, comment: 'My Eid gharara arrived beautifully packaged and fit perfectly. Worth every rupee.', date: 'May 2026' },
  { id: 'r3', name: 'Hira Baig', avatar: img('HB', 100, 100), rating: 4, comment: 'Gorgeous embroidery, delivery took a little longer than expected but the quality made up for it.', date: 'April 2026' },
  { id: 'r4', name: 'Mehak Raza', avatar: img('MR', 100, 100), rating: 5, comment: 'I have ordered four times now. Consistent quality and the customer service is lovely.', date: 'March 2026' },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4) {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}
