import express from 'express';
import {
  getServicios,
  getServicioById,
  getPaises,
  getCiudades,
  getCategorias
} from '../controllers/catalogoController.js';

const router = express.Router();

// Rutas públicas - no requieren autenticación
router.get('/servicios', getServicios);
router.get('/servicios/:id', getServicioById);
router.get('/paises', getPaises);
router.get('/ciudades', getCiudades);
router.get('/categorias', getCategorias);

export default router;
