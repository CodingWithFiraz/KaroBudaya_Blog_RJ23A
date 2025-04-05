import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/MainLayout';
import { useArticles } from '@/hooks/useArticles';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const SejarahPage: React.FC = () => {
  const { getByCategory } = useArticles();
  const sejarahArticles = getByCategory('Sejarah');
  
  // Featured article (first article in the list)
  const featuredArticle = sejarahArticles.length > 0 ? sejarahArticles[0] : null;
  // Rest of the articles
  const otherArticles = sejarahArticles.slice(1);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">
          Sejarah <span className="text-karo-gold dark:text-karo-darkgold">Karo</span>
        </h1>
        <p className="text-lg text-center text-karo-brown dark:text-gray-300 mb-12">
          Menelusuri jejak sejarah dan warisan budaya tanah Karo
        </p>
        
        {/* Featured Article (middle column) */}
        {featuredArticle && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="hidden md:block">
              <div className="p-4">
                <div className="text-sm text-karo-brown dark:text-gray-400 mb-2">Sejarah</div>
                <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 dark:text-white">
                  {featuredArticle.title}
                </h2>
                <Link 
                  to={`/article/${featuredArticle.id}`} 
                  className="text-sm text-karo-brown dark:text-gray-300 hover:text-karo-gold dark:hover:text-karo-darkgold"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>

            {/* Middle Column - Featured Article */}
            <div className="md:col-span-1">
              <div className="h-full flex flex-col justify-center">
                <div className="text-sm text-karo-brown dark:text-gray-400 mb-2">Sejarah</div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 dark:text-white">
                  {featuredArticle.title}
                </h2>
                <p className="text-karo-brown dark:text-gray-300 mb-4 line-clamp-6">
                  {featuredArticle.summary || featuredArticle.content.substring(0, 300)}...
                </p>
                <Link 
                  to={`/article/${featuredArticle.id}`} 
                  className="text-sm text-karo-brown dark:text-gray-300 hover:text-karo-gold dark:hover:text-karo-darkgold"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="hidden md:block">
              <div className="p-4">
                <div className="text-sm text-karo-brown dark:text-gray-400 mb-2">Sejarah</div>
                <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 dark:text-white">
                  {featuredArticle.title}
                </h2>
                <Link 
                  to={`/article/${featuredArticle.id}`} 
                  className="text-sm text-karo-brown dark:text-gray-300 hover:text-karo-gold dark:hover:text-karo-darkgold"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherArticles.length > 0 ? (
            otherArticles.map((article) => (
              <div key={article.id} className="mb-8 animate-fade-in">
                <div className="text-sm text-karo-brown dark:text-gray-400 mb-2">Sejarah</div>
                <h2 className="text-xl font-serif font-bold mb-3 hover:text-karo-gold dark:text-white dark:hover:text-karo-darkgold transition-colors">
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </h2>
                <Link 
                  to={`/article/${article.id}`} 
                  className="text-sm text-karo-brown dark:text-gray-300 hover:text-karo-gold dark:hover:text-karo-darkgold"
                >
                  Baca Selengkapnya
                </Link>
                <Separator className="mt-6" />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
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
    </Layout>
  );
};

export default SejarahPage;
