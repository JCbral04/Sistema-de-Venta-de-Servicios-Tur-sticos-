import React, { useState, useEffect } from 'react';
import { regiones, paises, categorias } from '../../data/mockData';

const FormServicio = ({ servicioEditar, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    region: 'Sudamérica',
    pais: 'Perú',
    categoria: 'Arqueológico',
    duracion: '',
    cupos: '',
    imagen: '',
    descripcion: '',
    disponible: true
  });

  useEffect(() => {
    if (servicioEditar) {
      setFormData({
        nombre: servicioEditar.nombre || '',
        precio: servicioEditar.precio || '',
        region: servicioEditar.region || 'Sudamérica',
        pais: servicioEditar.pais || 'Perú',
        categoria: servicioEditar.categoria || 'Arqueológico',
        duracion: servicioEditar.duracion || '',
        cupos: servicioEditar.cupos || '',
        imagen: servicioEditar.imagen || '',
        descripcion: servicioEditar.descripcion || '',
        disponible: servicioEditar.disponible !== undefined ? servicioEditar.disponible : true
      });
    }
  }, [servicioEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const servicioData = {
      ...formData,
      precio: Number(formData.precio),
      cupos: Number(formData.cupos)
    };
    onGuardar(servicioData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>
        {servicioEditar ? 'Editar Servicio' : 'Nuevo Servicio'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Nombre del servicio
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Precio (COP)
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Región
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              {regiones.filter(r => r !== 'Todas').map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              País
            </label>
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              {paises.filter(p => p !== 'Todos').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Categoría
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              {categorias.filter(c => c !== 'Todas').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Duración
            </label>
            <input
              type="text"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              placeholder="Ej: 2 días, 4 horas"
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              Cupos disponibles
            </label>
            <input
              type="number"
              name="cupos"
              value={formData.cupos}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
              URL de imagen
            </label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://..."
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.5rem' }}>
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '0.625rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
            <input
              type="checkbox"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
              style={{ width: '1rem', height: '1rem' }}
            />
            Servicio disponible
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.625rem 1.25rem',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            💾 Guardar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            style={{
              padding: '0.625rem 1.25rem',
              background: '#64748b',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormServicio;
