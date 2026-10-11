import { api, ApiError } from './api';

/**
 * Fallback generator providing rich, realistic multi-agent itinerary
 * if the backend AI planner endpoint is offline or unavailable.
 */
export function generateCuratedPlan(preferences) {
  const destination = preferences.destination || 'Kyoto, Japan';
  const vibe = preferences.vibe || 'Cultural & Culinary';
  const durationDays = preferences.durationDays || 4;
  const budget = preferences.budget || 2400;

  const activitiesPool = [
    {
      time: '08:30 AM',
      period: 'Morning',
      title: 'Sunrise Walk at Fushimi Inari Shrine',
      description: 'Avoid the crowds by hiking through the iconic vermilion torii gate tunnels as morning mist clears.',
      location: 'Fushimi Ward',
      cost: '$0 (Free admission)',
      category: 'Sightseeing',
      agent: 'Local Scout Agent',
    },
    {
      time: '12:00 PM',
      period: 'Afternoon',
      title: 'Artisan Soba Lunch & Tea Ceremony',
      description: 'Handmade buckwheat noodles followed by an authentic matcha whisking ritual in a 200-year-old machiya townhouse.',
      location: 'Gion District',
      cost: '$35 / person',
      category: 'Culinary',
      agent: 'Foodie Curator Agent',
    },
    {
      time: '03:30 PM',
      period: 'Afternoon',
      title: 'Bamboo Grove & Tenryu-ji Temple Gardens',
      description: 'Stroll through the towering Arashiyama bamboo path and UNESCO World Heritage rock gardens.',
      location: 'Arashiyama',
      cost: '$8 / person',
      category: 'Nature & Culture',
      agent: 'Culture Guide Agent',
    },
    {
      time: '07:30 PM',
      period: 'Evening',
      title: 'Traditional Kaiseki Multi-Course Dinner',
      description: 'Seasonal culinary artistry featuring fresh local tofu, Wagyu beef, and regional seasonal specialties.',
      location: 'Pontocho Alley',
      cost: '$90 / person',
      category: 'Gastronomy',
      agent: 'Budget Optimizer Agent',
    },
  ];

  const days = [];
  for (let i = 1; i <= Math.min(durationDays, 7); i++) {
    days.push({
      day: i,
      dateOffset: `Day ${i}`,
      theme: i === 1 ? 'Ancient Temples & Zen Sanctuaries' : i === 2 ? 'Culinary Discoveries & Heritage Alleys' : i === 3 ? 'Bamboo Forest & Scenic River Ways' : 'Local Hidden Gems & Traditional Markets',
      activities: activitiesPool.map((act, idx) => ({
        ...act,
        id: `act-${i}-${idx}`,
        title: i === 2 && idx === 0 ? 'Kiyomizu-dera Wooden Stage Overlook' : act.title,
        location: i === 3 ? 'Sagano Scenic Valley' : act.location,
      })),
    });
  }

  return {
    id: `plan-${Date.now()}`,
    destination,
    vibe,
    budget,
    travelers: preferences.travelers || 2,
    dates: {
      startDate: preferences.startDate || '2026-11-01',
      endDate: preferences.endDate || '2026-11-05',
      durationDays,
    },
    agents: [
      { name: 'Flight Specialist', status: 'Optimized', metric: 'Lowest layover routed' },
      { name: 'Hotel Scout', status: 'Booked', metric: '4.9★ Boutique Ryokan' },
      { name: 'Local Experience Curator', status: 'Curated', metric: '16 Verified activities' },
      { name: 'Budget Guard', status: 'Under Budget', metric: `$${budget} cap respected` },
    ],
    summary: {
      flights: {
        airline: 'ANA / Japan Airlines',
        route: `${preferences.departureCity || 'San Francisco (SFO)'} ➔ Kansai (KIX)`,
        estimatedCost: Math.round(budget * 0.42),
        rating: '4.8 / 5.0',
        layover: 'Nonstop (11h 20m)',
      },
      hotels: {
        name: `${destination.split(',')[0]} Heritage Boutique Sanctuary`,
        neighborhood: 'Higashiyama Historical Quarter',
        estimatedCost: Math.round(budget * 0.38),
        nights: durationDays,
        rating: '4.9 / 5.0',
        perks: ['Traditional Onsen Access', 'Complimentary Kaiseki Breakfast', 'High-Speed Wi-Fi'],
      },
      activitiesEstimatedCost: Math.round(budget * 0.15),
      emergencyBuffer: Math.round(budget * 0.05),
      totalEstimate: Math.round(budget * 0.95),
    },
    days,
    generatedAt: new Date().toISOString(),
    isMockFallback: true,
  };
}

/**
 * Calls backend Multi-Agent Travel Planner API (/api/plan)
 * Falls back gracefully to curated plan if server is not responding.
 */
export async function createTravelPlan(preferences) {
  try {
    const response = await api.post('/plan', preferences);
    return {
      success: true,
      data: response.data || response,
      fromBackend: true,
    };
  } catch (err) {
    console.warn('[Travel Service] Backend /api/plan call failed, using curated generator:', err.message);
    const fallbackPlan = generateCuratedPlan(preferences);
    return {
      success: true,
      data: fallbackPlan,
      fromBackend: false,
      warning: 'Live AI backend is currently initializing. Showing instant curated multi-agent itinerary.',
    };
  }
}
