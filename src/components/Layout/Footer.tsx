
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-karo-black dark:bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-karo-gold dark:text-karo-darkgold">KARO</span>
              BUDAYA
            </h2>
            <p className="text-gray-400 mb-4">
              Memperkenalkan dan melestarikan warisan budaya Karo kepada dunia melalui artikel informatif dan mendalam.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Kategori */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/destinasi-tempat" className="text-gray-400 hover:text-white transition-colors">
                  Destinasi & Tempat
                </Link>
              </li>
              <li>
                <Link to="/category/bahasa-aksara-karo" className="text-gray-400 hover:text-white transition-colors">
                  Bahasa & Aksara
                </Link>
              </li>
              <li>
                <Link to="/category/tari-karo" className="text-gray-400 hover:text-white transition-colors">
                  Tari Karo
                </Link>
              </li>
              <li>
                <Link to="/category/kuliner-karo" className="text-gray-400 hover:text-white transition-colors">
                  Kuliner Karo
                </Link>
              </li>
              <li>
                <Link to="/category/budaya-tradisi-karo" className="text-gray-400 hover:text-white transition-colors">
                  Budaya & Tradisi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Hubungi Kami */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Hubungi Kami</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Kantor: Jl. Veteran No. 12, Kabanjahe, Karo, Sumatera Utara
              </li>
              <li className="text-gray-400">
                Email: info@karobudaya.id
              </li>
              <li className="text-gray-400">
                Telepon: (0628)20123
              </li>
            </ul>
          </div>
          
          {/* Berlangganan */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Berlangganan</h3>
            <p className="text-gray-400 mb-4">
              Dapatkan informasi terbaru tentang budaya Karo langsung ke email Anda.
            </p>
            <div className="flex mb-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-gray-800 text-white px-4 py-2 flex-grow rounded-l-md focus:outline-none w-full" 
              />
              <Button 
                type="submit" 
                className="bg-karo-gold hover:bg-karo-gold/90 dark:bg-karo-darkgold dark:hover:bg-karo-darkgold/90 text-white rounded-l-none"
              >
                Daftar
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Kami tidak akan mengirimkan spam. Anda dapat berhenti berlangganan kapan saja.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} KaroBudaya. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Follow Us On</span>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
            </div>
            <span className="text-gray-400">|</span>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-400">|</span>
            <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
