import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Tag, 
  Bot, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Calendar,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function ItineraryTimeline({ days }) {
  const [activeDay, setActiveDay] = useState(1);

  if (!days || days.length === 0) return null;

  const currentDayData = days.find((d) => d.day === activeDay) || days[0];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
      {/* Timeline Header & Day Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Curated Daily Flow
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
            {currentDayData.theme}
          </h3>
        </div>

        {/* Day Pills Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {days.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeDay === d.day
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-pink-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {currentDayData.activities?.map((activity, index) => (
              <div key={activity.id || index} className="relative group">
                {/* Timeline node bullet */}
                <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                </div>

                {/* Activity Card */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activity.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                        {activity.period}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {activity.category}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {activity.cost}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight mt-1">
                    {activity.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{activity.location}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      <Bot className="w-3 h-3" />
                      <span>Source: {activity.agent}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
