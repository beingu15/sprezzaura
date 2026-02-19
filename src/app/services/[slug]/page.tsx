import { notFound } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { CostCalculator } from '@/components/shared/CostCalculator';
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { ServiceBanner } from '@/components/shared/ServiceBanner';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }
  return {
    title: service.title,
    description: service.description,
  };
}

const bannerData: Record<string, { title: string, subtitle: string, items: string[], images: string[] }> = {
  'cleaning-services': {
    title: 'SPREZZAURA',
    subtitle: 'Housekeeping Services',
    items: [
      'General & Janitor Services',
      'Daily, On-Call & Weekly Cleaning',
      'Residential & Commercial Facilities',
      'Recreational, Events and Convention Centres',
      'Industrial and Custom Housekeeping Solutions'
    ],
    images: ['portfolio-1', 'portfolio-4', 'video-poster-1', 'about-us', 'portfolio-bg']
  },
  'home-decor': {
    title: 'SPREZZAURA',
    subtitle: 'Decor & Styling',
    items: [
      'Property Staging & Interior Design',
      'Furniture Rental Solutions',
      'Personalized Styling Consultations',
      'Space Functionality Optimization',
      'Modern & Luxury Property Enhancement'
    ],
    images: ['portfolio-2', 'decor-service', 'portfolio-5', 'hero-main', 'video-poster-2']
  },
  'event-management': {
    title: 'SPREZZAURA',
    subtitle: 'Event Management',
    items: [
      'End-to-End Event Planning',
      'Vendor & Venue Coordination',
      'Themed Décor & Experience Stations',
      'Corporate & Private Event Execution',
      'Customized Guest-Based Packages'
    ],
    images: ['portfolio-3', 'events-service', 'portfolio-6', 'video-poster-3', 'about-us']
  }
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
  const banner = bannerData[service.slug] || bannerData['cleaning-services'];
  
  const getWhatsAppUrl = (phone: string | undefined): string => {
    if (!phone) return '';
    const num = phone.replace('+61 0', '61').replace('+61', '61').replace(/\s/g, '');
    return `https://wa.me/${num}`;
  };

  return (
    <div className="bg-background/95 min-h-screen">
      {/* Top Banner Section */}
      <div className="container mx-auto px-4 pt-8 md:px-6">
        <Breadcrumbs className="mb-6" />
        <GsapAnimator>
          <ServiceBanner 
            title={banner.title} 
            subtitle={banner.subtitle} 
            items={banner.items} 
            montageImageIds={banner.images} 
          />
        </GsapAnimator>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:px-6">
        <GsapAnimator stagger={0.2} className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-headline font-bold text-primary">{service.title}</h1>
              <p className="text-xl text-muted-foreground">{service.description}</p>
            </div>

            <div className="text-muted-foreground text-lg space-y-4 leading-relaxed mt-8" dangerouslySetInnerHTML={{ __html: service.longDescription }} />
            
            <h3 className="text-2xl font-headline font-semibold pt-8">What's Included?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/50 hover:border-primary/50 transition-colors">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            {service.contact && (
              <div className="pt-8 p-6 bg-secondary/20 rounded-xl border border-border/50">
                <h3 className="text-2xl font-headline font-semibold mb-4">Connect with this Department</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.contact.whatsapp && (
                    <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-green-50 transition-colors group">
                      <Phone className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">{service.contact.whatsapp}</span>
                    </a>
                  )}
                  {service.contact.email && (
                    <a href={`mailto:${service.contact.email}`} className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-primary/5 transition-colors group">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Email Department</span>
                    </a>
                  )}
                  {service.contact.facebook && (
                    <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-blue-50 transition-colors group">
                      <Facebook className="h-5 w-5 text-[#1877F2]" />
                      <span className="text-sm font-medium">Facebook</span>
                    </a>
                  )}
                  {service.contact.instagram && (
                    <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-purple-50 transition-colors group">
                      <Instagram className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            )}

             {service.slug === 'cleaning-services' && (
              <div className="pt-8">
                <CostCalculator />
              </div>
            )}
            <div className="pt-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="rounded-lg overflow-hidden shadow-xl sticky top-24">
               {serviceImage && (
                <Image
                  src={serviceImage.imageUrl}
                  alt={service.title}
                  data-ai-hint={serviceImage.imageHint}
                  width={800}
                  height={1000}
                  className="object-cover w-full h-auto"
                />
              )}
            </div>
          </div>
        </GsapAnimator>

        {service.faqs && service.faqs.length > 0 && (
          <GsapAnimator className="mt-16 md:mt-24">
            <h2 className="text-3xl font-headline font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="item-0">
                {service.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="bg-white rounded-lg shadow-sm border px-6">
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </GsapAnimator>
        )}

      </div>
    </div>
  );
}
