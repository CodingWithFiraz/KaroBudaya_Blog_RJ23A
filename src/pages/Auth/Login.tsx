
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthFormData } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';
import { Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
  
  const onSubmit = async (data: AuthFormData) => {
    const success = await login(data);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-karo-darkbg">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-md p-8 bg-white dark:bg-karo-darkcard shadow-lg rounded-lg">
          <h1 className="text-2xl font-serif font-bold mb-6 text-center dark:text-white">Login</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium dark:text-gray-200">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  {...register('email', { 
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email tidak valid'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  {...register('password', { 
                    required: 'Password wajib diisi',
                    minLength: {
                      value: 6,
                      message: 'Password minimal 6 karakter'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-karo-gold dark:bg-karo-darkgold text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm dark:text-gray-300">
            <p>
              Belum punya akun?{' '}
              <Link to="/register" className="text-karo-gold dark:text-karo-darkgold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
