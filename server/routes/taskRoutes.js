import { Router } from 'express';
import { deleteTaskById, getAllTasks, taskCreate, taskStatusUpdate, taskUpdate, getTaskById } from '../controllers/taskController.js';
const router = Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', taskCreate);
router.put('/:id', taskUpdate);
router.patch('/:id/done', taskStatusUpdate);
router.delete('/:id', deleteTaskById);

export default router;
