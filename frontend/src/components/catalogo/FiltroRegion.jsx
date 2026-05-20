import React from 'react';
import { regiones, paises } from '../../data/mockData';

const FiltroRegion = ({ filtroRegion, setFiltroRegion, filtroPais, setFiltroPais, busqueda, setBusqueda }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '1rem',
      marginBottom: '2rem',
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>🔍 Buscar servicio</label>
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '0.625rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '0.9rem'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>🌎 Región</label>
        <select 
          value={filtroRegion} 
          onChange={(e) => setFiltroRegion(e.target.value)}
          style={{
            padding: '0.625rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          {regiones.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>🏳️ País</label>
        <select 
          value={filtroPais} 
          onChange={(e) => setFiltroPais(e.target.value)}
          style={{
            padding: '0.625rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          {paises.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );
};

export default FiltroRegion;