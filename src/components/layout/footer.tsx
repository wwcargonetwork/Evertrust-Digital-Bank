import Link from "next/link";
import { Landmark } from "lucide-react";

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

const footerLinks = [
    { title: "Company", links: [{name: "About Us", href:"#"}, {name: "Careers", href:"#"}, {name: "Press", href:"#"}] },
    { title: "Services", links: [{name: "Personal Banking", href:"/banking/personal"}, {name: "Corporate Banking", href:"/banking/corporate"}, {name: "Investments", href:"/investments"}, {name: "Loans", href:"/loans"}] },
    { title: "Legal", links: [{name: "Privacy Policy", href:"#"}, {name: "Terms of Service", href:"#"}, {name: "Cookie Policy", href:"#"}] },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Landmark className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline text-primary">
                Evertrust
                </span>
            </Link>
            <p className="max-w-xs text-muted-foreground">Your trusted partner in digital banking. Secure, innovative, and customer-focused.</p>
             <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map(section => (
            <div key={section.title}>
                <h3 className="font-headline font-semibold text-primary">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                    {section.links.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Evertrust Digital Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
    const iconProps = {
        className: "h-6 w-6"
    };
    switch (name.toLowerCase()) {
        case 'facebook':
            return <svg {...iconProps} role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.14 9.5 5.32v2.14H6v4.44h3.5v12h4.44V11.9h3.81l.42-4.44z"/></svg>;
        case 'twitter':
            return <svg {...iconProps} role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.923 4.923 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.49 14.307-14.305 0-.218 0-.435-.015-.65A10.465 10.465 0 0024 4.555z"/></svg>;
        case 'linkedin':
            return <svg {...iconProps} role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
        case 'instagram':
            return <svg {...iconProps} role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.305-1.459.717-2.126 1.384S.935 3.356.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.783.718 1.458 1.384 2.126.667.666 1.342 1.078 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.783-.306 1.458-.718 2.126-1.384.666-.667 1.078-1.342 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.784-.718-1.459-1.384-2.126C21.314.935 20.64.523 19.86.22c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227a3.48 3.48 0 01-.899 1.382 3.473 3.473 0 01-1.381.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.06-1.816-.249-2.236-.413a3.481 3.481 0 01-1.381-.899 3.481 3.481 0 01-.899-1.382c-.165-.42-.359-1.058-.42-2.235-.045-1.26-.061-1.649-.061-4.854 0-3.193.016-3.584.061-4.849.051-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.165 1.061-.36 2.23-.413 1.275-.057 1.65-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>;
        default:
            return null;
    }
}
