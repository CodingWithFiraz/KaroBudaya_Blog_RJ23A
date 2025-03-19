
import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthFormData } from '@/types/user';
import { toast } from 'sonner';

// In a real application, this would connect to a backend
// For now, we'll use localStorage

const STORAGE_KEY = 'karo-blog-auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthFormData) => Promise<boolean>;
  register: (data: AuthFormData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (data: AuthFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would verify credentials with a backend
      const users = localStorage.getItem('karo-blog-users');
      const userList: Record<string, { userData: User, password: string }> = users ? JSON.parse(users) : {};
      
      // Check if user exists and password matches
      const userEntry = Object.values(userList).find(
        entry => entry.userData.email === data.email && entry.password === data.password
      );
      
      if (!userEntry) {
        toast.error('Email atau password salah');
        return false;
      }
      
      // Set user and store in localStorage
      setUser(userEntry.userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userEntry.userData));
      
      toast.success('Login berhasil');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Gagal login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: AuthFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!data.username || !data.email || !data.password) {
        toast.error('Semua field harus diisi');
        return false;
      }
      
      // Get existing users
      const users = localStorage.getItem('karo-blog-users');
      const userList: Record<string, { userData: User, password: string }> = users ? JSON.parse(users) : {};
      
      // Check if email already exists
      const emailExists = Object.values(userList).some(
        entry => entry.userData.email === data.email
      );
      
      if (emailExists) {
        toast.error('Email sudah terdaftar');
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        username: data.username || '',
        email: data.email,
        bio: '',
        profileImage: ''
      };
      
      // Add to users list
      userList[newUser.id] = {
        userData: newUser,
        password: data.password
      };
      
      // Save to localStorage
      localStorage.setItem('karo-blog-users', JSON.stringify(userList));
      
      // Auto login after registration
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      
      toast.success('Registrasi berhasil');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Gagal registrasi');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Berhasil logout');
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user data
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users list
      const users = localStorage.getItem('karo-blog-users');
      if (users) {
        const userList: Record<string, { userData: User, password: string }> = JSON.parse(users);
        if (userList[user.id]) {
          userList[user.id].userData = updatedUser;
          localStorage.setItem('karo-blog-users', JSON.stringify(userList));
        }
      }
      
      toast.success('Profil berhasil diperbarui');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Gagal memperbarui profil');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
