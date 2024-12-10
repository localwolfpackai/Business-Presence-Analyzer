export interface BusinessData {
  visibility: number;
  reviews: number;
  directories: number;
  seoScore: number;
  metaTags: MetaTagsData;
  socialPresence: SocialPresenceData;
}

export interface MetaTagsData {
  title: string | null;
  description: string | null;
  keywords: string[] | null;
}

export interface SocialPresenceData {
  facebook: boolean;
  twitter: boolean;
  linkedin: boolean;
  instagram: boolean;
}