'use client';

import { useState } from 'react';
import { Facebook, Instagram, Phone, Calculator, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { CostCalculatorModal } from '../shared/CostCalculatorModal';
import { cn } from '@/lib/utils';

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
      href: "tel:1300208199",
      label: "Call us",
      icon: <Phone size={20} />,
      colorClass: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      href: "https://www.facebook.com/share/1CQtW4WdPr/",
      label: "Facebook",
      icon: <Facebook size={20} />,
      colorClass: "bg-[#1877F2] hover:bg-[#166ed8] text-white",
    },
    {
      href: "https://www.instagram.com/sprezzaura_pty_ltd?igsh=MXY0cG9wb2RjbzE2bQ==&utm_source=ig_contact_invite",
      label: "Instagram",
      icon: <Instagram size={20} />,
      colorClass: "bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 text-white",
    },
  ];
  
  return (
    <>
      <CostCalculatorModal isOpen={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">
        {/* Desktop View: Always Visible | Mobile View: Only when expanded */}
        <div 
          className={cn(
            "flex flex-col items-center gap-3 transition-all duration-300",
            isExpanded ? "flex" : "hidden md:flex"
          )}
        >
          {socialButtons.map((btn) => (
            <a 
              key={btn.label}
              href={btn.href} 
              aria-label={btn.label}
              target={btn.href.startsWith('http') ? '_blank' : undefined}
              rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={cn(
                "transition-transform hover:scale-110 h-12 w-12 flex items-center justify-center rounded-full shadow-lg",
                btn.colorClass
              )}
            >
              {btn.icon}
            </a>
          ))}
          <Button 
            size="icon" 
            className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 transition-transform hover:scale-110" 
            onClick={() => setIsCalculatorOpen(true)}
          >
            <Calculator className="h-6 w-6" />
            <span className="sr-only">Open Cost Calculator</span>
          </Button>
        </div>

        {/* Mobile Toggle Button: Hidden on Desktop */}
        <Button 
          size="icon" 
          className="md:hidden rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-14 h-14" 
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
