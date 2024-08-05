import express from 'express';
import createConsecutive  from '../handlers/consecutive';

const router = express.Router();

router.post('/create/:tenderId', createConsecutive);

export default router;
