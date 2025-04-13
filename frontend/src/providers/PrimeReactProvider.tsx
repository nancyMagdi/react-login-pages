import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ReactNode } from 'react';

export function CustomPrimeReactProvider({ children }: { children: ReactNode }) {
  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      {children}
    </PrimeReactProvider>
  );
}

// Add this if you want to use the provider directly
export default CustomPrimeReactProvider;