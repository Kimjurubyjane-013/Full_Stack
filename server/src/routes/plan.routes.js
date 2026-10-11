import { Router } from 'express';
import { createPlan } from '../controllers/plan.controller.js';

const router = Router();

// POST /api/plan
router.post('/', createPlan);

export default router;
