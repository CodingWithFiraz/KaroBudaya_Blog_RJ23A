
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AuthLayout from '@/components/Layout/AuthLayout';
import { Lock, Mail, User } from 'lucide-react';

type AuthFormData = {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
};

const Register: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm<AuthFormData & { confirmPassword: string }>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: AuthFormData & { confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    const success = await registerUser(data);
    if (success) {
      navigate('/');
    } else {
      toast.error('Registrasi gagal');
    }
  };
  
  return (
    <AuthLayout>
      <div className="bg-white dark:bg-karo-darkcard p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-serif font-bold mb-6 text-center dark:text-white">Register</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium dark:text-gray-200">
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
                className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                {...register('username', { 
                  required: 'Username wajib diisi',
                  minLength: {
                    value: 3,
                    message: 'Username minimal 3 karakter'
                  }
                })}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500 dark:text-red-400">{errors.username.message}</p>
            )}
          </div>
          
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
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium dark:text-gray-200">
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
                className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                {...register('confirmPassword', { 
                  required: 'Konfirmasi password wajib diisi',
                  validate: value => value === password || 'Password tidak cocok'
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-karo-gold dark:bg-karo-darkgold text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Register'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm dark:text-gray-300">
          <p>
            Sudah punya akun?{' '}
            <Link to="/login" className="text-karo-gold dark:text-karo-darkgold hover:underline">
              Login sekarang
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
