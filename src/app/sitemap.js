/**
 * Next.js Sitemap Generator
 * This file automatically creates sitemap.xml for Google.
 */

export default async function sitemap() {
  const baseUrl = 'https://5letterwords.me';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // 1. Home page + static content pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Entries for all 26 SEO Letter pages
  const letterPages = alphabet.map((letter) => ({
    url: `${baseUrl}/starting-with/${letter}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...mainPages, ...letterPages];
}