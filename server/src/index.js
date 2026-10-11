import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Initialize database and verify storage
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[Server] running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
      console.log(`[Server] Health check: http://localhost:${PORT}/health`);
      console.log(`[Server] API status: http://localhost:${PORT}/api/status`);
    });
  } catch (err) {
    console.error('[Server Error] Startup failed:', err.message);
    process.exit(1);
  }
}

startServer();
