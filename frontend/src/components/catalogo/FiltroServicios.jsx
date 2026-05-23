import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';

const FiltroServicios = ({ onFiltrar }) => {
  const [paises, setPaises] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    pais: '',
    categoria: '',
    disponible: 'true',
  });

  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        const [paisesRes, catRes] = await Promise.all([
          api.getPaises(),
          api.getCategorias(),
        ]);
        if (paisesRes.success) setPaises(paisesRes.data);
        if (catRes.success) setCategorias(catRes.data);
      } catch (err) {
        console.error('Error cargando filtros:', err);
      }
    };
    cargarFiltros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFiltros = { ...filtros, [name]: value };
    setFiltros(newFiltros);
    onFiltrar(newFiltros);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <select name="pais" value={filtros.pais} onChange={handleChange}>
        <option value="">Todos los países</option>
        {paises.map(p => (
          <option key={p.id_pais} value={p.id_pais}>{p.nombre_pais}</option>
        ))}
      </select>

      <select name="categoria" value={filtros.categoria} onChange={handleChange}>
        <option value="">Todas las categorías</option>
        {categorias.map(c => (
          <option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</option>
        ))}
      </select>

      <select name="disponible" value={filtros.disponible} onChange={handleChange}>
        <option value="true">Disponibles</option>
        <option value="false">Todos</option>
      </select>
    </div>
  );
};

export default FiltroServicios;
