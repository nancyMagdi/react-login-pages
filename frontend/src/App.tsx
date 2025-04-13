import AppRouter from '@/routes/AppRouter';
// import AppHeader from '@/components/layout/AppHeader';
// import AppFooter from '@/components/layout/AppFooter';

export default function App() {
  return (
    <div className="flex flex-column min-h-screen">
      {/* <AppHeader /> */}
      <main className="flex-grow-1">
        <AppRouter />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}