import { User } from "@/features/auth/types/auth.types";
import { axiosClient } from "../api/axiosClient";

export const userService = {
  async getUser(): Promise<User> {
    try {
      const response = await axiosClient.get('/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fetch User Data Failed');
    }
  }
}