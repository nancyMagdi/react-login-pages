import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import LoginForm from '@/features/auth/components/LoginForm';
import { LoginCredentials } from '@/features/auth/types/auth.types';

import { FormProvider, useForm } from 'react-hook-form';

export default function LoginPage() {
  // Initialize form methods
  const methods = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div className="flex align-items-center justify-content-center min-h-screen">
      <Card title="Login" className="w-full md:w-6 lg:w-4">
        {/* Wrap form components with FormProvider */}
        <FormProvider {...methods}>
          <LoginForm />
        </FormProvider>
        
        <div className="mt-3 text-center">
          <span className="text-600">Don't have an account?</span>{' '}
          <Button 
            link 
            label="Register" 
            onClick={() => window.location.href = '/register'} 
          />
        </div>
      </Card>
    </div>
  );
}