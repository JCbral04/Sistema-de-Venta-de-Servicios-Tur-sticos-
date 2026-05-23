import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const formatResponse = (success, data = null, message = '', error = null) => {
  return {
    success,
    data,
    message,
    error
  };
};

export const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error);
  return res.status(statusCode).json(
    formatResponse(false, null, error.message || 'Error interno del servidor', error)
  );
};
