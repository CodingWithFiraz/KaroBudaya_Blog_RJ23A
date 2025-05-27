
import React, { useState, useRef, useEffect } from 'react';
import { Link, X, Image as ImageIcon } from 'lucide-react';

interface FeaturedImageProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
  articleId?: string;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({ imageUrl, onImageChange, articleId }) => {
  const [preview, setPreview] = useState<string | undefined>(imageUrl);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

  // Update preview when imageUrl prop changes
  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

  // Save image URL to localStorage when it changes
  useEffect(() => {
    if (articleId && preview) {
      localStorage.setItem(`article-featured-image-${articleId}`, preview);
    }
  }, [preview, articleId]);

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    if (!articleId) return;
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `article-featured-image-${articleId}`) {
        setPreview(event.newValue || undefined);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [articleId]);

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || 
             url.includes('unsplash.com') || 
             url.includes('upload.wikimedia.org') ||
             url.includes('images.') ||
             url.includes('cdn.');
    } catch {
      return false;
    }
  };

  const handleUrlSubmit = () => {
    if (inputUrl.trim()) {
      if (validateImageUrl(inputUrl)) {
        setPreview(inputUrl);
        onImageChange(inputUrl);
        setInputUrl('');
        setIsValidUrl(true);
      } else {
        setIsValidUrl(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  const removeImage = () => {
    setPreview(undefined);
    onImageChange('');
    
    if (articleId) {
      localStorage.removeItem(`article-featured-image-${articleId}`);
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-karo-darkbeige group transition-all">
          <img 
            src={preview} 
            alt="Featured" 
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            onError={() => {
              setPreview(undefined);
              setIsValidUrl(false);
            }}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X size={18} className="text-karo-red" />
          </button>
        </div>
      ) : (
        <div className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center border-karo-darkbeige">
          <ImageIcon size={48} className="text-karo-gold/70 mb-3" />
          <p className="text-karo-brown font-medium mb-1">Masukkan URL Gambar</p>
          <div className="w-full max-w-md px-4">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setIsValidUrl(true);
              }}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                !isValidUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {!isValidUrl && (
              <p className="text-red-500 text-xs mt-1">URL gambar tidak valid</p>
            )}
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="w-full mt-2 px-4 py-2 bg-karo-gold text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Tambah Gambar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedImage;
