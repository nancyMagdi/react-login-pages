import { useState, useEffect } from 'react';
import { userService } from '@/services/auth/userService';
import { User } from '@/features/auth/types/auth.types';

interface UseDashboardReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await userService.getUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user,
    loading,
    error,
    refetchUser: fetchUserData
  };
}