
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Sprezzaura, a trusted commercial and residential service provider based in Melbourne, Australia, committed to delivering professional, high-quality solutions.',
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <>
      <PageHeader
        title="About Sprezzaura"
        subtitle="Trusted. Professional. High-Quality."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4">Our Company</h2>
            <div className="text-lg text-muted-foreground space-y-4">
              <p>
                Sprezzaura is a trusted commercial and residential service company based in Melbourne, Australia. We provide professional solutions for offices, retail stores, commercial spaces, apartments, and residential homes. Our services are designed to maintain clean, hygienic, and well-presented environments for businesses and households across Melbourne.
              </p>
              <p>
                We focus on maintaining environments that support healthy living and productive workspaces. With flexible scheduling, customized plans, and attention to detail, Sprezzaura is committed to meeting the unique needs of both commercial and residential clients.
              </p>
               <p>
                Our fully trained professional team takes pride in delivering consistently high standards. We tailor our services to each client’s needs—whether it be residential, commercial, or specialized services—creating healthier, fresher, and more welcoming environments every time.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                width={1200}
                height={800}
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
