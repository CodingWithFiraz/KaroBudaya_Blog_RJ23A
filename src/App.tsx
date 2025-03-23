
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Profile from '@/pages/Auth/Profile';
import Editor from '@/pages/Editor';
import Drafts from '@/pages/Drafts';
import ArticleView from '@/pages/ArticleView';
import CategoryPage from '@/pages/CategoryPage';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'sonner';
import KulinerPage from '@/pages/KulinerPage';
import { AuthProvider } from '@/hooks/useAuth';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/article/:id/:slug" element={<ArticleView />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/kuliner-karo" element={<KulinerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
