import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shop', href: '/shop' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Return Policy', href: '/return-policy' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-noir border-t border-white/10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-14">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl text-gold-gradient">
              Syeda Clothing
            </Link>
            <p className="text-beige/50 text-sm mt-4 max-w-xs leading-relaxed">
              Luxury women&rsquo;s fashion rooted in Pakistani craftsmanship, designed for the modern woman
              who values elegance without compromise.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-beige/70 hover:text-gold hover:border-gold/50 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-beige text-sm font-semibold tracking-wide mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-beige/50 text-sm hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-beige text-sm font-semibold tracking-wide mb-4">Newsletter</h4>
            <p className="text-beige/50 text-sm mb-3">Get style edits &amp; early access to new drops.</p>
            <a href="mailto:syedasidra2003@gmail.com" className="flex items-center gap-2 text-gold text-sm hover:underline">
              <Mail size={14} /> syedasidra2003@gmail.com
            </a>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-beige/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Syeda Clothing. All rights reserved.</p>
          <p>Crafted with love in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
