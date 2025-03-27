import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BlogPost from '@/components/BlogPost';
import { ArrowRight, Search, Grid, LayoutGrid, List, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Index: React.FC = () => {
  const {
    publishedArticles,
    isLoading,
    fetchArticles
  } = useArticles();

  // State for likes
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Get destination articles
  const destinationArticles = publishedArticles.filter(article => article.category === 'Destinasi & Tempat').slice(0, 5);

  // Get latest articles
  const latestArticles = [...publishedArticles].sort((a, b) => new Date(b.publishDate || b.createdAt).getTime() - new Date(a.publishDate || a.createdAt).getTime()).slice(0, 3);

  // Get heritage/culture articles (using Budaya category)
  const heritageArticles = publishedArticles.filter(article => article.category === 'Budaya').slice(0, 3);

  // Featured heritage article
  const featuredHeritageArticle = heritageArticles.length > 0 ? heritageArticles[0] : null;

  // Featured main article, normally this would be editorially chosen
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;

  // Category groups for display
  const categoryGroups = [{
    title: 'Budaya',
    slug: 'budaya'
  }, {
    title: 'Kuliner Karo',
    slug: 'kuliner-karo'
  }, {
    title: 'Sejarah',
    slug: 'sejarah'
  }];

  // Helper function to get articles by category
  const getArticlesByCategory = (categorySlug: string) => {
    const categoryMap: Record<string, string> = {
      'budaya': 'Budaya',
      'kuliner-karo': 'Kuliner Karo',
      'sejarah': 'Sejarah'
    };
    return publishedArticles.filter(article => article.category === categoryMap[categorySlug]).slice(0, 2);
  };

  // Helper function to handle like click
  const handleLikeClick = (articleId: string) => {
    setLikedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Destinations Sidebar + Featured Article Section */}
        <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Destinations sidebar */}
          <div className="lg:col-span-3 bg-karo-cream dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-serif font-bold mb-4">
              Temukan Destinasi Tempat Impianmu
            </h2>
            
            <div className="relative mb-4">
              <Input type="text" placeholder="Cari Tempat" className="pl-10 bg-white" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="space-y-4 mt-6">
              {destinationArticles.length > 0 ? destinationArticles.map(article => <Link key={article.id} to={`/article/${article.id}/${article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`} className="flex items-start gap-3 hover:bg-karo-darkbeige/20 p-2 rounded-md transition-colors">
                    <img src={article.featuredImage || '/placeholder.svg'} alt={article.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="text-xs text-karo-brown/80 mb-1">Tempat</p>
                      <h3 className="text-sm font-medium line-clamp-2">{article.title}</h3>
                    </div>
                  </Link>) : <div className="text-center text-sm text-karo-brown py-4">
                  Belum ada destinasi tersedia
                </div>}
            </div>
          </div>
          
          {/* Featured main article */}
          <div className="lg:col-span-9">
            {featuredArticle ? <div className="relative h-[500px] overflow-hidden rounded-xl group">
                <img src={featuredArticle.featuredImage || '/placeholder.svg'} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="mb-2">
                    <span className="text-white text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <Link to={`/article/${featuredArticle.id}/${featuredArticle.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 hover:text-karo-gold transition-colors">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  
                  <p className="text-white/80 mb-4 line-clamp-2">
                    {featuredArticle.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-white/80 text-sm">
                      By {featuredArticle.author} | {new Date(featuredArticle.publishDate || featuredArticle.createdAt).getFullYear()}
                    </div>
                  </div>
                </div>
              </div> : <div className="h-[500px] bg-karo-darkbeige/20 rounded-xl flex items-center justify-center">
                <p className="text-karo-brown">Belum ada artikel utama</p>
              </div>}
          </div>
        </section>
        
        {/* Latest Articles Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Artikel Terbaru</h2>
            <Link to="/editor" className="text-karo-gold flex items-center hover:underline text-sm">
              Lihat Semua
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.length > 0 ? latestArticles.map(article => <BlogPost key={article.id} article={article} />) : <div className="col-span-3 text-center py-12 bg-karo-cream rounded-xl">
                <p className="text-karo-brown">Belum ada artikel terbaru</p>
              </div>}
          </div>
        </section>
        
        {/* Heritage/Warisan Budaya Section - Updated Design */}
        <section className="bg-karo-cream py-12 dark:bg-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-inherit">Warisan Budaya</h2>
              <Link to="/" className="text-karo-gold flex items-center hover:underline text-sm">
                Lihat Koleksi Lainnya
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {featuredHeritageArticle ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main heritage image */}
                <div>
                  <Link to={`/article/${featuredHeritageArticle.id}/${featuredHeritageArticle.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
                    
                  </Link>
                  
                  <div className="relative h-[400px] overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/631de586-6f83-4c92-8acc-931cc8034976.png" alt="Uis Karo" className="absolute inset-0 w-full h-full object-cover" />
                    
                
                      <div className="absolute top-4 left-4 px-2 py-1 bg-karo-cream dark:bg-gray-700 text-sm font-medium rounded-sm mb-2 text-inherit">
                        Keunikan Budaya
                   
                      
                      
                    </div>
                  </div>
                </div>
                
                {/* Heritage article info */}
                <div className="flex flex-col justify-center bg-[#0a2714] text-white p-8 rounded-xl">
                  <div className="mb-6">
                    <span className="text-gray-300 text-sm mb-1 block">Warisan Budaya</span>
                    <h3 className="text-2xl font-serif font-bold mt-1">Uis Nipes</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Uis Nipes sering digunakan dalam acara adat seperti pernikahan, upacara keagamaan, dan penyambutan tamu kehormatan.
                  </p>
                  
                  <div className="flex items-center space-x-3 mt-auto">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=Denis%20Ema`} alt="Denis Ema" />
                      <AvatarFallback>{getInitials("Denis Ema")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-300">Added by</p>
                      <p className="text-sm font-medium">Denis Ema</p>
                    </div>
                    
                    <button className="ml-auto flex items-center space-x-1 bg-transparent border border-rose-500/20 text-rose-500 px-3 py-1 rounded-full hover:bg-rose-500/10 transition-colors" onClick={() => handleLikeClick(featuredHeritageArticle.id)}>
                      <Heart size={16} className={likedArticles[featuredHeritageArticle.id] ? "fill-rose-500" : ""} />
                      <span className="text-xs">{likedArticles[featuredHeritageArticle.id] ? "Liked" : "Like"}</span>
                    </button>
                  </div>
                </div>
              </div> : <div className="text-center py-12 bg-white/50 rounded-xl">
                <p className="text-karo-brown">Belum ada artikel warisan budaya</p>
              </div>}
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-serif font-bold mb-8">Artikel Berdasarkan Kategori</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categoryGroups.map(category => <Card key={category.slug} className="overflow-hidden border-none shadow-md">
                <div className="bg-karo-cream dark:bg-gray-700 p-4">
                  <h3 className="text-xl font-serif font-bold">
                    {category.title}
                  </h3>
                </div>
                
                <CardContent className="p-0">
                  {getArticlesByCategory(category.slug).length > 0 ? getArticlesByCategory(category.slug).map(article => <Link key={article.id} to={`/article/${article.id}/${article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`} className="flex items-start gap-4 p-4 hover:bg-karo-darkbeige dark:hover:bg-gray-400  transition-colors border-b last:border-b-0">
                        <img src={article.featuredImage || '/placeholder.svg'} alt={article.title} className="w-20 h-20 object-cover rounded" />
                        <div>
                          <h4 className="font-medium line-clamp-2 hover:text-karo-gold transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-sm text-karo-brown mt-1">
                            By {article.author} | {new Date(article.publishDate || article.createdAt).getFullYear()}
                          </p>
                        </div>
                      </Link>) : <div className="text-center py-8 text-karo-brown text-sm">
                      Belum ada artikel di kategori ini
                    </div>}
                  
                  <div className="p-4 border-t">
                    <Link to={`/category/${category.slug}`} className="text-karo-gold flex items-center hover:underline text-sm justify-end">
                      Lihat Semua
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;
