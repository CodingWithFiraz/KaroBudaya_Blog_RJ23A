
import React, { useRef, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { Article } from '@/types/article';

interface TimelineItemProps {
  article: Article;
  index: number;
  id: string;
  onInView?: (id: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  article, 
  index, 
  id,
  onInView 
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate a safe URL-friendly slug from the title
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
    
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (onInView) {
            onInView(id);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
      }
    );
    
    const currentRef = itemRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [id, onInView]);
  
  const isEven = index % 2 === 0;
  
  return (
    <div 
      id={id}
      ref={itemRef}
      className={cn(
        "flex flex-col md:flex-row items-center mb-10 relative",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none flex justify-center items-center z-10">
        <div className="w-4 h-4 bg-karo-gold dark:bg-karo-darkgold rounded-full"></div>
      </div>
      
      {/* Content */}
      <div 
        className={cn(
          "w-full md:w-5/12 p-4",
          isEven ? "md:text-right" : "md:text-left",
          isEven ? "slide-in-right" : "slide-in-left",
          isVisible && "slide-in-active"
        )}
      >
        <Card className="overflow-hidden shadow-md dark:bg-karo-darkcard">
          <div className="h-48 overflow-hidden">
            <img 
              src={article.featuredImage || '/placeholder.svg'} 
              alt={article.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <Link to={`/article/${article.id}/${slug}`}>
              <h3 className="text-xl font-serif font-semibold mb-2 hover:text-karo-gold dark:hover:text-karo-darkgold transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="text-karo-brown dark:text-gray-300 text-sm line-clamp-3">
              {article.summary || article.content.substring(0, 150)}...
            </p>
          </div>
        </Card>
      </div>
      
      {/* Empty space for alternating layout */}
      <div className="hidden md:block md:w-5/12"></div>
    </div>
  );
};

export default TimelineItem;
