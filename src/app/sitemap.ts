import { MetadataRoute } from 'next';
import { services } from '@/lib/data';
import { getPostSlugs } from '@/lib/mdx';

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

  const blogPostPages = getPostSlugs().map((slug) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...servicePages, ...blogPostPages];
}
