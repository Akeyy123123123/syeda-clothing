import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Return Policy' };

export default function ReturnPolicyPage() {
  return (
    <LegalPage title="Return Policy">
      <p>
        We want you to love every piece you order. If something isn&rsquo;t right, we offer a
        straightforward return process.
      </p>
      <h3 className="text-beige text-lg font-display">Return Window</h3>
      <p>Unworn, unwashed items with tags attached can be returned within 7 days of delivery.</p>
      <h3 className="text-beige text-lg font-display">Non-Returnable Items</h3>
      <p>Stitched formals, custom orders, and sale items marked &ldquo;Final Sale&rdquo; cannot be returned.</p>
      <h3 className="text-beige text-lg font-display">How to Initiate a Return</h3>
      <p>
        Email us at{' '}
        <a href="mailto:syedasidra2003@gmail.com" className="text-gold underline underline-offset-4">
          syedasidra2003@gmail.com
        </a>{' '}
        with your order number and reason for return.
      </p>
    </LegalPage>
  );
}
