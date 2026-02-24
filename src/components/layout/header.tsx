
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Sparkles, Home as HomeIcon, Calendar, ArrowRight } from 'lucide-react';
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
import { useState, useRef } from 'react';
import { services } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceIcons: { [key: string]: React.ReactNode } = {
  'cleaning-services': <Sparkles className="h-5 w-5 text-primary" />,
  'home-decor': <HomeIcon className="h-5 w-5 text-primary" />,
  'event-management': <Calendar className="h-5 w-5 text-primary" />,
};

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => {
            if (label === 'Services') {
              return (
                <div
                  key={href}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative h-full flex items-center"
                >
                  <DropdownMenu open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          'flex items-center gap-1.5 text-sm font-bold tracking-tight transition-all hover:text-primary outline-none py-4',
                          pathname?.startsWith(href) ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {label} 
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isServicesOpen && "rotate-180")} />
                      </button>
                    </DropdownMenuTrigger>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <DropdownMenuContent 
                          align="start" 
                          sideOffset={0}
                          className="w-[380px] p-2 bg-background/98 backdrop-blur-xl border-border shadow-2xl rounded-2xl"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          asChild
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <div className="p-3 border-b mb-1">
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-1">Our Departments</p>
                                <Link href="/services" className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                                  View All Services <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                            <div className="space-y-1">
                              {services.map((service) => (
                                <DropdownMenuItem key={service.slug} asChild className="p-0 focus:bg-transparent">
                                  <Link 
                                    href={`/services/${service.slug}`} 
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all group"
                                  >
                                    <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                      {serviceIcons[service.slug]}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                        {service.title}
                                      </div>
                                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                        {service.description}
                                      </div>
                                    </div>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </motion.div>
                        </DropdownMenuContent>
                      )}
                    </AnimatePresence>
                  </DropdownMenu>
                </div>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-bold tracking-tight transition-all hover:text-primary py-4 relative',
                  pathname === href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {label}
                {pathname === href && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-3 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
           <Button asChild className="rounded-full px-6 font-bold shadow-md hover:shadow-primary/20 transition-all">
             <Link href="/contact">Get a Quote</Link>
           </Button>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l-0 bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col h-full p-4 pt-10">
                  <div className="mb-10 px-2">
                     <Logo />
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map(({ href, label }) => (
                      <div key={href} className="flex flex-col gap-2">
                        <Link
                          href={href}
                          className={cn(
                            "text-2xl font-bold px-2 py-3 rounded-xl transition-all",
                            pathname === href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                        {label === 'Services' && (
                          <div className="flex flex-col gap-1 pl-4 mb-4">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="text-sm font-medium text-muted-foreground hover:text-primary py-2 px-3 rounded-lg hover:bg-primary/5 transition-all border-l-2 border-transparent hover:border-primary"
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
                  <div className="mt-auto p-2">
                    <Button asChild className="w-full h-14 text-lg rounded-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
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
