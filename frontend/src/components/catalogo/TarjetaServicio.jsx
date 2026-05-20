import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const TarjetaServicio = ({ servicio }) => {
  const { agregarAlCarrito } = useApp();

  const handleReservar = () => {
    agregarAlCarrito(servicio);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', height: '200px' }}>
        <img 
          src={servicio.imagen} 
          alt={servicio.nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          background: '#2563eb',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: 500
        }}>
          {servicio.categoria}
        </span>
        <span style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: 500
        }}>
          ⏱️ {servicio.duracion}
        </span>
      </div>
      
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
          {servicio.nombre}
        </h3>
        
        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
          📍 {servicio.pais} • {servicio.region} • {servicio.cupos} cupos
        </div>
        
        <p style={{
          fontSize: '0.875rem',
          color: '#64748b',
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4'
        }}>
          {servicio.descripcion}
        </p>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.75rem' }}>
            ${servicio.precio.toLocaleString('es-CO')} COP
            <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#64748b' }}> /persona</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link 
              to={`/servicio/${servicio.id}`}
              style={{
                flex: 1,
                padding: '0.625rem',
                background: 'white',
                border: '1px solid #2563eb',
                color: '#2563eb',
                borderRadius: '0.5rem',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              Ver más
            </Link>
            <button
              onClick={handleReservar}
              disabled={!servicio.disponible}
              style={{
                flex: 1,
                padding: '0.625rem',
                background: servicio.disponible ? '#2563eb' : '#94a3b8',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: servicio.disponible ? 'pointer' : 'not-allowed'
              }}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaServicio;
