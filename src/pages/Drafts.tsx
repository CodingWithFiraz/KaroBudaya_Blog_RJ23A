
import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Edit, Trash2, Plus, FileText } from 'lucide-react';

const Drafts: React.FC = () => {
  const { draftArticles, removeArticle } = useArticles();

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus draft ini?')) {
      try {
        await removeArticle(id);
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">Draft Artikel</h1>
              <p className="text-karo-brown">
                Artikel yang belum dipublikasikan dan masih dalam tahap penulisan.
              </p>
            </div>
            
            <Link 
              to="/editor" 
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Tulis Artikel Baru
            </Link>
          </div>
          
          {draftArticles.length === 0 ? (
            <div className="bg-white rounded-lg border border-karo-darkbeige p-8 text-center">
              <FileText size={48} className="text-karo-gold/70 mx-auto mb-4" />
              <h2 className="text-xl font-serif font-semibold mb-2">Belum Ada Draft</h2>
              <p className="text-karo-brown mb-6">
                Anda belum memiliki artikel draft yang tersimpan.
              </p>
              <Link 
                to="/editor" 
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Mulai Menulis
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-karo-darkbeige overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-karo-cream">
                    <th className="text-left p-4">Judul</th>
                    <th className="text-left p-4 hidden md:table-cell">Kategori</th>
                    <th className="text-left p-4 hidden md:table-cell">Penulis</th>
                    <th className="text-left p-4 hidden md:table-cell">Tanggal</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {draftArticles.map(draft => (
                    <tr key={draft.id} className="border-t border-karo-darkbeige hover:bg-karo-cream/30 transition-colors">
                      <td className="p-4">
                        <Link 
                          to={`/article/${draft.id}`}
                          className="font-medium hover:text-karo-gold transition-colors"
                        >
                          {draft.title}
                        </Link>
                      </td>
                      <td className="p-4 hidden md:table-cell">{draft.category}</td>
                      <td className="p-4 hidden md:table-cell">{draft.author}</td>
                      <td className="p-4 hidden md:table-cell">
                        {new Date(draft.updatedAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Link 
                            to={`/editor/${draft.id}`}
                            className="p-2 rounded-full bg-karo-cream text-karo-brown hover:bg-karo-darkbeige transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          
                          <button 
                            onClick={() => handleDelete(draft.id)}
                            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Drafts;
