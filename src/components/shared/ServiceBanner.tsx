'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { ServiceContact } from '@/lib/data';

interface ServiceBannerProps {
  title: string;
  subtitle: string;
  items: string[];
  montageImageIds: string[];
  contact?: ServiceContact;
}

export function ServiceBanner({ title, subtitle, items, montageImageIds, contact }: ServiceBannerProps) {
  const montageImages = montageImageIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  const getWhatsAppUrl = (phone: string | undefined): string => {
    if (!phone) return '';
    const num = phone.replace('+61 0', '61').replace('+61', '61').replace(/\s/g, '');
    return `https://wa.me/${num}`;
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-100 py-16 px-6 md:px-12 rounded-[2.5rem] mb-16 border border-blue-200/50 shadow-sm">
      {/* Sparkles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-cyan-400 animate-pulse text-2xl">✦</div>
        <div className="absolute bottom-20 right-1/2 text-cyan-300 text-xl">✦</div>
        <div className="absolute top-1/2 left-1/4 text-white opacity-60 text-lg">✦</div>
        <div className="absolute bottom-10 right-20 text-blue-300 animate-bounce text-2xl">✦</div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Text Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-cyan-900 leading-tight">
              {title}
            </h2>
            <p className="text-2xl md:text-3xl font-headline text-cyan-700 font-semibold italic">
              {subtitle}
            </p>
          </div>
          
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="text-lg md:text-xl font-medium text-cyan-800/80 flex items-start gap-4">
                <span className="mt-2 w-2 h-2 rounded-full bg-cyan-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {contact && (
            <div className="flex flex-wrap gap-4 pt-4">
              {contact.whatsapp && (
                <a href={getWhatsAppUrl(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-green-600 font-bold shadow-sm hover:shadow-md transition-all border border-green-100">
                  <Phone size={20} />
                  <span>WhatsApp</span>
                </a>
              )}
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full text-[#1877F2] shadow-sm hover:shadow-md transition-all border border-blue-100">
                  <Facebook size={22} />
                </a>
              )}
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full text-red-500 shadow-sm hover:shadow-md transition-all border border-red-100">
                  <Instagram size={22} />
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="p-2.5 bg-white rounded-full text-cyan-600 shadow-sm hover:shadow-md transition-all border border-cyan-100">
                  <Mail size={22} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Image Montage */}
        <div className="relative h-[450px] w-full hidden md:flex items-center justify-center">
          <div className="relative w-full h-full max-w-[500px]">
            {/* Top Left Oval */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute top-0 left-0 w-44 h-32 rounded-[50%] overflow-hidden border-4 border-white shadow-xl z-20"
            >
              <Image src={montageImages[0]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Top Right Oval */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-12 right-0 w-52 h-40 rounded-[50%] overflow-hidden border-4 border-white shadow-xl z-10"
            >
              <Image src={montageImages[1]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Bottom Left Oval */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4 w-52 h-36 rounded-[50%] overflow-hidden border-4 border-white shadow-xl z-30"
            >
              <Image src={montageImages[2]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Bottom Right Oval */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 right-10 w-44 h-32 rounded-[50%] overflow-hidden border-4 border-white shadow-xl z-20"
            >
              <Image src={montageImages[3]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Small Orbiter */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 -right-8 w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg z-40"
            >
              <Image src={montageImages[4]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}