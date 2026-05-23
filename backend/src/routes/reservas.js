import express from 'express';
import {
  createReserva,
  getMisReservas,
  cancelarReserva,
  getAllReservas
} from '../controllers/reservasController.js';
import { verifyToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

// Rutas para usuarios autenticados
router.post('/', verifyToken, createReserva);
router.get('/mis-reservas', verifyToken, getMisReservas);
router.put('/:id/cancelar', verifyToken, cancelarReserva);

// Rutas solo para admin
router.get('/', verifyToken, requireAdmin, getAllReservas);

export default router;
