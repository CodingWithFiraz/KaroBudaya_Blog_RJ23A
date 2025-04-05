
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Type, Image, Quote, Heading } from 'lucide-react';
import { BlockType } from '@/types/blocks';

interface BlockAdderProps {
  onAddBlock: (type: BlockType) => void;
}

const BlockAdder: React.FC<BlockAdderProps> = ({ onAddBlock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddBlock = (type: BlockType) => {
    onAddBlock(type);
    setIsOpen(false);
  };

  return (
    <div className="relative my-4 flex justify-center" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:text-karo-gold hover:border-karo-gold transition-colors shadow-sm"
      >
        <Plus size={16} />
        <span>Add Block</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 z-10 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 w-60 py-1">
          <button
            type="button"
            onClick={() => handleAddBlock('paragraph')}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Type size={16} className="text-gray-500" />
            <span>Paragraph</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock('heading')}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Heading size={16} className="text-gray-500" />
            <span>Heading</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock('image')}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image size={16} className="text-gray-500" />
            <span>Image</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock('quote')}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Quote size={16} className="text-gray-500" />
            <span>Quote</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockAdder;
