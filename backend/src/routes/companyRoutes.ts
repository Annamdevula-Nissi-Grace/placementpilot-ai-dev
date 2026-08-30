import { Router } from 'express';
import { getCompanies } from '../db/queries.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const companies = await getCompanies();

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : 'Failed to load companies',
    });
  }
});

export default router;