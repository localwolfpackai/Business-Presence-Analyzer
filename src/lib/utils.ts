import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BusinessData } from './types';
import { analyzeMetaTags } from './analyzers/meta';
import { analyzeSocialPresence } from './analyzers/social';
import { analyzeSEO } from './analyzers/seo';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function analyzeBusiness(url: string): Promise<BusinessData> {
  try {
    // Fetch the HTML content using a CORS proxy
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    const html = data.contents;

    // Parallel analysis
    const [metaTags, socialPresence, seoScore] = await Promise.all([
      analyzeMetaTags(html),
      analyzeSocialPresence(html),
      analyzeSEO(html)
    ]);

    // Calculate visibility score based on meta tags and social presence
    const visibilityScore = calculateVisibilityScore(metaTags, socialPresence);
    
    // Calculate directory presence (based on social profiles)
    const directoryCount = Object.values(socialPresence).filter(Boolean).length;

    return {
      visibility: visibilityScore,
      reviews: 0, // Reviews would require specific API access
      directories: directoryCount,
      seoScore,
      metaTags,
      socialPresence
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze business presence');
  }
}

function calculateVisibilityScore(
  metaTags: BusinessData['metaTags'],
  socialPresence: BusinessData['socialPresence']
): number {
  let score = 0;
  const maxScore = 100;

  // Meta tags contribution
  if (metaTags.title) score += 20;
  if (metaTags.description) score += 20;
  if (metaTags.keywords?.length) score += 10;

  // Social presence contribution
  const socialProfiles = Object.values(socialPresence).filter(Boolean).length;
  score += socialProfiles * 12.5; // Each social profile adds 12.5 points

  return Math.min(score, maxScore);
}