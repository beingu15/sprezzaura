import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the philosophy and passion behind Sprezzaura\'s commitment to effortless elegance.',
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <>
      <PageHeader
        title="About Sprezzaura"
        subtitle="Crafting elegance with a touch of effortless grace."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground mb-4">
              The term 'Sprezzatura' is an Italian word that first appears in Baldassare Castiglione's 1528 The Book of the Courtier. It means a certain nonchalance, so as to conceal all art and make whatever one does or says appear to be without effort and almost without any thought about it.
            </p>
            <p className="text-muted-foreground mb-4">
              This is the philosophy we bring to our work. We believe the most beautiful and functional spaces, the most memorable events, and the cleanest homes feel as if they came to be naturally. Our expertise is the hidden art that makes it all possible, delivering exceptional results that feel effortless for you.
            </p>
            <p className="text-muted-foreground">
              Founded on a passion for design, organization, and hospitality, Sprezzaura is a team of dedicated professionals committed to excellence. We take pride in our meticulous attention to detail and our personalized approach to every project.
            </p>
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
