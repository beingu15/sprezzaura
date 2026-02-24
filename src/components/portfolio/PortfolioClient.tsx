
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { GsapAnimator } from '@/components/shared/GsapAnimator';

const categories = ['All', 'Cleaning', 'Decor', 'Events'];

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <>
      <PageHeader
        title="Our Portfolio"
        subtitle="Explore a curated collection of our finest work, showcasing our commitment to quality and style."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value={activeTab}>
            <GsapAnimator key={activeTab} stagger={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => {
                const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
                return (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      {itemImage && (
                        <Image
                          src={itemImage.imageUrl}
                          alt={item.title}
                          data-ai-hint={itemImage.imageHint}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </GsapAnimator>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
