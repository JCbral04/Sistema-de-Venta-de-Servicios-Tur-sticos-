-- =====================================================
-- SCRIPT SQL PARA CREAR TABLAS EN SUPABASE
-- Sistema de Venta de Servicios Turísticos
-- =====================================================
-- Ejecutar esto en el SQL Editor de Supabase Dashboard
-- =====================================================

-- Tabla: paises
CREATE TABLE IF NOT EXISTS public.paises (
    id_pais SERIAL PRIMARY KEY,
    nombre_pais VARCHAR(100) NOT NULL,
    codigo_iso CHAR(3) NOT NULL
);

-- Tabla: ciudades
CREATE TABLE IF NOT EXISTS public.ciudades (
    id_ciudad SERIAL PRIMARY KEY,
    nombre_ciudad VARCHAR(100) NOT NULL,
    id_pais INT NOT NULL,
    CONSTRAINT fk_ciudad_pais 
        FOREIGN KEY (id_pais) 
        REFERENCES public.paises(id_pais) 
        ON DELETE CASCADE
);

-- Tabla: categorias
CREATE TABLE IF NOT EXISTS public.categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin'))
);

-- Tabla: servicios
CREATE TABLE IF NOT EXISTS public.servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'agotado', 'inactivo')),
    id_ciudad INT NOT NULL,
    id_categoria INT NOT NULL,
    cupos_disponibles INT DEFAULT 0,
    imagen VARCHAR(500),
    duracion VARCHAR(50),
    CONSTRAINT fk_servicio_ciudad 
        FOREIGN KEY (id_ciudad) 
        REFERENCES public.ciudades(id_ciudad) 
        ON DELETE CASCADE,
    CONSTRAINT fk_servicio_categoria 
        FOREIGN KEY (id_categoria) 
        REFERENCES public.categorias(id_categoria) 
        ON DELETE CASCADE
);

-- Tabla: reservas
CREATE TABLE IF NOT EXISTS public.reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_reserva VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_reserva IN ('pendiente', 'confirmada', 'cancelada')),
    cantidad INT DEFAULT 1,
    total_reserva NUMERIC(10,2) DEFAULT 0,
    CONSTRAINT fk_reserva_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES public.usuarios(id_usuario) 
        ON DELETE CASCADE,
    CONSTRAINT fk_reserva_servicio 
        FOREIGN KEY (id_servicio) 
        REFERENCES public.servicios(id_servicio) 
        ON DELETE CASCADE
);

-- =====================================================
-- DATOS INICIALES (SEED DATA)
-- =====================================================

-- Insertar países
INSERT INTO public.paises (nombre_pais, codigo_iso) VALUES
    ('Perú', 'PER'),
    ('Francia', 'FRA'),
    ('México', 'MEX'),
    ('Italia', 'ITA'),
    ('India', 'IND'),
    ('Argentina', 'ARG')
ON CONFLICT DO NOTHING;

-- Insertar ciudades
INSERT INTO public.ciudades (nombre_ciudad, id_pais) VALUES
    ('Cusco', 1),        -- Perú
    ('París', 2),        -- Francia
    ('Cancún', 3),       -- México
    ('Roma', 4),         -- Italia
    ('Agra', 5),         -- India
    ('Puerto Iguazú', 6) -- Argentina
ON CONFLICT DO NOTHING;

-- Insertar categorías
INSERT INTO public.categorias (nombre_categoria) VALUES
    ('Arqueológico'),
    ('Monumento'),
    ('Playa'),
    ('Histórico'),
    ('Naturaleza')
ON CONFLICT DO NOTHING;

-- Insertar servicios turísticos
INSERT INTO public.servicios (nombre, descripcion, precio, estado, id_ciudad, id_categoria, cupos_disponibles, imagen, duracion) VALUES
    ('Machu Picchu', 'Ciudadela inca en los Andes, una de las 7 maravillas del mundo moderno.', 1200000, 'disponible', 1, 1, 25, 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400', '2 días'),
    ('Torre Eiffel', 'Icono parisino construido en 1889, ofrece vistas panorámicas de París.', 850000, 'disponible', 2, 2, 50, 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=400', '4 horas'),
    ('Cancún', 'Playas de arena blanca y aguas turquesas en el Caribe mexicano.', 2100000, 'disponible', 3, 3, 30, 'https://images.unsplash.com/photo-1552074291-ad4df10b4ed4?w=400', '5 días'),
    ('Coliseo Romano', 'Anfiteatro flavio, símbolo del Imperio Romano.', 950000, 'disponible', 4, 4, 40, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400', '3 horas'),
    ('Taj Mahal', 'Mausoleo de mármol blanco, joya del arte mogol.', 1500000, 'disponible', 5, 2, 35, 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400', '1 día'),
    ('Cataratas del Iguazú', 'Uno de los saltos de agua más impresionantes del mundo.', 780000, 'disponible', 6, 5, 20, 'https://images.unsplash.com/photo-1593995863951-57cdd92d9d9f?w=400', '2 días')
ON CONFLICT DO NOTHING;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security - RLS)
-- NOTA: Estas políticas son opcionales si usas API REST desde el backend
-- Si usas Supabase Client directamente desde el frontend, activa RLS
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ciudades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer catálogo público
CREATE POLICY "Catálogo público - lectura" ON public.servicios
    FOR SELECT USING (true);

CREATE POLICY "Países público - lectura" ON public.paises
    FOR SELECT USING (true);

CREATE POLICY "Ciudades público - lectura" ON public.ciudades
    FOR SELECT USING (true);

CREATE POLICY "Categorías público - lectura" ON public.categorias
    FOR SELECT USING (true);

-- Política: Usuarios solo ven sus propias reservas
CREATE POLICY "Reservas propias" ON public.reservas
    FOR ALL USING (auth.uid()::text = id_usuario::text);
