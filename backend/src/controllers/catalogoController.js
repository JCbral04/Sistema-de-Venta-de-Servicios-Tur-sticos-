import { supabase } from '../config/supabase.js';
import { formatResponse, handleError } from '../utils/helpers.js';

// GET /api/catalogo/servicios
export const getServicios = async (req, res) => {
  try {
    const { region, pais, categoria, disponible = true } = req.query;

    let query = supabase
      .from('servicios')
      .select(`
        id_servicio,
        nombre,
        descripcion,
        precio,
        estado,
        cupos_disponibles,
        imagen,
        duracion,
        ciudades!inner(id_ciudad, nombre_ciudad, paises!inner(id_pais, nombre_pais, codigo_iso)),
        categorias!inner(id_categoria, nombre_categoria)
      `);

    if (disponible === 'true') {
      query = query.eq('estado', 'disponible');
    }

    const { data, error } = await query;

    if (error) throw error;

    // Formatear respuesta para que sea más plana
    const serviciosFormateados = data?.map(s => ({
      id: s.id_servicio,
      nombre: s.nombre,
      descripcion: s.descripcion,
      precio: s.precio,
      estado: s.estado,
      cupos_disponibles: s.cupos_disponibles,
      imagen: s.imagen,
      duracion: s.duracion,
      ciudad: s.ciudades?.nombre_ciudad,
      pais: s.ciudades?.paises?.nombre_pais,
      codigo_iso: s.ciudades?.paises?.codigo_iso,
      categoria: s.categorias?.nombre_categoria,
      id_ciudad: s.ciudades?.id_ciudad,
      id_categoria: s.categorias?.id_categoria,
      id_pais: s.ciudades?.paises?.id_pais
    })) || [];

    return res.json(formatResponse(true, serviciosFormateados));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/catalogo/servicios/:id
export const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('servicios')
      .select(`
        id_servicio,
        nombre,
        descripcion,
        precio,
        estado,
        cupos_disponibles,
        imagen,
        duracion,
        ciudades!inner(id_ciudad, nombre_ciudad, paises!inner(id_pais, nombre_pais, codigo_iso)),
        categorias!inner(id_categoria, nombre_categoria)
      `)
      .eq('id_servicio', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json(formatResponse(false, null, 'Servicio no encontrado'));
    }

    const servicioFormateado = {
      id: data.id_servicio,
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      estado: data.estado,
      cupos_disponibles: data.cupos_disponibles,
      imagen: data.imagen,
      duracion: data.duracion,
      ciudad: data.ciudades?.nombre_ciudad,
      pais: data.ciudades?.paises?.nombre_pais,
      codigo_iso: data.ciudades?.paises?.codigo_iso,
      categoria: data.categorias?.nombre_categoria,
      id_ciudad: data.ciudades?.id_ciudad,
      id_categoria: data.categorias?.id_categoria,
      id_pais: data.ciudades?.paises?.id_pais
    };

    return res.json(formatResponse(true, servicioFormateado));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/catalogo/paises
export const getPaises = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('paises')
      .select('*')
      .order('nombre_pais');

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/catalogo/ciudades
export const getCiudades = async (req, res) => {
  try {
    const { pais } = req.query;

    let query = supabase
      .from('ciudades')
      .select('*, paises!inner(nombre_pais)')
      .order('nombre_ciudad');

    if (pais) {
      query = query.eq('id_pais', pais);
    }

    const { data, error } = await query;

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/catalogo/categorias
export const getCategorias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre_categoria');

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};
