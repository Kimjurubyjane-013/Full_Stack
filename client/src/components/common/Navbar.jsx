import { useState } from 'react';
import { Layers, Activity, Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { currentPage, setCurrentPage, serverStatus, isServerLoading } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                ApexStack <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">v1.0</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">Full-Stack Enterprise Scaffold</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('planner')}
              className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                currentPage === 'planner'
                  ? 'text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>AI Travel Planner</span>
            </button>
            <button
              onClick={() => setCurrentPage('landing')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'landing' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              System Dashboard
            </button>
          </div>

          {/* Live Status Pill & Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="relative flex h-2 w-2">
                {serverStatus ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : isServerLoading ? (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 animate-pulse"></span>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                )}
              </span>
              <span className="text-slate-300 font-mono text-[11px]">
                {serverStatus ? 'API :5000 Online' : isServerLoading ? 'Checking...' : 'API Offline'}
              </span>
            </div>

            {currentPage !== 'planner' ? (
              <button
                onClick={() => setCurrentPage('planner')}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
              >
                Launch Planner <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Inspect Telemetry
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              setCurrentPage('landing');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Overview
          </button>
          <button
            onClick={() => {
              setCurrentPage('dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:bg-slate-800"
          >
            Live Dashboard
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentPage(currentPage === 'landing' ? 'dashboard' : 'landing');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-center font-medium"
            >
              {currentPage === 'landing' ? 'Go to Dashboard' : 'Back to Home'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
