import { motion } from 'framer-motion';
import { Sparkles, Bot, Plane, Building2, MapPin } from 'lucide-react';

export default function ShimmerSkeleton() {
  const agentTasks = [
    { name: 'Flight Specialist', icon: Plane, status: 'Scanning 45+ airline schedules for optimal routes...' },
    { name: 'Hotel Scout', icon: Building2, status: 'Negotiating boutique ryokan & hotel amenities...' },
    { name: 'Local Experience Curator', icon: MapPin, status: 'Sequencing hidden gems and cultural landmarks...' },
    { name: 'Budget Guard', icon: Sparkles, status: 'Balancing per-diem spend against target threshold...' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-6 animate-pulse">
      {/* Top Multi-Agent Status Shimmer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Multi-Agent Collaborative Intelligence Active
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Synthesizing Itinerary
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Four specialized AI agents are currently negotiating flights, accommodations, and pacing.
            </p>
          </div>
        </div>

        {/* Live Agent Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentTasks.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div key={agent.name} className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                {/* Shimmer bar */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{agent.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono leading-tight">{agent.status}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary Shimmer */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="h-5 bg-slate-800 rounded-md w-3/4" />
            <div className="h-28 bg-slate-950 rounded-2xl border border-slate-800/60" />
            <div className="h-28 bg-slate-950 rounded-2xl border border-slate-800/60" />
            <div className="h-10 bg-slate-800 rounded-xl w-full" />
          </div>
        </div>

        {/* Right Column: Timeline Shimmer */}
        <div className="lg:col-span-2 space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-slate-800 rounded-lg w-1/3" />
                <div className="h-4 bg-slate-800 rounded-full w-24" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-16 bg-slate-950 rounded-2xl border border-slate-800/60" />
                <div className="h-16 bg-slate-950 rounded-2xl border border-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
