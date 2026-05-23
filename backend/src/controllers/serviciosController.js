import { supabase } from '../config/supabase.js';
import { formatResponse, handleError } from '../utils/helpers.js';

// POST /api/servicios - Crear servicio (Admin)
export const createServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, id_ciudad, id_categoria, cupos_disponibles, imagen, duracion } = req.body;

    if (!nombre || !precio || !id_ciudad || !id_categoria) {
      return res.status(400).json(
        formatResponse(false, null, 'Nombre, precio, ciudad y categoría son obligatorios')
      );
    }

    const { data, error } = await supabase
      .from('servicios')
      .insert([{
        nombre,
        descripcion,
        precio,
        id_ciudad,
        id_categoria,
        cupos_disponibles: cupos_disponibles || 0,
        imagen,
        duracion,
        estado: 'disponible'
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json(formatResponse(true, data, 'Servicio creado exitosamente'));
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/servicios/:id - Actualizar servicio (Admin)
export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('servicios')
      .update(updates)
      .eq('id_servicio', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json(formatResponse(false, null, 'Servicio no encontrado'));
    }

    return res.json(formatResponse(true, data, 'Servicio actualizado exitosamente'));
  } catch (error) {
    return handleError(res, error);
  }
};

// DELETE /api/servicios/:id - Eliminar servicio (Admin)
export const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('servicios')
      .delete()
      .eq('id_servicio', id);

    if (error) throw error;

    return res.json(formatResponse(true, null, 'Servicio eliminado exitosamente'));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/servicios - Listar todos los servicios (Admin)
export const getAllServicios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('servicios')
      .select(`
        *,
        ciudades(nombre_ciudad, paises(nombre_pais)),
        categorias(nombre_categoria)
      `)
      .order('id_servicio');

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};
