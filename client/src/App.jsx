import { useState, useEffect } from 'react';
import { Layers, Server, Monitor, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from './services/api';

export default function App() {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkBackendHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/status');
      setServerStatus(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server');
      setServerStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Full-Stack Application</h1>
            <p className="text-xs text-slate-400">React + Vite + Tailwind CSS &amp; Node.js + Express</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
            Monorepo Scaffolding Ready
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-6 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            System Architecture Scaffolding
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            The workspace has been initialized with separated <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">/client</code> and <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">/server</code> directories, workspace scripts, and environment configurations.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Frontend Card */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Frontend Service</h3>
                    <p className="text-xs text-slate-400">Vite dev server with HMR</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 mt-4 font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                <li>• Port: 5173</li>
                <li>• Framework: React 18</li>
                <li>• Styling: Tailwind CSS v3</li>
                <li>• Tooling: Vite 6</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs text-slate-400">
              Directory: <code className="text-slate-300">/client</code>
            </div>
          </div>

          {/* Backend Card */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Backend API</h3>
                    <p className="text-xs text-slate-400">Express REST service</p>
                  </div>
                </div>

                {loading ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" /> Checking
                  </span>
                ) : serverStatus ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Offline
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-300 space-y-2 mt-4 font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                {loading ? (
                  <p className="text-slate-400">Pinging backend at /api/status...</p>
                ) : serverStatus ? (
                  <>
                    <p className="text-emerald-400 font-semibold">{serverStatus.message}</p>
                    <p className="text-slate-400">Service: {serverStatus.service} (v{serverStatus.version})</p>
                  </>
                ) : (
                  <div>
                    <p className="text-rose-400 font-semibold">Backend not detected on :5000</p>
                    <p className="text-slate-500 mt-1">Run <code className="text-slate-300">npm run dev</code> from root to start both servers.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
              <span>Directory: <code className="text-slate-300">/server</code></span>
              <button
                onClick={checkBackendHealth}
                className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Re-check
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        Project Root Monorepo Architecture &bull; Lead System Architect Setup
      </footer>
    </div>
  );
}
