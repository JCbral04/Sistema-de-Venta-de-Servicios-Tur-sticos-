import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { hashPassword, comparePassword, formatResponse, handleError } from '../utils/helpers.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { nombre, correo, password, rol = 'cliente' } = req.body;

    // Validaciones
    if (!nombre || !correo || !password) {
      return res.status(400).json(
        formatResponse(false, null, 'Nombre, correo y contraseña son obligatorios')
      );
    }

    if (password.length < 6) {
      return res.status(400).json(
        formatResponse(false, null, 'La contraseña debe tener al menos 6 caracteres')
      );
    }

    // Verificar si el correo ya existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('id_usuario')
      .eq('correo', correo)
      .single();

    if (existingUser) {
      return res.status(409).json(
        formatResponse(false, null, 'El correo ya está registrado')
      );
    }

    // Hash de contraseña
    const password_hash = await hashPassword(password);

    // Crear usuario
    const { data: newUser, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, correo, password_hash, rol }])
      .select('id_usuario, nombre, correo, rol')
      .single();

    if (error) throw error;

    // Generar token
    const token = generateToken(newUser.id_usuario);

    return res.status(201).json(
      formatResponse(true, { user: newUser, token }, 'Usuario registrado exitosamente')
    );
  } catch (error) {
    return handleError(res, error);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json(
        formatResponse(false, null, 'Correo y contraseña son obligatorios')
      );
    }

    // Buscar usuario
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id_usuario, nombre, correo, password_hash, rol')
      .eq('correo', correo)
      .single();

    if (error || !user) {
      return res.status(401).json(
        formatResponse(false, null, 'Credenciales inválidas')
      );
    }

    // Verificar contraseña
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json(
        formatResponse(false, null, 'Credenciales inválidas')
      );
    }

    // Generar token
    const token = generateToken(user.id_usuario);

    // Eliminar password_hash del response
    const { password_hash, ...userWithoutPassword } = user;

    return res.json(
      formatResponse(true, { user: userWithoutPassword, token }, 'Inicio de sesión exitoso')
    );
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id_usuario, nombre, correo, rol')
      .eq('id_usuario', req.user.id_usuario)
      .single();

    if (error) throw error;

    return res.json(formatResponse(true, user));
  } catch (error) {
    return handleError(res, error);
  }
};
