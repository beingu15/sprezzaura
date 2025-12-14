
'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Phone, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { CostCalculatorModal } from '../shared/CostCalculatorModal';

export function FloatingCta() {
  const pathname = usePathname();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Do not show on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <>
     <CostCalculatorModal isOpen={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">
        <div className="hidden md:flex flex-col gap-3 p-2 bg-card/80 backdrop-blur-sm rounded-full border shadow-lg">
          <a href="tel:+1234567890" aria-label="Call us" className="text-muted-foreground hover:text-primary transition-colors p-2"><Phone size={20} /></a>
          <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors p-2"><Facebook size={20} /></a>
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors p-2"><Instagram size={20} /></a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors p-2"><Twitter size={20} /></a>
        </div>
        <Button size="icon" className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground w-14 h-14" onClick={() => setIsCalculatorOpen(true)}>
          <Calculator className="h-6 w-6" />
          <span className="sr-only">Open Cost Calculator</span>
        </Button>
      </div>
    </>
  );
}
