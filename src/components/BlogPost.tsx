
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Article } from '@/types/article';
import { cn } from '@/lib/utils';

interface BlogPostProps {
  article: Article;
  variant?: 'card' | 'list' | 'featured';
}

const BlogPost: React.FC<BlogPostProps> = ({ article, variant = 'card' }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Draft';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Generate a safe URL-friendly slug from the title
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  if (variant === 'featured') {
    return (
      <div className="relative h-[500px] overflow-hidden rounded-xl group">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={article.featuredImage || '/placeholder.svg'} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-start">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-gold text-white text-sm font-medium rounded-full mb-3 hover:bg-opacity-90 transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 hover:text-karo-gold transition-colors">
              {article.title}
            </h2>
          </Link>
          
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="flex flex-col md:flex-row gap-5 card-hover p-4">
        <Link 
          to={`/article/${article.id}/${slug}`}
          className="md:w-1/3 h-48 overflow-hidden rounded-lg"
        >
          <img 
            src={article.featuredImage || '/placeholder.svg'} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
        
        <div className="md:w-2/3 flex flex-col">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-cream text-karo-brown text-xs font-medium rounded-full mb-2 self-start hover:bg-karo-darkbeige transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h3 className="text-xl font-serif font-semibold mb-2 hover:text-karo-gold transition-colors">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-karo-brown mb-3 line-clamp-2">
            {article.content.substring(0, 150)}...
          </p>
          
          <div className="mt-auto flex items-center space-x-4 text-karo-brown/80 text-xs">
            <div className="flex items-center">
              <User size={12} className="mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card view - Updated to match design
  return (
    <div 
      className={cn(
        "flex flex-col overflow-hidden rounded-lg card-hover",
        article.isDraft && "opacity-70"
      )}
    >
      <Link 
        to={`/article/${article.id}/${slug}`}
        className="h-48 overflow-hidden"
      >
        <img 
          src={article.featuredImage || '/placeholder.svg'} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </Link>
      
      <div className="p-4 bg-white flex-grow flex flex-col">
        <div className="flex-grow">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-cream text-karo-brown text-xs font-medium rounded-full mb-2 hover:bg-karo-darkbeige transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h3 className="text-lg font-serif font-semibold mb-2 line-clamp-2 hover:text-karo-gold transition-colors">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-karo-brown text-sm mb-3 line-clamp-3">
            {article.content.substring(0, 120)}...
          </p>
        </div>
        
        <div className="flex items-center justify-between text-karo-brown/80 text-xs">
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{formatDate(article.publishDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
