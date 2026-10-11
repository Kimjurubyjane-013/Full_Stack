export default function StatCard({ title, value, change, isPositive, icon: Icon, description, badge }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-indigo-400 group-hover:scale-105 transition-transform border border-slate-700/50">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">{value}</span>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            {badge}
          </span>
        )}
      </div>

      {(change || description) && (
        <div className="mt-2 flex items-center text-xs">
          {change && (
            <span
              className={`font-semibold mr-1.5 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {change}
            </span>
          )}
          {description && <span className="text-slate-400 text-[11px]">{description}</span>}
        </div>
      )}
    </div>
  );
}
