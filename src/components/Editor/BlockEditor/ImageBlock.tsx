
import React, { useState, useRef } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/blocks';
import BlockControls from './BlockControls';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/supabaseArticles';
import { toast } from 'sonner';

interface ImageBlockProps {
  block: ImageBlockType;
  index: number;
  totalBlocks: number;
  onChange: (id: string, updates: Partial<ImageBlockType>) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
  articleId?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  block,
  index,
  totalBlocks,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
  articleId
}) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onChange(block.id, { url: imageUrl });
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
        onChange(block.id, { url: inputUrl });
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

  const handleRemoveImage = () => {
    onChange(block.id, { url: '' });
  };

  return (
    <div className="block-item group relative mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <BlockControls
        index={index}
        totalBlocks={totalBlocks}
        onMoveUp={() => onMoveUp(block.id)}
        onMoveDown={() => onMoveDown(block.id)}
        onDelete={() => onDelete(block.id)}
      />
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 focus-within:ring-2 focus-within:ring-karo-gold focus-within:ring-opacity-50">
        {block.url ? (
          <div className="relative">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity"
            >
              <X size={16} />
            </button>
            <img
              src={block.url}
              alt={block.alt || 'Uploaded image'}
              className="max-w-full max-h-[400px] object-contain mx-auto rounded"
              onError={() => onChange(block.id, { url: '' })}
            />
            <div className="mt-2">
              <input
                type="text"
                value={block.caption || ''}
                onChange={(e) => onChange(block.id, { caption: e.target.value })}
                placeholder="Add image caption..."
                className="w-full p-2 text-sm text-center border border-gray-200 dark:border-gray-700 rounded"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={block.alt || ''}
                onChange={(e) => onChange(block.id, { alt: e.target.value })}
                placeholder="Add alt text for accessibility..."
                className="w-full p-2 text-sm text-center border border-gray-200 dark:border-gray-700 rounded"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 mb-2">Upload atau Masukkan URL Gambar</span>
            
            {/* File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mb-2 px-3 py-1 bg-karo-gold text-white text-sm rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center">
                  <Upload size={14} className="mr-1" />
                  Upload File
                </div>
              )}
            </button>
            
            <div className="text-xs text-gray-400 mb-2">atau</div>
            
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
                  !isValidUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {!isValidUrl && (
                <p className="text-red-500 text-xs mt-1">URL gambar tidak valid</p>
              )}
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="w-full mt-2 px-3 py-1 bg-karo-gold text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
              >
                <div className="flex items-center justify-center">
                  <Link size={14} className="mr-1" />
                  Tambah dari URL
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
