"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Home as HomeIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { services, testimonials, portfolioItems } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const serviceIcons: { [key: string]: React.ReactNode } = {
  'cleaning-services': <Sparkles className="h-8 w-8 text-accent" />,
  'home-decor': <HomeIcon className="h-8 w-8 text-accent" />,
  'event-management': <Calendar className="h-8 w-8 text-accent" />,
};

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  const featuredPortfolio = portfolioItems.slice(0, 3);
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center text-center text-white py-16 md:py-24">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 container mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-shadow-lg">
            Simplify Your Life, Elevate Your Space.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Sprezzaura brings a touch of sophisticated ease to your space with professional cleaning, decor, and event management.
          </p>
          <div className="mt-12 text-left">
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.slug} className="bg-white/10 backdrop-blur-sm border-white/20 text-white overflow-hidden transition-all duration-300 ease-in-out hover:bg-white/20 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {serviceIcons[service.slug]}
                      <CardTitle className="font-headline text-2xl text-white">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                    <Button asChild variant="link" className="px-0 mt-4 text-accent">
                      <Link href={`/services/${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
               <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-4">
                  {services.map((service, index) => (
                    <CarouselItem key={index} className="basis-4/5">
                      <div className="p-1">
                         <Card key={service.slug} className="bg-white/20 backdrop-blur-md border-white/20 text-white overflow-hidden transition-all h-full flex flex-col">
                           <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4">
                              {serviceIcons[service.slug]}
                              <CardTitle className="font-headline text-xl text-white">{service.title}</CardTitle>
                            </div>
                            <CardDescription className="text-gray-300 text-sm flex-grow">{service.description}</CardDescription>
                            <Button asChild variant="link" className="px-0 mt-4 text-accent self-start">
                              <Link href={`/services/${service.slug}`}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Work</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A glimpse into the transformations we've created.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredPortfolio.map((item) => {
              const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
              return (
                <Link key={item.id} href="/portfolio" className="group block overflow-hidden rounded-lg">
                  <div className="relative h-64">
                    {itemImage && (
                      <Image
                        src={itemImage.imageUrl}
                        alt={item.title}
                        data-ai-hint={itemImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.category}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">
                View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <Card className="flex flex-col h-full">
                      <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name.replace(/\s/g, '')}`} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

    </div>
  );
}
