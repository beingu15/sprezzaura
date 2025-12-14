
'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Phone, Calculator, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { CostCalculatorModal } from '../shared/CostCalculatorModal';
import { AnimatePresence, motion } from 'framer-motion';

export function FloatingCta() {
  const pathname = usePathname();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Do not show on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const iconVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 20
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: 10,
      scale: 0.9,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };
  
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

        <AnimatePresence>
          {isExpanded && (
             <motion.div 
               className="flex flex-col items-center gap-3"
               initial="hidden"
               animate="visible"
               exit="exit"
               variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
             >
              {socialButtons.map((btn, i) => (
                <motion.a 
                  key={btn.label}
                  href={btn.href} 
                  aria-label={btn.label} 
                  className="bg-card/90 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors h-12 w-12 flex items-center justify-center rounded-full shadow-lg border"
                  custom={i}
                  variants={iconVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {btn.icon}
                </motion.a>
              ))}
              <motion.div
                custom={socialButtons.length}
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="icon" className="rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12" onClick={() => setIsCalculatorOpen(true)}>
                  <Calculator className="h-6 w-6" />
                  <span className="sr-only">Open Cost Calculator</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          size="icon" 
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-14 h-14" 
          onClick={() => setIsExpanded(prev => !prev)}
          aria-expanded={isExpanded}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? 'x' : 'plus'}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">{isExpanded ? 'Close actions menu' : 'Open actions menu'}</span>
        </Button>
      </div>
    </>
  );
}
