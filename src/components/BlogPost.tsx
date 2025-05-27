
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, ThumbsUp } from 'lucide-react';
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

  // Extract summary from article or use first paragraph
  const getSummary = () => {
    if (article.summary) return article.summary;
    
    if (article.blocks && article.blocks.length > 0) {
      const paragraphs = article.blocks.filter(block => block.type === 'paragraph');
      if (paragraphs.length > 0) {
        return paragraphs[0].content.substring(0, 150) + '...';
      }
    }
    
    return article.content.substring(0, 150) + '...';
  };

  // Get valid image URL or fallback to public Unsplash image
  const getImageUrl = () => {
    if (article.featuredImage && article.featuredImage.startsWith('http')) {
      return article.featuredImage;
    }
    // Fallback to category-appropriate images from Unsplash
    switch (article.category) {
      case 'Kuliner Karo':
        return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80';
      case 'Budaya':
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80';
      case 'Sejarah':
        return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80';
      case 'Destinasi & Tempat':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
    }
  };

  if (variant === 'featured') {
    return (
      <div className="relative h-[500px] overflow-hidden rounded-xl group">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={getImageUrl()} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-start">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-gold dark:bg-karo-darkgold text-white text-sm font-medium rounded-full mb-3 hover:bg-opacity-90 transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 hover:text-karo-gold dark:hover:text-karo-darkgold transition-colors">
              {article.title}
            </h2>
          </Link>
          
          <p className="text-white/90 mb-4 line-clamp-2">
            {getSummary()}
          </p>
          
          <div className="flex items-center justify-between w-full">
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
            
            {article.views && (
              <div className="flex items-center space-x-3 text-white/70 text-xs">
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  <span>{article.views}</span>
                </div>
                {article.likes && (
                  <div className="flex items-center">
                    <ThumbsUp size={14} className="mr-1" />
                    <span>{article.likes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="flex flex-col md:flex-row gap-5 card-hover p-4 dark:bg-karo-darkcard dark:border-gray-700 rounded-lg">
        <Link 
          to={`/article/${article.id}/${slug}`}
          className="md:w-1/3 h-48 overflow-hidden rounded-lg"
        >
          <img 
            src={getImageUrl()} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
        
        <div className="md:w-2/3 flex flex-col">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-cream dark:bg-gray-700 text-karo-brown dark:text-gray-300 text-xs font-medium rounded-full mb-2 self-start hover:bg-karo-darkbeige dark:hover:bg-gray-600 transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h3 className="text-xl font-serif font-semibold mb-2 hover:text-karo-gold dark:hover:text-karo-darkgold transition-colors dark:text-white">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-karo-brown dark:text-gray-300 mb-3 line-clamp-2">
            {getSummary()}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 text-karo-brown/80 dark:text-gray-400 text-xs">
              <div className="flex items-center">
                <User size={12} className="mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
            </div>
            
            {article.views && (
              <div className="flex items-center space-x-2 text-karo-brown/70 dark:text-gray-500 text-xs">
                <div className="flex items-center">
                  <Eye size={12} className="mr-1" />
                  <span>{article.views}</span>
                </div>
                {article.likes && (
                  <div className="flex items-center ml-2">
                    <ThumbsUp size={12} className="mr-1" />
                    <span>{article.likes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default card view
  return (
    <div 
      className={cn(
        "flex flex-col overflow-hidden rounded-lg card-hover dark:border-gray-700",
        article.isDraft && "opacity-70"
      )}
    >
      <Link 
        to={`/article/${article.id}/${slug}`}
        className="h-48 overflow-hidden"
      >
        <img 
          src={getImageUrl()} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </Link>
      
      <div className="p-4 bg-white dark:bg-karo-darkcard flex-grow flex flex-col">
        <div className="flex-grow">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-karo-cream dark:bg-gray-700 text-karo-brown dark:text-gray-300 text-xs font-medium rounded-full mb-2 hover:bg-karo-darkbeige dark:hover:bg-gray-600 transition-colors"
          >
            {article.category}
          </Link>
          
          <Link to={`/article/${article.id}/${slug}`}>
            <h3 className="text-lg font-serif font-semibold mb-2 line-clamp-2 hover:text-karo-gold dark:hover:text-karo-darkgold transition-colors dark:text-white">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-karo-brown dark:text-gray-300 text-sm mb-3 line-clamp-3">
            {getSummary()}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-karo-brown/80 dark:text-gray-400 text-xs">
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
