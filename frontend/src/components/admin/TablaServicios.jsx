import React from 'react';
import { useApp } from '../../context/AppContext';

const TablaServicios = ({ servicios, onEditar }) => {
  const { eliminarServicio } = useApp();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'disponible': return '#16a34a';
      case 'agotado': return '#f59e0b';
      case 'inactivo': return '#dc2626';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Nombre</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Ciudad</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>País</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Categoría</th>
            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Precio</th>
            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Cupos</th>
            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Estado</th>
            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(servicio => (
            <tr key={servicio.id_servicio} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>{servicio.id_servicio}</td>
              <td style={{ padding: '0.75rem' }}>{servicio.nombre}</td>
              <td style={{ padding: '0.75rem' }}>{servicio.ciudad}</td>
              <td style={{ padding: '0.75rem' }}>{servicio.pais}</td>
              <td style={{ padding: '0.75rem' }}>{servicio.categoria}</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                {formatearPrecio(servicio.precio)}
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                {servicio.cupos_disponibles}
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  background: getEstadoColor(servicio.estado) + '20',
                  color: getEstadoColor(servicio.estado),
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                }}>
                  {servicio.estado}
                </span>
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button
                  onClick={() => onEditar(servicio)}
                  style={{
                    marginRight: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar este servicio?')) {
                      eliminarServicio(servicio.id_servicio);
                    }
                  }}
                  style={{
                    padding: '0.25rem 0.5rem',
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaServicios;
