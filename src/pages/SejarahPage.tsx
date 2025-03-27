
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout/MainLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useArticles } from '@/hooks/useArticles';
import TimelineItem from '@/components/Timeline/TimelineItem';
import TimelineNavDot from '@/components/Timeline/TimelineNavDot';

const SejarahPage: React.FC = () => {
  const { getByCategory } = useArticles();
  const sejarahArticles = getByCategory('Sejarah');
  const [activeTimelineId, setActiveTimelineId] = useState<string>('');
  
  const handleDotClick = (id: string) => {
    setActiveTimelineId(id);
  };
  
  const handleItemInView = (id: string) => {
    setActiveTimelineId(id);
  };
  
  useEffect(() => {
    // Set first item as active by default if there are articles
    if (sejarahArticles.length > 0 && !activeTimelineId) {
      setActiveTimelineId(`timeline-item-0`);
    }
  }, [sejarahArticles, activeTimelineId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">
            Sejarah <span className="text-karo-gold dark:text-karo-darkgold">Karo</span>
          </h1>
          <p className="text-lg text-center text-karo-brown dark:text-gray-300 mb-12">
            Menelusuri jejak sejarah dan warisan budaya tanah Karo melalui garis waktu peristiwa penting
          </p>
          
          {/* Timeline Navigation Dots */}
          <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-8">
            {sejarahArticles.map((article, index) => (
              <TimelineNavDot
                key={`nav-${article.id}`}
                id={`timeline-item-${index}`}
                label={article.title.substring(0, 10) + '...'}
                isActive={activeTimelineId === `timeline-item-${index}`}
                onClick={handleDotClick}
              />
            ))}
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Timeline Items */}
            {sejarahArticles.length > 0 ? (
              <div>
                {sejarahArticles.map((article, index) => (
                  <TimelineItem
                    key={article.id}
                    article={article}
                    index={index}
                    id={`timeline-item-${index}`}
                    onInView={handleItemInView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-karo-brown dark:text-gray-300">
                  Belum ada artikel sejarah yang tersedia
                </h3>
                <p className="text-karo-brown dark:text-gray-400 mt-2">
                  Artikel sejarah akan ditampilkan di sini saat tersedia
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SejarahPage;
