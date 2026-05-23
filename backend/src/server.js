import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/auth.js';
import catalogoRoutes from './routes/catalogo.js';
import serviciosRoutes from './routes/servicios.js';
import reservasRoutes from './routes/reservas.js';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API REST - Sistema de Venta de Servicios Turísticos',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/catalogo', catalogoRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.method} ${req.path} no encontrada`
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  🌴 API REST - Sistema de Venta de Servicios Turísticos ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  🚀 Servidor corriendo en: http://localhost:${PORT}      ║`);
  console.log('║  📚 Documentación: Ver README.md                      ║');
  console.log('╚════════════════════════════════════════════════════════╝');
});

export default app;
