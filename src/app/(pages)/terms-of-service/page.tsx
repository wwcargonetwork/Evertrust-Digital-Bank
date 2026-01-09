
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-4xl text-foreground">
            <h1 className="font-headline text-4xl font-bold text-primary">Terms of Service</h1>
            <p className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Please read these Terms of Service ("Terms") carefully before using the services offered by Evertrust Digital Bank ("Evertrust", "we", "us", "our"). By using our services, you agree to be bound by these Terms.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using our services in any manner, you agree to these Terms and all other operating rules, policies, and procedures that may be published from time to time on this site by us, each of which is incorporated by reference.</p>
            
            <h2>2. Use of Our Services</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account.</p>
            
            <h2>3. User Accounts</h2>
            <p>To use certain features of our services, you must register for an account. You must provide accurate and complete information and keep your account information updated. You are responsible for safeguarding your password and for any activities or actions under your password.</p>

            <h2>4. Prohibited Conduct</h2>
            <p>You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system to access the service; (iii) transmitting spam or other unsolicited email; (iv) attempting to interfere with the system integrity or security.</p>
            
            <h2>5. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of Evertrust Digital Bank and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of Evertrust Digital Bank.</p>

            <h2>6. Termination</h2>
            <p>We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2>7. Disclaimer of Warranties</h2>
            <p>Our services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

            <h2>8. Limitation of Liability</h2>
            <p>In no event shall Evertrust Digital Bank, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

            <h2>9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>
            
            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@evertrust.bank" className="text-primary hover:underline">support@evertrust.bank</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
