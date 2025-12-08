import express from 'express';
import { EventController } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', EventController.getAll);
router.get('/:id', EventController.getById);
router.post('/', EventController.create);
router.delete('/:id', EventController.delete); // [BARU]

export default router;