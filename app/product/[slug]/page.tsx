import { notFound } from 'next/navigation';
import { getProductBySlug, getRelated } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelated(product);

  return <ProductDetailClient product={product} related={related} />;
}
