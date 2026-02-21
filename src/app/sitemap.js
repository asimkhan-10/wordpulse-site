/**
 * Next.js Sitemap Generator
 * This file automatically creates sitemap.xml for Google.
 */

export default async function sitemap() {
  const baseUrl = 'https://5letterwords.me';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // 1. Home page entry
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
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