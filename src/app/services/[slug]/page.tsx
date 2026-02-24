
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
    subtitle: 'Commercial & Residential Cleaning',
    items: [
      'Hourly Commercial & Office Cleaning',
      'Retail & High-Traffic Sanitization',
      'End-of-Lease & Deep Cleaning',
      'Post-Construction & Renovation Cleanup',
      'Residential Regular & Spring Cleaning'
    ],
    images: ['portfolio-1', 'portfolio-4', 'video-poster-1', 'about-us', 'portfolio-bg', 'hero-main', 'blog-3']
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
    images: ['portfolio-2', 'decor-service', 'portfolio-5', 'hero-main', 'video-poster-2', 'blog-1', 'portfolio-1']
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
    images: ['portfolio-3', 'events-service', 'portfolio-6', 'video-poster-3', 'about-us', 'blog-2', 'portfolio-4']
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
    <div className="bg-background/95 min-h-screen pb-24">
      {/* Top Banner Section */}
      <div className="container mx-auto px-4 pt-8 md:px-6">
        <Breadcrumbs className="mb-6" />
        <GsapAnimator>
          <ServiceBanner 
            title={banner.title} 
            subtitle={banner.subtitle} 
            items={banner.items} 
            montageImageIds={banner.images} 
            contact={service.contact}
          />
        </GsapAnimator>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <GsapAnimator stagger={0.2} className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                Our Services
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground font-medium border-l-4 border-primary/30 pl-6 py-2 italic">
                {service.description}
              </p>
              
              <div 
                className="text-muted-foreground text-lg space-y-6 leading-relaxed mt-10 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: service.longDescription }} 
              />
            </section>
            
            <section className="pt-8 border-t">
              <h3 className="text-2xl md:text-3xl font-headline font-bold mb-8">What's Included?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 border border-border rounded-xl bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 group">
                    <div className="p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    </div>
                    <span className="text-base font-medium text-foreground/80 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

             {service.slug === 'cleaning-services' && (
              <section className="pt-8">
                <CostCalculator />
              </section>
            )}

            <div className="pt-10">
              <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all w-full sm:w-auto">
                <Link href="/contact">
                  Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Sidebar Column - Optimized for visibility */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-background bg-background">
               {serviceImage && (
                <Image
                  src={serviceImage.imageUrl}
                  alt={service.title}
                  data-ai-hint={serviceImage.imageHint}
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto aspect-[3/2] lg:aspect-[4/3]"
                />
              )}
            </div>

            {service.contact && (
              <div className="p-6 md:p-8 bg-primary rounded-[2rem] text-primary-foreground shadow-xl relative overflow-hidden group">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                
                <h3 className="text-xl md:text-2xl font-headline font-bold mb-6 relative z-10">Direct Department Contact</h3>
                <div className="space-y-3 md:space-y-4 relative z-10">
                  {service.contact.whatsapp && (
                    <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all group/link">
                      <div className="p-2 rounded-lg bg-green-500 text-white shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70">WhatsApp</p>
                        <p className="font-bold text-sm md:text-base">{service.contact.whatsapp}</p>
                      </div>
                    </a>
                  )}
                  {service.contact.email && (
                    <a href={`mailto:${service.contact.email}`} className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all group/link">
                      <div className="p-2 rounded-lg bg-blue-500 text-white shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70">Email Us</p>
                        <p className="font-bold text-sm md:text-base truncate">Send Message</p>
                      </div>
                    </a>
                  )}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {service.contact.facebook && (
                      <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all text-xs md:text-sm">
                        <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="font-bold">Facebook</span>
                      </a>
                    )}
                    {service.contact.instagram && (
                      <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all text-xs md:text-sm">
                        <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="font-bold">Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </GsapAnimator>

        {service.faqs && service.faqs.length > 0 && (
          <GsapAnimator className="mt-24 md:mt-32">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Service Insights</h2>
              <p className="text-muted-foreground text-lg">Common questions and expert answers about our {service.title.toLowerCase()} process.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                {service.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="bg-white rounded-2xl shadow-sm border border-border/60 px-8 hover:border-primary/20 transition-colors">
                    <AccordionTrigger className="text-lg font-bold text-left hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6 border-t pt-4">
                      <div className="whitespace-pre-line">
                        {faq.answer}
                      </div>
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
