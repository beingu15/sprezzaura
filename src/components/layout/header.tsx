'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Do not show header on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname?.startsWith(href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground">
             <Link href="/contact">Get a Quote</Link>
           </Button>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col h-full p-6">
                  <div className="mb-8">
                     <Logo />
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-lg font-medium text-foreground hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
