import { notFound } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import type { Metadata } from 'next';

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

  return (
    <>
      <PageHeader title={service.title} subtitle={service.description} />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">Service Details</h2>
            <p className="text-muted-foreground text-lg">{service.longDescription}</p>
            <h3 className="text-2xl font-headline font-semibold pt-4">What's Included?</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact?subject=Quote for: ">
                  Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
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
      </div>
    </>
  );
}
