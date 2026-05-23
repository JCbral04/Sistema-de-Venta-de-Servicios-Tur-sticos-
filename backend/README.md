# Backend - Sistema de Venta de Servicios Turísticos

API REST construida con Node.js + Express + Supabase (PostgreSQL).

## Estructura

```
src/
├── config/
│   └── supabase.js          # Cliente Supabase
├── controllers/
│   ├── authController.js     # Login/Register
│   ├── serviciosController.js # CRUD servicios
│   ├── reservasController.js  # CRUD reservas
│   ├── usuariosController.js  # Gestión usuarios
│   └── catalogoController.js  # Catálogo público
├── middleware/
│   ├── auth.js               # Verificación JWT
│   └── admin.js              # Verificación rol admin
├── models/
│   └── queries.js            # Consultas SQL
├── routes/
│   ├── auth.js               # Rutas de autenticación
│   ├── servicios.js          # Rutas de servicios
│   ├── reservas.js           # Rutas de reservas
│   ├── usuarios.js           # Rutas de usuarios
│   └── catalogo.js           # Rutas públicas
├── utils/
│   └── helpers.js            # Funciones utilitarias
└── server.js                 # Punto de entrada
```

## Instalación

```bash
npm install
```

## Configuración

1. Copia `.env.example` a `.env`
2. Completa tus credenciales de Supabase
3. Genera un JWT_SECRET seguro

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Perfil del usuario autenticado

### Catálogo (Público)
- `GET /api/catalogo/servicios` - Listar todos los servicios
- `GET /api/catalogo/servicios/:id` - Detalle de un servicio
- `GET /api/catalogo/paises` - Listar países
- `GET /api/catalogo/ciudades` - Listar ciudades
- `GET /api/catalogo/categorias` - Listar categorías

### Servicios (Admin)
- `POST /api/servicios` - Crear servicio
- `PUT /api/servicios/:id` - Actualizar servicio
- `DELETE /api/servicios/:id` - Eliminar servicio

### Reservas (Autenticado)
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/mis-reservas` - Mis reservas
- `PUT /api/reservas/:id/cancelar` - Cancelar reserva

### Usuarios (Admin)
- `GET /api/usuarios` - Listar usuarios
- `PUT /api/usuarios/:id/rol` - Cambiar rol
