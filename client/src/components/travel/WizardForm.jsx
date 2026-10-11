import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Plane, 
  Coffee, 
  Compass, 
  Heart, 
  Utensils, 
  Trees, 
  Music, 
  Check,
  Palmtree,
  Mountain
} from 'lucide-react';

const popularDestinations = [
  { name: 'Kyoto, Japan', country: 'Japan', tag: 'Cultural' },
  { name: 'Amalfi Coast, Italy', country: 'Italy', tag: 'Romantic' },
  { name: 'Reykjavik, Iceland', country: 'Iceland', tag: 'Adventure' },
  { name: 'Banff National Park', country: 'Canada', tag: 'Nature' },
  { name: 'Paris, France', country: 'France', tag: 'Romantic' },
  { name: 'Bali, Indonesia', country: 'Indonesia', tag: 'Relaxing' },
];

const vibesList = [
  { id: 'relaxing', title: 'Relaxing & Wellness', desc: 'Spas, coastal retreats, slow mornings', icon: Palmtree, color: 'from-teal-500/20 to-emerald-500/20 text-emerald-400' },
  { id: 'adventure', title: 'Thrill & Adventure', desc: 'Hiking, outdoor exploration, adrenaline', icon: Mountain, color: 'from-amber-500/20 to-orange-500/20 text-orange-400' },
  { id: 'cultural', title: 'Culture & Heritage', desc: 'Ancient temples, museums, local history', icon: Compass, color: 'from-indigo-500/20 to-violet-500/20 text-indigo-400' },
  { id: 'foodie', title: 'Gourmet & Foodie', desc: 'Michelin dining, street eats, wine tastings', icon: Utensils, color: 'from-rose-500/20 to-pink-500/20 text-pink-400' },
  { id: 'romantic', title: 'Romantic Getaway', desc: 'Scenic sunsets, secluded stays, candlelit dinners', icon: Heart, color: 'from-red-500/20 to-rose-500/20 text-rose-400' },
  { id: 'nightlife', title: 'Urban & Nightlife', desc: 'Rooftops, live music, bustling city energy', icon: Music, color: 'from-purple-500/20 to-fuchsia-500/20 text-purple-400' },
];

export default function WizardForm({ currentStep, onNext, onPrev, onSubmit, isSubmitting }) {
  // Form State
  const [formData, setFormData] = useState({
    destination: 'Kyoto, Japan',
    departureCity: 'San Francisco (SFO)',
    travelers: 2,
    startDate: '2026-11-01',
    endDate: '2026-11-06',
    durationDays: 5,
    budget: 3200,
    vibe: 'cultural',
    specialRequests: 'Prefer boutique ryokan stays and authentic matcha experiences.',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBudgetTier = (budget) => {
    if (budget < 1500) return { label: 'Budget Conscious', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' };
    if (budget < 3500) return { label: 'Comfort & Quality', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' };
    if (budget < 6000) return { label: 'Luxury Experience', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    return { label: 'Ultra-VIP & Bespoke', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' };
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 5;
    const diff = new Date(end) - new Date(start);
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const handleDateChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    const days = calculateDays(
      field === 'startDate' ? value : formData.startDate,
      field === 'endDate' ? value : formData.endDate
    );
    updated.durationDays = days;
    setFormData(updated);
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === 4) {
            onSubmit(formData);
          } else {
            onNext();
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: DESTINATION & TRAVELERS */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 1 of 4</span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Where is your dream escape?</h2>
                <p className="text-xs text-slate-400 mt-1">Select or type any destination in the world for multi-agent curation.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Destination City or Region</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => updateField('destination', e.target.value)}
                      placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Popular Destination Quick Chips */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-2">Popular Trending Spots:</span>
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations.map((dest) => (
                      <button
                        type="button"
                        key={dest.name}
                        onClick={() => updateField('destination', dest.name)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          formData.destination === dest.name
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {dest.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Origin / Departure City</label>
                    <div className="relative">
                      <Plane className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.departureCity}
                        onChange={(e) => updateField('departureCity', e.target.value)}
                        placeholder="e.g. New York (JFK)"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Number of Travelers</label>
                    <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
                      <Users className="w-4 h-4 text-slate-400 ml-1" />
                      <button
                        type="button"
                        onClick={() => updateField('travelers', Math.max(1, formData.travelers - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono text-sm font-semibold text-white">
                        {formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateField('travelers', formData.travelers + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: TRAVEL DATES */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 2 of 4</span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">When are you traveling?</h2>
                <p className="text-xs text-slate-400 mt-1">Choose your travel dates. Our agents optimize daily scheduling accordingly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Departure Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => handleDateChange('startDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Return Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => handleDateChange('endDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Trip Duration Highlight Card */}
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Estimated Trip Duration</h4>
                    <p className="text-[11px] text-slate-400">Paced for balanced exploration &amp; rest</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-indigo-300">
                    {formData.durationDays} Days
                  </span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">Duration Presets:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { days: 3, label: '3 Days (Weekend)' },
                    { days: 5, label: '5 Days (Getaway)' },
                    { days: 7, label: '7 Days (Classic)' },
                    { days: 10, label: '10 Days (Grand)' },
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset.days}
                      onClick={() => updateField('durationDays', preset.days)}
                      className={`text-xs py-2 px-3 rounded-xl border text-center transition-all ${
                        formData.durationDays === preset.days
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: BUDGET */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 3 of 4</span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">What is your total budget?</h2>
                <p className="text-xs text-slate-400 mt-1">Our Budget Optimizer Agent ensures flight, lodging, and activities fit this range.</p>
              </div>

              {/* Budget Display Card */}
              <div className="text-center py-6 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target Total Budget</span>
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 font-mono mt-1">
                  ${formData.budget.toLocaleString()}
                </div>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getBudgetTier(formData.budget).color}`}>
                    {getBudgetTier(formData.budget).label}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>$800 (Backpacker)</span>
                  <span>$5,000 (Luxury)</span>
                  <span>$10,000+ (VIP)</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="10000"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => updateField('budget', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Projected Allocation Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Flight Allocation</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">~${Math.round(formData.budget * 0.42)}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Stays &amp; Ryokan</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">~${Math.round(formData.budget * 0.38)}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Food &amp; Tours</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">~${Math.round(formData.budget * 0.20)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: VIBE & SUBMIT */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 4 of 4</span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">What vibe are you chasing?</h2>
                <p className="text-xs text-slate-400 mt-1">Our Curator Agent crafts activities aligned with your personal style.</p>
              </div>

              {/* Vibe Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {vibesList.map((vibe) => {
                  const Icon = vibe.icon;
                  const isSelected = formData.vibe === vibe.id;
                  return (
                    <button
                      type="button"
                      key={vibe.id}
                      onClick={() => updateField('vibe', vibe.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                        isSelected
                          ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${vibe.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold text-white">{vibe.title}</h4>
                          {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{vibe.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Additional Notes input */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">Special Wishes or Dietary Preferences</label>
                <textarea
                  rows="2"
                  value={formData.specialRequests}
                  onChange={(e) => updateField('specialRequests', e.target.value)}
                  placeholder="e.g. Vegetarian dining, love photography spots, prefer quiet mornings"
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={onPrev}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              Continue <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/40 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Agents Generating...' : 'Generate AI Travel Plan'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
