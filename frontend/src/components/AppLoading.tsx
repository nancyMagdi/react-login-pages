import { ProgressSpinner } from 'primereact/progressspinner';

type AppLoadingProps = {
  message?: string;
  size?: 'normal' | 'small' | 'large';
};

export default function AppLoading({ 
  message = 'Loading...', 
  size = 'normal' 
}: AppLoadingProps) {
  const spinnerSize = {
    small: '1.5rem',
    normal: '2.5rem',
    large: '4rem'
  }[size];

  return (
    <div className="flex flex-column align-items-center justify-content-center gap-3" style={{ height: '100vh' }}>
      <ProgressSpinner 
        style={{ width: spinnerSize, height: spinnerSize }} 
        strokeWidth="4" 
        animationDuration=".5s" 
      />
      {message && <p className="text-600">{message}</p>}
    </div>
  );
}