
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Upload, Sparkles, MoreHorizontal } from 'lucide-react';

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { frontmatter } = getPostBySlug(params.slug);
    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  const postImage = PlaceHolderImages.find(p => p.id === post.frontmatter.imageId);
  
  // Simple read time calculation
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-[720px] px-4 py-12 md:py-20">
        <Breadcrumbs className="mb-12 opacity-60 hover:opacity-100 transition-opacity" />
        
        <GsapAnimator>
          <article>
            <header className="mb-10 space-y-6">
              {/* Premium Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-none px-3 py-1 text-xs font-medium flex items-center gap-1.5 rounded-full">
                  <Sparkles className="h-3 w-3 fill-amber-600" />
                  Premium Insight
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-[42px] font-headline font-extrabold text-foreground leading-[1.15] tracking-tight">
                {post.frontmatter.title}
              </h1>

              {/* Read time & Date */}
              <div className="flex items-center gap-2 text-muted-foreground text-[15px] font-medium">
                <span>{readTime} min read</span>
                <span className="text-muted-foreground/40">&bull;</span>
                <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* Author Section */}
              <div className="flex items-center justify-between py-6 border-y border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 border">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${post.frontmatter.author.replace(/\s/g, '')}`} />
                    <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground hover:underline cursor-pointer">{post.frontmatter.author}</span>
                      <button className="text-primary font-bold text-sm hover:text-primary/80 transition-colors">Follow</button>
                    </div>
                    <span className="text-muted-foreground text-xs font-medium">Sprezzaura Editorial Team</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-muted-foreground">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between py-4 border-b border-border/50">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    <Play className="h-4 w-4 fill-muted-foreground" />
                    Listen
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </header>

            {postImage && (
              <div className="relative w-full mb-12 rounded-lg overflow-hidden shadow-sm aspect-video">
                <Image
                  src={postImage.imageUrl}
                  alt={post.frontmatter.title}
                  data-ai-hint={postImage.imageHint}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-[18px] md:text-[20px] text-foreground/90 leading-[1.6] space-y-8 font-body [&_p]:mb-8 [&_h2]:text-2xl [&_h2]:font-headline [&_h2]:font-bold [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-foreground [&_strong]:font-bold"
            >
              <MDXRemote source={post.content} />
            </div>
            
            <footer className="mt-20 pt-12 border-t border-border/50">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${post.frontmatter.author.replace(/\s/g, '')}`} />
                  <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Written by</p>
                  <h3 className="text-xl font-headline font-bold mb-1">{post.frontmatter.author}</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">Dedicated to providing premium insights into cleaning, home decor, and elegant event management.</p>
                </div>
              </div>
            </footer>
          </article>
        </GsapAnimator>
      </div>
    </div>
  );
}
