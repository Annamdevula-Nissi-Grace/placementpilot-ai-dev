import { Router } from 'express';
import { getSkills } from '../db/queries.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const skills = await getSkills();

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to load skills',
    });
  }
});

export default router;