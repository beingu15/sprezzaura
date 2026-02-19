
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, Home as HomeIcon, CheckCircle2, ArrowRight, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Sprezzaura, a trusted commercial and residential service provider based in Melbourne, Australia, committed to delivering professional, high-quality solutions.',
};

export default function AboutPage() {
  const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-us');

  const profiles = [
    {
      title: "Cleaning Services",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      imageId: "cleaning-service",
      href: "/services/cleaning-services",
      description: "A trusted leader in Melbourne's cleaning industry, providing professional solutions for offices, retail stores, and residential homes. We focus on hygienic, well-presented environments using safe and effective products.",
      highlights: ["Commercial & Residential", "Eco-Friendly Products", "Flexible Scheduling"]
    },
    {
      title: "Event Management",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      imageId: "events-service",
      href: "/services/event-management",
      description: "End-to-end planning and creative coordination in Melbourne. We specialize in décor styling and flawless onsite execution for private gatherings, weddings, and large-scale corporate events.",
      highlights: ["Complete Planning", "Décor Styling", "On-site Execution"]
    },
    {
      title: "Home Decor & Staging",
      icon: <HomeIcon className="h-6 w-6 text-primary" />,
      imageId: "decor-service",
      href: "/services/home-decor",
      description: "Specializing in property staging and interior styling solutions. Our mission is to highlight visual appeal and improve space functionality to help properties sell or rent faster in the Melbourne market.",
      highlights: ["Property Staging", "Furniture Rental", "Interior Design"]
    }
  ];

  const managementTeam = [
    {
      name: "Julian Sterling",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in luxury service management, Julian founded Sprezzaura with a vision to redefine professional property solutions in Melbourne.",
      imageId: "mgmt-1"
    },
    {
      name: "Elara Vane",
      role: "Creative Director",
      bio: "Elara leads our design and event styling divisions, bringing an artistic eye and meticulous attention to detail to every home and event we transform.",
      imageId: "mgmt-2"
    },
    {
      name: "Marcus Thorne",
      role: "Head of Operations",
      bio: "Marcus ensures our cleaning and logistical operations run with clockwork precision, maintaining the high standards Sprezzaura is known for.",
      imageId: "mgmt-3"
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
              {aboutMainImage && (
                <Image
                  src={aboutMainImage.imageUrl}
                  alt={aboutMainImage.description}
                  data-ai-hint={aboutMainImage.imageHint}
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
            {profiles.map((profile, index) => {
              const profileImage = PlaceHolderImages.find(p => p.id === profile.imageId);
              return (
                <Card key={index} className="overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col group">
                  <div className="relative h-48 w-full overflow-hidden">
                    {profileImage && (
                      <Image
                        src={profileImage.imageUrl}
                        alt={profile.title}
                        data-ai-hint={profileImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-4 left-4 p-2 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm">
                      {profile.icon}
                    </div>
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="font-headline text-2xl">{profile.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {profile.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {profile.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-auto group/btn">
                      <Link href={profile.href} className="flex items-center gap-2">
                        View Department <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </GsapAnimator>
        </div>
      </div>

      {/* Meet Our Management Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Meet Our Management</h2>
          <p className="text-muted-foreground text-lg">
            The visionary leaders behind the Sprezzaura standard of excellence.
          </p>
        </div>

        <GsapAnimator stagger={0.3} className="grid md:grid-cols-3 gap-12">
          {managementTeam.map((member, index) => {
            const mgmtImage = PlaceHolderImages.find(p => p.id === member.imageId);
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-80 mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-background group-hover:border-primary/20 transition-all duration-500">
                  {mgmtImage && (
                    <Image
                      src={mgmtImage.imageUrl}
                      alt={member.name}
                      data-ai-hint={mgmtImage.imageHint}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h3 className="text-2xl font-headline font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed max-w-xs">{member.bio}</p>
              </div>
            );
          })}
        </GsapAnimator>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-primary-foreground text-center space-y-8 shadow-xl">
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
