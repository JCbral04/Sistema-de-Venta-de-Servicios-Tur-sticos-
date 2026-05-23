import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useApp } from '../context/AppContext';

const MisReservas = () => {
  const { usuario } = useApp();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate('/');
      return;
    }

    const cargarReservas = async () => {
      try {
        setLoading(true);
        const response = await api.getMisReservas();
        if (response.success) {
          setReservas(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarReservas();
  }, [usuario, navigate]);

  const handleCancelar = async (id_reserva) => {
    if (!confirm('¿Cancelar esta reserva?')) return;

    try {
      await api.cancelarReserva(id_reserva);
      setReservas(reservas.map(r =>
        r.id_reserva === id_reserva ? { ...r, estado_reserva: 'cancelada' } : r
      ));
    } catch (err) {
      alert('Error al cancelar: ' + err.message);
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'confirmada': return '#16a34a';
      case 'pendiente': return '#f59e0b';
      case 'cancelada': return '#dc2626';
      default: return '#64748b';
    }
  };

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>Mis Reservas</h2>

      {reservas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No tienes reservas aún.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
            Explorar servicios
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reservas.map(reserva => (
            <div key={reserva.id_reserva} style={{
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              background: 'white',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3>{reserva.servicios?.nombre || 'Servicio'}</h3>
                  <p style={{ color: '#64748b' }}>
                    {new Date(reserva.fecha_reserva).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.25rem',
                  background: getEstadoColor(reserva.estado_reserva) + '20',
                  color: getEstadoColor(reserva.estado_reserva),
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}>
                  {reserva.estado_reserva}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginTop: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.25rem',
              }}>
                <div>
                  <strong>Cantidad:</strong>
                  <p>{reserva.cantidad}</p>
                </div>
                <div>
                  <strong>Total:</strong>
                  <p style={{ fontWeight: 'bold', color: '#2563eb' }}>
                    {formatearPrecio(reserva.total_reserva)}
                  </p>
                </div>
              </div>

              {reserva.estado_reserva === 'pendiente' && (
                <button
                  onClick={() => handleCancelar(reserva.id_reserva)}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisReservas;
