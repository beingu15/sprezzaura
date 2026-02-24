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
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 py-20 px-6 md:px-16 rounded-[3rem] mb-16 border border-blue-200/40 shadow-xl">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
        
        {/* Sparkles */}
        <div className="absolute top-10 left-10 text-cyan-400 animate-pulse text-2xl">✦</div>
        <div className="absolute bottom-40 left-1/3 text-indigo-300 text-xl opacity-50">✦</div>
        <div className="absolute top-1/2 left-1/4 text-white opacity-60 text-lg">✦</div>
        <div className="absolute bottom-10 right-1/4 text-blue-300 animate-bounce text-2xl">✦</div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Content */}
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-headline font-bold text-cyan-950 leading-tight"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl font-headline text-cyan-700 font-semibold italic"
            >
              {subtitle}
            </motion.p>
          </div>
          
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            {items.map((item, idx) => (
              <li key={idx} className="text-xl md:text-2xl font-medium text-cyan-900/80 flex items-start gap-4 group">
                <span className="mt-2.5 w-2.5 h-2.5 rounded-full bg-cyan-600 shrink-0 group-hover:scale-125 transition-transform" />
                {item}
              </li>
            ))}
          </motion.ul>

          {contact && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              {contact.whatsapp && (
                <a href={getWhatsAppUrl(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-green-600 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-green-100">
                  <Phone size={22} />
                  <span>WhatsApp</span>
                </a>
              )}
              <div className="flex gap-3">
                {contact.facebook && (
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white rounded-full text-[#1877F2] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-blue-100">
                    <Facebook size={24} />
                  </a>
                )}
                {contact.instagram && (
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white rounded-full text-red-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-red-100">
                    <Instagram size={24} />
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="p-3.5 bg-white rounded-full text-cyan-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-cyan-100">
                    <Mail size={24} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Larger, Gap-Free Montage */}
        <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center">
          <div className="relative w-full h-full max-w-[650px]">
            
            {/* Main Central Focus - Large Oval */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-[150px] overflow-hidden border-[6px] border-white shadow-2xl z-30"
            >
              <Image src={montageImages[0]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Top Right Circle */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute top-0 right-4 w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl z-20"
            >
              <Image src={montageImages[1]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Top Left Oval */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-10 left-0 w-64 h-44 rounded-[100px] overflow-hidden border-4 border-white shadow-xl z-10"
            >
              <Image src={montageImages[2]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Bottom Left Circle */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-10 left-4 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl z-20"
            >
              <Image src={montageImages[3]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Bottom Right Oval */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-0 right-10 w-72 h-48 rounded-[120px] overflow-hidden border-4 border-white shadow-xl z-10"
            >
              <Image src={montageImages[4]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Small Floating Accent Orb - Mid Left */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute top-1/2 -left-8 w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-lg z-40"
            >
              <Image src={montageImages[5]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

            {/* Small Floating Accent Orb - Mid Right */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="absolute top-1/3 -right-6 w-36 h-36 rounded-full overflow-hidden border-2 border-white shadow-lg z-40"
            >
              <Image src={montageImages[6]?.imageUrl || ''} alt="" fill className="object-cover" />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
