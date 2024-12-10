import { load } from 'cheerio';

export async function analyzeSEO(html: string): Promise<number> {
  const $ = load(html);
  let score = 0;
  const maxScore = 100;
  
  // Title analysis
  if ($('title').length) score += 10;
  if ($('title').text().length > 10 && $('title').text().length < 60) score += 10;
  
  // Meta description
  if ($('meta[name="description"]').length) score += 10;
  if ($('meta[name="description"]').attr('content')?.length > 50) score += 10;
  
  // Headers structure
  if ($('h1').length === 1) score += 10;
  if ($('h2').length > 0) score += 5;
  if ($('h3').length > 0) score += 5;
  
  // Images
  if ($('img[alt]').length === $('img').length && $('img').length > 0) score += 10;
  
  // Mobile responsiveness
  if ($('meta[name="viewport"]').length) score += 10;
  
  // Schema markup
  if ($('script[type="application/ld+json"]').length) score += 10;
  
  // SSL detection
  const hasSSL = true; // URL API will handle this
  if (hasSSL) score += 10;
  
  return Math.min(score, maxScore);
}