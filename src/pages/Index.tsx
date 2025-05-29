import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';
import BlogPost from '@/components/BlogPost';
import { Category } from '@/types/article';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArticleGenerator from '@/components/ArticleGenerator';
const Index: React.FC = () => {
  const {
    publishedArticles,
    isLoading
  } = useArticles();
  const [latestArticles, setLatestArticles] = useState(publishedArticles.slice(0, 6));
  useEffect(() => {
    if (!isLoading) {
      setLatestArticles(publishedArticles.slice(0, 6));
    }
  }, [publishedArticles, isLoading]);
  const categories: {
    title: Category;
    description: string;
    image: string;
  }[] = [{
    title: 'Destinasi & Tempat',
    description: 'Jelajahi keindahan alam dan tempat wisata menarik di Tanah Karo',
    image: '/images/categories/destination.jpg'
  }, {
    title: 'Kuliner Karo',
    description: 'Nikmati kelezatan masakan tradisional dan kuliner khas Karo',
    image: '/images/categories/culinary.jpg'
  }, {
    title: 'Sejarah',
    description: 'Telusuri jejak sejarah dan perkembangan masyarakat Karo dari masa ke masa',
    image: '/images/categories/history.jpg'
  }, {
    title: 'Budaya',
    description: 'Pelajari kekayaan budaya, adat istiadat, dan tradisi masyarakat Karo',
    image: '/images/categories/culture.jpg'
  }];
  return <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10 py-0 my-0"></div>
          <img src="/images/hero-bg.jpg" alt="Tanah Karo" className="absolute inset-0 w-full h-full object-cover" />
          <div className="container mx-auto px-[32px] relative z-20 py-0 ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 mt-24">
              Jelajahi Keindahan <span className="text-karo-gold">Tanah Karo</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Temukan pesona alam, kekayaan budaya, dan kelezatan kuliner dari tanah Karo yang memukau
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/articles" className="bg-karo-gold hover:bg-karo-darkgold text-white font-medium px-6 py-3 rounded-md transition-colors">
                Jelajahi Artikel
              </Link>
              <Link to="/about" className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-md backdrop-blur-sm transition-colors">
                Tentang Kami
              </Link>
            </div>
          </div>
        </section>
        
        {/* Article Generator Section */}
        

        {/* Categories Section */}
        <section className="py-16 px-[32px]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-2 dark:text-white">Kategori</h2>
            <p className="text-karo-brown dark:text-gray-400 mb-8">Pilih kategori yang ingin kamu jelajahi</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => <Link key={index} to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                  <div className="bg-white dark:bg-karo-darkcard rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{category.title}</h3>
                      <p className="text-karo-brown dark:text-gray-400 mb-4">{category.description}</p>
                      <div className="flex items-center text-karo-gold dark:text-karo-darkgold font-medium">
                        <span>Jelajahi</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-16 px-[32px] bg-karo-cream dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-2 dark:text-white">Artikel Terbaru</h2>
                <p className="text-karo-brown dark:text-gray-400">Temukan informasi menarik tentang Tanah Karo</p>
              </div>
              <Link to="/articles" className="hidden md:flex items-center text-karo-gold dark:text-karo-darkgold hover:underline">
                <span>Lihat Semua</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {isLoading ? <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-karo-gold"></div>
              </div> : <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestArticles.map(article => <BlogPost key={article.id} article={article} />)}
                </div>
                
                <div className="mt-8 text-center md:hidden">
                  <Link to="/articles" className="inline-flex items-center text-karo-gold dark:text-karo-darkgold hover:underline">
                    <span>Lihat Semua Artikel</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </>}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-[32px]">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white dark:bg-karo-darkcard rounded-lg shadow-md p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                  <h2 className="text-2xl font-bold mb-2 dark:text-white">Dapatkan Informasi Terbaru</h2>
                  <p className="text-karo-brown dark:text-gray-400">
                    Berlangganan newsletter kami untuk mendapatkan update artikel terbaru dan informasi menarik tentang Tanah Karo
                  </p>
                </div>
                <div className="md:w-1/3 w-full">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Email kamu" className="flex-grow" />
                    <Button className="bg-karo-gold hover:bg-karo-darkgold text-white">
                      Langganan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;