import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import * as api from '../../services/api';

const FormServicio = ({ servicioEditar, onGuardar, onCancelar }) => {
  const { agregarServicio, editarServicio } = useApp();
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    id_ciudad: '',
    id_categoria: '',
    cupos_disponibles: '',
    imagen: '',
    duracion: '',
    estado: 'disponible',
  });

  // Cargar ciudades y categorías del backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [ciudadesRes, categoriasRes] = await Promise.all([
          api.getCiudades(),
          api.getCategorias(),
        ]);
        if (ciudadesRes.success) setCiudades(ciudadesRes.data);
        if (categoriasRes.success) setCategorias(categoriasRes.data);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    cargarDatos();
  }, []);

  // Si se edita, cargar datos del servicio
  useEffect(() => {
    if (servicioEditar) {
      setFormData({
        nombre: servicioEditar.nombre || '',
        descripcion: servicioEditar.descripcion || '',
        precio: servicioEditar.precio || '',
        id_ciudad: servicioEditar.id_ciudad || '',
        id_categoria: servicioEditar.id_categoria || '',
        cupos_disponibles: servicioEditar.cupos_disponibles || '',
        imagen: servicioEditar.imagen || '',
        duracion: servicioEditar.duracion || '',
        estado: servicioEditar.estado || 'disponible',
      });
    }
  }, [servicioEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'id_ciudad' || name === 'id_categoria' || name === 'cupos_disponibles'
        ? value === '' ? '' : Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (servicioEditar) {
        const result = await editarServicio(servicioEditar.id_servicio, formData);
        if (result.success) {
          onGuardar();
        } else {
          alert('Error: ' + result.error);
        }
      } else {
        const result = await agregarServicio(formData);
        if (result.success) {
          onGuardar();
        } else {
          alert('Error: ' + result.error);
        }
      }
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
      <h3>{servicioEditar ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>

      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre del servicio"
        required
      />

      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        rows="3"
      />

      <input
        name="precio"
        type="number"
        value={formData.precio}
        onChange={handleChange}
        placeholder="Precio"
        required
      />

      <select
        name="id_ciudad"
        value={formData.id_ciudad}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar Ciudad</option>
        {ciudades.map(c => (
          <option key={c.id_ciudad} value={c.id_ciudad}>
            {c.nombre_ciudad} - {c.paises?.nombre_pais}
          </option>
        ))}
      </select>

      <select
        name="id_categoria"
        value={formData.id_categoria}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar Categoría</option>
        {categorias.map(cat => (
          <option key={cat.id_categoria} value={cat.id_categoria}>
            {cat.nombre_categoria}
          </option>
        ))}
      </select>

      <input
        name="cupos_disponibles"
        type="number"
        value={formData.cupos_disponibles}
        onChange={handleChange}
        placeholder="Cupos disponibles"
        required
      />

      <input
        name="imagen"
        value={formData.imagen}
        onChange={handleChange}
        placeholder="URL de imagen"
      />

      <input
        name="duracion"
        value={formData.duracion}
        onChange={handleChange}
        placeholder="Duración (ej: 2 días)"
      />

      <select
        name="estado"
        value={formData.estado}
        onChange={handleChange}
      >
        <option value="disponible">Disponible</option>
        <option value="agotado">Agotado</option>
        <option value="inactivo">Inactivo</option>
      </select>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (servicioEditar ? 'Actualizar' : 'Crear')}
        </button>
        <button type="button" onClick={onCancelar} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormServicio;
