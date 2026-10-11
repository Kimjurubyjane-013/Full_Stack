import { Router } from 'express';
import authRoutes from './auth.routes.js';
import itemRoutes from './item.routes.js';

const router = Router();

// Root API status endpoint
router.get('/status', (req, res) => {
  res.status(200).json({
    message: 'Backend API is operational and ready to serve requests.',
    version: '1.0.0',
    service: 'Express API Server',
    endpoints: {
      auth: '/api/auth',
      items: '/api/items',
      health: '/health',
    },
    timestamp: new Date().toISOString(),
  });
});

// Sub-routers
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);

export default router;
