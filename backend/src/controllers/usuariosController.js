import { supabase } from '../config/supabase.js';
import { formatResponse, handleError } from '../utils/helpers.js';

// GET /api/usuarios - Listar todos los usuarios (Admin)
export const getAllUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id_usuario, nombre, correo, rol, created_at')
      .order('id_usuario');

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/usuarios/:id/rol - Cambiar rol (Admin)
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!rol || !['cliente', 'admin'].includes(rol)) {
      return res.status(400).json(
        formatResponse(false, null, 'Rol inválido. Debe ser "cliente" o "admin"')
      );
    }

    const { data, error } = await supabase
      .from('usuarios')
      .update({ rol })
      .eq('id_usuario', id)
      .select('id_usuario, nombre, correo, rol')
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json(formatResponse(false, null, 'Usuario no encontrado'));
    }

    return res.json(formatResponse(true, data, 'Rol actualizado exitosamente'));
  } catch (error) {
    return handleError(res, error);
  }
};
