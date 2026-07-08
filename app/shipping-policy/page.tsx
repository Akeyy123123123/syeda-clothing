import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Shipping Policy' };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy">
      <p>We currently ship across Pakistan, with international shipping available on request.</p>
      <h3 className="text-beige text-lg font-display">Processing Time</h3>
      <p>Orders are processed within 1&ndash;2 business days.</p>
      <h3 className="text-beige text-lg font-display">Delivery Time</h3>
      <p>Standard delivery takes 3&ndash;7 business days depending on your city.</p>
      <h3 className="text-beige text-lg font-display">Shipping Charges</h3>
      <p>Free shipping on orders above Rs. 15,000. A flat fee of Rs. 350 applies to smaller orders.</p>
    </LegalPage>
  );
}
