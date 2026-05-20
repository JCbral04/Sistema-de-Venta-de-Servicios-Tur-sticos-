import React from 'react';
import { useApp } from '../../context/AppContext';

const TablaServicios = ({ onEditar }) => {
  const { servicios, eliminarServicio } = useApp();

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      eliminarServicio(id);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Servicio</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>País</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Duración</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Precio/persona</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Cupos</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Estado</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map(servicio => (
              <tr key={servicio.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b' }}>{servicio.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>{servicio.nombre}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{servicio.pais}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{servicio.duracion}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>
                  ${servicio.precio.toLocaleString('es-CO')}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{servicio.cupos}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: servicio.disponible ? '#dcfce7' : '#fee2e2',
                    color: servicio.disponible ? '#16a34a' : '#dc2626'
                  }}>
                    {servicio.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => onEditar(servicio)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleEliminar(servicio.id)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaServicios;
