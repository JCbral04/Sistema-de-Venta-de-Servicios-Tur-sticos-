import express from 'express';
import {
  createServicio,
  updateServicio,
  deleteServicio,
  getAllServicios
} from '../controllers/serviciosController.js';
import { verifyToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

// Todas las rutas requieren autenticación y rol admin
router.use(verifyToken, requireAdmin);

router.get('/', getAllServicios);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

export default router;
