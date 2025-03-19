
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Calendar, User, Mail, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticle, removeArticle } = useArticles();
  
  if (!id) {
    navigate('/');
    return null;
  }
  
  const article = getArticle(id);
  
  useEffect(() => {
    if (!article) {
      toast.error('Artikel tidak ditemukan');
      navigate('/');
    }
  }, [article, navigate]);
  
  if (!article) {
    return null;
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Draft';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        await removeArticle(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Featured Image */}
        <div className="w-full h-[400px] relative">
          <img 
            src={article.featuredImage || '/placeholder.svg'} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-white hover:text-karo-gold transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Kembali
          </button>
          
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mt-4">
            <div className="flex justify-between mb-4">
              <Link 
                to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block px-3 py-1 bg-karo-cream text-karo-brown text-sm font-medium rounded-full hover:bg-karo-darkbeige transition-colors"
              >
                {article.category}
              </Link>
              
              <div className="flex space-x-2">
                <Link 
                  to={`/editor/${article.id}`}
                  className="p-2 rounded-full bg-karo-cream text-karo-brown hover:bg-karo-darkbeige transition-colors"
                >
                  <Edit size={18} />
                </Link>
                
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-karo-brown mb-8 text-sm">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center">
                <Mail size={16} className="mr-1" />
                <span>{article.email}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index} className="mb-4 text-karo-black">{paragraph}</p> : <br key={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleView;
