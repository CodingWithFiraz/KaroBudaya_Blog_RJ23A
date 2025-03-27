
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Category, KulinerSubcategory } from '@/types/article';
import { CATEGORIES, KULINER_SUBCATEGORIES } from '@/utils/articleUtils';

interface CategoryDropdownProps {
  value: Category;
  subValue?: KulinerSubcategory;
  onChange: (category: Category, subcategory?: KulinerSubcategory) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  subValue,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const subDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (subDropdownRef.current && !subDropdownRef.current.contains(event.target as Node)) {
        setIsSubOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (category: Category) => {
    if (category === 'Kuliner Karo') {
      onChange(category, subValue || 'Makanan');
    } else {
      onChange(category, undefined);
    }
    setIsOpen(false);
  };

  const handleSubSelect = (subcategory: KulinerSubcategory) => {
    onChange(value, subcategory);
    setIsSubOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className="w-full px-4 py-2 bg-white border border-karo-darkbeige rounded-md flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-karo-gold/50 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? 'text-black' : 'text-gray-400'}>
            {value || 'Pilih Kategori'}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-karo-darkbeige rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in">
            <ul className="py-1">
              {CATEGORIES.map((category) => (
                <li
                  key={category}
                  className="px-3 py-2 hover:bg-karo-cream cursor-pointer flex items-center justify-between"
                  onClick={() => handleSelect(category)}
                >
                  <span>{category}</span>
                  {value === category && <Check size={16} className="text-karo-gold" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {value === 'Kuliner Karo' && (
        <div className="relative w-full" ref={subDropdownRef}>
          <button
            type="button"
            className="w-full px-4 py-2 bg-white border border-karo-darkbeige rounded-md flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-karo-gold/50 transition-all"
            onClick={() => setIsSubOpen(!isSubOpen)}
          >
            <span className={subValue ? 'text-black' : 'text-gray-400'}>
              {subValue || 'Pilih Jenis Kuliner'}
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${isSubOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isSubOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-karo-darkbeige rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in">
              <ul className="py-1">
                {KULINER_SUBCATEGORIES.map((subCategory) => (
                  <li
                    key={subCategory}
                    className="px-3 py-2 hover:bg-karo-cream cursor-pointer flex items-center justify-between"
                    onClick={() => handleSubSelect(subCategory)}
                  >
                    <span>{subCategory}</span>
                    {subValue === subCategory && <Check size={16} className="text-karo-gold" />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
