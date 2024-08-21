import express from 'express';
import createConsecutive  from '../handlers/consecutiveController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/create/:tenderId', authenticate, createConsecutive);

export default router;
