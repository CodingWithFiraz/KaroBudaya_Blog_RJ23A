
import React, { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import FoodCard from '@/components/FoodCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { KulinerSubcategory } from '@/types/article';

const KulinerPage: React.FC = () => {
  const { getByCategory, getBySubcategory } = useArticles();
  const [activeTab, setActiveTab] = useState<KulinerSubcategory>('Makanan');

  // Get articles by subcategory
  const makananArticles = getBySubcategory('Kuliner Karo', 'Makanan');
  const minumanArticles = getBySubcategory('Kuliner Karo', 'Minuman');

  return (
    <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3 dark:text-white">
              Kuliner Khas Batak Karo: Cita Rasa Autentik dari Tanah Karo
            </h1>
            <p className="text-lg text-karo-brown dark:text-gray-300 max-w-3xl mx-auto">
              Jelajahi berbagai hidangan lezat khas Batak Karo yang kaya rempah dan tradisi.
            </p>
          </div>
          
          {/* Category Tabs */}
          <Tabs 
            defaultValue="Makanan" 
            className="mb-10" 
            onValueChange={value => setActiveTab(value as KulinerSubcategory)}
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-transparent">
              <TabsTrigger 
                value="Makanan" 
                className="font-medium py-3 rounded-full data-[state=active]:bg-karo-gold data-[state=active]:text-white dark:data-[state=active]:bg-karo-darkgold"
              >
                Makanan Khas Karo
              </TabsTrigger>
              <TabsTrigger 
                value="Minuman" 
                className="font-medium py-3 rounded-full data-[state=active]:bg-karo-gold data-[state=active]:text-white dark:data-[state=active]:bg-karo-darkgold"
              >
                Minuman Khas Karo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="Makanan" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {makananArticles.length > 0 ? (
                  makananArticles.map(article => (
                    <FoodCard key={article.id} food={article} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-karo-brown dark:text-gray-400">
                      Belum ada artikel makanan khas Karo saat ini.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="Minuman" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {minumanArticles.length > 0 ? (
                  minumanArticles.map(article => (
                    <FoodCard key={article.id} food={article} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-karo-brown dark:text-gray-400">
                      Belum ada artikel minuman khas Karo saat ini.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KulinerPage;
