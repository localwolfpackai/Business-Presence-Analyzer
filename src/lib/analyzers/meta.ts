import { load } from 'cheerio';
import { MetaTagsData } from '../types';

export async function analyzeMetaTags(html: string): Promise<MetaTagsData> {
  const $ = load(html);
  
  return {
    title: $('title').text() || $('meta[property="og:title"]').attr('content') || null,
    description: $('meta[name="description"]').attr('content') || 
                $('meta[property="og:description"]').attr('content') || null,
    keywords: $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim()) || null
  };
}