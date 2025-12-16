
'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Phone, Calculator, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { CostCalculatorModal } from '../shared/CostCalculatorModal';

export function FloatingCta() {
  const pathname = usePathname();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Do not show on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const socialButtons = [
    {
      href: "tel:+1234567890",
      label: "Call us",
      icon: <Phone size={20} />,
    },
    {
      href: "#",
      label: "Facebook",
      icon: <Facebook size={20} />,
    },
    {
      href: "#",
      label: "Instagram",
      icon: <Instagram size={20} />,
    },
    {
      href: "#",
      label: "Twitter",
      icon: <Twitter size={20} />,
    },
  ];
  
  return (
    <>
     <CostCalculatorModal isOpen={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">

          {isExpanded && (
             <div 
               className="flex flex-col items-center gap-3"
             >
              {socialButtons.map((btn, i) => (
                <a 
                  key={btn.label}
                  href={btn.href} 
                  aria-label={btn.label} 
                  className="bg-card/90 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors h-12 w-12 flex items-center justify-center rounded-full shadow-lg border"
                >
                  {btn.icon}
                </a>
              ))}
              <div>
                <Button size="icon" className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12" onClick={() => setIsCalculatorOpen(true)}>
                  <Calculator className="h-6 w-6" />
                  <span className="sr-only">Open Cost Calculator</span>
                </Button>
              </div>
            </div>
          )}

        <Button 
          size="icon" 
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-14 h-14" 
          onClick={() => setIsExpanded(prev => !prev)}
          aria-expanded={isExpanded}
        >
          <div>
              {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </div>
          <span className="sr-only">{isExpanded ? 'Close actions menu' : 'Open actions menu'}</span>
        </Button>
      </div>
    </>
  );
}
