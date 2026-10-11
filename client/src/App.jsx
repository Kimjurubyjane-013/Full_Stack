import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import Sidebar from './components/dashboard/Sidebar';
import Header from './components/dashboard/Header';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      <Navbar />

      {currentPage === 'landing' ? (
        <div className="flex-1">
          <LandingPage />
          <Footer />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Dashboard Left Sidebar */}
          <Sidebar />

          {/* Dashboard Main Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
            <Header />
            <main className="flex-1 pb-12">
              <DashboardPage />
            </main>
          </div>
        </div>
      )}

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
