import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import FiltroRegion from '../components/catalogo/FiltroRegion';
import ListaServicios from '../components/catalogo/ListaServicios';

const Home = () => {
  const { servicios } = useApp();
  const [filtroRegion, setFiltroRegion] = useState('Todas');
  const [filtroPais, setFiltroPais] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const serviciosFiltrados = useMemo(() => {
    return servicios.filter(servicio => {
      const matchRegion = filtroRegion === 'Todas' || servicio.region === filtroRegion;
      const matchPais = filtroPais === 'Todos' || servicio.pais === filtroPais;
      const matchBusqueda = !busqueda || 
        servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        servicio.pais.toLowerCase().includes(busqueda.toLowerCase()) ||
        servicio.categoria.toLowerCase().includes(busqueda.toLowerCase());
      
      return matchRegion && matchPais && matchBusqueda && servicio.disponible;
    });
  }, [servicios, filtroRegion, filtroPais, busqueda]);

  return (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            🌍 Explora el Mundo con Nosotros
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Descubre los mejores servicios turísticos y reserva tu próxima aventura
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <FiltroRegion 
          filtroRegion={filtroRegion}
          setFiltroRegion={setFiltroRegion}
          filtroPais={filtroPais}
          setFiltroPais={setFiltroPais}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        <p style={{ marginBottom: '1rem', color: '#64748b' }}>
          {serviciosFiltrados.length} servicios encontrados
        </p>

        <ListaServicios servicios={serviciosFiltrados} />
      </div>
    </div>
  );
};

export default Home;