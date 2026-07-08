import { Product, Review } from './types';

const img = (label: string, w = 600, h = 800) =>
  `https://placehold.co/${w}x${h}/171512/c9a24b?text=${encodeURIComponent(label)}&font=playfair-display`;

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
    image: img(name, 700, 900),
    images: [img(name, 700, 900), img(name + ' 2', 700, 900), img(name + ' 3', 700, 900)],
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
