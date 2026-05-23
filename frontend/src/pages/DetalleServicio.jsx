import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useApp } from '../context/AppContext';

const DetalleServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useApp();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarServicio = async () => {
      try {
        setLoading(true);
        const response = await api.getServicio(id);
        if (response.success) {
          setServicio(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarServicio();
  }, [id]);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!servicio) return <p>Servicio no encontrado</p>;

  const disponible = servicio.estado === 'disponible' && servicio.cupos_disponibles > 0;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ← Volver al catálogo
      </button>

      <img
        src={servicio.imagen || 'https://via.placeholder.com/800x400'}
        alt={servicio.nombre}
        style={{ width: '100%', borderRadius: '0.5rem', marginBottom: '1.5rem' }}
      />

      <h1>{servicio.nombre}</h1>
      <p style={{ color: '#64748b' }}>
        {servicio.ciudad}, {servicio.pais} • {servicio.categoria}
      </p>

      <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>
        {servicio.descripcion}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#f8fafc',
        borderRadius: '0.5rem',
      }}>
        <div>
          <strong>Precio:</strong>
          <p style={{ fontSize: '1.5rem', color: '#2563eb', fontWeight: 'bold' }}>
            {formatearPrecio(servicio.precio)}
          </p>
        </div>
        <div>
          <strong>Duración:</strong>
          <p>{servicio.duracion}</p>
        </div>
        <div>
          <strong>Cupos disponibles:</strong>
          <p>{servicio.cupos_disponibles}</p>
        </div>
        <div>
          <strong>Estado:</strong>
          <p style={{
            color: disponible ? '#16a34a' : '#dc2626',
            fontWeight: 'bold',
          }}>
            {servicio.estado === 'disponible' ? 'Disponible' :
             servicio.estado === 'agotado' ? 'Agotado' : 'Inactivo'}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          agregarAlCarrito(servicio);
          navigate('/carrito');
        }}
        disabled={!disponible}
        style={{
          marginTop: '1.5rem',
          width: '100%',
          padding: '1rem',
          background: disponible ? '#2563eb' : '#e2e8f0',
          color: disponible ? 'white' : '#64748b',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.125rem',
          cursor: disponible ? 'pointer' : 'not-allowed',
        }}
      >
        {disponible ? 'Agregar al carrito y reservar' : 'No disponible'}
      </button>
    </div>
  );
};

export default DetalleServicio;
