
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <article className="prose prose-lg mx-auto max-w-4xl text-foreground prose-h1:font-headline prose-h1:text-4xl prose-h1:font-bold prose-h1:text-primary prose-a:text-primary hover:prose-a:underline">
            <h1>Cookie Policy</h1>
            <p className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>This Cookie Policy explains what cookies are and how Evertrust Digital Bank ("we," "our," or "us") uses them on our website and mobile application. We encourage you to read this policy in full so that you can understand what information we collect using cookies and how that information is used.</p>

            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
              <li><strong>Performance and Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
              <li><strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
            </ul>
            
            <h2>3. Your Choices Regarding Cookies</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.</p>
            <p>You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>

            <h2>4. Changes to This Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

            <h2>5. Contact Us</h2>
            <p>If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:support@evertrust.bank">support@evertrust.bank</a>.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
