
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-4xl text-foreground">
            <h1 className="font-headline text-4xl font-bold text-primary">Privacy Policy</h1>
            <p className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>Evertrust Digital Bank ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.</p>

            <h2>1. Information We Collect</h2>
            <p>We may collect personal information from you in a variety of ways, including, but not limited to, when you open an account, apply for a loan, make transactions, or use our website and mobile app. The types of personal information we may collect include:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, address, email address, phone number, date of birth, Social Security number.</li>
              <li><strong>Financial Information:</strong> Bank account numbers, credit and debit card numbers, transaction history, credit history.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, operating system, and information about the device you use to access our services.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our services.</li>
              <li>Process your transactions and manage your accounts.</li>
              <li>Improve, personalize, and expand our services.</li>
              <li>Communicate with you, including for customer service and to provide you with updates and other information relating to the service.</li>
              <li>Detect and prevent fraud and enhance the security of our services.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>

            <h2>3. How We Share Your Information</h2>
            <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors and service providers that perform services for us or on our behalf.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

            <h2>5. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the contact information provided below.</p>
            
            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@evertrust.bank" className="text-primary hover:underline">support@evertrust.bank</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
