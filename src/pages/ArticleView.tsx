import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Calendar, User, Mail, Edit, Trash2, ArrowLeft, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TextToSpeech from '@/components/TextToSpeech';
import ShareButtons from '@/components/ShareButtons';
import BackToTop from '@/components/BackToTop';
import { Block, HeadingBlock, ImageBlock, QuoteBlock } from '@/types/blocks';
import { Article } from '@/types/article';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const navigate = useNavigate();
  const { getArticleById, removeArticle } = useArticles();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        const fetchedArticle = await getArticleById(id);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
        } else {
          toast.error('Artikel tidak ditemukan');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        toast.error('Gagal memuat artikel');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, getArticleById, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
        <Header />
        <main className="flex-grow pt-24 px-[32px]">
          <div className="container mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-karo-gold"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
        await removeArticle(id!);
        navigate('/');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const getGoogleMapsUrl = (location?: {
    latitude: number;
    longitude: number;
  }) => {
    if (!location) return '';
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  };
  
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };
  
  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={block.id} className="mb-4 text-karo-black dark:text-gray-100">
            {block.content}
          </p>
        );
      case 'heading':
        const headingBlock = block as HeadingBlock;
        switch (headingBlock.level) {
          case 1:
            return <h1 key={block.id} className="text-3xl font-bold mb-4 dark:text-white">{headingBlock.content}</h1>;
          case 2:
            return <h2 key={block.id} className="text-2xl font-bold mb-4 dark:text-white">{headingBlock.content}</h2>;
          case 3:
            return <h3 key={block.id} className="text-xl font-bold mb-3 dark:text-white">{headingBlock.content}</h3>;
          default:
            return <h2 key={block.id} className="text-2xl font-bold mb-4 dark:text-white">{headingBlock.content}</h2>;
        }
      case 'image':
        const imageBlock = block as ImageBlock;
        return (
          <figure key={block.id} className="mb-6">
            <img 
              src={imageBlock.url} 
              alt={imageBlock.alt || 'Article image'} 
              className="w-full rounded-lg mb-2"
            />
            {imageBlock.caption && (
              <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400">
                {imageBlock.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'quote':
        const quoteBlock = block as QuoteBlock;
        return (
          <blockquote 
            key={block.id}
            className="border-l-4 border-karo-gold pl-4 italic mb-4 text-gray-700 dark:text-gray-300"
          >
            <p className="mb-2">{quoteBlock.content}</p>
            {quoteBlock.citation && (
              <footer className="text-right text-sm font-medium">
                — {quoteBlock.citation}
              </footer>
            )}
          </blockquote>
        );
      default:
        return null;
    }
  };
  
  const renderContent = () => {
    // If article has blocks, render them
    if (article.blocks && article.blocks.length > 0) {
      return (
        <div className={`prose prose-lg max-w-none dark:prose-invert ${getTextSizeClass()}`}>
          {article.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      );
    }
    
    // Fallback to the old content format (text paragraphs)
    return (
      <div className={`prose prose-lg max-w-none dark:prose-invert ${getTextSizeClass()}`}>
        {article.content.split('\n').map((paragraph, index) => 
          paragraph ? (
            <p key={index} className="mb-4 text-karo-black dark:text-gray-100">{paragraph}</p>
          ) : (
            <br key={index} />
          )
        )}
      </div>
    );
  };
  
  // Get current URL for sharing
  const currentUrl = window.location.href;
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      
      <main className="flex-grow pt-24 px-[32px]">
        {/* Location Header */}
        <div className="container mx-auto mb-2 px-0">
          <p className="text-karo-brown dark:text-gray-400">
            Karo, Sumatera Utara, Indonesia
          </p>
        </div>
        
        {/* Article Title */}
        <div className="container mx-auto px-0 mb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold dark:text-white">
            {article.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center mt-4">
            <div className="w-12 h-12 rounded-full bg-karo-cream dark:bg-gray-700 overflow-hidden mr-3">
              <img src="/placeholder.svg" alt={article.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Added By</p>
              <p className="font-medium dark:text-white">{article.author}</p>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="w-full h-[400px] relative mb-8">
          <img src={article.featuredImage || '/placeholder.svg'} alt={article.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto py-8 sm:px-[16px] px-0">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handleGoBack} className="inline-flex items-center text-karo-brown dark:text-gray-300 hover:text-karo-gold dark:hover:text-karo-darkgold transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              Kembali
            </button>
            
            <div className="flex space-x-2">
              <TooltipProvider>
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow px-2 py-1 mr-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${textSize === 'small' ? 'bg-karo-cream dark:bg-gray-700' : ''}`} onClick={() => setTextSize('small')}>
                        <span className="font-serif font-bold text-xs dark:text-white">T</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ukuran Kecil</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${textSize === 'medium' ? 'bg-karo-cream dark:bg-gray-700' : ''}`} onClick={() => setTextSize('medium')}>
                        <span className="font-serif font-bold text-base dark:text-white">T</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ukuran Sedang</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${textSize === 'large' ? 'bg-karo-cream dark:bg-gray-700' : ''}`} onClick={() => setTextSize('large')}>
                        <span className="font-serif font-bold text-lg dark:text-white">T</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ukuran Besar</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              
              <Link to={`/editor/${article.id}`} className="p-2 rounded-full bg-karo-cream dark:bg-gray-700 text-karo-brown dark:text-gray-300 hover:bg-karo-darkbeige dark:hover:bg-gray-600 transition-colors">
                <Edit size={18} />
              </Link>
              
              <button onClick={handleDelete} className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Link to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block px-3 py-1 bg-karo-cream dark:bg-gray-700 text-karo-brown dark:text-gray-300 text-sm font-medium rounded-full hover:bg-karo-darkbeige dark:hover:bg-gray-600 transition-colors">
                  {article.category}
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-karo-brown dark:text-gray-400 mb-8 text-sm">
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
              
              <h2 className="text-2xl font-serif font-bold mb-4 dark:text-white">
                Uraian
              </h2>
              
              {renderContent()}
              
              {/* Share Buttons */}
              <ShareButtons title={article.title} url={currentUrl} />
            </div>
            
            <div className="md:col-span-1">
              {article.mapLocation ? (
                <div className="bg-white dark:bg-karo-darkcard rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    <iframe 
                      src={`https://maps.google.com/maps?q=${article.mapLocation.latitude},${article.mapLocation.longitude}&z=15&output=embed`} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start mb-2">
                      <MapPin size={20} className="text-karo-gold dark:text-karo-darkgold mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg dark:text-white">{article.mapLocation.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {article.mapLocation.address || 'Kabupaten Karo, Provinsi Sumatera Utara, Indonesia'}
                        </p>
                      </div>
                    </div>
                    
                    <a 
                      href={getGoogleMapsUrl(article.mapLocation)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full block text-center py-2 mt-2 bg-karo-gold dark:bg-karo-darkgold text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      Dapatkan petunjuk arah
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Lokasi tidak tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {article && <TextToSpeech title={article.title} author={article.author} content={article.content} />}
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ArticleView;
