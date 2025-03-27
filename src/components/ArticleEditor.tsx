
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedImage from './FeaturedImage';
import CategoryDropdown from './CategoryDropdown';
import { Article, ArticleFormData, Category, KulinerSubcategory, MapLocation } from '@/types/article';
import { CATEGORIES } from '@/utils/articleUtils';
import { useArticles } from '@/hooks/useArticles';
import { toast } from 'sonner';
import { MapPin, Upload, X, Image as ImageIcon } from 'lucide-react';
import MapLocationPicker from './MapLocationPicker';
import CarouselImageUploader from './CarouselImageUploader';
import InlineImageUploader from './InlineImageUploader';

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

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Judul artikel tidak boleh kosong');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Konten artikel tidak boleh kosong');
      return;
    }
    
    if (!formData.author.trim()) {
      toast.error('Nama penulis tidak boleh kosong');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email penulis tidak boleh kosong');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }
    
    if (!formData.featuredImage && !formData.featuredImageUrl) {
      toast.error('Gambar utama harus diupload');
      return;
    }
    
    // If category is Kuliner, validate subcategory
    if (formData.category === 'Kuliner Karo' && !formData.subcategory) {
      toast.error('Pilih jenis kuliner (Makanan/Minuman)');
      return;
    }
    
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
          <div className="mb-4">
            <label htmlFor="title" className="block text-karo-black font-medium mb-1">
              JUDUL
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Tulis judul artikel yang menarik"
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="summary" className="block text-karo-black font-medium mb-1">
              RINGKASAN
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Tulis ringkasan singkat dari artikel (opsional)"
              className="textarea-field"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-karo-black font-medium mb-1">
              ISI ARTIKEL
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Tulis artikel dengan bahasa yang jelas dan informatif"
              className="textarea-field"
              rows={10}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              GAMBAR UNTUK CAROUSEL
            </label>
            <CarouselImageUploader
              existingImages={formData.carouselImageUrls || []}
              onImagesChange={handleCarouselImagesChange}
              onImageRemove={removeCarouselImage}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              GAMBAR UNTUK KONTEN ARTIKEL
            </label>
            <InlineImageUploader
              existingImages={formData.inlineImageUrls || []}
              onImagesChange={handleInlineImageChange}
            />
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="mb-6">
            <FeaturedImage 
              imageUrl={formData.featuredImageUrl} 
              onImageChange={handleImageChange} 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              NAMA AUTHOR
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Nama penulis artikel"
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email penulis"
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              KATEGORI
            </label>
            <CategoryDropdown 
              value={formData.category} 
              subValue={formData.subcategory}
              onChange={handleCategoryChange} 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-karo-black font-medium mb-1">
              LOKASI
            </label>
            {formData.mapLocation ? (
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{formData.mapLocation.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formData.mapLocation.latitude.toFixed(6)}, {formData.mapLocation.longitude.toFixed(6)}
                    </p>
                    {formData.mapLocation.address && (
                      <p className="text-sm mt-1">{formData.mapLocation.address}</p>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={removeMapLocation}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowMapPicker(true)}
                className="w-full flex items-center justify-center gap-2 p-3 border border-dashed rounded-lg text-karo-brown hover:bg-karo-cream/20 transition-colors"
              >
                <MapPin size={18} />
                Tambahkan Lokasi
              </button>
            )}
            
            {showMapPicker && (
              <MapLocationPicker
                onLocationChange={handleMapLocationChange}
                onCancel={() => setShowMapPicker(false)}
              />
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              Simpan Draft
            </button>
            
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isSubmitting}
              className="btn-primary"
            >
              Publish Article
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;
