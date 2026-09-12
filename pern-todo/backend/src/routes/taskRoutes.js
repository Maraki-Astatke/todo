import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks - http://localhost:5000/api/tasks
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

router.post('/', taskController.createTask);
export default router;







