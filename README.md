# E-commerce

Aplicación web de e-commerce desarrollada con Node.js, Express y EJS en el servidor, con persistencia en SQLite. El proyecto incluye además un cliente React independiente (carpeta `client/`) que consume una API REST propia.

## Tecnologías

- **Backend:** Node.js, Express 5
- **Motor de vistas:** EJS + express-ejs-layouts
- **Base de datos:** SQLite (better-sqlite3)
- **Sesiones:** express-session
- **CORS:** cors
- **Cliente:** React (Create React App)

## Estructura del proyecto

```
E-commerce/
├── app.js                      # Punto de entrada del servidor
├── public/                     # Archivos estáticos (CSS clásico, imágenes de productos)
├── db/
│   ├── schema.sql              # Definición de tablas
│   ├── database.js             # Conexión a SQLite
│   ├── init.js                 # Inicializa la base de datos
│   ├── migrate.js              # Migraciones
│   └── ecommerce.db            # Base de datos SQLite
├── src/
│   ├── controllers/            # Controladores de vistas EJS
│   │   └── api/                # Controladores de la API REST
│   ├── routes/                 # Rutas de vistas EJS
│   │   └── api/                # Rutas de la API REST
│   ├── services/                # Lógica de negocio (productos, categorías, carrito, usuarios)
│   └── views/                   # Vistas EJS (home, productos, carrito, auth, checkout)
└── client/                     # Aplicación React
    └── src/
        ├── components/         # Header, Sidebar, MainArea
        ├── pages/               # Home, Products, Categories, Profile
        └── utils/               # api.js, sidebarController.js
```

## Modelo de datos

La base de datos SQLite define las siguientes tablas:

- **products**: nombre, precio, descripción, imagen, categoría, stock, destacado, más pedido
- **categories**: nombre
- **users**: nombre, email, password hash
- **orders**: pedidos asociados a un usuario
- **order_items**: ítems de cada pedido, con cantidad y precio unitario

## Funcionalidades

- Vistas server-side con EJS: home, listado de productos, detalle, búsqueda, categorías
- Carrito de compras y checkout
- Autenticación de usuarios (login / registro)
- API REST propia bajo `/api`:
  - `GET/POST/PUT/DELETE /api/products`
  - `GET/POST/PUT/DELETE /api/categories`
  - `GET /api/stats`
- Cliente React separado que consume esta API

## Instalación

### Backend

```bash
git clone https://github.com/BrandonIturra-Programmer/E-commerce.git
cd E-commerce
npm install
```

Inicializar la base de datos (si es la primera vez):

```bash
node db/init.js
```

### Cliente React

```bash
cd client
npm install
```

## Uso

### Levantar el servidor (vistas EJS + API)

```bash
node app.js
```

El servidor queda disponible en http://localhost:3000.

### Levantar el cliente React

```bash
cd client
npm start
```

## Endpoints principales de la API

| Método | Ruta                  | Descripción                  |
|--------|-----------------------|-------------------------------|
| GET    | /api/products         | Lista todos los productos     |
| GET    | /api/products/:id     | Obtiene un producto por ID    |
| POST   | /api/products         | Crea un producto              |
| PUT    | /api/products/:id     | Actualiza un producto         |
| DELETE | /api/products/:id     | Elimina un producto           |
| GET    | /api/categories       | Lista todas las categorías    |
| GET    | /api/categories/:id   | Obtiene una categoría por ID  |
| POST   | /api/categories       | Crea una categoría            |
| PUT    | /api/categories/:id   | Actualiza una categoría       |
| DELETE | /api/categories/:id   | Elimina una categoría         |
| GET    | /api/stats            | Estadísticas generales        |
