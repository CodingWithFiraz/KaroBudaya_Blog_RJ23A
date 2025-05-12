
import React, { useRef, useEffect } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/blocks';
import BlockControls from './BlockControls';
import { Upload, X } from 'lucide-react';
import { fileToDataURL } from '@/utils/articleUtils';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store image in localStorage when it changes
  useEffect(() => {
    if (articleId && block.url) {
      const imageKey = `article-block-image-${articleId}-${block.id}`;
      localStorage.setItem(imageKey, block.url);
      
      // Trigger sync event
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  }, [block.url, block.id, articleId]);

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    if (!articleId) return;
    
    const imageKey = `article-block-image-${articleId}-${block.id}`;
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === imageKey && event.newValue && event.newValue !== block.url) {
        onChange(block.id, { url: event.newValue });
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [articleId, block.id, block.url, onChange]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataURL(file);
      onChange(block.id, { url: dataUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    // Reset input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    onChange(block.id, { url: '' });
    
    // Also remove from localStorage if articleId is provided
    if (articleId) {
      localStorage.removeItem(`article-block-image-${articleId}-${block.id}`);
    }
  };

  return (
    <div className="block-item group relative mb-4">
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
          <label className="flex flex-col items-center justify-center h-32 cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
