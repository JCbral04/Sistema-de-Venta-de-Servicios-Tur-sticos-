import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ListaServicios from '../components/catalogo/ListaServicios';
import FiltroServicios from '../components/catalogo/FiltroServicios';
import * as api from '../services/api';

const Home = () => {
  const { servicios, loading, error, agregarAlCarrito } = useApp();
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    setServiciosFiltrados(servicios);
  }, [servicios]);

  const handleFiltrar = async (filtros) => {
    try {
      const params = {};
      if (filtros.pais) params.pais = filtros.pais;
      if (filtros.categoria) params.categoria = filtros.categoria;
      if (filtros.disponible === 'true') params.disponible = 'true';

      const response = await api.getServicios(params);
      if (response.success) {
        setServiciosFiltrados(response.data);
      }
    } catch (err) {
      console.error('Error filtrando:', err);
    }
  };

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <section style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
      }}>
        <h1>🌍 Explora el Mundo con Nosotros</h1>
        <p>Descubre los mejores servicios turísticos y reserva tu próxima aventura</p>
      </section>

      <FiltroServicios onFiltrar={handleFiltrar} />

      <p style={{ marginBottom: '1rem', color: '#64748b' }}>
        {serviciosFiltrados.length} servicios encontrados
      </p>

      <ListaServicios
        servicios={serviciosFiltrados}
        onAgregarAlCarrito={agregarAlCarrito}
      />
    </div>
  );
};

export default Home;
