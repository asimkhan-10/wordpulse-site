/**
 * Next.js Sitemap Generator
 * This file automatically creates sitemap.xml for Google.
 */

// Fixed date reflecting when site content was last updated for this release
const LAST_MODIFIED = new Date('2026-09-21');

export default async function sitemap() {
  const baseUrl = 'https://www.5letterwords.me';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // 1. Home page + static content pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Entries for all 26 SEO Letter pages
  const letterPages = alphabet.map((letter) => ({
    url: `${baseUrl}/starting-with/${letter}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...mainPages, ...letterPages];
}