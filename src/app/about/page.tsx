
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, Home as HomeIcon, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Sprezzaura, a trusted commercial and residential service provider based in Melbourne, Australia, committed to delivering professional, high-quality solutions.',
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  const profiles = [
    {
      title: "Cleaning Services",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      description: "A trusted leader in Melbourne's cleaning industry, providing professional solutions for offices, retail stores, and residential homes. We focus on hygienic, well-presented environments using safe and effective products.",
      highlights: ["Commercial & Residential", "Eco-Friendly Products", "Flexible Scheduling"]
    },
    {
      title: "Event Management",
      icon: <Calendar className="h-8 w-8 text-primary" />,
      description: "End-to-end planning and creative coordination in Melbourne. We specialize in décor styling and flawless onsite execution for private gatherings, weddings, and large-scale corporate events.",
      highlights: ["Complete Planning", "Décor Styling", "On-site Execution"]
    },
    {
      title: "Home Decor & Staging",
      icon: <HomeIcon className="h-8 w-8 text-primary" />,
      description: "Specializing in property staging and interior styling solutions. Our mission is to highlight visual appeal and improve space functionality to help properties sell or rent faster in the Melbourne market.",
      highlights: ["Property Staging", "Furniture Rental", "Interior Design"]
    }
  ];

  return (
    <div className="bg-background/95 min-h-screen">
      <PageHeader
        title="About Sprezzaura"
        subtitle="Trusted. Professional. High-Quality."
      />
      
      {/* Main Company Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
        <GsapAnimator>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Journey</h2>
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
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] group">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </GsapAnimator>
      </div>

      {/* Modern Profile Breakdown */}
      <div className="bg-secondary/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Specialized Divisions</h2>
            <p className="text-muted-foreground text-lg">
              Through our dedicated branches, we offer a comprehensive suite of services tailored to elevate every aspect of your environment and experience.
            </p>
          </div>

          <GsapAnimator stagger={0.2} className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, index) => (
              <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-xl bg-primary/10">
                    {profile.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{profile.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.description}
                  </p>
                  <ul className="space-y-2">
                    {profile.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </GsapAnimator>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-primary-foreground text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">The Sprezzaura Standard</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            "Sprezzatura" is the art of effortless mastery. We bring this philosophy to every project—whether we are deep cleaning a workspace, styling a home, or managing a wedding. We believe that true luxury is found in the details, and true professionalism is making excellence look easy.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20">
             <div>
               <p className="text-3xl font-bold">Reliable</p>
               <p className="text-sm opacity-80 uppercase tracking-widest mt-1">Consistency Guaranteed</p>
             </div>
             <div>
               <p className="text-3xl font-bold">Experienced</p>
               <p className="text-sm opacity-80 uppercase tracking-widest mt-1">Trained Professionals</p>
             </div>
             <div>
               <p className="text-3xl font-bold">Customized</p>
               <p className="text-sm opacity-80 uppercase tracking-widest mt-1">Tailored for You</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
