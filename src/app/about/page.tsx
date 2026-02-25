
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Calendar, 
  Home as HomeIcon, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Target, 
  Heart 
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-us');

  const profiles = [
    {
      title: "Commercial & Residential Cleaning",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      imageId: "cleaning-service",
      href: "/services/cleaning-services",
      description: "A trusted leader in Melbourne's cleaning industry. We provide specialized solutions for offices, retail stores, and residential homes, focusing on hygienic and well-presented environments.",
      highlights: ["Eco-Friendly Sanitization", "Hourly & Area-Based Rates", "End-of-Lease Excellence"]
    },
    {
      title: "Elegant Event Management",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      imageId: "events-service",
      href: "/services/event-management",
      description: "From intimate gatherings to grand weddings, we manage every detail. Our team specializes in creative coordination, décor styling, and flawless on-site execution across Melbourne.",
      highlights: ["Guest-Based Packages", "Themed Décor Add-ons", "Vendor & Venue Sourcing"]
    },
    {
      title: "Home Decor & Property Staging",
      icon: <HomeIcon className="h-6 w-6 text-primary" />,
      imageId: "decor-service",
      href: "/services/home-decor",
      description: "Transforming empty spaces into beautifully styled homes. We specialize in property staging and interior styling to help properties sell or rent faster in the competitive Melbourne market.",
      highlights: ["Monthly Staging Plans", "Furniture Rental Solutions", "Design Consultations"]
    }
  ];

  return (
    <div className="bg-background/95 min-h-screen">
      <PageHeader
        title="About Sprezzaura"
        subtitle="Trusted Professionalism. Artistic Touch. Melbourne Roots."
      />
      
      {/* Interactive Our Journey Section */}
      <div className="container mx-auto px-4 py-16 md:py-28 md:px-6 overflow-hidden">
        <GsapAnimator>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="space-y-4">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Journey</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                  Crafting Excellence in the Heart of Melbourne
                </h2>
              </motion.div>
              
              <motion.div variants={fadeIn} className="text-lg text-muted-foreground space-y-6 leading-relaxed">
                <p>
                  Sprezzaura is a premier commercial and residential service company based in Mickleham, Melbourne. Our mission is to maintain clean, hygienic, and perfectly styled environments that support both healthy living and productive workspaces across Victoria.
                </p>
                <p>
                  What began as a dedicated cleaning service has evolved into a comprehensive lifestyle partner. Today, we are a multi-divisional leader, offering professional standards in <strong>Commercial Cleaning</strong>, <strong>Event Management</strong>, and <strong>Property Staging</strong>. 
                </p>
                <p>
                  Whether we are managing a high-traffic retail space, staging a luxury home for market, or executing a flawless wedding celebration, our fully trained and insured team brings the "Sprezzaura Standard" to every project: making mastery look effortless.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">500+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">100%</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/5] group">
                {aboutMainImage && (
                  <Image
                    src={aboutMainImage.imageUrl}
                    alt={aboutMainImage.description}
                    data-ai-hint={aboutMainImage.imageHint}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
              {/* Floating element for modern look */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[200px] border border-border/50">
                <p className="text-primary font-headline font-bold text-xl mb-1">Melbourne</p>
                <p className="text-muted-foreground text-sm">Serving the metro area and beyond since inception.</p>
              </div>
            </motion.div>
          </div>
        </GsapAnimator>
      </div>

      {/* Modern Profile Breakdown */}
      <div className="bg-secondary/30 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">A Trifecta of Quality</h2>
            <p className="text-muted-foreground text-lg">
              Through our specialized branches, we provide a unified approach to elevating your daily environment and most important celebrations.
            </p>
          </div>

          <GsapAnimator stagger={0.2} className="grid md:grid-cols-3 gap-10">
            {profiles.map((profile, index) => {
              const profileImage = PlaceHolderImages.find(p => p.id === profile.imageId);
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden bg-card border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
                    <div className="relative h-64 w-full overflow-hidden">
                      {profileImage && (
                        <Image
                          src={profileImage.imageUrl}
                          alt={profile.title}
                          data-ai-hint={profileImage.imageHint}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-6 left-6 p-3 rounded-2xl bg-background/95 backdrop-blur-md shadow-lg">
                        {profile.icon}
                      </div>
                    </div>
                    <CardHeader className="pt-8">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{profile.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                          {profile.description}
                        </p>
                        <div className="space-y-3">
                          {profile.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex items-center gap-3 text-sm font-semibold">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full mt-10 rounded-full group/btn py-6 border-primary/20 hover:bg-primary hover:text-white transition-all">
                        <Link href={profile.href} className="flex items-center justify-center gap-2">
                          Explore Department <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </GsapAnimator>
        </div>
      </div>

      {/* Core Values / Vision Section */}
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">The Sprezzaura Standard</h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-xl">
                "Sprezzatura" is the art of effortless mastery. We believe that true luxury is found in the details, and true professionalism is making excellence look easy. Every clean, every design, and every event is a testament to this philosophy.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold">Our Mission</p>
                    <p className="text-sm opacity-70">To deliver high-quality, tailored solutions that simplify modern life.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold">Our Promise</p>
                    <p className="text-sm opacity-70">Consistency, reliability, and an unwavering commitment to quality.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-bold mb-1">Reliable</p>
                  <p className="text-xs uppercase tracking-widest opacity-60">Consistency</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-bold mb-1">Insured</p>
                  <p className="text-xs uppercase tracking-widest opacity-60">Peace of Mind</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-bold mb-1">Expert</p>
                  <p className="text-xs uppercase tracking-widest opacity-60">Trained Staff</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-bold mb-1">Custom</p>
                  <p className="text-xs uppercase tracking-widest opacity-60">Tailored Plans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
