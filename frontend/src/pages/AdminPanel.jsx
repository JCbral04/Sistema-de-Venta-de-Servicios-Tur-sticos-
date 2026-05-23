import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FormServicio from '../components/admin/FormServicio';
import TablaServicios from '../components/admin/TablaServicios';
import * as api from '../services/api';

const AdminPanel = () => {
  const { esAdmin, servicios, setServicios } = useApp();
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [servicioEditar, setServicioEditar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar todos los servicios (incluyendo inactivos) para admin
  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const response = await api.getAllServiciosAdmin();
        if (response.success) {
          // Actualizar servicios en el contexto
          // Nota: necesitarás agregar setServicios al contexto
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarServicios();
  }, []);

  if (!esAdmin) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Acceso denegado</h2>
        <p>No tienes permisos de administrador.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          Volver al inicio
        </button>
      </div>
    );
  }

  const handleEditar = (servicio) => {
    setServicioEditar(servicio);
    setMostrarFormulario(true);
  };

  const handleNuevo = () => {
    setServicioEditar(null);
    setMostrarFormulario(true);
  };

  const handleGuardar = () => {
    setMostrarFormulario(false);
    setServicioEditar(null);
    // Recargar servicios
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Panel de Administración</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>Gestión de Servicios</h3>
        <button onClick={handleNuevo} style={{
          padding: '0.5rem 1rem',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        }}>
          + Nuevo Servicio
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{
          background: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          <FormServicio
            servicioEditar={servicioEditar}
            onGuardar={handleGuardar}
            onCancelar={() => {
              setMostrarFormulario(false);
              setServicioEditar(null);
            }}
          />
        </div>
      )}

      <TablaServicios
        servicios={servicios}
        onEditar={handleEditar}
      />
    </div>
  );
};

export default AdminPanel;
