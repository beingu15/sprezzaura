

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CostCalculator } from '@/components/shared/CostCalculator';
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GsapAnimator } from '@/components/shared/GsapAnimator';

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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
  
  const getWhatsAppUrl = (phone: string | undefined): string => {
    if (!phone) return '';
    // Formats numbers like '+61 04...' to '614...' and '+61 4...' to '614...' for wa.me links
    const num = phone.replace('+61 0', '61').replace('+61', '61').replace(/\s/g, '');
    return `https://wa.me/${num}`;
  };

  return (
    <>
      <PageHeader title={service.title} subtitle={service.description}>
        {service.contact && (
          <>
            {service.contact.whatsapp && (
              <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 hover:bg-background transition-colors text-primary" aria-label="WhatsApp">
                <Phone className="h-5 w-5" />
              </a>
            )}
            {service.contact.email && (
              <a href={`mailto:${service.contact.email}`} className="p-2 rounded-full bg-background/50 hover:bg-background transition-colors text-primary" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            )}
            {service.contact.facebook && (
              <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 hover:bg-background transition-colors text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {service.contact.instagram && (
              <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 hover:bg-background transition-colors text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </>
        )}
      </PageHeader>
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <GsapAnimator stagger={0.2} className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">Service Details</h2>
            <div className="text-muted-foreground text-lg space-y-4" dangerouslySetInnerHTML={{ __html: service.longDescription }} />
            
            <h3 className="text-2xl font-headline font-semibold pt-4">What's Included?</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {service.contact && (
              <div className="pt-8">
                <h3 className="text-2xl font-headline font-semibold mb-4">Department Contacts</h3>
                <div className="space-y-3">
                  {service.contact.whatsapp && (
                    <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{service.contact.whatsapp} (WhatsApp)</span>
                    </a>
                  )}
                  {service.contact.email && (
                    <a href={`mailto:${service.contact.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>{service.contact.email}</span>
                    </a>
                  )}
                  {service.contact.facebook && (
                    <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5 text-primary" />
                      <span>Facebook Page</span>
                    </a>
                  )}
                  {service.contact.instagram && (
                    <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5 text-primary" />
                      <span>Instagram Profile</span>
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
              <Button asChild size="lg">
                <Link href="/contact?subject=Quote for: ">
                  Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <div className="rounded-lg overflow-hidden shadow-xl sticky top-24">
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
          </div>
        </GsapAnimator>

        {service.faqs && service.faqs.length > 0 && (
          <GsapAnimator className="mt-16 md:mt-24">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto bg-secondary/30 p-4 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="bg-background rounded-lg mb-2 shadow-sm px-4">
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </GsapAnimator>
        )}

      </div>
    </>
  );
}
