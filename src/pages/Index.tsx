
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BlogPost from '@/components/BlogPost';
import { ChevronRight, Feather, Plus } from 'lucide-react';

const Index: React.FC = () => {
  const { publishedArticles, isLoading, fetchArticles } = useArticles();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Get the latest article
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;
  
  // Get the rest of the articles
  const otherArticles = publishedArticles.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 mt-6">
          {isLoading ? (
            <div className="h-[500px] bg-gray-100 animate-pulse rounded-xl"></div>
          ) : featuredArticle ? (
            <BlogPost article={featuredArticle} variant="featured" />
          ) : (
            <div className="h-[500px] bg-karo-cream rounded-xl flex flex-col items-center justify-center p-6 text-center">
              <Feather size={48} className="text-karo-gold mb-4" />
              <h2 className="text-3xl font-serif font-bold mb-3">Belum Ada Artikel</h2>
              <p className="text-karo-brown mb-6 max-w-md">
                Jadilah yang pertama menulis artikel tentang budaya Karo.
              </p>
              <Link to="/editor" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} />
                Tulis Artikel Baru
              </Link>
            </div>
          )}
        </section>
        
        {/* Article Listing */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Artikel Terbaru</h2>
            <Link to="/editor" className="text-karo-gold flex items-center hover:underline">
              Tulis Artikel
              <ChevronRight size={16} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : otherArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map(article => (
                <BlogPost key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-karo-brown py-12">
              Belum ada artikel lain yang dipublikasikan.
            </p>
          )}
        </section>
        
        {/* CTA Section */}
        <section className="bg-karo-cream py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Jadilah Kontributor Budaya Karo
            </h2>
            <p className="text-karo-brown mb-8 max-w-xl mx-auto">
              Bagikan pengetahuan dan wawasan tentang budaya Karo. 
              Tulisan Anda dapat membantu melestarikan warisan budaya yang berharga.
            </p>
            <Link to="/editor" className="btn-primary inline-flex items-center gap-2">
              <Feather size={18} />
              Mulai Menulis
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
