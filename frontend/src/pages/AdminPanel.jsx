import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FormServicio from '../components/admin/FormServicio';
import TablaServicios from '../components/admin/TablaServicios';

const AdminPanel = () => {
  const { agregarServicio, editarServicio } = useApp();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [servicioEditar, setServicioEditar] = useState(null);

  const handleEditar = (servicio) => {
    setServicioEditar(servicio);
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setServicioEditar(null);
    setMostrarForm(false);
  };

  const handleGuardar = (servicioData) => {
    if (servicioEditar) {
      editarServicio(servicioEditar.id, servicioData);
    } else {
      agregarServicio(servicioData);
    }
    handleCancelar();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>
        Panel de Administración
      </h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Gestiona los servicios turísticos</p>

      <button 
        onClick={() => { setMostrarForm(!mostrarForm); setServicioEditar(null); }}
        style={{
          padding: '0.625rem 1.25rem',
          borderRadius: '0.5rem',
          border: 'none',
          background: '#2563eb',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '0.9rem'
        }}
      >
        {mostrarForm ? '❌ Cancelar' : '➕ Nuevo Servicio'}
      </button>

      {mostrarForm && (
        <FormServicio 
          servicioEditar={servicioEditar} 
          onGuardar={handleGuardar}
          onCancelar={handleCancelar} 
        />
      )}

      <TablaServicios onEditar={handleEditar} />
    </div>
  );
};

export default AdminPanel;