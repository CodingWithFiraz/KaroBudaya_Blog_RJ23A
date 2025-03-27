
import React from 'react';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const BudayaPage: React.FC = () => {
  const { getByCategory, isLoading } = useArticles();
  
  // Get budaya articles
  const budayaArticles = getByCategory('Budaya');

  const handleLike = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    toast.success('Artikel telah disukai!');
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
          
          {/* Category Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 dark:text-white">
            Budaya
          </h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : budayaArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {budayaArticles.map(article => (
                <Link 
                  key={article.id} 
                  to={`/article/${article.id}`} 
                  className="group"
                >
                  <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-karo-darkcard p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                      <img 
                        src={article.featuredImage || '/placeholder.svg'} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-karo-gold dark:text-white dark:group-hover:text-karo-darkgold transition-colors">
                            {article.title}
                          </h2>
                          <button 
                            onClick={(e) => handleLike(article.id, e)} 
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Heart size={20} className="text-karo-gold dark:text-karo-darkgold" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                          {article.summary || article.content.substring(0, 150) + '...'}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-10 h-10 rounded-full bg-karo-cream dark:bg-gray-700 overflow-hidden mr-3">
                          <img 
                            src="/placeholder.svg" 
                            alt={article.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{article.author}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-karo-cream dark:bg-karo-darkcard rounded-xl">
              <h2 className="text-2xl font-serif font-bold mb-3 dark:text-white">
                Maaf, artikel budaya belum tersedia
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

export default BudayaPage;
