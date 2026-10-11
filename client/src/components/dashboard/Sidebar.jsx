import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Settings, 
  Database, 
  Home, 
  ShieldCheck, 
  ChevronRight,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, setCurrentPage, serverStatus } = useApp();

  const navigation = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'services', label: 'API Services', icon: Server, badge: 'Active' },
    { id: 'database', label: 'Database & Models', icon: Database, badge: 'Ready' },
    { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
    { id: 'settings', label: 'Environment Config', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/95 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 space-y-6">
        {/* Navigation Category */}
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3">
            Core Workspace
          </span>
          <nav className="mt-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Server Connection Card */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
              <Radio className={`w-3.5 h-3.5 ${serverStatus ? 'text-emerald-400 animate-pulse' : 'text-rose-400'}`} />
              Backend Service
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
              serverStatus 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                : 'bg-rose-950 text-rose-300 border border-rose-800'
            }`}>
              {serverStatus ? ':5000 Online' : 'Disconnected'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            {serverStatus ? 'Express app running with CORS & helmet.' : 'Run `npm run dev` to start Express.'}
          </p>
        </div>
      </div>

      {/* Return to Home link */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage('landing')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Public Landing Page</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </aside>
  );
}
