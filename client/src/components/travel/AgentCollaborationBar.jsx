import { Bot, Plane, Building2, Compass, Wallet, CheckCircle2 } from 'lucide-react';

export default function AgentCollaborationBar({ agents }) {
  if (!agents || agents.length === 0) return null;

  const agentIcons = {
    'Flight Specialist': Plane,
    'Hotel Scout': Building2,
    'Local Experience Curator': Compass,
    'Budget Guard': Wallet,
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-indigo-400" /> Multi-Agent Swarm Synthesis
        </span>
        <span className="text-[11px] text-emerald-400 font-mono font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> 4 Agents Converged
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.name] || Bot;
          return (
            <div
              key={agent.name}
              className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex items-center space-x-3"
            >
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{agent.name}</h4>
                <p className="text-[11px] text-slate-400 truncate">{agent.metric}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
