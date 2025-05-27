
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/supabaseArticles';
import { toast } from 'sonner';

interface FeaturedImageProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
  articleId?: string;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({ imageUrl, onImageChange, articleId }) => {
  const [preview, setPreview] = useState<string | undefined>(imageUrl);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when imageUrl prop changes
  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || 
             url.includes('unsplash.com') || 
             url.includes('upload.wikimedia.org') ||
             url.includes('images.') ||
             url.includes('cdn.') ||
             url.includes('supabase');
    } catch {
      return false;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToSupabase(file);
      setPreview(imageUrl);
      onImageChange(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
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
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
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
          <p className="text-karo-brown font-medium mb-3">Upload atau Masukkan URL Gambar</p>
          
          {/* File Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mb-3 px-4 py-2 bg-karo-gold text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </div>
            ) : (
              <div className="flex items-center">
                <Upload size={16} className="mr-2" />
                Upload File
              </div>
            )}
          </button>
          
          <div className="text-sm text-gray-500 mb-3">atau</div>
          
          {/* URL Input */}
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
              <div className="flex items-center justify-center">
                <Link size={16} className="mr-2" />
                Tambah dari URL
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedImage;
