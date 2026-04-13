import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppProvider } from '../context/AppContext';

export default function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
