import { motion } from 'framer-motion';
import { Check, MapPin, Calendar, Wallet, Sparkles } from 'lucide-react';

export default function Stepper({ currentStep, steps, onStepClick }) {
  const icons = [MapPin, Calendar, Wallet, Sparkles];

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-2">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0" />

        {/* Animated Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const Icon = icons[idx] || Sparkles;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.button
                type="button"
                onClick={() => isCompleted && onStepClick && onStepClick(stepNumber)}
                disabled={!isCompleted}
                whileHover={isCompleted ? { scale: 1.1 } : {}}
                whileTap={isCompleted ? { scale: 0.95 } : {}}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold text-xs transition-all duration-300 shadow-lg ${
                  isCompleted
                    ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white cursor-pointer shadow-indigo-500/25 ring-2 ring-indigo-400/30'
                    : isCurrent
                    ? 'bg-slate-900 text-white border-2 border-indigo-500 ring-4 ring-indigo-500/20 shadow-indigo-500/40'
                    : 'bg-slate-900/90 text-slate-500 border border-slate-800'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-indigo-400' : 'text-slate-500'}`} />
                )}
              </motion.button>

              <span
                className={`mt-2 text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-indigo-400 font-bold'
                    : isCompleted
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
