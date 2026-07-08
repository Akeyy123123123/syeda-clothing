import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://syedaclothing.com'),
  title: {
    default: 'Syeda Clothing | Luxury Women\u2019s Fashion',
    template: '%s | Syeda Clothing',
  },
  description:
    'Syeda Clothing is a premium Pakistani women\u2019s fashion house offering lawn, pret, formals, abayas, and couture. Shop luxury fashion in PKR with nationwide delivery.',
  keywords: ['Syeda Clothing', 'Pakistani fashion', 'luxury women clothing', 'lawn collection', 'abayas', 'formal wear Pakistan'],
  openGraph: {
    title: 'Syeda Clothing | Luxury Women\u2019s Fashion',
    description: 'Premium Pakistani women\u2019s fashion \u2014 lawn, pret, formals, abayas & couture.',
    siteName: 'Syeda Clothing',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-body bg-noir text-beige antialiased">
        <Providers>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
