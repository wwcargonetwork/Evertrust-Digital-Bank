
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            <motion.h1 variants={itemVariants}>Privacy Policy</motion.h1>
            <motion.p variants={itemVariants} className="lead !text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</motion.p>
            
            <motion.p variants={itemVariants}>Global Trusera Holdings ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.</motion.p>

            <motion.h2 variants={itemVariants}>1. Information We Collect</motion.h2>
            <motion.p variants={itemVariants}>We may collect personal information from you in a variety of ways, including, but not limited to, when you open an account, apply for a loan, make transactions, or use our website and mobile app. The types of personal information we may collect include:</motion.p>
            <motion.ul variants={itemVariants} className="space-y-2">
              <motion.li variants={itemVariants}><strong>Personal Identification Information:</strong> Name, address, email address, phone number, date of birth, Social Security number.</motion.li>
              <motion.li variants={itemVariants}><strong>Financial Information:</strong> Bank account numbers, credit and debit card numbers, transaction history, credit history.</motion.li>
              <motion.li variants={itemVariants}><strong>Technical Information:</strong> IP address, browser type, operating system, and information about the device you use to access our services.</motion.li>
            </motion.ul>

            <motion.h2 variants={itemVariants}>2. How We Use Your Information</motion.h2>
            <motion.p variants={itemVariants}>We use the information we collect for various purposes, including to:</motion.p>
            <motion.ul variants={itemVariants} className="space-y-2">
              <motion.li variants={itemVariants}>Provide, operate, and maintain our services.</motion.li>
              <motion.li variants={itemVariants}>Process your transactions and manage your accounts.</motion.li>
              <motion.li variants={itemVariants}>Improve, personalize, and expand our services.</motion.li>
              <motion.li variants={itemVariants}>Communicate with you, including for customer service and to provide you with updates and other information relating to the service.</motion.li>
              <motion.li variants={itemVariants}>Detect and prevent fraud and enhance the security of our services.</motion.li>
              <motion.li variants={itemVariants}>Comply with legal and regulatory obligations.</motion.li>
            </motion.ul>

            <motion.h2 variants={itemVariants}>3. How We Share Your Information</motion.h2>
            <motion.p variants={itemVariants}>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with:</motion.p>
            <motion.ul variants={itemVariants} className="space-y-2">
              <motion.li variants={itemVariants}><strong>Service Providers:</strong> We may share your information with third-party vendors and service providers that perform services for us or on our behalf.</motion.li>
              <motion.li variants={itemVariants}><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</motion.li>
            </motion.ul>

            <motion.h2 variants={itemVariants}>4. Data Security</motion.h2>
            <motion.p variants={itemVariants}>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</motion.p>

            <motion.h2 variants={itemVariants}>5. Your Rights</motion.h2>
            <motion.p variants={itemVariants}>Depending on your jurisdiction, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the contact information provided below.</motion.p>
            
            <motion.h2 variants={itemVariants}>6. Changes to This Privacy Policy</motion.h2>
            <motion.p variants={itemVariants}>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</motion.p>
            
            <motion.h2 variants={itemVariants}>7. Contact Us</motion.h2>
            <motion.p variants={itemVariants}>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@globaltruseraholdings.com">info@globaltruseraholdings.com</a>.</motion.p>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
