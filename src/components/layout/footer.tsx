
'use client';

import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Do not show footer on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Effortless elegance for your home, events, and daily life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services/cleaning-services" className="text-muted-foreground hover:text-primary">Cleaning</Link></li>
                <li><Link href="/services/home-decor" className="text-muted-foreground hover:text-primary">Home Decor</Link></li>
                <li><Link href="/services/event-management" className="text-muted-foreground hover:text-primary">Event Management</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Link href="https://www.facebook.com/share/1CQtW4WdPr/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
                <Link href="https://www.instagram.com/sprezzaura_pty_ltd?igsh=MXY0cG9wb2RjbzE2bQ==&utm_source=ig_contact_invite" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sprezzaura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
