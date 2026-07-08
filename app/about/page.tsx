import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind Syeda Clothing, a premium Pakistani women\u2019s fashion house.',
};

const img = (label: string) => `https://placehold.co/1000x1200/171512/c9a24b?text=${encodeURIComponent(label)}&font=playfair-display`;

const values = [
  { title: 'Heritage Craftsmanship', desc: 'Every embroidery, weave, and print pays tribute to generations of Pakistani textile artistry.' },
  { title: 'Uncompromising Quality', desc: 'We source only premium lawn, silk, chiffon, and velvet, finished by hand in small batches.' },
  { title: 'Modern Femininity', desc: 'Silhouettes designed for the woman who is rooted in tradition yet unmistakably contemporary.' },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center mb-20">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Our Story</p>
        <h1 className="font-display text-4xl sm:text-6xl text-beige mb-6">
          Dressing the Modern Pakistani Woman in Timeless Luxury
        </h1>
        <p className="text-beige/60 leading-relaxed max-w-2xl mx-auto">
          Syeda Clothing began with a simple belief: that every woman deserves to feel like the most
          elegant version of herself, in fabric that honours where she comes from. What started as a
          small atelier has grown into a destination for women who want couture-level craftsmanship
          without leaving Pakistan.
        </p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center mb-24">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
          <Image src={img('Syeda Atelier')} alt="Syeda Clothing atelier" fill className="object-cover" sizes="50vw" />
        </div>
        <div>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">The Atelier</p>
          <h2 className="font-display text-3xl sm:text-4xl text-beige mb-5">Where Every Thread Has Purpose</h2>
          <p className="text-beige/60 leading-relaxed mb-4">
            Our design studio in Pakistan works closely with master embroiderers, hand-block printers,
            and weavers to bring each collection to life. From the first sketch to the final stitch, no
            detail is left to chance.
          </p>
          <p className="text-beige/60 leading-relaxed">
            We create nine signature collections a year &mdash; Lawn, Pret, Luxury Formals, Abayas, Casual,
            Party Wear, Eid, Summer, and Winter &mdash; each one designed around how our women actually live,
            celebrate, and dress.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl text-gold mb-3">{v.title}</h3>
            <p className="text-beige/60 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
