import { MetadataRoute } from 'next';
import { blogPosts, services } from '@/lib/data';

const URL = 'https://www.sprezzaura.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/portfolio`,
      lastModified: new Date(),
    },
     {
      url: `${URL}/services`,
      lastModified: new Date(),
    },
  ];

  const servicePages = services.map((service) => ({
    url: `${URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogPostPages = blogPosts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...servicePages, ...blogPostPages];
}
