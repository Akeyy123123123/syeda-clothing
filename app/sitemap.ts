import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://syedaclothing.com';
  const staticRoutes = [
    '', '/shop', '/about', '/contact', '/wishlist', '/cart', '/checkout',
    '/faq', '/privacy-policy', '/terms', '/return-policy', '/shipping-policy',
    '/account/login', '/account/register',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
