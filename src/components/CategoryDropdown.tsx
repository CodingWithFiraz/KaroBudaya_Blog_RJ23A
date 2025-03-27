import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Category } from '@/types/article';
import { CATEGORIES } from '@/utils/articleUtils';
interface CategoryDropdownProps {
  value: Category;
  onChange: (category: Category) => void;
}
const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSelect = (category: Category) => {
    onChange(category);
    setIsOpen(false);
  };
  return <div className="relative w-full" ref={dropdownRef}>
      <button type="button" className="w-full px-4 py-2 bg-white border border-karo-darkbeige rounded-md flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-karo-gold/50 transition-all" onClick={() => setIsOpen(!isOpen)}>
        <span className={value ? 'text-black' : 'text-gray-400'}>
          {value || 'Pilih Kategori'}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && <div className="absolute z-10 w-full mt-1 bg-white border border-karo-darkbeige rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in">
          <ul className="py-1">
            {CATEGORIES.map(category => {})}
          </ul>
        </div>}
    </div>;
};
export default CategoryDropdown;