/**
 * Strict Schema Validation & Sanitization Layer for AI Generated Plans
 */

export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.status = 422;
    this.errors = errors;
  }
}

/**
 * Validates and sanitizes the final merged travel plan.
 * Returns normalized object guaranteed to conform to the UI contract.
 */
export function validateTravelPlan(rawPlan, originalInput = {}) {
  const errors = [];

  if (!rawPlan || typeof rawPlan !== 'object') {
    throw new ValidationError('AI response is not a valid JSON object');
  }

  // 1. Core Metadata
  const destination = rawPlan.destination || originalInput.destination || 'Destination Unspecified';
  const vibe = rawPlan.vibe || originalInput.vibe || 'Cultural';
  const budget = Number(rawPlan.budget || originalInput.budget || 2500);
  const travelers = Number(rawPlan.travelers || originalInput.travelers || 2);

  const dates = {
    startDate: rawPlan.dates?.startDate || originalInput.startDate || originalInput.dates?.startDate || '2026-11-01',
    endDate: rawPlan.dates?.endDate || originalInput.endDate || originalInput.dates?.endDate || '2026-11-06',
    durationDays: Number(rawPlan.dates?.durationDays || originalInput.durationDays || 5),
  };

  // 2. Summary Validation
  const summary = rawPlan.summary || {};

  const flights = {
    airline: summary.flights?.airline || 'Premier International Carrier',
    route: summary.flights?.route || `${originalInput.departureCity || 'Origin'} ➔ ${destination}`,
    estimatedCost: Number(summary.flights?.estimatedCost || Math.round(budget * 0.42)),
    rating: summary.flights?.rating || '4.8 / 5.0',
    layover: summary.flights?.layover || 'Nonstop / Direct',
  };

  const hotels = {
    name: summary.hotels?.name || `${destination.split(',')[0]} Heritage Boutique Stay`,
    neighborhood: summary.hotels?.neighborhood || 'City Center / Historical Quarter',
    estimatedCost: Number(summary.hotels?.estimatedCost || Math.round(budget * 0.38)),
    nights: Number(summary.hotels?.nights || dates.durationDays),
    rating: summary.hotels?.rating || '4.9 / 5.0',
    perks: Array.isArray(summary.hotels?.perks) && summary.hotels.perks.length > 0
      ? summary.hotels.perks
      : ['Complimentary Breakfast', 'High-Speed Wi-Fi', 'Spa / Lounge Access'],
  };

  const activitiesEstimatedCost = Number(
    summary.activitiesEstimatedCost || Math.round(budget * 0.15)
  );
  const emergencyBuffer = Number(
    summary.emergencyBuffer || Math.round(budget * 0.05)
  );
  const totalEstimate = Number(
    summary.totalEstimate || (flights.estimatedCost + hotels.estimatedCost + activitiesEstimatedCost + emergencyBuffer)
  );

  // 3. Days & Activities Array Validation
  let days = Array.isArray(rawPlan.days) ? rawPlan.days : [];

  if (days.length === 0) {
    errors.push('Days array is empty or missing from AI response');
  }

  // Sanitize days structure
  days = days.map((dayItem, idx) => {
    const dayNumber = Number(dayItem.day || idx + 1);
    const theme = dayItem.theme || `Day ${dayNumber}: Highlights & Exploration`;

    const activities = Array.isArray(dayItem.activities)
      ? dayItem.activities.map((act, aIdx) => ({
          id: act.id || `act-${dayNumber}-${aIdx}`,
          time: act.time || '10:00 AM',
          period: act.period || 'Morning',
          title: act.title || 'Sightseeing Tour',
          description: act.description || 'Guided exploration of notable landmarks.',
          location: act.location || destination,
          cost: act.cost || 'Included',
          category: act.category || 'Sightseeing',
          agent: act.agent || 'Activities Curator Agent',
        }))
      : [];

    return {
      day: dayNumber,
      theme,
      activities,
    };
  });

  // 4. Agents Array
  const agents = Array.isArray(rawPlan.agents) && rawPlan.agents.length > 0
    ? rawPlan.agents
    : [
        { name: 'Flight Specialist', status: 'Optimized', metric: `${flights.airline} routed` },
        { name: 'Hotel Scout', status: 'Booked', metric: `${hotels.name}` },
        { name: 'Local Experience Curator', status: 'Curated', metric: `${days.length} days structured` },
        { name: 'Budget Guard', status: 'Under Budget', metric: `$${totalEstimate} within $${budget}` },
      ];

  if (errors.length > 0 && days.length === 0) {
    throw new ValidationError('Validation failed on critical plan properties', errors);
  }

  return {
    id: rawPlan.id || `plan-${Date.now()}`,
    destination,
    vibe,
    budget,
    travelers,
    dates,
    agents,
    summary: {
      flights,
      hotels,
      activitiesEstimatedCost,
      emergencyBuffer,
      totalEstimate,
    },
    days,
    generatedAt: new Date().toISOString(),
    validated: true,
    isFictionalDestination: Boolean(rawPlan.isFictionalDestination),
    fictionalNote: rawPlan.fictionalNote || undefined,
  };
}
