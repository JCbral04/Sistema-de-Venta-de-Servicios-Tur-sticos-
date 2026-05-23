import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Checkout = () => {
  const { carrito, totalCarrito, crearReserva, usuario, vaciarCarrito } = useApp();
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const handleConfirmar = async () => {
    if (!usuario) {
      setError('Debes iniciar sesión para completar la compra');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await crearReserva();
      if (result.success) {
        setPaso(3);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al procesar la reserva: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>Finalizar Compra</h2>

      {/* Indicador de pasos */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          background: paso >= 1 ? '#2563eb' : '#e2e8f0',
          color: paso >= 1 ? 'white' : '#64748b',
        }}>1. Resumen</div>
        <div style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          background: paso >= 2 ? '#2563eb' : '#e2e8f0',
          color: paso >= 2 ? 'white' : '#64748b',
        }}>2. Confirmar</div>
        <div style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          background: paso >= 3 ? '#2563eb' : '#e2e8f0',
          color: paso >= 3 ? 'white' : '#64748b',
        }}>3. Éxito</div>
      </div>

      {paso === 1 && (
        <div>
          <h3>Resumen de la Compra</h3>
          {carrito.map(item => (
            <div key={item.id_servicio} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #e2e8f0',
            }}>
              <div>
                <strong>{item.nombre}</strong>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {item.cantidad}x {item.ciudad}, {item.pais}
                </p>
              </div>
              <div style={{ fontWeight: 'bold' }}>
                {formatearPrecio(item.precio * item.cantidad)}
              </div>
            </div>
          ))}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            borderTop: '2px solid #1e293b',
          }}>
            <span>Total:</span>
            <span>{formatearPrecio(totalCarrito)}</span>
          </div>
          <button
            onClick={() => setPaso(2)}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.75rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Continuar
          </button>
        </div>
      )}

      {paso === 2 && (
        <div>
          {!usuario && (
            <div style={{
              padding: '1rem',
              background: '#fef3c7',
              borderRadius: '0.25rem',
              marginBottom: '1rem',
            }}>
              <p>⚠️ Debes <button onClick={() => navigate('/login')} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>iniciar sesión</button> para completar la compra</p>
            </div>
          )}

          {usuario && (
            <div style={{
              padding: '1rem',
              background: '#f0fdf4',
              borderRadius: '0.25rem',
              marginBottom: '1rem',
            }}>
              <p>✅ Comprando como: <strong>{usuario.nombre}</strong> ({usuario.correo})</p>
            </div>
          )}

          {error && (
            <div style={{
              padding: '1rem',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '0.25rem',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setPaso(1)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Volver
            </button>
            <button
              onClick={handleConfirmar}
              disabled={!usuario || loading}
              style={{
                padding: '0.75rem 1.5rem',
                background: !usuario || loading ? '#e2e8f0' : '#16a34a',
                color: !usuario || loading ? '#64748b' : 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: !usuario || loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ color: '#16a34a' }}>✅ ¡Compra Exitosa!</h2>
          <p>Tus reservas han sido creadas correctamente.</p>
          <p style={{ color: '#64748b', marginTop: '1rem' }}>
            Redirigiendo al catálogo...
          </p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
