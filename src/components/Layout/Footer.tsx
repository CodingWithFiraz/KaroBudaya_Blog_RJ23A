
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-karo-cream border-t border-karo-darkbeige pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif font-semibold mb-4 text-karo-black">LOGO</h3>
            <p className="text-sm text-karo-brown mb-4">
              Platform untuk mengenal, mempelajari, dan melestarikan budaya Karo melalui tulisan 
              dan artikel berkualitas dari para kontributor.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-karo-gold hover:text-karo-brown transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-karo-gold hover:text-karo-brown transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-karo-gold hover:text-karo-brown transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-karo-gold hover:text-karo-brown transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-serif font-semibold mb-4 text-karo-black">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/destinasi-tempat" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Destinasi & Tempat
                </Link>
              </li>
              <li>
                <Link to="/category/bahasa-aksara-karo" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Bahasa & Aksara Karo
                </Link>
              </li>
              <li>
                <Link to="/category/tari-karo" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Tari Karo
                </Link>
              </li>
              <li>
                <Link to="/category/kuliner-karo" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Kuliner Karo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* More Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-serif font-semibold mb-4 text-karo-black">Kategori Lain</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/budaya-tradisi-karo" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Budaya & Tradisi Karo
                </Link>
              </li>
              <li>
                <Link to="/category/musik-karo" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Musik Karo
                </Link>
              </li>
              <li>
                <Link to="/category/pakaian-adat" className="text-karo-brown hover:text-karo-gold transition-colors">
                  Pakaian Adat
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact / Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-serif font-semibold mb-4 text-karo-black">Berlangganan</h3>
            <p className="text-sm text-karo-brown mb-3">
              Dapatkan artikel terbaru langsung ke email Anda.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-3 py-2 text-sm bg-white border border-karo-darkbeige rounded-md focus:outline-none focus:ring-2 focus:ring-karo-gold/50"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 text-sm bg-karo-gold text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-karo-darkbeige text-center text-sm text-karo-brown">
          <p>© {new Date().getFullYear()} Karo Culture Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
