
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ArticleEditor from '@/components/ArticleEditor';
import { ArrowLeft } from 'lucide-react';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticle } = useArticles();
  
  // If id is provided, we're editing an existing article
  const article = id ? getArticle(id) : undefined;
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-karo-brown hover:text-karo-gold mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Kembali
          </button>
          
          <ArticleEditor article={article} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Editor;
