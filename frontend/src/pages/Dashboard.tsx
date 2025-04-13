import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LoginForm from '@/features/auth/components/LoginForm';
import { LoginCredentials } from '@/features/auth/types/auth.types';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    const { success, error } = await login(data);
    if (success) {
      const to = location.state?.from?.pathname || '/dashboard';
      navigate(to, { replace: true });
    } else if (error) {
      setError('root', { message: error });
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen p-3">
      <Card className="w-full md:w-6 lg:w-4" title="Login">
        {errors.root && (
          <Message
            severity="error"
            text={errors.root.message}
            className="w-full mb-3"
          />
        )}
        <LoginForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
}