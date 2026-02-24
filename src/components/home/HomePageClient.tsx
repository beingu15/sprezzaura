
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Leaf, ClipboardList, ThumbsUp, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { services, testimonials, portfolioItems, faqs } from '@/lib/data';
import type { Post } from '@/lib/mdx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LottieAnimation from '@/components/shared/LottieAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from '@/components/ui/badge';
import { CostCalculatorModal } from '@/components/shared/CostCalculatorModal';
import { NumberTicker } from '@/components/shared/NumberTicker';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { VideoCarousel } from '@/components/home/VideoCarousel';


interface HomePageClientProps {
  featuredBlogPosts: Post[];
}

export default function HomePageClient({ featuredBlogPosts }: HomePageClientProps) {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  const featuredPortfolio = portfolioItems.slice(0, 3);
  const portfolioBgImage = PlaceHolderImages.find(p => p.id === 'portfolio-bg');
  
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const getWhatsAppUrl = (phone: string | undefined): string => {
    if (!phone) return '';
    const num = phone.replace('+61 0', '61').replace('+61', '61').replace(/\s/g, '');
    return `https://wa.me/${num}`;
  };

  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
       <CostCalculatorModal isOpen={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center text-center text-white py-16 md:py-32 min-h-[85vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 container mx-auto">
           <h1
            className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-shadow-lg"
          >
            Simplify Your Life, Elevate Your Space.
          </h1>
          <p
            className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Sprezzaura brings a touch of sophisticated ease to your space with professional cleaning, decor, and event management.
          </p>
          <div className="mt-12 md:mt-16 text-left">
            {/* Desktop Grid */}
             <div
              className="hidden md:grid md:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <div key={service.slug} className="h-full">
                  <Card className="bg-white/10 backdrop-blur-sm border-2 border-primary/50 text-white overflow-hidden transition-all duration-300 ease-in-out hover:border-primary hover:bg-white/20 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
                      <CardContent className="p-6 flex flex-col flex-grow">
                          <Link href={`/services/${service.slug}`}>
                            <CardTitle className="font-headline text-2xl text-white hover:underline">{service.title}</CardTitle>
                          </Link>
                          <CardDescription className="text-gray-300 mt-2 mb-4">{service.description}</CardDescription>
                          
                          <div className="flex-grow" />

                          {service.contact && (
                            <div className="flex items-center gap-4 mb-4">
                              <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="WhatsApp">
                                <Phone size={20} />
                              </a>
                              <a href={`mailto:${service.contact.email}`} className="text-white hover:text-primary transition-colors" aria-label="Email">
                                <Mail size={20} />
                              </a>
                              <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                              </a>
                              <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                              </a>
                            </div>
                          )}
                          
                          {(() => {
                              const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
                              if (!serviceImage) return null;
                              return (
                                  <Link href={`/services/${service.slug}`} className="block group/image">
                                    <div className="overflow-hidden rounded-md aspect-[3/2] relative">
                                        <Image
                                            src={serviceImage.imageUrl}
                                            alt={service.title}
                                            data-ai-hint={serviceImage.imageHint}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                  </Link>
                              );
                          })()}
                      </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden -mx-4">
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
                      <CarouselItem key={index} className="basis-4/5 pl-4">
                        <div className="p-1 h-full">
                           <Card className="bg-white/20 backdrop-blur-md border-2 border-primary/50 text-white overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:border-primary hover:bg-white/25">
                               <CardContent className="p-6 flex flex-col flex-grow ">
                                  <Link href={`/services/${service.slug}`}>
                                    <CardTitle className="font-headline text-xl text-white hover:underline">{service.title}</CardTitle>
                                  </Link>
                                  <CardDescription className="text-gray-300 text-sm mt-2 mb-4">{service.description}</CardDescription>
                                  
                                  <div className="flex-grow" />

                                  {service.contact && (
                                    <div className="flex items-center gap-4 mb-4">
                                      <a href={getWhatsAppUrl(service.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="WhatsApp">
                                        <Phone size={18} />
                                      </a>
                                      <a href={`mailto:${service.contact.email}`} className="text-white hover:text-primary transition-colors" aria-label="Email">
                                        <Mail size={18} />
                                      </a>
                                      <a href={service.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="Facebook">
                                        <Facebook size={18} />
                                      </a>
                                      <a href={service.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors" aria-label="Instagram">
                                        <Instagram size={18} />
                                      </a>
                                    </div>
                                  )}
                                  
                                  {(() => {
                                      const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
                                      if (!serviceImage) return null;
                                      return (
                                          <Link href={`/services/${service.slug}`} className="block group/image">
                                            <div className="overflow-hidden rounded-md aspect-[3/2] relative">
                                                <Image
                                                    src={serviceImage.imageUrl}
                                                    alt={service.title}
                                                    data-ai-hint={serviceImage.imageHint}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80vw"
                                                />
                                            </div>
                                          </Link>
                                      );
                                  })()}
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
        </div>
      </section>

      {/* About Sprezzaura Section */}
      <GsapAnimator>
        <section className="py-16 md:py-24 bg-background/95">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Effortless Elegance for Modern Living</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Sprezzaura is a trusted service company based in Melbourne, Australia, providing professional solutions for commercial and residential spaces. Our services are designed to maintain clean, hygienic, and well-presented environments for businesses and households across Melbourne, bringing a touch of sophisticated ease to your space.
              </p>
               <div className="mt-8">
                  <Button asChild size="lg" variant="outline">
                      <Link href="/about">
                          Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>
      </GsapAnimator>
      
      <VideoCarousel />

      {/* Number Ticker Section */}
      <section className="py-12 bg-secondary/95">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <NumberTicker value={500} suffix="+" title="Projects Delivered" />
            <NumberTicker value={10} suffix="+" title="Years of Experience" />
            <NumberTicker value={50} suffix="+" title="Professional Staff" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <GsapAnimator>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Sprezzaura?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We deliver excellence and peace of mind with every service.
              </p>
            </div>
          </GsapAnimator>
          <GsapAnimator stagger={0.2} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-background">
              <CardContent className="p-6">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Team</h3>
                <p className="text-muted-foreground">Our staff is fully trained, insured, and committed to quality.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-background">
              <CardContent className="p-6">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Eco-Friendly Approach</h3>
                <p className="text-muted-foreground">We use safe, non-toxic products that are effective and environmentally responsible.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-background">
              <CardContent className="p-6">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <ClipboardList className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customized Plans</h3>
                <p className="text-muted-foreground">Every service is tailored to your specific needs, schedule, and budget.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-background">
              <CardContent className="p-6">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <ThumbsUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">We stand by our work and ensure you are completely satisfied with the results.</p>
              </CardContent>
            </Card>
          </GsapAnimator>
        </div>
        <LottieAnimation
                animationPath="/lottie/background.json"
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
      </section>

      {/* Portfolio Preview */}
      <section className="relative py-16 md:py-24">
        {portfolioBgImage && (
          <Image
            src={portfolioBgImage.imageUrl}
            alt={portfolioBgImage.description}
            data-ai-hint={portfolioBgImage.imageHint}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <GsapAnimator>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Featured Work</h2>
              <p className="mt-4 text-lg text-gray-300">
                A glimpse into the transformations we've created.
              </p>
            </div>
          </GsapAnimator>
          <GsapAnimator stagger={0.2} className="grid md:grid-cols-3 gap-4">
            {featuredPortfolio.map((item) => {
              const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
              return (
                <div key={item.id}>
                  <Link href="/portfolio" className="group block overflow-hidden rounded-lg">
                    <div className="relative aspect-video">
                      {itemImage && (
                        <Image
                          src={itemImage.imageUrl}
                          alt={item.title}
                          data-ai-hint={itemImage.imageHint}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-300">{item.category}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </GsapAnimator>
           <GsapAnimator>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="secondary">
                <Link href="/portfolio">
                  View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </GsapAnimator>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-24 bg-background/95">
        <div className="container mx-auto px-4 md:px-6">
          <GsapAnimator>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Simple Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Getting started is easy. Here’s how we turn your needs into reality in three simple steps.
              </p>
            </div>
          </GsapAnimator>
          <GsapAnimator stagger={0.2} className="grid md:grid-cols-3 gap-8 text-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
                <path d="M0,0.5 L100,0.5" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex justify-center items-center h-24 w-24 mx-auto bg-primary text-primary-foreground rounded-full text-3xl font-bold mb-4 border-4 border-background">1</div>
              <h3 className="text-xl font-semibold mb-2">Request a Quote</h3>
              <p className="text-muted-foreground">Contact us with your requirements and we’ll provide a free, no-obligation estimate.</p>
            </div>
            <div className="relative z-10">
              <div className="flex justify-center items-center h-24 w-24 mx-auto bg-primary text-primary-foreground rounded-full text-3xl font-bold mb-4 border-4 border-background">2</div>
              <h3 className="text-xl font-semibold mb-2">Schedule Your Service</h3>
              <p className="text-muted-foreground">We'll work with you to finalize the plan and schedule a time that's convenient for you.</p>
            </div>
            <div className="relative z-10">
              <div className="flex justify-center items-center h-24 w-24 mx-auto bg-primary text-primary-foreground rounded-full text-3xl font-bold mb-4 border-4 border-background">3</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy the Results</h3>
              <p className="text-muted-foreground">Our professional team gets to work, and you get to enjoy your beautifully transformed space.</p>
            </div>
          </GsapAnimator>
        </div>
      </section>

      {/* Testimonials Section */}
      <GsapAnimator>
        <section className="py-16 md:py-24 bg-secondary/95">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
            </div>
            <div className="overflow-hidden max-w-4xl mx-auto">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-4 h-full">
                        <Card className="flex flex-col h-full bg-background">
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
          </div>
        </section>
      </GsapAnimator>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <GsapAnimator>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">From Our Blog</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get the latest insights and tips from our team of experts.
              </p>
            </div>
          </GsapAnimator>
          <GsapAnimator stagger={0.2} className="grid lg:grid-cols-3 gap-8">
            {featuredBlogPosts.map(post => {
              const postImage = PlaceHolderImages.find(p => p.id === post.frontmatter.imageId);
              return (
                <div key={post.slug}>
                  <Card className="group flex flex-col overflow-hidden h-full bg-background">
                    <CardHeader className="p-0">
                      <Link href={`/blog/${post.slug}`} className="block">
                        {postImage && (
                          <div className="relative aspect-video">
                            <Image
                              src={postImage.imageUrl}
                              alt={post.frontmatter.title}
                              data-ai-hint={postImage.imageHint}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 33vw"
                            />
                          </div>
                        )}
                      </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <Badge variant="secondary">{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Badge>
                      </div>
                      <h3 className="text-xl font-headline font-semibold mb-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.frontmatter.title}</Link>
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{post.frontmatter.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="font-semibold text-sm text-primary flex items-center gap-2">
                        Read More <ArrowRight size={16} />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </GsapAnimator>
          <GsapAnimator>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/blog">
                  Visit The Blog <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </GsapAnimator>
        </div>
      </section>

      {/* Final CTA Section */}
      <GsapAnimator>
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Elevate Your Space?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Let us handle the details so you can enjoy a cleaner, more stylish, and better-organized environment. Contact us today for a free, no-obligation quote.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </GsapAnimator>
      
      {/* FAQ Section */}
      <GsapAnimator>
        <section className="py-16 md:py-24 bg-background/95">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto bg-card p-4 rounded-lg shadow-sm">
               <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                 {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-b last:border-b-0">
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </GsapAnimator>

    </div>
  );
}
