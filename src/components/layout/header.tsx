
"use client"

import * as React from "react"
import Link from "next/link"
import { Landmark, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/deposits", label: "Deposits" },
  { href: "/credits", label: "Credits" },
  { href: "/cards", label: "Cards" },
  { href: "/investments", label: "Investments" },
  { href: "/loans", label: "Loans" },
  { href: "/insurance", label: "Insurance" },
]

const bankingLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Personal Banking",
    href: "/banking/personal",
    description: "Accounts, cards, and loans tailored for your personal financial needs.",
  },
  {
    title: "Corporate Banking",
    href: "/banking/corporate",
    description: "Advanced financial solutions for your business, from payroll to investments.",
  },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Evertrust
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {navLinks.map(link => (
                    <NavigationMenuItem key={link.label}>
                      <Link href={link.href} legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {link.label}
                          </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Banking</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {bankingLinks.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost">Sign In</Button>
            <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Sign Up</Button>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Landmark className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline sm:inline-block">
                  Evertrust
                </span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navLinks.map(link => (
                    <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors duration-200">
                        {link.label}
                    </Link>
                ))}
                <h4 className="font-semibold pt-2">Banking</h4>
                {bankingLinks.map(link => (
                     <Link key={link.title} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors duration-200 pl-4">
                        {link.title}
                    </Link>
                ))}
              </div>
               <div className="flex flex-col space-y-2 mt-6 pt-6 border-t">
                <Button variant="ghost">Sign In</Button>
                <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Sign Up</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
