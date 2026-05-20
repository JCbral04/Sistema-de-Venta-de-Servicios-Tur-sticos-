import React, { createContext, useState, useContext, useEffect } from 'react';
import { serviciosIniciales } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [servicios, setServicios] = useState(() => {
    const saved = localStorage.getItem('servicios');
    return saved ? JSON.parse(saved) : serviciosIniciales;
  });
  
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('servicios', JSON.stringify(servicios));
  }, [servicios]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario && usuario.email && usuario.email.includes('admin')) {
      setEsAdmin(true);
    } else {
      setEsAdmin(false);
    }
  }, [usuario]);

  const agregarServicio = (servicio) => {
    setServicios([...servicios, { ...servicio, id: Date.now() }]);
  };

  const editarServicio = (id, datosActualizados) => {
    setServicios(servicios.map(s => s.id === id ? { ...s, ...datosActualizados } : s));
  };

  const eliminarServicio = (id) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  const agregarAlCarrito = (servicio) => {
    const existe = carrito.find(item => item.id === servicio.id);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === servicio.id 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      ));
    } else {
      setCarrito([...carrito, { ...servicio, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(item => 
        item.id === id ? { ...item, cantidad } : item
      ));
    }
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <AppContext.Provider value={{
      servicios,
      carrito,
      usuario,
      esAdmin,
      setUsuario,
      setEsAdmin,
      agregarServicio,
      editarServicio,
      eliminarServicio,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      totalCarrito
    }}>
      {children}
    </AppContext.Provider>
  );
};