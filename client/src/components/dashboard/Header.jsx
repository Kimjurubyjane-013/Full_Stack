import { RefreshCw, Bell, Search, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { 
    activeTab, 
    checkServerStatus, 
    isServerLoading, 
    serverStatus, 
    lastChecked,
    user,
    showToast 
  } = useApp();

  const handleRefresh = async () => {
    const result = await checkServerStatus();
    if (result.success) {
      showToast('Successfully refreshed backend status', 'success');
    } else {
      showToast(result.error || 'Server ping failed', 'error');
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Title & Path */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <span>ApexStack</span>
          <span>/</span>
          <span className="text-indigo-400 uppercase">{activeTab}</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight mt-0.5 capitalize">
          {activeTab === 'overview' && 'System Architecture Dashboard'}
          {activeTab === 'services' && 'Microservices & API Endpoints'}
          {activeTab === 'database' && 'Database Schema & ORM Status'}
          {activeTab === 'telemetry' && 'Live Performance Telemetry'}
          {activeTab === 'settings' && 'Environment Configurations'}
        </h1>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Ping status button */}
        <button
          onClick={handleRefresh}
          disabled={isServerLoading}
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors disabled:opacity-50"
          title="Re-check backend API /status endpoint"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isServerLoading ? 'animate-spin text-indigo-400' : 'text-slate-400'}`} />
          <span>{isServerLoading ? 'Pinging API...' : 'Ping /api/status'}</span>
        </button>

        {/* User profile capsule */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border border-indigo-400/30">
            FS
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-slate-200 leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
