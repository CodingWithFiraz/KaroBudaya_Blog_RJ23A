import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article, ArticleFormData, Category, KulinerSubcategory, MapLocation } from '@/types/article';
import { Block } from '@/types/blocks';
import { CATEGORIES } from '@/utils/articleUtils';
import { useArticles } from '@/hooks/useArticles';
import { toast } from 'sonner';
import FeaturedImage from './FeaturedImage';
import CategoryDropdown from './CategoryDropdown';
import FormSection from './Editor/FormSection';
import ArticleContentSection from './Editor/ArticleContentSection';
import AuthorInfoSection from './Editor/AuthorInfoSection';
import LocationSection from './Editor/LocationSection';
import EditorActions from './Editor/EditorActions';

interface ArticleEditorProps {
  article?: Article;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ article }) => {
  const navigate = useNavigate();
  const { createArticle, editArticle } = useArticles();
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    author: '',
    email: '',
    category: CATEGORIES[0],
    subcategory: undefined,
    featuredImageUrl: '',
    mapLocation: undefined,
    summary: '',
  });
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [articleId, setArticleId] = useState<string>('');

  // Initialize form with article data if editing
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        author: article.author,
        email: article.email,
        category: article.category,
        subcategory: article.subcategory,
        featuredImageUrl: article.featuredImage, // Use featuredImage as URL
        mapLocation: article.mapLocation,
        summary: article.summary || '',
      });
      
      // If there are blocks stored in the article, load them
      if (article.blocks) {
        setBlocks(article.blocks);
      }
      
      // Set articleId for real-time sync
      setArticleId(article.id);
    } else {
      // Generate a temporary ID for new articles
      setArticleId(`new-${Date.now()}`);
    }
  }, [article]);

  // Listen for storage events to sync featured image
  useEffect(() => {
    if (!articleId) return;
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `article-featured-image-${articleId}` && event.newValue) {
        setFormData(prev => ({
          ...prev,
          featuredImageUrl: event.newValue || ''
        }));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [articleId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Store author and email in localStorage for sync
    if (name === 'author' || name === 'email') {
      localStorage.setItem(`article-${name}-${articleId}`, value);
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  const handleBlocksChange = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    
    // Also update the content field with a serialized version of the blocks
    // This ensures backward compatibility
    const content = serializeBlocks(newBlocks);
    setFormData(prev => ({ ...prev, content }));
  };
  
  // Helper function to serialize blocks to plain text
  const serializeBlocks = (blocks: Block[]): string => {
    return blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return block.content;
        case 'heading':
          return `${Array(block.level + 1).join('#')} ${block.content}`;
        case 'image':
          return `[Image: ${block.caption || 'Untitled'}]`;
        case 'quote':
          return `> ${block.content}${block.citation ? `\n— ${block.citation}` : ''}`;
        default:
          return '';
      }
    }).join('\n\n');
  };

  const handleCategoryChange = (category: Category, subcategory?: KulinerSubcategory) => {
    setFormData(prev => ({ ...prev, category, subcategory }));
    
    // Store category and subcategory in localStorage for sync
    if (articleId) {
      localStorage.setItem(`article-category-${articleId}`, category);
      if (subcategory) {
        localStorage.setItem(`article-subcategory-${articleId}`, subcategory);
      } else {
        localStorage.removeItem(`article-subcategory-${articleId}`);
      }
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  const handleImageChange = (url: string) => {
    setFormData(prev => ({ 
      ...prev, 
      featuredImageUrl: url
    }));
    
    if (url && articleId) {
      localStorage.setItem(`article-featured-image-${articleId}`, url);
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    } else if (articleId) {
      localStorage.removeItem(`article-featured-image-${articleId}`);
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  const handleMapLocationChange = (location: MapLocation) => {
    setFormData(prev => ({
      ...prev,
      mapLocation: location
    }));
    setShowMapPicker(false);
    
    // Store location in localStorage for sync
    if (articleId) {
      localStorage.setItem(`article-map-location-${articleId}`, JSON.stringify(location));
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  const removeMapLocation = () => {
    setFormData(prev => ({
      ...prev,
      mapLocation: undefined
    }));
    
    // Remove location from localStorage
    if (articleId) {
      localStorage.removeItem(`article-map-location-${articleId}`);
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  const validateForm = (): boolean => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Judul artikel tidak boleh kosong');
      return false;
    }
    
    if (blocks.length === 0) {
      toast.error('Konten artikel tidak boleh kosong');
      return false;
    }
    
    if (!formData.author.trim()) {
      toast.error('Nama penulis tidak boleh kosong');
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email penulis tidak boleh kosong');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Format email tidak valid');
      return false;
    }
    
    if (!formData.featuredImageUrl) {
      toast.error('URL gambar utama harus diisi');
      return false;
    }
    
    // If category is Kuliner, validate subcategory
    if (formData.category === 'Kuliner Karo' && !formData.subcategory) {
      toast.error('Pilih jenis kuliner (Makanan/Minuman)');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Include blocks in the submission data
      const submissionData = {
        ...formData,
        blocks
      };
      
      let savedArticle;
      
      if (article) {
        // Update existing article
        savedArticle = await editArticle(article.id, submissionData, isDraft);
        
        // Clean up localStorage for this article
        cleanupLocalStorage(article.id);
        
        navigate(isDraft ? '/drafts' : `/article/${article.id}`);
      } else {
        // Create new article
        savedArticle = await createArticle(submissionData, isDraft);
        
        // Clean up localStorage for temporary ID
        cleanupLocalStorage(articleId);
        
        navigate(isDraft ? '/drafts' : `/article/${savedArticle.id}`);
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      toast.error('Gagal menyimpan artikel');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper to clean up localStorage items when article is saved
  const cleanupLocalStorage = (id: string) => {
    localStorage.removeItem(`article-blocks-${id}`);
    localStorage.removeItem(`article-title-${id}`);
    localStorage.removeItem(`article-summary-${id}`);
    localStorage.removeItem(`article-featured-image-${id}`);
    localStorage.removeItem(`article-author-${id}`);
    localStorage.removeItem(`article-email-${id}`);
    localStorage.removeItem(`article-category-${id}`);
    localStorage.removeItem(`article-subcategory-${id}`);
    localStorage.removeItem(`article-map-location-${id}`);
    localStorage.removeItem(`article-images-${id}`);
    
    // Also clean up any image blocks
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`article-block-image-${id}-`)) {
        localStorage.removeItem(key);
      }
    }
  };

  return (
    <div className="editor-container animate-fade-up">
      <h1 className="text-3xl font-serif font-bold mb-2">
        <span className="text-karo-gold">Tulis Artikelmu & </span>
        <span className="text-karo-black">Publikasikan!</span>
      </h1>
      <p className="text-karo-brown mb-6">
        Bagikan pengetahuan dan wawasan tentang budaya Karo melalui tulisanmu.
      </p>
      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <ArticleContentSection 
            title={formData.title}
            summary={formData.summary || ''}
            content={formData.content}
            blocks={blocks}
            onInputChange={handleInputChange}
            onBlocksChange={handleBlocksChange}
            articleId={articleId}
          />
        </div>
        
        <div className="col-span-1">
          <div className="mb-6">
            <FeaturedImage 
              imageUrl={formData.featuredImageUrl} 
              onImageChange={handleImageChange} 
              articleId={articleId}
            />
          </div>
          
          <AuthorInfoSection 
            author={formData.author}
            email={formData.email}
            onAuthorChange={handleInputChange}
            onEmailChange={handleInputChange}
          />
          
          <FormSection title="KATEGORI">
            <CategoryDropdown 
              value={formData.category} 
              subValue={formData.subcategory}
              onChange={handleCategoryChange} 
            />
          </FormSection>
          
          <LocationSection 
            mapLocation={formData.mapLocation}
            showMapPicker={showMapPicker}
            onShowMapPicker={() => setShowMapPicker(true)}
            onHideMapPicker={() => setShowMapPicker(false)}
            onLocationChange={handleMapLocationChange}
            onLocationRemove={removeMapLocation}
          />
          
          <EditorActions 
            isSubmitting={isSubmitting}
            onSaveDraft={(e) => handleSubmit(e, true)}
            onPublish={(e) => handleSubmit(e, false)}
          />
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;
