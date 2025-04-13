import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDashboard } from '@/features/auth/hooks/useDashbaord';
import { Button } from 'primereact/button';

export default function Dashboard() {
  const { user, loading, error, refetchUser } = useDashboard();

  if (loading) {
    return (
      <div className="flex align-items-center justify-content-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="flex align-items-center justify-content-center min-h-screen p-3">
      <Card className="w-full md:w-8 lg:w-6" title="Dashboard">
        {error ? (
          <>
            <Message severity="error" text={error} className="w-full mb-3" />
            <Button label="Retry" onClick={refetchUser} className="p-button-sm" />
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Hello, {user?.name}!
            </h2>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Your Profile</h3>
              <div className="p-grid">
                <div className="p-col-12 mb-2">
                  <strong>Email:</strong> {user?.email}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}