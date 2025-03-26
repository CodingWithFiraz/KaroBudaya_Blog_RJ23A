
export type Category = 
  | 'Destinasi & Tempat'
  | 'Bahasa & Aksara Karo'
  | 'Tari Karo'
  | 'Kuliner Karo'
  | 'Budaya & Tradisi Karo'
  | 'Budaya'
  | 'Pakaian Adat';

export interface MapLocation {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  featuredImage: string;
  carouselImages?: string[];
  inlineImages?: { id: string; url: string }[];
  mapLocation?: MapLocation;
  publishDate?: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
}

export interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  featuredImage?: File | null;
  featuredImageUrl?: string;
  carouselImages?: File[];
  carouselImageUrls?: string[];
  inlineImages?: File[];
  inlineImageUrls?: string[];
  mapLocation?: MapLocation;
}
