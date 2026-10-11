import { useState } from 'react';
import { Search, ExternalLink, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DataTable({ data, title = 'Registered Service Endpoints' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || item.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPERATIONAL':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Active
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-950 text-amber-400 border border-amber-800">
            <Clock className="w-3 h-3 mr-1" /> Standby
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
            {status}
          </span>
        );
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      GET: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      POST: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      PUT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      DELETE: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };
    return (
      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${colors[method] || 'bg-slate-800 text-slate-300'}`}>
        {method}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <p className="text-xs text-slate-400">Available API surface and microservice routing</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter endpoint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 w-44 sm:w-56"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Status</option>
            <option value="OPERATIONAL">Active</option>
            <option value="PENDING">Standby</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
            <tr>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Route Endpoint</th>
              <th className="px-5 py-3">Service Name</th>
              <th className="px-5 py-3">Auth Guard</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Latency Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                  No matching endpoints found
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono">{getMethodBadge(row.method)}</td>
                  <td className="px-5 py-3.5 font-mono text-indigo-400 font-medium">
                    {row.endpoint}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-200">{row.name}</td>
                  <td className="px-5 py-3.5">
                    {row.auth ? (
                      <span className="inline-flex items-center text-amber-400 font-mono text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> JWT Required
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">Public</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">{getStatusBadge(row.status)}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-400">{row.latency}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
