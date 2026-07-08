import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import InstagramGallery from '@/components/InstagramGallery';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />

      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir-soft">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Our Heritage</p>
          <h2 className="font-display text-3xl sm:text-5xl text-beige mb-6">
            Where Craftsmanship Meets Couture
          </h2>
          <p className="text-beige/60 leading-relaxed max-w-2xl mx-auto mb-8">
            Syeda Clothing was born from a devotion to Pakistani textile artistry &mdash; every lawn print,
            every hand-finished embroidery, every silhouette is designed to make the modern woman feel
            seen, celebrated, and quietly powerful.
          </p>
          <Link
            href="/about"
            className="btn-outline-gold inline-block px-8 py-3.5 rounded-full text-xs tracking-widest uppercase"
          >
            Our Story
          </Link>
        </div>
      </section>

      <Reviews />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}
