import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Download, 
  Printer, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Bot,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import Stepper from '../components/travel/Stepper';
import WizardForm from '../components/travel/WizardForm';
import ShimmerSkeleton from '../components/travel/ShimmerSkeleton';
import TripSummaryCard from '../components/travel/TripSummaryCard';
import ItineraryTimeline from '../components/travel/ItineraryTimeline';
import AgentCollaborationBar from '../components/travel/AgentCollaborationBar';
import { createTravelPlan } from '../services/travelService';
import { useApp } from '../context/AppContext';

export default function TravelPlannerPage() {
  const { showToast } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const steps = [
    { id: 1, title: 'Destination' },
    { id: 2, title: 'Dates & Time' },
    { id: 3, title: 'Budget Allocation' },
    { id: 4, title: 'Vibe & Style' },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    showToast('Multi-Agent AI Swarm activated. Synthesizing recommendations...', 'info');

    // Simulate agent coordination delay for smooth UX transition
    await new Promise((resolve) => setTimeout(resolve, 2200));

    try {
      const result = await createTravelPlan(formData);
      setItinerary(result.data);

      if (result.warning) {
        showToast(result.warning, 'info');
      } else {
        showToast('Your custom AI travel itinerary is ready!', 'success');
      }
    } catch (err) {
      showToast('Could not reach backend planner: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setCurrentStep(1);
    showToast('Reset travel planner wizard', 'info');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Itinerary link copied to clipboard!', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          <span>Multi-Agent Travel Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Intelligent Multi-Agent Travel Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Powered by specialized AI agents collaborating in real-time to book optimal flights, discover boutique stays, and curate hyper-personalized daily adventures.
        </p>
      </div>

      {/* VIEW 1: LOADING SKELETON (SHIMMER) */}
      {isLoading && <ShimmerSkeleton />}

      {/* VIEW 2: STEPPER WIZARD FORM */}
      {!isLoading && !itinerary && (
        <div className="space-y-8">
          <Stepper
            currentStep={currentStep}
            steps={steps}
            onStepClick={(step) => setCurrentStep(step)}
          />

          <WizardForm
            currentStep={currentStep}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleFormSubmit}
            isSubmitting={isLoading}
          />
        </div>
      )}

      {/* VIEW 3: ITINERARY DASHBOARD RESULTS */}
      {!isLoading && itinerary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Top Bar with Trip Highlights & Action Buttons */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  {itinerary.vibe} Vibe
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {itinerary.dates?.durationDays} Days &bull; {itinerary.travelers} Travelers
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-6 h-6 text-rose-500 shrink-0" />
                <span>{itinerary.destination}</span>
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Plan Another Trip
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" /> Export PDF
              </button>
            </div>
          </div>

          {/* Agent Collaboration Bar */}
          <AgentCollaborationBar agents={itinerary.agents} />

          {/* Main Dashboard Layout: Summary + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 1/3: Summary Cards */}
            <div className="lg:col-span-1">
              <TripSummaryCard
                summary={itinerary.summary}
                destination={itinerary.destination}
                travelers={itinerary.travelers}
                budget={itinerary.budget}
                isFictionalDestination={itinerary.isFictionalDestination}
                fictionalNote={itinerary.fictionalNote}
              />
            </div>

            {/* Right 2/3: Day-by-Day Interactive Timeline */}
            <div className="lg:col-span-2">
              <ItineraryTimeline days={itinerary.days} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
