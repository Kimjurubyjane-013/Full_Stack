import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes for viewing
router.get('/', getItems);
router.get('/:id', getItemById);

// Protected routes requiring JWT token
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

export default router;
