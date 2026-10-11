import { useState } from 'react';
import { 
  Server, 
  Activity, 
  Zap, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Terminal, 
  Code2, 
  Copy, 
  Send,
  Database,
  Lock,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/dashboard/StatCard';
import DataTable from '../components/dashboard/DataTable';
import { api } from '../services/api';

export default function DashboardPage() {
  const { 
    serverStatus, 
    isServerLoading, 
    serverError, 
    lastChecked, 
    checkServerStatus,
    showToast 
  } = useApp();

  const [activeTestRoute, setActiveTestRoute] = useState('/status');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const mockEndpoints = [
    {
      id: '1',
      name: 'System Health Check',
      method: 'GET',
      endpoint: '/health',
      auth: false,
      status: 'OPERATIONAL',
      latency: '< 15ms',
    },
    {
      id: '2',
      name: 'API Status & Metadata',
      method: 'GET',
      endpoint: '/api/status',
      auth: false,
      status: 'OPERATIONAL',
      latency: '< 20ms',
    },
    {
      id: '3',
      name: 'User Authentication (Login)',
      method: 'POST',
      endpoint: '/api/auth/login',
      auth: false,
      status: 'PENDING',
      latency: '~ 45ms',
    },
    {
      id: '4',
      name: 'User Registration',
      method: 'POST',
      endpoint: '/api/auth/register',
      auth: false,
      status: 'PENDING',
      latency: '~ 60ms',
    },
    {
      id: '5',
      name: 'Protected User Profile',
      method: 'GET',
      endpoint: '/api/users/me',
      auth: true,
      status: 'PENDING',
      latency: '~ 25ms',
    },
  ];

  const handleRunApiTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await api.raw(activeTestRoute);
      setTestResult({
        status: res.status,
        duration: res.duration,
        data: res.data,
      });
      showToast(`200 OK received from ${activeTestRoute} in ${res.duration}ms`, 'success');
    } catch (err) {
      setTestResult({
        status: err.status || 0,
        duration: 0,
        error: err.message,
      });
      showToast(err.message || 'API request failed', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Backend API Status"
          value={serverStatus ? '200 OK' : isServerLoading ? 'Testing...' : 'OFFLINE'}
          change={serverStatus ? 'Connected' : 'Unreachable'}
          isPositive={!!serverStatus}
          icon={Server}
          badge={serverStatus ? 'Port :5000' : 'Disconnected'}
          description="Express REST API"
        />

        <StatCard
          title="Frontend Client"
          value="Vite 6"
          change="HMR Active"
          isPositive={true}
          icon={Zap}
          badge="Port :5173"
          description="React 18 + Tailwind"
        />

        <StatCard
          title="Microservices"
          value="2 Workspaces"
          change="Concurrently"
          isPositive={true}
          icon={Layers}
          badge="Monorepo"
          description="Client & Server root"
        />

        <StatCard
          title="CI Pipeline"
          value="GitHub Actions"
          change="Ubuntu 20.x"
          isPositive={true}
          icon={Activity}
          badge="Passing"
          description=".github/workflows/ci.yml"
        />
      </div>

      {/* Main Diagnostic & Interactive API Test Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Playground / Diagnostics Card */}
        <div className="lg:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Endpoint Ping Test</h3>
                  <p className="text-[11px] text-slate-400">Live test against backend</p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Fetch API
              </span>
            </div>

            {/* Route Selector */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-300 block">
                Target Endpoint Path:
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-2 rounded-lg border border-slate-800 shrink-0">
                  /api
                </span>
                <input
                  type="text"
                  value={activeTestRoute}
                  onChange={(e) => setActiveTestRoute(e.target.value)}
                  placeholder="/status"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 w-full"
                />
              </div>

              <button
                onClick={handleRunApiTest}
                disabled={isTesting}
                className="w-full mt-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send GET Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Test Result Output Box */}
            <div className="mt-5">
              <span className="text-[11px] font-medium text-slate-400 block mb-2">Response Output:</span>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] min-h-[140px] max-h-[220px] overflow-auto">
                {isTesting ? (
                  <p className="text-slate-500 animate-pulse">Awaiting HTTP response...</p>
                ) : testResult ? (
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px]">
                      <span className={testResult.status === 200 ? 'text-emerald-400' : 'text-rose-400'}>
                        Status: {testResult.status}
                      </span>
                      <span className="text-slate-400">{testResult.duration}ms</span>
                    </div>
                    <pre className="text-slate-300 whitespace-pre-wrap">
                      {JSON.stringify(testResult.data || testResult.error, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-slate-500">Click &ldquo;Send GET Request&rdquo; to test live response from server.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Base: <code className="text-slate-400 font-mono">{api.baseUrl}</code></span>
            <span>Last sync: {lastChecked || 'Initial load'}</span>
          </div>
        </div>

        {/* Live Backend Telemetry & Diagnostic Card */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Server Telemetry &amp; Payload Inspection</h3>
                  <p className="text-[11px] text-slate-400">Direct response from Express router (<code className="text-indigo-400 font-mono">/server/src/routes/api.routes.js</code>)</p>
                </div>
              </div>

              <button
                onClick={checkServerStatus}
                disabled={isServerLoading}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Refresh Status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isServerLoading ? 'animate-spin text-indigo-400' : ''}`} />
              </button>
            </div>

            {/* Server Status JSON Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  Reported Message
                </span>
                <p className="text-xs font-medium text-slate-200">
                  {serverStatus?.message || (serverError ? 'Failed to fetch status' : 'Loading status...')}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  Active Service Name
                </span>
                <p className="text-xs font-mono text-indigo-400">
                  {serverStatus?.service ? `${serverStatus.service} (v${serverStatus.version})` : 'Express API'}
                </p>
              </div>
            </div>

            {/* Live RAW Payload JSON */}
            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-2">Live Response Object:</span>
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-auto max-h-[160px]">
                {serverStatus ? (
                  <pre className="text-emerald-400 whitespace-pre-wrap">
                    {JSON.stringify(serverStatus, null, 2)}
                  </pre>
                ) : (
                  <pre className="text-rose-400 whitespace-pre-wrap">
                    {JSON.stringify({ error: serverError || 'Offline', target: 'http://localhost:5000/api/status' }, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>CORS: Allowed Origin <code className="text-slate-300 font-mono">http://localhost:5173</code></span>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              Header: <span className="text-slate-300">Content-Type: application/json</span>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints Table */}
      <DataTable data={mockEndpoints} title="Microservices & API Route Directory" />
    </div>
  );
}
