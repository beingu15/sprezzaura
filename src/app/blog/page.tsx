
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on design, organization, and elegant living from the Sprezzaura team of experts.',
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Sprezzaura Blog"
        subtitle="Insights on design, organization, and elegant living from our team of experts."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map(post => {
            const postImage = PlaceHolderImages.find(p => p.id === post.imageId);
            return (
              <Card key={post.slug} className="group flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {postImage && (
                      <Image
                        src={postImage.imageUrl}
                        alt={post.title}
                        data-ai-hint={postImage.imageHint}
                        width={800}
                        height={500}
                        className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </Link>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <Badge variant="secondary">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Badge>
                  </div>
                  <h3 className="text-xl font-headline font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="font-semibold text-sm text-primary flex items-center gap-2">
                    Read More <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
