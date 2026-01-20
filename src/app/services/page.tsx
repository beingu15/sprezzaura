
'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Home as HomeIcon, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

// Note: Metadata is currently not supported in client components.
// We can move it to a layout file if needed.
/*
export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our professional services: Impeccable Cleaning, Home Decor & Styling, and Elegant Event Management.',
};
*/

const serviceIcons: { [key: string]: React.ReactNode } = {
  'cleaning-services': <Sparkles className="h-8 w-8 text-accent" />,
  'home-decor': <HomeIcon className="h-8 w-8 text-accent" />,
  'event-management': <Calendar className="h-8 w-8 text-accent" />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions to enhance your home, lifestyle, and events with professional care and an artistic touch."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <div className="space-y-20">
          {services.map((service, index) => {
            const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
            const isReversed = index % 2 !== 0;
            return (
              <div key={service.slug} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={`rounded-lg overflow-hidden shadow-xl ${isReversed ? 'md:order-last' : ''}`}>
                  {serviceImage && (
                    <Image
                      src={serviceImage.imageUrl}
                      alt={service.title}
                      data-ai-hint={serviceImage.imageHint}
                      width={800}
                      height={600}
                      className="object-cover w-full"
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {serviceIcons[service.slug]}
                    <h2 className="text-3xl font-headline font-bold">{service.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {service.description}
                  </p>
                  <Button asChild variant="default" size="lg" className="text-white">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
