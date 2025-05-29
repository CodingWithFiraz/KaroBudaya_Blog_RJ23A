
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Layout from '@/components/Layout/MainLayout';
import ArticleEditor from '@/components/ArticleEditor';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Article } from '@/types/article';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById } = useArticles();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const fetchedArticle = await getArticleById(id);
          setArticle(fetchedArticle);
        } catch (error) {
          console.error('Error fetching article:', error);
          toast.error('Failed to load article');
        }
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [id, getArticleById]);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  // Show a notification about real-time editing
  useEffect(() => {
    toast.info(
      "Fitur edit real-time aktif",
      { 
        description: "Perubahan akan tersimpan sementara dan tersinkronisasi di semua perangkat secara otomatis",
        duration: 5000
      }
    );
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-karo-gold"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-karo-brown hover:text-karo-gold mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Kembali
        </button>
        
        <ArticleEditor article={article} />
      </div>
    </Layout>
  );
};

export default Editor;
