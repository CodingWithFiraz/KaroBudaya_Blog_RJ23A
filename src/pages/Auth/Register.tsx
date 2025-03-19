
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthFormData } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Lock, Mail, User } from 'lucide-react';

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register: registerField, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm<AuthFormData & { confirmPassword: string }>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: AuthFormData & { confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    const success = await register(data);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-serif font-bold mb-6 text-center">Daftar Akun</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  className="pl-10"
                  {...registerField('username', { 
                    required: 'Username wajib diisi',
                    minLength: {
                      value: 3,
                      message: 'Username minimal 3 karakter'
                    }
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
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
                  className="pl-10"
                  {...registerField('email', { 
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email tidak valid'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
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
                  className="pl-10"
                  {...registerField('password', { 
                    required: 'Password wajib diisi',
                    minLength: {
                      value: 6,
                      message: 'Password minimal 6 karakter'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Konfirmasi Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password"
                  className="pl-10"
                  {...registerField('confirmPassword', { 
                    required: 'Konfirmasi password wajib diisi',
                    validate: value => value === password || 'Password tidak cocok'
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-karo-gold text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Daftar'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p>
              Sudah punya akun?{' '}
              <Link to="/login" className="text-karo-gold hover:underline">
                Login sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
