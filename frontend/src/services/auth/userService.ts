import { User } from "@/features/auth/types/auth.types";
import { axiosClient } from "../api/axiosClient";

export const userService = {
  async getUser(credentials: User): Promise<User> {
    try {
      const response = await axiosClient.get('/profile');
      return { success: true, user: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
}