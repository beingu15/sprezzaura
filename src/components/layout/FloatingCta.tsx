
'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function FloatingCta() {
  const pathname = usePathname();

  // Do not show on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">
       <Button asChild size="icon" className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground">
        <a href="tel:+1234567890" aria-label="Call us">
          <Phone className="h-5 w-5" />
        </a>
      </Button>
       <div className="flex flex-col gap-3 p-2 bg-card/80 backdrop-blur-sm rounded-full border shadow-lg">
        <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
        <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
        <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
      </div>
    </div>
  );
}
