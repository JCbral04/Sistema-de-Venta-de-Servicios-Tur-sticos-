import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { totalCarrito, carrito, vaciarCarrito, setUsuario, setEsAdmin } = useApp();
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [cliente, setCliente] = useState({ nombre: '', email: '', telefono: '', documento: '' });
  const [compraExitosa, setCompraExitosa] = useState(false);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const handleClienteSubmit = (e) => {
    e.preventDefault();
    // Activar modo admin si el email contiene "admin"
    if (cliente.email.includes('admin')) {
      setEsAdmin(true);
    }
    setUsuario(cliente);
    setPaso(2);
  };

  const handlePago = () => {
    setCompraExitosa(true);
    vaciarCarrito();
    setTimeout(() => navigate('/'), 3000);
  };

  if (compraExitosa) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '4rem' }}>✅</p>
        <h1>¡Compra Exitosa!</h1>
        <p>Gracias {cliente.nombre}, tu reserva ha sido procesada.</p>
        <p>Redirigiendo al catálogo...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Finalizar Compra</h1>
      
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          textAlign: 'center',
          borderRadius: '0.5rem',
          fontWeight: 500,
          background: paso >= 1 ? '#2563eb' : '#e2e8f0',
          color: paso >= 1 ? 'white' : '#64748b'
        }}>
          1. Datos Personales
        </div>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          textAlign: 'center',
          borderRadius: '0.5rem',
          fontWeight: 500,
          background: paso >= 2 ? '#2563eb' : '#e2e8f0',
          color: paso >= 2 ? 'white' : '#64748b'
        }}>
          2. Confirmar Pago
        </div>
      </div>

      {paso === 1 && (
        <form onSubmit={handleClienteSubmit} style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>Datos Personales</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            💡 Tip: Usa un email con "admin" para activar el panel de administración
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            margin: '1.5rem 0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Nombre completo</label>
              <input
                type="text"
                value={cliente.nombre}
                onChange={e => setCliente({...cliente, nombre: e.target.value})}
                required
                placeholder="Juan Pérez"
                style={{ padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Documento</label>
              <input
                type="text"
                value={cliente.documento}
                onChange={e => setCliente({...cliente, documento: e.target.value})}
                required
                placeholder="1234567890"
                style={{ padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>📧 Correo electrónico</label>
              <input
                type="email"
                value={cliente.email}
                onChange={e => setCliente({...cliente, email: e.target.value})}
                required
                placeholder="juan@email.com"
                style={{ padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>📱 Teléfono</label>
              <input
                type="tel"
                value={cliente.telefono}
                onChange={e => setCliente({...cliente, telefono: e.target.value})}
                required
                placeholder="3001234567"
                style={{ padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '0.625rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#2563eb',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Continuar al Pago →
          </button>
        </form>
      )}

      {paso === 2 && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3>💳 Resumen de la Compra</h3>
          <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {carrito.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                <span>{item.cantidad}x {item.nombre}</span>
                <span>{formatearPrecio(item.precio * item.cantidad)}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1.5rem 0',
            paddingTop: '1rem',
            borderTop: '2px solid #e2e8f0'
          }}>
            <span>Total a pagar:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2563eb' }}>
              {formatearPrecio(totalCarrito * 1.19)}
            </span>
          </div>
          <button 
            onClick={handlePago}
            style={{
              width: '100%',
              padding: '0.625rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: '#16a34a',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              marginBottom: '0.5rem'
            }}
          >
            💳 Confirmar Pago
          </button>
          <button 
            onClick={() => setPaso(1)}
            style={{
              width: '100%',
              padding: '0.625rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;