import { formatResponse } from '../utils/helpers.js';

export const requireAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json(
      formatResponse(false, null, 'Acceso denegado. Se requiere rol de administrador.')
    );
  }
  next();
};
