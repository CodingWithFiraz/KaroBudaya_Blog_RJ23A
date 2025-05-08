
import { useState, useEffect, useCallback } from 'react';
import { Article, ArticleFormData, Category, KulinerSubcategory } from '@/types/article';
import { 
  getAllArticles, 
  getPublishedArticles, 
  getDraftArticles, 
  saveArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
  getArticlesByCategory,
  getArticlesBySubcategory,
  fileToDataURL,
  initializeSampleArticles
} from '@/utils/articleUtils';
import { toast } from 'sonner';

// Set this to true to listen for storage events from other tabs/windows
const ENABLE_REALTIME = true;

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [draftArticles, setDraftArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all articles
  const fetchArticles = useCallback(() => {
    setIsLoading(true);
    try {
      const allArticles = getAllArticles();
      const published = getPublishedArticles();
      const drafts = getDraftArticles();
      
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

  // Initialize sample articles if needed
  useEffect(() => {
    const articlesExist = getAllArticles().length > 0;
    if (!articlesExist) {
      initializeSampleArticles();
      fetchArticles();
    }
  }, [fetchArticles]);

  // Listen for storage events from other tabs/windows for real-time updates
  useEffect(() => {
    if (ENABLE_REALTIME) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'karo-blog-articles') {
          fetchArticles();
          toast.info('Article content updated', {
            description: 'New changes from another device were loaded'
          });
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [fetchArticles]);

  // Initial fetch
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Create a new article
  const createArticle = async (data: ArticleFormData, isDraft: boolean) => {
    try {
      setIsLoading(true);
      
      // Handle the featured image
      let featuredImageUrl = '';
      if (data.featuredImage) {
        featuredImageUrl = await fileToDataURL(data.featuredImage);
      }
      
      const newArticle = saveArticle(
        { ...data, featuredImageUrl },
        isDraft
      );
      
      fetchArticles();
      
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
      
      // Handle the featured image
      let featuredImageUrl = data.featuredImageUrl;
      if (data.featuredImage) {
        featuredImageUrl = await fileToDataURL(data.featuredImage);
      }
      
      const updatedArticle = updateArticle(
        id,
        { ...data, featuredImageUrl },
        isDraft
      );
      
      fetchArticles();
      
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
      const success = deleteArticle(id);
      
      if (success) {
        fetchArticles();
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
  const getArticle = (id: string): Article | undefined => {
    return getArticleById(id);
  };

  // Get articles by category
  const getByCategory = (category: Category): Article[] => {
    return getArticlesByCategory(category);
  };

  // Get articles by subcategory (for Kuliner)
  const getBySubcategory = (category: Category, subcategory: KulinerSubcategory): Article[] => {
    return getArticlesBySubcategory(category, subcategory);
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
