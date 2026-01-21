import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { GsapAnimator } from '@/components/shared/GsapAnimator';

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

  return (
    <div className="bg-background/95">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 md:px-6">
        <Breadcrumbs className="mb-8" />
        <GsapAnimator>
          <article>
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{post.frontmatter.title}</h1>
              <div className="text-muted-foreground text-sm">
                <span>By {post.frontmatter.author}</span> &bull; <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </header>

            {postImage && (
              <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden shadow-lg">
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
              className="text-lg text-muted-foreground leading-relaxed space-y-6 [&_ol]:list-decimal [&_ol]:list-inside [&_ul]:list-disc [&_ul]:list-inside [&_strong]:font-semibold [&_strong]:text-foreground"
            >
              <MDXRemote source={post.content} />
            </div>
          </article>
        </GsapAnimator>
      </div>
    </div>
  );
}
