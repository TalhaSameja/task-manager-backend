import express from 'express';
import { getTasks, addTask, deleteTask, markComplete } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, addTask);
router.post('/delete', authMiddleware, deleteTask);
router.post('/completed', authMiddleware, markComplete);

export default router;