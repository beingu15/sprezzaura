import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the shape of the frontmatter
export interface Frontmatter {
  title: string;
  date: string;
  author: string;
  imageId: string;
  excerpt: string;
  [key: string]: any; 
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Could not read posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug, frontmatter: data as Frontmatter, content };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => {
        const { frontmatter } = getPostBySlug(slug);
        return { slug, frontmatter };
    })
    // Sort posts by date in descending order
    .sort((post1, post2) => (new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date) ? -1 : 1));
  return posts;
}
