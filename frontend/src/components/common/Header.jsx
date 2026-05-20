import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { carrito, usuario, esAdmin, setUsuario, setEsAdmin } = useApp();
  const navigate = useNavigate();
  const cantidadItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const handleLogout = () => {
    setUsuario(null);
    setEsAdmin(false);
    navigate('/');
  };

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#2563eb',
          textDecoration: 'none'
        }}>
          🌍 TurismoGlobal
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: '#1e293b', textDecoration: 'none', fontWeight: 500 }}>Servicios</Link>
          {esAdmin && (
            <Link to="/admin" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
              Panel Admin
            </Link>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/carrito" style={{
            position: 'relative',
            padding: '0.5rem',
            color: '#1e293b',
            textDecoration: 'none'
          }}>
            🛒
            {cantidadItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: '#dc2626',
                color: 'white',
                fontSize: '0.7rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cantidadItems}
              </span>
            )}
          </Link>
          
          {usuario ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>👤 {usuario.nombre}</span>
              <button onClick={handleLogout} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                🚪
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/checkout')} style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.625rem 1.25rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;