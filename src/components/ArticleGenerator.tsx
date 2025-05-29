
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGenerateArticles } from '@/hooks/useGenerateArticles';
import { BookOpen, Loader2 } from 'lucide-react';

const ArticleGenerator: React.FC = () => {
  const { generateArticles, isGenerating } = useGenerateArticles();

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-center">
        <BookOpen className="w-12 h-12 text-karo-gold mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Generate Artikel Karo
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Buat 20 artikel sample tentang budaya Karo (5 artikel per kategori)
        </p>
      </div>
      
      <Button
        onClick={generateArticles}
        disabled={isGenerating}
        className="bg-karo-gold hover:bg-karo-darkgold text-white font-medium px-6 py-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Membuat Artikel...
          </>
        ) : (
          'Generate Artikel Karo'
        )}
      </Button>
      
      {isGenerating && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Proses ini akan memakan waktu beberapa menit.<br />
          Jangan tutup halaman sampai selesai.
        </p>
      )}
    </div>
  );
};

export default ArticleGenerator;
