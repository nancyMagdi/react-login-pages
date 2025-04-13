export type User = {
    id: string;
    name: string;
    email: string;
    token: string;
  };
  
  export type LoginCredentials = {
    email: string;
    password: string;
  };
  
  export type RegisterData = {
    name: string;
    email: string;
    password: string;
  };
  
  export type AuthResponse = {
    success: boolean;
    error?: string;
    user?: User;
  };
