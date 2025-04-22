import { Request, Response, Router } from 'express';
import skills from '@/data/skills.json' with { type: 'json' };

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(skills);
});

export default router;
