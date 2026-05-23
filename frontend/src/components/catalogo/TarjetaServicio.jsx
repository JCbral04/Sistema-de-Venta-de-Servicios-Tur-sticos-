import React from 'react';

const TarjetaServicio = ({ servicio, onAgregarAlCarrito }) => {
  const {
    id_servicio,
    nombre,
    descripcion,
    precio,
    estado,
    cupos_disponibles,
    imagen,
    duracion,
    ciudad,
    pais,
    categoria,
  } = servicio;

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const disponible = estado === 'disponible' && cupos_disponibles > 0;

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      background: 'white',
    }}>
      <img
        src={imagen || 'https://via.placeholder.com/400x200'}
        alt={nombre}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1rem' }}>
        <h3>{nombre}</h3>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          {ciudad}, {pais} • {categoria}
        </p>
        <p style={{ marginTop: '0.5rem' }}>{descripcion}</p>
        <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
          {formatearPrecio(precio)}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Duración: {duracion} • Cupos: {cupos_disponibles}
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: disponible ? '#16a34a' : '#dc2626',
          fontWeight: 'bold',
        }}>
          {estado === 'disponible' ? 'Disponible' : 
           estado === 'agotado' ? 'Agotado' : 'Inactivo'}
        </p>
        <button
          onClick={() => onAgregarAlCarrito(servicio)}
          disabled={!disponible}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.5rem',
            background: disponible ? '#2563eb' : '#e2e8f0',
            color: disponible ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: disponible ? 'pointer' : 'not-allowed',
          }}
        >
          {disponible ? 'Agregar al carrito' : 'No disponible'}
        </button>
      </div>
    </div>
  );
};

export default TarjetaServicio;
