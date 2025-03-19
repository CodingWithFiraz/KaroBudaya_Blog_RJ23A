
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, UserCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6',
        isScrolled ? 'py-2 bg-white/90 backdrop-blur shadow-sm' : 'py-4 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-serif font-bold text-karo-black transition-opacity hover:opacity-80"
        >
          LOGO
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/category/destinasi-tempat" className="nav-link">
            Tempat
          </Link>
          <Link to="/category/kuliner-karo" className="nav-link">
            Makanan
          </Link>
          <Link to="/category/budaya-tradisi-karo" className="nav-link">
            Sejarah
          </Link>
          <Link to="/category/musik-karo" className="nav-link">
            Alat Musik
          </Link>
        </nav>
        
        {/* User & Search Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Link 
            to="/login" 
            className="p-2 rounded-md bg-karo-gold text-white flex items-center justify-center transition-all hover:bg-opacity-90"
          >
            <UserCircle size={24} />
          </Link>
          <button 
            className="p-2 rounded-md bg-white border border-karo-darkbeige text-karo-black flex items-center justify-center transition-all hover:bg-karo-cream"
          >
            <Search size={20} />
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-karo-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-karo-darkbeige shadow-lg animate-fade-in">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/category/destinasi-tempat" className="nav-link py-2">
              Tempat
            </Link>
            <Link to="/category/kuliner-karo" className="nav-link py-2">
              Makanan
            </Link>
            <Link to="/category/budaya-tradisi-karo" className="nav-link py-2">
              Sejarah
            </Link>
            <Link to="/category/musik-karo" className="nav-link py-2">
              Alat Musik
            </Link>
            <div className="flex items-center space-x-2 pt-2">
              <Link 
                to="/login" 
                className="flex-1 py-2 rounded-md bg-karo-gold text-white flex items-center justify-center gap-2"
              >
                <UserCircle size={20} />
                <span>Login</span>
              </Link>
              <button 
                className="flex-1 py-2 rounded-md bg-white border border-karo-darkbeige text-karo-black flex items-center justify-center gap-2"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
