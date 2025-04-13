import { Controller, useFormContext } from 'react-hook-form';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { LoginCredentials } from '../types/auth.types';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useFormContext<LoginCredentials>();

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-column gap-2">
            <label htmlFor={field.name}>Email</label>
            <InputText
              id={field.name}
              value={field.value}
              className={classNames({ 'p-invalid': fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
            />
            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-column gap-2">
            <label htmlFor={field.name}>Password</label>
            <Password
              id={field.name}
              value={field.value}
              className={classNames({ 'p-invalid': fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
              toggleMask
              feedback={false}
            />
            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </div>
        )}
      />

      {errors.root && (
        <div className="p-error">{errors.root.message}</div>
      )}

      <Button
        type="submit"
        label="Login"
        icon="pi pi-sign-in"
        loading={isSubmitting}
      />
    </form>
  );
}