import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
      <p className="font-display text-gold text-8xl mb-4">404</p>
      <h1 className="font-display text-3xl text-beige mb-4">This Page Has Left the Runway</h1>
      <p className="text-beige/50 mb-8 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link href="/" className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase">
        Back to Home
      </Link>
    </div>
  );
}
