import { PageHeader } from '@/components/shared/PageHeader';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Home, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our professional services: Impeccable Cleaning, Home Decor & Styling, and Elegant Event Management.',
};

const serviceIcons: { [key: string]: React.ReactNode } = {
  'cleaning-services': <Sparkles className="h-8 w-8 text-accent" />,
  'home-decor': <Home className="h-8 w-8 text-accent" />,
  'event-management': <Calendar className="h-8 w-8 text-accent" />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions to enhance your home, lifestyle, and events with professional care and an artistic touch."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
            return (
              <Card key={service.slug} className="overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                  {serviceImage && (
                    <Image
                      src={serviceImage.imageUrl}
                      alt={service.title}
                      data-ai-hint={serviceImage.imageHint}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48"
                    />
                  )}
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                     {serviceIcons[service.slug]}
                    <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="flex-grow">{service.description}</CardDescription>
                  <Button asChild variant="link" className="px-0 mt-4 text-primary self-start">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
