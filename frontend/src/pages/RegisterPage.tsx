import { Card } from 'primereact/card';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { RegisterData } from '@/features/auth/types/auth.types';

export default function RegisterPage() {
    const methods = useForm<RegisterData>({
        defaultValues: {
            name: '',
          email: '',
          password: ''
        }
      });
  return (
    <div className="flex align-items-center justify-content-center min-h-screen">
      <Card title="Register" className="w-full md:w-6 lg:w-4">
        {/* Wrap form components with FormProvider */}
        <FormProvider {...methods}>
          <RegisterForm />
        </FormProvider>
      </Card>
    </div>
  );
}