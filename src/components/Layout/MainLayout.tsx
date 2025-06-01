
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '@/components/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 md:mt-20">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
