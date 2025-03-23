
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      <main className="flex-grow pt-20 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
