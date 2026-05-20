import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const DetalleServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { servicios, agregarAlCarrito } = useApp();
  
  const servicio = servicios.find(s => s.id === parseInt(id));

  if (!servicio) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Servicio no encontrado</h2>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Volver al inicio</Link>
      </div>
    );
  }

  const handleReservar = () => {
    agregarAlCarrito(servicio);
    navigate('/carrito');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        ← Volver
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div>
          <img 
            src={servicio.imagen} 
            alt={servicio.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }}
          />
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              {servicio.categoria}
            </span>
            <span style={{
              background: '#f1f5f9',
              color: '#64748b',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              ⏱️ {servicio.duracion}
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>
            {servicio.nombre}
          </h1>

          <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
            📍 {servicio.region}, {servicio.pais} • {servicio.cupos} cupos disponibles
          </div>

          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>
            {servicio.descripcion}
          </p>

          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2563eb', marginBottom: '1.5rem' }}>
            ${servicio.precio.toLocaleString('es-CO')} COP
            <span style={{ fontSize: '1rem', fontWeight: 400, color: '#64748b' }}> /persona</span>
          </div>

          <button
            onClick={handleReservar}
            disabled={!servicio.disponible}
            style={{
              width: '100%',
              padding: '1rem',
              background: servicio.disponible ? '#2563eb' : '#94a3b8',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: servicio.disponible ? 'pointer' : 'not-allowed'
            }}
          >
            🛒 Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleServicio;
