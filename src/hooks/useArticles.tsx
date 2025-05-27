
import { useState, useEffect, useCallback } from 'react';
import { Article, ArticleFormData, Category, KulinerSubcategory } from '@/types/article';
import { 
  getAllArticlesFromSupabase,
  getPublishedArticlesFromSupabase, 
  getDraftArticlesFromSupabase, 
  saveArticleToSupabase,
  updateArticleInSupabase,
  deleteArticleFromSupabase,
  getArticleByIdFromSupabase
} from '@/utils/supabaseArticles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [draftArticles, setDraftArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all articles from Supabase
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allArticles, published, drafts] = await Promise.all([
        getAllArticlesFromSupabase(),
        getPublishedArticlesFromSupabase(),
        getDraftArticlesFromSupabase()
      ]);
      
      setArticles(allArticles);
      setPublishedArticles(published);
      setDraftArticles(drafts);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    fetchArticles();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('articles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        () => {
          fetchArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchArticles]);

  // Create a new article
  const createArticle = async (data: ArticleFormData, isDraft: boolean) => {
    try {
      setIsLoading(true);
      
      const newArticle = await saveArticleToSupabase(data, isDraft);
      
      toast.success(isDraft ? 'Article saved to drafts' : 'Article published successfully');
      return newArticle;
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to save article');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing article
  const editArticle = async (id: string, data: ArticleFormData, isDraft: boolean) => {
    try {
      setIsLoading(true);
      
      const updatedArticle = await updateArticleInSupabase(id, data, isDraft);
      
      toast.success(isDraft ? 'Draft updated successfully' : 'Article updated and published');
      return updatedArticle;
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove an article
  const removeArticle = async (id: string) => {
    try {
      setIsLoading(true);
      const success = await deleteArticleFromSupabase(id);
      
      if (success) {
        toast.success('Article deleted successfully');
        return true;
      } else {
        toast.error('Article not found');
        return false;
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a specific article
  const getArticle = async (id: string): Promise<Article | undefined> => {
    try {
      const article = await getArticleByIdFromSupabase(id);
      return article || undefined;
    } catch (error) {
      console.error('Error fetching article:', error);
      return undefined;
    }
  };

  // Get articles by category
  const getByCategory = (category: Category): Article[] => {
    return publishedArticles.filter(article => article.category === category);
  };

  // Get articles by subcategory (for Kuliner)
  const getBySubcategory = (category: Category, subcategory: KulinerSubcategory): Article[] => {
    return publishedArticles.filter(
      article => article.category === category && article.subcategory === subcategory
    );
  };

  return {
    articles,
    publishedArticles,
    draftArticles,
    isLoading,
    createArticle,
    editArticle,
    removeArticle,
    getArticle,
    getByCategory,
    getBySubcategory,
    fetchArticles
  };
}
