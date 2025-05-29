
import { useState } from 'react';
import { generateKaroArticles } from '@/utils/generateKaroArticles';
import { toast } from 'sonner';

export const useGenerateArticles = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateArticles = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      toast.info('Mulai membuat artikel Karo...', {
        description: 'Proses ini akan memakan waktu beberapa menit.'
      });
      
      await generateKaroArticles();
      
      toast.success('Artikel Karo berhasil dibuat!', {
        description: '20 artikel telah ditambahkan ke database (5 per kategori)'
      });
    } catch (error) {
      console.error('Error generating articles:', error);
      toast.error('Gagal membuat artikel', {
        description: 'Terjadi kesalahan saat membuat artikel'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateArticles,
    isGenerating
  };
};
