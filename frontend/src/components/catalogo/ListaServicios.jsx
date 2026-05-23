import React from 'react';
import TarjetaServicio from './TarjetaServicio';

const ListaServicios = ({ servicios, onAgregarAlCarrito }) => {
  if (!servicios || servicios.length === 0) {
    return <p>No se encontraron servicios.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {servicios.map(servicio => (
        <TarjetaServicio
          key={servicio.id_servicio}
          servicio={servicio}
          onAgregarAlCarrito={onAgregarAlCarrito}
        />
      ))}
    </div>
  );
};

export default ListaServicios;
