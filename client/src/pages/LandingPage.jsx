import { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  Server, 
  RefreshCw,
  GitBranch,
  Monitor
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { setCurrentPage, serverStatus, isServerLoading, checkServerStatus, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    showToast('Command copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Background glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5 text-sky-400" />
          <span>VoyageAI Multi-Agent Travel Planner v1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Autonomous AI-Powered Travel Architecture
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Engineered for wanderlust. Four autonomous AI agents coordinate in real-time to design bespoke itineraries, find optimal flights, book boutique stays, and protect your budget.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Explore Live Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => copyCommand('npm run dev')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center space-x-2.5 transition-colors"
          >
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>npm run dev</span>
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
          </button>
        </div>

        {/* Live Status Pill Card */}
        <div className="mt-12 max-w-lg mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <div className={`p-2.5 rounded-xl ${serverStatus ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Backend Microservice Link</h4>
                <p className="text-[11px] text-slate-400 font-mono">http://localhost:5000/api/status</p>
              </div>
            </div>

            <button
              onClick={checkServerStatus}
              disabled={isServerLoading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Ping backend"
            >
              <RefreshCw className={`w-4 h-4 ${isServerLoading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Connection:</span>
            {serverStatus ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK &bull; Connected
              </span>
            ) : isServerLoading ? (
              <span className="text-amber-400 font-medium font-mono text-[11px]">Verifying link...</span>
            ) : (
              <span className="text-rose-400 font-medium font-mono text-[11px]">Server Offline (:5000)</span>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Engineered for Velocity</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Everything your team needs out-of-the-box
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Dual-Folder Monorepo</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Clean separation of concerns with `/client` and `/server`. Orchestrated simultaneously from root with npm workspaces.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Vite 6 + React 18</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Instant Hot Module Replacement (HMR) and optimized rollup production bundling with Tailwind CSS utility styling.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">CORS &amp; Helmet Guard</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Express backend fortified with Helmet security headers and configured CORS policies allowing requests from :5173.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Deep Dive */}
      <section id="architecture" className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">System Architecture</span>
            <h3 className="mt-2 text-2xl font-bold text-white tracking-tight">
              Pre-wired for Full-Stack Integration
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
              The client-side API communication client is pre-wired to <code className="text-indigo-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">/src/services/api.js</code> with environment overrides, interceptors for Bearer token injection, and structured error handling.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unified environment templates (<code className="font-mono text-slate-400">.env.example</code>)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GitHub Actions CI Pipeline validating client &amp; server builds</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Conventional Commits and strict Git branch guidelines</span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                Inspect Dashboard Telemetry <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

          {/* Terminal / Code Box */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-slate-500">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[11px] text-slate-400">workspace-orchestration.sh</span>
            </div>

            <pre className="text-slate-300 overflow-x-auto leading-relaxed">
              <code>{`# 1. Install all dependencies across workspaces
$ npm install

# 2. Run both Client (:5173) and Server (:5000)
$ npm run dev

[SERVER] [Server] running on http://localhost:5000
[CLIENT] VITE v6.1.0 ready in 240 ms
[CLIENT] ➜  Local:   http://localhost:5173/
[CLIENT] ➜  Network: use --host to expose`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
