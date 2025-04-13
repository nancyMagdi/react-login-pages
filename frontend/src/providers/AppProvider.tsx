import { CustomPrimeReactProvider } from './PrimeReactProvider';
import { AuthProvider } from '@/features/auth/hooks/useAuth';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <CustomPrimeReactProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </CustomPrimeReactProvider>
  );
}