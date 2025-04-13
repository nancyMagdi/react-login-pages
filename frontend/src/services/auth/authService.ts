import { LoginCredentials, RegisterData, AuthResponse } from '@/features/auth/types/auth.types';
import { axiosClient } from '../api/axiosClient';

export const authService = {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return { success: true, user: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      return { success: true, user: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
};