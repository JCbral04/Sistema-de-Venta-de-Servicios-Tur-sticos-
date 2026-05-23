import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { formatResponse, handleError } from '../utils/helpers.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json(formatResponse(false, null, 'Token no proporcionado'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar que el usuario existe en la base de datos
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id_usuario, nombre, correo, rol')
      .eq('id_usuario', decoded.id)
      .single();

    if (error || !user) {
      return res.status(401).json(formatResponse(false, null, 'Usuario no válido'));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(formatResponse(false, null, 'Token inválido o expirado'));
  }
};
