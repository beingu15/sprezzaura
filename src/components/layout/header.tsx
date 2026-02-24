
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { services } from '@/lib/data';

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Do not show header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => {
            if (label === 'Services') {
              return (
                <div
                  key={href}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="relative"
                >
                  <DropdownMenu open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none py-2',
                          pathname?.startsWith(href) ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {label} <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-56"
                      onMouseEnter={() => setIsServicesOpen(true)}
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/services" className="w-full cursor-pointer font-semibold">
                          All Services
                        </Link>
                      </DropdownMenuItem>
                      {services.map((service) => (
                        <DropdownMenuItem key={service.slug} asChild>
                          <Link href={`/services/${service.slug}`} className="w-full cursor-pointer">
                            {service.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild>
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
                      <div key={href} className="flex flex-col gap-4">
                        <Link
                          href={href}
                          className="text-lg font-medium text-foreground hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                        {label === 'Services' && (
                          <div className="flex flex-col gap-2 pl-4 border-l">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="text-sm text-muted-foreground hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="mt-auto">
                    <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/contact">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
