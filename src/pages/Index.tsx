import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BlogPost from '@/components/BlogPost';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
const Index: React.FC = () => {
  const {
    publishedArticles,
    isLoading,
    fetchArticles
  } = useArticles();
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Get destination articles
  const destinationArticles = publishedArticles.filter(article => article.category === 'Destinasi & Tempat').slice(0, 5);

  // Get latest articles
  const latestArticles = [...publishedArticles].sort((a, b) => new Date(b.publishDate || b.createdAt).getTime() - new Date(a.publishDate || a.createdAt).getTime()).slice(0, 3);

  // Get popular/heritage culture articles (simulate by taking oldest ones for demo)
  const heritageArticles = [...publishedArticles].sort((a, b) => new Date(a.publishDate || a.createdAt).getTime() - new Date(b.publishDate || b.createdAt).getTime()).slice(0, 3);

  // Featured main article, normally this would be editorially chosen
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;

  // Category groups for display
  const categoryGroups = [{
    title: 'Musik Karo',
    slug: 'musik-karo'
  }, {
    title: 'Kuliner Karo',
    slug: 'kuliner-karo'
  }, {
    title: 'Budaya & Tradisi Karo',
    slug: 'budaya-tradisi-karo'
  }];

  // Helper function to get articles by category
  const getArticlesByCategory = (categorySlug: string) => {
    const categoryMap: Record<string, string> = {
      'musik-karo': 'Musik Karo',
      'kuliner-karo': 'Kuliner Karo',
      'budaya-tradisi-karo': 'Budaya & Tradisi Karo'
    };
    return publishedArticles.filter(article => article.category === categoryMap[categorySlug]).slice(0, 2);
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
        
        {/* Heritage/Popular Section */}
        <section className="bg-karo-cream py-12 dark:bg-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-zinc-950">Warisan Budaya</h2>
              <Link to="/" className="text-karo-gold flex items-center hover:underline text-sm">
                Lihat Koleksi Lainnya
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {heritageArticles.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main heritage article */}
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-4 text-zinc-950">
                    Jelajahi Keindahan Uis Karo
                  </h3>
                  
                  <div className="relative h-[400px] overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/5e2f1dda-2d6c-44e5-9a3a-87b1ba1c8088.png" alt="Uis Karo" className="absolute inset-0 w-full h-full object-cover" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
                      <div className="inline-block px-2 py-1 bg-white text-sm font-medium rounded-sm mb-2">
                        Keunikan Budaya
                      </div>
                      
                      <div className="flex items-center space-x-4 text-white text-sm mt-4">
                        <button className="p-2 border border-white/50 rounded">
                          <span className="sr-only">Grid View</span>
                          □
                        </button>
                        <button className="p-2 border border-white/50 rounded">
                          <span className="sr-only">List View</span>
                          ≡
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Heritage article info */}
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-karo-brown text-sm">Warisan Budaya</span>
                    <h3 className="text-2xl font-serif font-bold mt-1 text-zinc-950">Uis Nipes</h3>
                  </div>
                  
                  <p className="text-karo-brown mb-6 leading-relaxed">
                    Uis Nipes sering digunakan dalam acara adat seperti pernikahan, upacara keagamaan, dan penyambutan tamu kehormatan.
                  </p>
                  
                  <div className="flex items-center space-x-3 mt-auto">
                    <img src="/placeholder.svg" alt="Author" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                    <div>
                      <p className="text-sm font-medium text-zinc-950">Penulis</p>
                      <p className="text-xs text-karo-brown">Denis Ema</p>
                    </div>
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
                <div className="bg-karo-cream p-4">
                  <h3 className="text-xl font-serif font-bold">
                    {category.title}
                  </h3>
                </div>
                
                <CardContent className="p-0">
                  {getArticlesByCategory(category.slug).length > 0 ? getArticlesByCategory(category.slug).map(article => <Link key={article.id} to={`/article/${article.id}/${article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0">
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