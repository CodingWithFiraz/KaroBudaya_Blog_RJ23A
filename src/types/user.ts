
export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profileImage?: string;
}

export interface AuthFormData {
  username?: string;
  email: string;
  password: string;
}
