
import { supabase } from '@/integrations/supabase/client';
import { Article, ArticleFormData } from '@/types/article';

export const uploadImageToSupabase = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('article-images')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('article-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const getAllArticlesFromSupabase = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data.map(article => ({
    id: article.id,
    title: article.title,
    content: article.content,
    summary: article.summary || '',
    author: article.author,
    email: article.email,
    category: article.category as any,
    subcategory: article.subcategory as any,
    featuredImage: article.featured_image_url || '',
    mapLocation: article.map_location,
    publishDate: article.publish_date,
    isDraft: article.is_draft,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
    views: article.views || 0,
    likes: article.likes || 0,
    blocks: article.blocks
  }));
};

export const getPublishedArticlesFromSupabase = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_draft', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }

  return data.map(article => ({
    id: article.id,
    title: article.title,
    content: article.content,
    summary: article.summary || '',
    author: article.author,
    email: article.email,
    category: article.category as any,
    subcategory: article.subcategory as any,
    featuredImage: article.featured_image_url || '',
    mapLocation: article.map_location,
    publishDate: article.publish_date,
    isDraft: article.is_draft,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
    views: article.views || 0,
    likes: article.likes || 0,
    blocks: article.blocks
  }));
};

export const getDraftArticlesFromSupabase = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_draft', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching draft articles:', error);
    return [];
  }

  return data.map(article => ({
    id: article.id,
    title: article.title,
    content: article.content,
    summary: article.summary || '',
    author: article.author,
    email: article.email,
    category: article.category as any,
    subcategory: article.subcategory as any,
    featuredImage: article.featured_image_url || '',
    mapLocation: article.map_location,
    publishDate: article.publish_date,
    isDraft: article.is_draft,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
    views: article.views || 0,
    likes: article.likes || 0,
    blocks: article.blocks
  }));
};

export const saveArticleToSupabase = async (articleData: ArticleFormData, isDraft: boolean): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: articleData.title,
      content: articleData.content,
      summary: articleData.summary,
      author: articleData.author,
      email: articleData.email,
      category: articleData.category,
      subcategory: articleData.subcategory,
      featured_image_url: articleData.featuredImageUrl,
      map_location: articleData.mapLocation,
      publish_date: isDraft ? null : new Date().toISOString(),
      is_draft: isDraft,
      blocks: articleData.blocks
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error saving article: ${error.message}`);
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    summary: data.summary || '',
    author: data.author,
    email: data.email,
    category: data.category as any,
    subcategory: data.subcategory as any,
    featuredImage: data.featured_image_url || '',
    mapLocation: data.map_location,
    publishDate: data.publish_date,
    isDraft: data.is_draft,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    views: data.views || 0,
    likes: data.likes || 0,
    blocks: data.blocks
  };
};

export const updateArticleInSupabase = async (id: string, articleData: ArticleFormData, isDraft: boolean): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .update({
      title: articleData.title,
      content: articleData.content,
      summary: articleData.summary,
      author: articleData.author,
      email: articleData.email,
      category: articleData.category,
      subcategory: articleData.subcategory,
      featured_image_url: articleData.featuredImageUrl,
      map_location: articleData.mapLocation,
      publish_date: isDraft ? null : new Date().toISOString(),
      is_draft: isDraft,
      blocks: articleData.blocks,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating article: ${error.message}`);
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    summary: data.summary || '',
    author: data.author,
    email: data.email,
    category: data.category as any,
    subcategory: data.subcategory as any,
    featuredImage: data.featured_image_url || '',
    mapLocation: data.map_location,
    publishDate: data.publish_date,
    isDraft: data.is_draft,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    views: data.views || 0,
    likes: data.likes || 0,
    blocks: data.blocks
  };
};

export const deleteArticleFromSupabase = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    return false;
  }

  return true;
};

export const getArticleByIdFromSupabase = async (id: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    summary: data.summary || '',
    author: data.author,
    email: data.email,
    category: data.category as any,
    subcategory: data.subcategory as any,
    featuredImage: data.featured_image_url || '',
    mapLocation: data.map_location,
    publishDate: data.publish_date,
    isDraft: data.is_draft,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    views: data.views || 0,
    likes: data.likes || 0,
    blocks: data.blocks
  };
};
