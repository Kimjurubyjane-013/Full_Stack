import { Plane, Building2, Wallet, CheckCircle2, Star, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function TripSummaryCard({ summary, destination, travelers, budget }) {
  if (!summary) return null;

  const { flights, hotels, totalEstimate, activitiesEstimatedCost, emergencyBuffer } = summary;

  return (
    <div className="space-y-6">
      {/* Flight Estimate Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Flight Recommendation</h3>
              <p className="text-[11px] text-slate-400">Curated by Flight Specialist Agent</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
            ${flights.estimatedCost?.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400 font-medium">Route:</span>
            <span className="font-mono text-white font-semibold">{flights.route}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400 font-medium">Preferred Airline:</span>
            <span>{flights.airline}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400 font-medium">Flight Duration:</span>
            <span className="text-emerald-400 font-mono">{flights.layover}</span>
          </div>
        </div>
      </div>

      {/* Accommodation Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Boutique Stay</h3>
              <p className="text-[11px] text-slate-400">Curated by Hotel Scout Agent</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
            ${hotels.estimatedCost?.toLocaleString()}
          </span>
        </div>

        <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-xs">
          <div>
            <h4 className="font-bold text-white text-xs">{hotels.name}</h4>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-indigo-400" /> {hotels.neighborhood}
            </p>
          </div>

          <div className="flex items-center space-x-1 text-amber-400 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-bold font-mono">{hotels.rating}</span>
            <span className="text-slate-500 text-[11px]">({hotels.nights} Nights)</span>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Included Perks:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {hotels.perks?.map((perk, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Synthesis Summary */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Budget Allocation</h3>
            <p className="text-[11px] text-slate-400">Audited by Budget Guard Agent</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Flights Estimate</span>
            <span className="font-mono text-white font-medium">${flights.estimatedCost?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Stays &amp; Accommodations</span>
            <span className="font-mono text-white font-medium">${hotels.estimatedCost?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Activities &amp; Dining</span>
            <span className="font-mono text-white font-medium">${activitiesEstimatedCost?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Emergency Cushion (5%)</span>
            <span className="font-mono text-emerald-400 font-medium">${emergencyBuffer?.toLocaleString()}</span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
            <span className="font-bold text-white">Estimated Total</span>
            <span className="font-bold text-lg font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              ${totalEstimate?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
