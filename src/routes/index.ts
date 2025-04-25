import { Router } from 'express';
import skillsRouter from '@/routes/controllers/skills/skills.js';
import contactRouter from '@/routes/controllers/contact/contact.js';
import healthRouter from '@/routes/controllers/health/health.js';

const router = Router();

router.use('/api/skills', skillsRouter);
router.use('/api/contact', contactRouter);
router.use('/api/health', healthRouter);

export default router;