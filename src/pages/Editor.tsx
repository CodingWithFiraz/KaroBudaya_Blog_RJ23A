
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Layout from '@/components/Layout/MainLayout';
import ArticleEditor from '@/components/ArticleEditor';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticle } = useArticles();
  
  // If id is provided, we're editing an existing article
  const article = id ? getArticle(id) : undefined;
  
  const handleGoBack = () => {
    navigate(-1);
  };

  // Show a notification about real-time editing
  React.useEffect(() => {
    toast.info(
      "Fitur edit real-time aktif",
      { 
        description: "Perubahan akan tersimpan sementara dan tersinkronisasi di semua perangkat secara otomatis",
        duration: 5000
      }
    );
  }, []);

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
