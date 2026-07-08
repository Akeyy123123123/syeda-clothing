export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">{title}</h1>
      <div className="prose-invert space-y-6 text-beige/60 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
