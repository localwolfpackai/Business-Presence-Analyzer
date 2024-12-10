import { load } from 'cheerio';
import { SocialPresenceData } from '../types';

export async function analyzeSocialPresence(html: string): Promise<SocialPresenceData> {
  const $ = load(html);
  const links = $('a[href]').map((_, el) => $(el).attr('href')).get();
  
  return {
    facebook: links.some(href => href?.includes('facebook.com')),
    twitter: links.some(href => href?.includes('twitter.com') || href?.includes('x.com')),
    linkedin: links.some(href => href?.includes('linkedin.com')),
    instagram: links.some(href => href?.includes('instagram.com'))
  };
}