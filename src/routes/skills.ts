import express, { Request, Response } from 'express';
import skills from '../data/skills.json' with { type: 'json' };

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error reading skills data' });
  }
});

export default router;
