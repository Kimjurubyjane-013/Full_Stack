import { orchestrateTravelPlan } from '../services/ai/orchestrator.js';
import { ValidationError } from '../services/ai/validator.js';

/**
 * @desc    Generate a Multi-Agent Travel Itinerary Plan
 * @route   POST /api/plan
 * @access  Public
 */
export async function createPlan(req, res, next) {
  try {
    const { destination, dates, budget, vibe } = req.body;

    if (!destination || destination.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Destination is required to generate a travel plan.',
      });
    }

    if (budget && isNaN(Number(budget))) {
      return res.status(400).json({
        success: false,
        message: 'Budget must be a valid numeric amount.',
      });
    }

    // Execute multi-agent AI pipeline
    const travelPlan = await orchestrateTravelPlan(req.body);

    return res.status(200).json({
      success: true,
      message: 'Multi-Agent travel plan generated and validated successfully.',
      data: travelPlan,
    });
  } catch (err) {
    console.error('[Plan Controller Error]', err);

    if (err instanceof ValidationError) {
      return res.status(422).json({
        success: false,
        message: 'AI output failed schema validation.',
        errors: err.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to generate travel plan due to an internal AI service error.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
  }
}

export default {
  createPlan,
};
