import React, { useState, useEffect } from 'react';
import { Link, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface InlineImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (imageUrls: string[]) => void;
  articleId?: string;
}

const InlineImageUploader: React.FC<InlineImageUploaderProps> = ({
  existingImages = [],
  onImagesChange,
  articleId
}) => {
  const [imageUrls, setImageUrls] = useState<{id: string; url: string}[]>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  
  // Load previously saved images from localStorage on component mount
  useEffect(() => {
    if (articleId) {
      const savedImages = localStorage.getItem(`article-images-${articleId}`);
      if (savedImages) {
        setImageUrls(JSON.parse(savedImages));
      }
    }
  }, [articleId]);
  
  // Save images to localStorage whenever they change
  useEffect(() => {
    if (articleId && imageUrls.length > 0) {
      localStorage.setItem(`article-images-${articleId}`, JSON.stringify(imageUrls));
      // Trigger sync event
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  }, [imageUrls, articleId]);
  
  // Listen for storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (articleId && event.key === `article-images-${articleId}`) {
        const newImages = JSON.parse(event.newValue || '[]');
        setImageUrls(newImages);
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
        const newImage = {
          id: Math.random().toString(36).substring(2, 9),
          url: inputUrl
        };
        
        const updatedImages = [...imageUrls, newImage];
        setImageUrls(updatedImages);
        onImagesChange(updatedImages.map(img => img.url));
        setInputUrl('');
        setIsValidUrl(true);
        
        toast.success('Gambar berhasil ditambahkan');
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
  
  const copyImageTag = (id: string) => {
    const tag = `[image:${id}]`;
    navigator.clipboard.writeText(tag)
      .then(() => toast.success('Tag gambar disalin ke clipboard'))
      .catch(err => toast.error('Gagal menyalin tag'));
  };

  const removeImage = (id: string) => {
    const updatedImages = imageUrls.filter(img => img.id !== id);
    setImageUrls(updatedImages);
    onImagesChange(updatedImages.map(img => img.url));
    
    if (articleId) {
      localStorage.setItem(`article-images-${articleId}`, JSON.stringify(updatedImages));
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };
  
  return (
    <div className="space-y-3">
      {/* URL Input Section */}
      <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-3">
          <ImageIcon size={32} className="text-gray-400" />
          <span className="text-sm text-gray-500">Masukkan URL Gambar</span>
          <div className="w-full max-w-md">
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
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Existing images - in a real app, these would have IDs */}
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={image} 
              alt={`Existing ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* New image previews with copy and remove button */}
        {imageUrls.map((imageData) => (
          <div key={imageData.id} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={imageData.url} 
              alt={`Preview ${imageData.id}`}
              className="w-full h-full object-cover"
              onError={() => {
                toast.error('Gagal memuat gambar');
                removeImage(imageData.id);
              }}
            />
            <button
              type="button"
              onClick={() => copyImageTag(imageData.id)}
              className="absolute top-2 left-2 bg-white text-karo-brown p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Copy image tag to insert in content"
            >
              <Link size={14} />
            </button>
            <button
              type="button"
              onClick={() => removeImage(imageData.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500">
        Masukkan URL gambar untuk digunakan dalam artikel. Salin tag gambar dan tempel dalam konten artikel.
      </p>
    </div>
  );
};

export default InlineImageUploader;
