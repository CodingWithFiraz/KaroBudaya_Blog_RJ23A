import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, PenLine } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [{
    name: 'Tempat',
    path: '/category/destinasi-tempat'
  }, {
    name: 'Kuliner',
    path: '/category/kuliner-karo'
  }, {
    name: 'Sejarah',
    path: '/category/sejarah'
  }, {
    name: 'Budaya',
    path: '/category/budaya'
  }];
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/category/sejarah' && (location.pathname === '/category/sejarah' || location.pathname === '/category/budaya-tradisi-karo')) {
      return true;
    }
    return location.pathname === path;
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return <header className={cn("fixed top-0 left-0 right-0 z-50 bg-white dark:bg-karo-darkbg transition-all duration-300", isScrolled && "shadow-md bg-white/90 dark:bg-karo-darkbg/90 backdrop-blur-sm")}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-bold text-2xl">
            <span className="text-karo-gold dark:text-karo-darkgold px-0 ml-10">KARO</span>
            <span className="text-karo-black dark:text-white">BUDAYA</span>
          </Link>
          
          <nav className="hidden md:flex gap-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={cn("nav-link", isActive(link.path) && "active")}>
                {link.name}
              </Link>)}
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <button onClick={() => navigate('/editor')} className="hidden md:flex items-center gap-1 text-sm py-1 px-3 rounded-full border border-karo-darkbeige dark:border-gray-700 hover:bg-karo-cream dark:hover:bg-gray-800 transition-colors">
              <PenLine size={16} />
              <span>Tulis</span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-karo-cream dark:bg-gray-700 flex items-center justify-center hover:bg-karo-darkbeige dark:hover:bg-gray-600 transition-colors">
                  <User size={18} className="text-karo-brown dark:text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? <>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/drafts')}>
                      Drafts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </> : <>
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/register')}>
                      Register
                    </DropdownMenuItem>
                  </>}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button className="block md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && <div className="md:hidden bg-white dark:bg-karo-darkbg border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={cn("py-3 px-2", isActive(link.path) ? "text-karo-gold dark:text-karo-darkgold font-medium" : "text-karo-black dark:text-white")}>
                {link.name}
              </Link>)}
            <Link to="/editor" className="py-3 px-2 text-karo-black dark:text-white">
              Tulis Artikel
            </Link>
          </div>
        </div>}
    </header>;
};
export default Header;