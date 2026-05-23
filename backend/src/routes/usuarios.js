import express from 'express';
import { getAllUsuarios, updateRol } from '../controllers/usuariosController.js';
import { verifyToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get('/', getAllUsuarios);
router.put('/:id/rol', updateRol);

export default router;
