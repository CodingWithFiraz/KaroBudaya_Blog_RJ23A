
export type Category = 
  | 'Destinasi & Tempat'
  | 'Kuliner Karo'
  | 'Sejarah'
  | 'Budaya';

export type KulinerSubcategory = 'Makanan' | 'Minuman';

export interface MapLocation {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
}

import { Block } from './blocks';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  subcategory?: KulinerSubcategory;
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
  summary?: string;
  blocks?: Block[];
}

export interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  subcategory?: KulinerSubcategory;
  featuredImage?: File | null;
  featuredImageUrl?: string;
  carouselImages?: File[];
  carouselImageUrls?: string[];
  inlineImages?: File[];
  inlineImageUrls?: string[];
  mapLocation?: MapLocation;
  summary?: string;
  blocks?: Block[];
}
