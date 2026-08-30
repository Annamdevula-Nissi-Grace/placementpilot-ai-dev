import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;


app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173',
  })
);


app.use(express.json());


/*
|--------------------------------------------------------------------------
| HEALTH
|--------------------------------------------------------------------------
*/

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    service:
      'PlacementPilot AI Backend',
    status: 'healthy',
    timestamp:
      new Date().toISOString(),
  });
});


app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message:
      'PlacementPilot AI API is running',
  });
});


/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use('/api/auth', authRoutes);

app.use(
  '/api/companies',
  companyRoutes
);

app.use(
  '/api/skills',
  skillRoutes
);


app.listen(PORT, () => {
  console.log(
    `PlacementPilot AI backend running on http://localhost:${PORT}`
  );
});