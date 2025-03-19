
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Camera, LogOut, Mail, Pencil, User } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || ''
    }
  });
  
  const onSubmit = async (data: { username: string; email: string; bio: string }) => {
    const profileData = {
      ...data,
      profileImage: imagePreview || user?.profileImage
    };
    
    const success = await updateProfile(profileData);
    if (success) {
      // Stay on the same page
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.username) return '?';
    return user.username.charAt(0).toUpperCase();
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Profil Saya</CardTitle>
            </CardHeader>
            
            <Tabs defaultValue="profile" className="px-6">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Informasi Profil</TabsTrigger>
                <TabsTrigger value="settings">Pengaturan Akun</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-2 border-white shadow-md">
                          {(imagePreview || user.profileImage) ? (
                            <AvatarImage 
                              src={imagePreview || user.profileImage} 
                              alt={user.username} 
                            />
                          ) : (
                            <AvatarFallback className="bg-karo-gold text-white text-xl">
                              {getInitials()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <label 
                          htmlFor="profile-image" 
                          className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <Camera size={16} className="text-karo-black" />
                          <input 
                            type="file" 
                            id="profile-image"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      
                      <h2 className="text-xl font-semibold">{user.username}</h2>
                      <p className="text-karo-brown text-sm">{user.email}</p>
                    </div>
                    
                    <div className="space-y-3">
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
                            placeholder="Username"
                            className="pl-10"
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
                            placeholder="Email"
                            className="pl-10"
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
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="bio" className="block text-sm font-medium">
                          Bio
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <Pencil size={18} />
                          </span>
                          <textarea
                            id="bio"
                            placeholder="Ceritakan tentang dirimu..."
                            className="w-full rounded-md border border-input bg-background pl-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                            {...register('bio')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="justify-between border-t p-6">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-karo-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="settings">
                <CardContent className="py-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Ubah Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Fitur ini akan segera tersedia.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Notifikasi</h3>
                      <p className="text-sm text-muted-foreground">
                        Fitur ini akan segera tersedia.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Hapus Akun</h3>
                      <p className="text-sm text-muted-foreground">
                        Fitur ini akan segera tersedia.
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="justify-end border-t p-6">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
