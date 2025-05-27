
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Article } from '@/types/article';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FoodCardProps {
  food: Article;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  // Generate a safe URL-friendly slug from the title
  const slug = food.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
    
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Random like count for demo purposes
  const likeCount = Math.floor(Math.random() * 50) + 1;
  
  // Get valid image URL or fallback to food-related Unsplash image
  const getImageUrl = () => {
    if (food.featuredImage && food.featuredImage.startsWith('http')) {
      return food.featuredImage;
    }
    // Fallback to food-related images from Unsplash
    return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80';
  };
  
  return (
    <div className="bg-white dark:bg-karo-darkcard rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <Link to={`/article/${food.id}/${slug}`} className="block relative h-48 overflow-hidden">
        <img 
          src={getImageUrl()} 
          alt={food.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/article/${food.id}/${slug}`}>
          <h3 className="font-serif font-bold text-lg mb-2 hover:text-karo-gold dark:text-white dark:hover:text-karo-darkgold transition-colors">
            {food.title}
          </h3>
        </Link>
        
        <p className="text-karo-brown dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {food.content.substring(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${food.author}`} alt={food.author} />
              <AvatarFallback>{getInitials(food.author)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium dark:text-white">Added by</p>
              <p className="text-sm font-medium dark:text-white">{food.author}</p>
            </div>
          </div>
          
          <div className="flex items-center text-rose-500">
            <Heart size={16} className="fill-rose-500" />
            <span className="ml-1 text-sm">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
