import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Syeda Clothing (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
        information we collect when you shop with us and how it is used.
      </p>
      <h3 className="text-beige text-lg font-display">Information We Collect</h3>
      <p>
        We collect the details you provide at checkout &mdash; name, email, phone number, and shipping
        address &mdash; solely to process and deliver your order.
      </p>
      <h3 className="text-beige text-lg font-display">How We Use Your Information</h3>
      <p>
        Your information is used to fulfill orders, respond to enquiries, and, if you opt in, send
        newsletter updates about new collections and offers. We never sell your data to third parties.
      </p>
      <h3 className="text-beige text-lg font-display">Contact</h3>
      <p>
        For any privacy-related questions, reach out to us at{' '}
        <a href="mailto:syedasidra2003@gmail.com" className="text-gold underline underline-offset-4">
          syedasidra2003@gmail.com
        </a>.
      </p>
    </LegalPage>
  );
}
