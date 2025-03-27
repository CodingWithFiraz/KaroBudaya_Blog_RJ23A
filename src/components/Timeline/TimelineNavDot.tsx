
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineNavDotProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const TimelineNavDot: React.FC<TimelineNavDotProps> = ({ 
  id, 
  label, 
  isActive, 
  onClick 
}) => {
  const handleClick = () => {
    onClick(id);
    
    // Scroll to element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center"
      aria-label={`Navigate to ${label}`}
    >
      <div 
        className={cn(
          "w-3 h-3 rounded-full transition-all duration-300 mb-1",
          isActive ? "bg-karo-gold dark:bg-karo-darkgold scale-125" : "bg-gray-300 dark:bg-gray-600 group-hover:bg-karo-gold/70 dark:group-hover:bg-karo-darkgold/70"
        )}
      />
      <span 
        className={cn(
          "text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute",
          isActive ? "text-karo-gold dark:text-karo-darkgold" : "text-gray-500 dark:text-gray-400"
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default TimelineNavDot;
