
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container">
          <motion.article 
            className="prose prose-lg mx-auto max-w-4xl prose-headings:font-headline prose-headings:text-primary prose-h1:text-4xl prose-h1:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-foreground/80 prose-a:text-accent prose-a:transition-colors hover:prose-a:text-primary prose-ul:list-disc prose-ul:pl-6 prose-li:text-foreground/80"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants}>Terms of Service</motion.h1>
            <motion.p variants={itemVariants} className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</motion.p>

            <motion.p variants={itemVariants}>Please read these Terms of Service ("Terms") carefully before using the services offered by Evertrust Digital Bank ("Evertrust", "we", "us", "our"). By using our services, you agree to be bound by these Terms.</motion.p>

            <motion.h2 variants={itemVariants}>1. Acceptance of Terms</motion.h2>
            <motion.p variants={itemVariants}>By accessing or using our services in any manner, you agree to these Terms and all other operating rules, policies, and procedures that may be published from time to time on this site by us, each of which is incorporated by reference.</motion.p>
            
            <motion.h2 variants={itemVariants}>2. Use of Our Services</motion.h2>
            <motion.p variants={itemVariants}>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account.</motion.p>
            
            <motion.h2 variants={itemVariants}>3. User Accounts</motion.h2>
            <motion.p variants={itemVariants}>To use certain features of our services, you must register for an account. You must provide accurate and complete information and keep your account information updated. You are responsible for safeguarding your password and for any activities or actions under your password.</motion.p>

            <motion.h2 variants={itemVariants}>4. Prohibited Conduct</motion.h2>
            <motion.p variants={itemVariants}>You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system to access the service; (iii) transmitting spam or other unsolicited email; (iv) attempting to interfere with the system integrity or security.</motion.p>
            
            <motion.h2 variants={itemVariants}>5. Intellectual Property</motion.h2>
            <motion.p variants={itemVariants}>The service and its original content, features, and functionality are and will remain the exclusive property of Evertrust Digital Bank and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of Evertrust Digital Bank.</motion.p>

            <motion.h2 variants={itemVariants}>6. Termination</motion.h2>
            <motion.p variants={itemVariants}>We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</motion.p>

            <motion.h2 variants={itemVariants}>7. Disclaimer of Warranties</motion.h2>
            <motion.p variants={itemVariants}>Our services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</motion.p>

            <motion.h2 variants={itemVariants}>8. Limitation of Liability</motion.h2>
            <motion.p variants={itemVariants}>In no event shall Evertrust Digital Bank, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</motion.p>

            <motion.h2 variants={itemVariants}>9. Governing Law</motion.h2>
            <motion.p variants={itemVariants}>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</motion.p>
            
            <motion.h2 variants={itemVariants}>10. Contact Us</motion.h2>
            <motion.p variants={itemVariants}>If you have any questions about these Terms, please contact us at <a href="mailto:support@evertrust.bank">support@evertrust.bank</a>.</motion.p>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
