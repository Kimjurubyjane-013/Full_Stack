import { orchestrateTravelPlan } from './services/ai/orchestrator.js';
import { validateTravelPlan, ValidationError } from './services/ai/validator.js';

async function runPlanVerification() {
  console.log('[Test AI] Starting Multi-Agent Travel Planner verification...');

  // Test 1: Full multi-agent orchestration
  const testInput = {
    destination: 'Kyoto, Japan',
    departureCity: 'San Francisco (SFO)',
    travelers: 2,
    dates: {
      startDate: '2026-11-01',
      endDate: '2026-11-06',
      durationDays: 5,
    },
    budget: 3200,
    vibe: 'cultural',
  };

  const plan = await orchestrateTravelPlan(testInput);

  if (!plan || !plan.id) {
    throw new Error('Test failed: No plan ID returned');
  }
  if (!plan.summary?.flights?.airline) {
    throw new Error('Test failed: Flight recommendation missing');
  }
  if (!plan.summary?.hotels?.name) {
    throw new Error('Test failed: Hotel recommendation missing');
  }
  if (!Array.isArray(plan.days) || plan.days.length === 0) {
    throw new Error('Test failed: Days array empty');
  }
  if (!Array.isArray(plan.agents) || plan.agents.length !== 4) {
    throw new Error('Test failed: Expected 4 agents in synthesis output');
  }

  console.log('[Test AI] Verified plan:', {
    id: plan.id,
    destination: plan.destination,
    days: plan.days.length,
    flight: plan.summary.flights.airline,
    hotel: plan.summary.hotels.name,
    totalEstimate: plan.summary.totalEstimate,
    agents: plan.agents.map((a) => a.name),
  });

  // Test 2: Validation rejection test on malformed input
  try {
    validateTravelPlan(null);
    throw new Error('Test failed: Validator should reject null input');
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log('[Test AI] Successfully caught expected ValidationError on null input');
    } else {
      throw err;
    }
  }

  console.log('[Test AI] All Multi-Agent AI tests passed with 100% success!');
}

runPlanVerification().catch((err) => {
  console.error('[Test AI Failed]:', err);
  process.exit(1);
});
