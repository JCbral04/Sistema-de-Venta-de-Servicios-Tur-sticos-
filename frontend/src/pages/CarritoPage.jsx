import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const CarritoPage = () => {
  const { carrito, totalCarrito, vaciarCarrito, actualizarCantidad, eliminarDelCarrito } = useApp();
  const navigate = useNavigate();

  const subtotal = totalCarrito;
  const impuestos = subtotal * 0.19;
  const total = subtotal * 1.19;

  if (carrito.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center', color: '#64748b' }}>
        <p style={{ fontSize: '4rem' }}>🛍️</p>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>Tu carrito de reservas está vacío</h2>
        <p style={{ marginBottom: '1.5rem' }}>Explora nuestros servicios turísticos</p>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.5rem',
          background: '#2563eb',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 500
        }}>
          Ver Servicios
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#1e293b' }}>Carrito de Reservas</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {carrito.map(item => (
            <div key={item.id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '1rem'
            }}>
              <img 
                src={item.imagen} 
                alt={item.nombre}
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
                  {item.nombre}
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  📍 {item.pais} • ⏱️ {item.duracion}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2563eb', marginBottom: '0.5rem' }}>
                  ${item.precio.toLocaleString('es-CO')} COP
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '0.375rem',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 600, minWidth: '2rem', textAlign: 'center' }}>{item.cantidad}</span>
                    <button
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '0.375rem',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                    ${(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                  </div>
                </div>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                style={{
                  padding: '0.5rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '80px'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>Resumen</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString('es-CO')} COP</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
            <span>Impuestos (19%)</span>
            <span>${impuestos.toLocaleString('es-CO')} COP</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '2px solid #e2e8f0',
            paddingTop: '0.75rem',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1e293b'
          }}>
            <span>Total</span>
            <span>${total.toLocaleString('es-CO')} COP</span>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.875rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            Proceder al Pago
          </button>
          <button 
            onClick={vaciarCarrito}
            style={{
              marginTop: '0.75rem',
              width: '100%',
              padding: '0.625rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              background: 'white',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;