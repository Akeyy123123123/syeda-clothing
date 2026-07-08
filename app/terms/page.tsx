import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        By accessing and shopping on Syeda Clothing, you agree to the following terms.
      </p>
      <h3 className="text-beige text-lg font-display">Orders &amp; Pricing</h3>
      <p>
        All prices are listed in Pakistani Rupees (PKR) and are subject to change without prior notice.
        We reserve the right to cancel any order due to stock unavailability or pricing errors.
      </p>
      <h3 className="text-beige text-lg font-display">Intellectual Property</h3>
      <p>
        All designs, photography, and content on this site are the property of Syeda Clothing and may
        not be reproduced without permission.
      </p>
      <h3 className="text-beige text-lg font-display">Governing Law</h3>
      <p>These terms are governed by the laws of Pakistan.</p>
    </LegalPage>
  );
}
