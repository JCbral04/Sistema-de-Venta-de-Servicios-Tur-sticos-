import { supabase } from '../config/supabase.js';
import { formatResponse, handleError } from '../utils/helpers.js';

// POST /api/reservas - Crear reserva
export const createReserva = async (req, res) => {
  try {
    const { id_servicio, cantidad = 1 } = req.body;
    const id_usuario = req.user.id_usuario;

    if (!id_servicio) {
      return res.status(400).json(
        formatResponse(false, null, 'ID del servicio es obligatorio')
      );
    }

    // Verificar que el servicio existe y tiene cupos
    const { data: servicio, error: servicioError } = await supabase
      .from('servicios')
      .select('id_servicio, nombre, precio, cupos_disponibles, estado')
      .eq('id_servicio', id_servicio)
      .single();

    if (servicioError || !servicio) {
      return res.status(404).json(formatResponse(false, null, 'Servicio no encontrado'));
    }

    if (servicio.estado !== 'disponible') {
      return res.status(400).json(formatResponse(false, null, 'El servicio no está disponible'));
    }

    if (servicio.cupos_disponibles < cantidad) {
      return res.status(400).json(
        formatResponse(false, null, `Solo quedan ${servicio.cupos_disponibles} cupos disponibles`)
      );
    }

    const total_reserva = servicio.precio * cantidad;

    // Crear reserva
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .insert([{
        id_usuario,
        id_servicio,
        cantidad,
        total_reserva,
        estado_reserva: 'pendiente'
      }])
      .select()
      .single();

    if (reservaError) throw reservaError;

    // Actualizar cupos disponibles
    const nuevosCupos = servicio.cupos_disponibles - cantidad;
    const nuevoEstado = nuevosCupos === 0 ? 'agotado' : 'disponible';

    await supabase
      .from('servicios')
      .update({ cupos_disponibles: nuevosCupos, estado: nuevoEstado })
      .eq('id_servicio', id_servicio);

    return res.status(201).json(
      formatResponse(true, reserva, 'Reserva creada exitosamente')
    );
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/reservas/mis-reservas
export const getMisReservas = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const { data, error } = await supabase
      .from('reservas')
      .select(`
        *,
        servicios(nombre, descripcion, imagen, precio)
      `)
      .eq('id_usuario', id_usuario)
      .order('fecha_reserva', { ascending: false });

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/reservas/:id/cancelar
export const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    // Verificar que la reserva existe y pertenece al usuario
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .select('*, servicios(id_servicio)')
      .eq('id_reserva', id)
      .eq('id_usuario', id_usuario)
      .single();

    if (reservaError || !reserva) {
      return res.status(404).json(formatResponse(false, null, 'Reserva no encontrada'));
    }

    if (reserva.estado_reserva === 'cancelada') {
      return res.status(400).json(formatResponse(false, null, 'La reserva ya está cancelada'));
    }

    // Cancelar reserva
    const { error: updateError } = await supabase
      .from('reservas')
      .update({ estado_reserva: 'cancelada' })
      .eq('id_reserva', id);

    if (updateError) throw updateError;

    // Restaurar cupos del servicio
    const { data: servicio } = await supabase
      .from('servicios')
      .select('cupos_disponibles')
      .eq('id_servicio', reserva.id_servicio)
      .single();

    if (servicio) {
      await supabase
        .from('servicios')
        .update({
          cupos_disponibles: servicio.cupos_disponibles + reserva.cantidad,
          estado: 'disponible'
        })
        .eq('id_servicio', reserva.id_servicio);
    }

    return res.json(formatResponse(true, null, 'Reserva cancelada exitosamente'));
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/reservas - Todas las reservas (Admin)
export const getAllReservas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        *,
        usuarios(nombre, correo),
        servicios(nombre, precio)
      `)
      .order('fecha_reserva', { ascending: false });

    if (error) throw error;
    return res.json(formatResponse(true, data));
  } catch (error) {
    return handleError(res, error);
  }
};
