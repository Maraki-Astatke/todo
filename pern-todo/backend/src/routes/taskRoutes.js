import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks - http://localhost:5000/api/tasks
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);


// POST a new task - http://localhost:5000/api/tasks
router.post('/', taskController.createTask);

// PUT (update) a task - http://localhost:5000/api/tasks/:id
router.put('/:id', taskController.updateTask);

// DELETE a task - http://localhost:5000/api/tasks/:id
router.delete('/:id', taskController.deleteTask);

export default router;