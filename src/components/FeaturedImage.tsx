
import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FeaturedImageProps {
  imageUrl?: string;
  onImageChange: (file: File | null) => void;
  articleId?: string;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({ imageUrl, onImageChange, articleId }) => {
  const [preview, setPreview] = useState<string | undefined>(imageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when imageUrl prop changes
  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

  // Save image to localStorage when it changes
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please upload an image smaller than 5MB');
        return;
      }
      
      // Update preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Call parent callback
      onImageChange(file);
    } else {
      setPreview(undefined);
      onImageChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0] || null;
    handleFile(file);
  };

  const removeImage = () => {
    setPreview(undefined);
    onImageChange(null);
    
    if (articleId) {
      localStorage.removeItem(`article-featured-image-${articleId}`);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        <div
          className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging ? 'border-karo-gold bg-karo-gold/5' : 'border-karo-darkbeige hover:border-karo-gold hover:bg-karo-gold/5'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon size={48} className="text-karo-gold/70 mb-3" />
          <p className="text-karo-brown font-medium mb-1">Unggah Gambar Utama</p>
          <p className="text-karo-brown/70 text-sm mb-3">Seret file atau klik untuk memilih</p>
          <div className="flex items-center text-sm text-karo-gold">
            <Upload size={16} className="mr-1" />
            <span>Pilih File</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default FeaturedImage;
