import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, totalCarrito, vaciarCarrito } = useApp();
  const navigate = useNavigate();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  if (carrito.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          Explorar servicios
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>🛒 Tu Carrito</h2>

      {carrito.map(item => (
        <div key={item.id_servicio} style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
          borderBottom: '1px solid #e2e8f0',
          alignItems: 'center',
        }}>
          <img
            src={item.imagen}
            alt={item.nombre}
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.25rem' }}
          />
          <div style={{ flex: 1 }}>
            <h3>{item.nombre}</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              {item.ciudad}, {item.pais}
            </p>
            <p style={{ fontWeight: 'bold' }}>{formatearPrecio(item.precio)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => actualizarCantidad(item.id_servicio, item.cantidad - 1)}
              style={{ padding: '0.25rem 0.5rem' }}
            >-</button>
            <span>{item.cantidad}</span>
            <button
              onClick={() => actualizarCantidad(item.id_servicio, item.cantidad + 1)}
              style={{ padding: '0.25rem 0.5rem' }}
            >+</button>
          </div>
          <div style={{ fontWeight: 'bold', minWidth: '120px', textAlign: 'right' }}>
            {formatearPrecio(item.precio * item.cantidad)}
          </div>
          <button
            onClick={() => eliminarDelCarrito(item.id_servicio)}
            style={{
              color: '#dc2626',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
            }}
          >
            🗑️
          </button>
        </div>
      ))}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        borderTop: '2px solid #1e293b',
        marginTop: '1rem',
      }}>
        <span>Total:</span>
        <span>{formatearPrecio(totalCarrito)}</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={vaciarCarrito}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#e2e8f0',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Vaciar carrito
        </button>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default CarritoPage;
