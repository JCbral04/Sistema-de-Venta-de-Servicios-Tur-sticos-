import React from 'react';
import TarjetaServicio from './TarjetaServicio';

const ListaServicios = ({ servicios }) => {
  if (servicios.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>
          No se encontraron servicios
        </h3>
        <p style={{ color: '#64748b' }}>
          Intenta con otros filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem'
    }}>
      {servicios.map(servicio => (
        <TarjetaServicio key={servicio.id} servicio={servicio} />
      ))}
    </div>
  );
};

export default ListaServicios;
