
import { Article, ArticleFormData, Category, KulinerSubcategory, MapLocation } from '@/types/article';
import { Block } from '@/types/blocks';

// In a real application, this would be replaced with API calls to a backend server
// For this demo, we'll use localStorage to persist data

const STORAGE_KEY = 'karo-blog-articles';

export const getAllArticles = (): Article[] => {
  const articles = localStorage.getItem(STORAGE_KEY);
  return articles ? JSON.parse(articles) : [];
};

export const getPublishedArticles = (): Article[] => {
  return getAllArticles().filter(article => !article.isDraft);
};

export const getDraftArticles = (): Article[] => {
  return getAllArticles().filter(article => article.isDraft);
};

export const getArticleById = (id: string): Article | undefined => {
  return getAllArticles().find(article => article.id === id);
};

export const getArticlesByCategory = (category: Category): Article[] => {
  return getPublishedArticles().filter(article => article.category === category);
};

export const getArticlesBySubcategory = (category: Category, subcategory: KulinerSubcategory): Article[] => {
  return getPublishedArticles().filter(
    article => article.category === category && article.subcategory === subcategory
  );
};

export const saveArticle = (articleData: ArticleFormData, isDraft: boolean): Article => {
  const articles = getAllArticles();
  const now = new Date().toISOString();
  
  // Create a new article
  const newArticle: Article = {
    id: crypto.randomUUID(),
    title: articleData.title,
    content: articleData.content,
    author: articleData.author,
    email: articleData.email,
    category: articleData.category,
    subcategory: articleData.subcategory,
    featuredImage: articleData.featuredImageUrl || '',
    mapLocation: articleData.mapLocation,
    publishDate: isDraft ? undefined : now,
    isDraft,
    createdAt: now,
    updatedAt: now,
    summary: articleData.summary,
    blocks: articleData.blocks
  };
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...articles, newArticle]));
  
  return newArticle;
};

export const updateArticle = (id: string, articleData: ArticleFormData, isDraft: boolean): Article => {
  const articles = getAllArticles();
  const articleIndex = articles.findIndex(article => article.id === id);
  
  if (articleIndex === -1) {
    throw new Error('Article not found');
  }
  
  const now = new Date().toISOString();
  const existingArticle = articles[articleIndex];
  
  // Update the article
  const updatedArticle: Article = {
    ...existingArticle,
    title: articleData.title,
    content: articleData.content,
    author: articleData.author,
    email: articleData.email,
    category: articleData.category,
    subcategory: articleData.subcategory,
    featuredImage: articleData.featuredImageUrl || existingArticle.featuredImage,
    mapLocation: articleData.mapLocation,
    publishDate: isDraft ? existingArticle.publishDate : (existingArticle.publishDate || now),
    isDraft,
    updatedAt: now,
    summary: articleData.summary || existingArticle.summary,
    blocks: articleData.blocks || existingArticle.blocks
  };
  
  // Replace the old article with the updated one
  articles[articleIndex] = updatedArticle;
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  
  return updatedArticle;
};

export const deleteArticle = (id: string): boolean => {
  const articles = getAllArticles();
  const updatedArticles = articles.filter(article => article.id !== id);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
  
  return updatedArticles.length < articles.length;
};

// Convert file to data URL for storage
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const CATEGORIES: Category[] = [
  'Destinasi & Tempat',
  'Kuliner Karo',
  'Sejarah',
  'Budaya'
];

export const KULINER_SUBCATEGORIES: KulinerSubcategory[] = [
  'Makanan',
  'Minuman'
];
