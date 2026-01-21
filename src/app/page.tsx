import { getAllPosts, Post } from '@/lib/mdx';
import HomePageClient from '@/components/home/HomePageClient';

export default function Home() {
  const allPosts: Post[] = getAllPosts();
  const featuredBlogPosts = allPosts.slice(0, 3);

  return <HomePageClient featuredBlogPosts={featuredBlogPosts} />;
}
