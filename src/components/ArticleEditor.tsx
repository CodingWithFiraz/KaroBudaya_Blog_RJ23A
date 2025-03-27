
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article, ArticleFormData, Category, KulinerSubcategory, MapLocation } from '@/types/article';
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
    featuredImage: null,
    featuredImageUrl: '',
    carouselImages: [],
    carouselImageUrls: [],
    inlineImages: [],
    inlineImageUrls: [],
    mapLocation: undefined,
    summary: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

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
        featuredImageUrl: article.featuredImage,
        carouselImageUrls: article.carouselImages || [],
        inlineImageUrls: article.inlineImages ? article.inlineImages.map(img => img.url) : [],
        mapLocation: article.mapLocation,
        summary: article.summary || '',
      });
    }
  }, [article]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: Category, subcategory?: KulinerSubcategory) => {
    setFormData(prev => ({ ...prev, category, subcategory }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ 
      ...prev, 
      featuredImage: file,
      featuredImageUrl: file ? '' : prev.featuredImageUrl
    }));
  };

  const handleCarouselImagesChange = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      carouselImages: [...(prev.carouselImages || []), ...files]
    }));
  };

  const removeCarouselImage = (index: number) => {
    setFormData(prev => {
      const newCarouselImages = [...(prev.carouselImages || [])];
      newCarouselImages.splice(index, 1);
      
      const newCarouselImageUrls = [...(prev.carouselImageUrls || [])];
      newCarouselImageUrls.splice(index, 1);
      
      return {
        ...prev,
        carouselImages: newCarouselImages,
        carouselImageUrls: newCarouselImageUrls
      };
    });
  };

  const handleInlineImageChange = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      inlineImages: [...(prev.inlineImages || []), ...files]
    }));
  };

  const handleMapLocationChange = (location: MapLocation) => {
    setFormData(prev => ({
      ...prev,
      mapLocation: location
    }));
    setShowMapPicker(false);
  };

  const removeMapLocation = () => {
    setFormData(prev => ({
      ...prev,
      mapLocation: undefined
    }));
  };

  const validateForm = (): boolean => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Judul artikel tidak boleh kosong');
      return false;
    }
    
    if (!formData.content.trim()) {
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
    
    if (!formData.featuredImage && !formData.featuredImageUrl) {
      toast.error('Gambar utama harus diupload');
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
      
      if (article) {
        // Update existing article
        await editArticle(article.id, formData, isDraft);
        navigate(isDraft ? '/drafts' : `/article/${article.id}`);
      } else {
        // Create new article
        const newArticle = await createArticle(formData, isDraft);
        navigate(isDraft ? '/drafts' : `/article/${newArticle.id}`);
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      toast.error('Gagal menyimpan artikel');
    } finally {
      setIsSubmitting(false);
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
            carouselImageUrls={formData.carouselImageUrls || []}
            inlineImageUrls={formData.inlineImageUrls || []}
            onInputChange={handleInputChange}
            onCarouselImagesChange={handleCarouselImagesChange}
            onCarouselImageRemove={removeCarouselImage}
            onInlineImageChange={handleInlineImageChange}
          />
        </div>
        
        <div className="col-span-1">
          <div className="mb-6">
            <FeaturedImage 
              imageUrl={formData.featuredImageUrl} 
              onImageChange={handleImageChange} 
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
