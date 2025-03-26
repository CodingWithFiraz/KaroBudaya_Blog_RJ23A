import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { Category } from '@/types/article';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BlogPost from '@/components/BlogPost';
import { Feather } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { getByCategory, isLoading } = useArticles();
  const [formattedCategory, setFormattedCategory] = useState<Category | null>(null);
  
  useEffect(() => {
    // Convert URL format to category format
    if (category) {
      // Map URL format back to Category type
      const categoryMap: Record<string, Category> = {
        'destinasi-tempat': 'Destinasi & Tempat',
        'bahasa-aksara-karo': 'Bahasa & Aksara Karo',
        'tari-karo': 'Tari Karo',
        'kuliner-karo': 'Kuliner Karo',
        'budaya-tradisi-karo': 'Budaya & Tradisi Karo',
        'budaya': 'Budaya',
        'pakaian-adat': 'Pakaian Adat'
      };
      
      setFormattedCategory(categoryMap[category] || null);
    }
  }, [category]);

  // Get articles for this category
  const categoryArticles = formattedCategory ? getByCategory(formattedCategory) : [];

  // Format category name for display
  const getCategoryDisplayName = () => {
    if (!formattedCategory) return '';
    
    // Map to more readable names for display
    const displayNameMap: Record<Category, string> = {
      'Destinasi & Tempat': 'Tempat',
      'Bahasa & Aksara Karo': 'Bahasa & Aksara',
      'Tari Karo': 'Tari',
      'Kuliner Karo': 'Makanan',
      'Budaya & Tradisi Karo': 'Budaya & Tradisi',
      'Budaya': 'Budaya',
      'Pakaian Adat': 'Pakaian Adat'
    };
    
    return displayNameMap[formattedCategory] || formattedCategory;
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Location Header */}
          <div className="mb-2">
            <p className="text-karo-brown dark:text-gray-400">
              Karo, Sumatera Utara, Indonesia
            </p>
          </div>
          
          {/* Category Title - Updated to match design */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 dark:text-white">
            {getCategoryDisplayName()}
          </h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map(article => (
                <BlogPost key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-karo-cream dark:bg-karo-darkcard rounded-xl">
              <Feather size={48} className="text-karo-gold dark:text-karo-darkgold mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold mb-3 dark:text-white">
                Maaf, artikel di kategori ini belum ada
              </h2>
              <p className="text-karo-brown dark:text-gray-400 mb-6 max-w-md mx-auto">
                Kami sedang berusaha untuk menambahkan konten baru. Silahkan kunjungi kategori lain.
              </p>
              <Link to="/" className="btn-primary">
                Kembali ke Beranda
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
