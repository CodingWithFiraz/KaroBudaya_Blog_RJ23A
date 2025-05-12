
import React, { useState, useEffect } from 'react';
import { Upload, X, Copy } from 'lucide-react';
import { fileToDataURL } from '@/utils/articleUtils';
import { toast } from 'sonner';

interface InlineImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (files: File[]) => void;
  articleId?: string;
}

const InlineImageUploader: React.FC<InlineImageUploaderProps> = ({
  existingImages = [],
  onImagesChange,
  articleId
}) => {
  const [previewImages, setPreviewImages] = useState<{id: string; url: string}[]>([]);
  
  // Load previously saved images from localStorage on component mount
  useEffect(() => {
    if (articleId) {
      const savedImages = localStorage.getItem(`article-images-${articleId}`);
      if (savedImages) {
        setPreviewImages(JSON.parse(savedImages));
      }
    }
  }, [articleId]);
  
  // Save images to localStorage whenever they change
  useEffect(() => {
    if (articleId && previewImages.length > 0) {
      localStorage.setItem(`article-images-${articleId}`, JSON.stringify(previewImages));
      // Trigger sync event
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  }, [previewImages, articleId]);
  
  // Listen for storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (articleId && event.key === `article-images-${articleId}`) {
        const newImages = JSON.parse(event.newValue || '[]');
        setPreviewImages(newImages);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [articleId]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Generate previews with IDs
    const newPreviews: {id: string; url: string}[] = [];
    for (const file of files) {
      try {
        const dataUrl = await fileToDataURL(file);
        newPreviews.push({
          id: Math.random().toString(36).substring(2, 9),
          url: dataUrl
        });
      } catch (error) {
        console.error('Error creating preview:', error);
      }
    }
    
    const updatedPreviews = [...previewImages, ...newPreviews];
    setPreviewImages(updatedPreviews);
    onImagesChange(files);
    
    // Reset the input
    e.target.value = '';
  };
  
  const copyImageTag = (id: string) => {
    const tag = `[image:${id}]`;
    navigator.clipboard.writeText(tag)
      .then(() => toast.success('Tag gambar disalin ke clipboard'))
      .catch(err => toast.error('Gagal menyalin tag'));
  };
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Existing images - in a real app, these would have IDs */}
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={image} 
              alt={`Inline ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* New image previews with copy button */}
        {previewImages.map((preview) => (
          <div key={preview.id} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={preview.url} 
              alt={`Preview ${preview.id}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => copyImageTag(preview.id)}
              className="absolute top-2 right-2 bg-white text-karo-brown p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Copy image tag to insert in content"
            >
              <Copy size={14} />
            </button>
          </div>
        ))}
        
        {/* Upload button */}
        <label className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <Upload size={24} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Upload Gambar</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      
      <p className="text-sm text-gray-500">
        Upload gambar untuk digunakan dalam artikel. Salin tag gambar dan tempel dalam konten artikel.
      </p>
    </div>
  );
};

export default InlineImageUploader;
