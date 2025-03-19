
export type Category = 
  | 'Destinasi & Tempat'
  | 'Bahasa & Aksara Karo'
  | 'Tari Karo'
  | 'Kuliner Karo'
  | 'Budaya & Tradisi Karo'
  | 'Musik Karo'
  | 'Pakaian Adat';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  featuredImage: string;
  publishDate?: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  email: string;
  category: Category;
  featuredImage?: File | null;
  featuredImageUrl?: string;
}
