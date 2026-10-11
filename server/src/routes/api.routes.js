import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.json({
    message: 'Backend API is operational and ready to serve requests.',
    version: '1.0.0',
    service: 'Express API Server',
  });
});

export default router;
