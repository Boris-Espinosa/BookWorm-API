# 📚 BookWorm API

[English](#english) | [Español](#español)

---

<a name="english"></a>

## 🇬🇧 English

> **📚 Bootcamp Project**: This project was developed as part of a React Native bootcamp to learn full-stack mobile application development.

### 📖 Description

BookWorm API is a RESTful backend service for managing a personal book library. It allows users to register, authenticate, and manage their book collection with features like adding books with cover images, rating them, and discovering books from other users.

### 🎯 Problem it Solves

- **Personal Library Management**: Catalog and organize your personal book collection
- **Book Discovery**: Share and discover books from other users
- **Reading Tracking**: Keep a record of books you've read with ratings
- **Social Reading**: View books and profiles from other readers in the community

### 🛠️ Technologies Used

#### Backend Stack

- **Express.js** - Fast, minimalist web framework for Node.js
- **MongoDB + Mongoose** - NoSQL database with ODM for data modeling
- **JWT (jsonwebtoken)** - Secure authentication and authorization with tokens
- **bcryptjs** - Password hashing and encryption
- **Cloudinary** - Cloud-based image storage and management
- **CORS** - Cross-Origin Resource Sharing configuration
- **Cron** - Job scheduler for periodic tasks
- **dotenv** - Environment variables management
- **Nodemon** - Development tool for auto-restarting server

### 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Boris-Espinosa/BookWorm-API.git
cd BookWorm-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the development server:

```bash
npm run dev
```

### 🚀 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-restart
- `npm test` - Run tests (not configured yet)

### 📡 API Endpoints

#### Authentication (`/api/auth`)

| Method | Endpoint    | Description              | Auth Required |
| ------ | ----------- | ------------------------ | ------------- |
| POST   | `/register` | Register a new user      | No            |
| POST   | `/login`    | Login user               | No            |
| POST   | `/logout`   | Logout user              | Yes           |
| GET    | `/me`       | Get current user profile | Yes           |

#### Books (`/api/books`)

| Method | Endpoint        | Description               | Auth Required |
| ------ | --------------- | ------------------------- | ------------- |
| POST   | `/`             | Create a new book         | Yes           |
| GET    | `/`             | Get all books (paginated) | No            |
| GET    | `/user/:userId` | Get books by user         | No            |
| DELETE | `/:bookId`      | Delete a book             | Yes           |

### 📝 API Request Examples

#### Register a User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "bookworm",
  "email": "bookworm@example.com",
  "password": "password123"
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "bookworm@example.com",
  "password": "password123"
}
```

#### Create a Book

```bash
POST /api/books
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "description": "A classic American novel",
  "coverImage": "data:image/jpeg;base64,...",
  "rating": 5
}
```

#### Get Books (with pagination)

```bash
GET /api/books?page=1&limit=5
```

### 🗂️ Project Structure

```
backend/
├── src/
│   ├── index.js              # Main application entry point
│   ├── lib/
│   │   ├── cloudinary.js     # Cloudinary configuration
│   │   ├── cron.js           # Scheduled tasks
│   │   └── db.js             # Database connection
│   ├── middleware/
│   │   └── auth.middleware.js # JWT authentication middleware
│   ├── models/
│   │   ├── Book.js           # Book schema and model
│   │   └── User.js           # User schema and model
│   └── routes/
│       ├── authRoutes.js     # Authentication endpoints
│       └── bookRoutes.js     # Book management endpoints
├── .env                      # Environment variables
├── package.json              # Project dependencies
└── README.md                 # This file
```

### 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login or registration, a token is returned that must be included in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 15 days.

### 📦 Data Models

#### User Model

```javascript
{
  username: String (required, unique, min 3 chars),
  email: String (required, unique, valid email),
  password: String (required, min 8 chars, hashed),
  profileImage: String (auto-generated from DiceBear),
  createdAt: Date,
  updatedAt: Date
}
```

#### Book Model

```javascript
{
  title: String (required),
  description: String (required),
  coverImage: String (required, Cloudinary URL),
  rating: Number (required, 1-5),
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### 🔧 Features

- ✅ User registration and authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Image upload to Cloudinary
- ✅ Auto-generated profile avatars (DiceBear)
- ✅ Infinite scroll pagination
- ✅ User-specific book management
- ✅ Scheduled cron jobs for maintenance tasks
- ✅ CORS enabled for frontend integration

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

ISC

### 👤 Author

Boris Espinosa

---

<a name="español"></a>

## 🇪🇸 Español

> **📚 Proyecto de Bootcamp**: Este proyecto fue desarrollado como parte de un bootcamp de React Native para aprender desarrollo full-stack de aplicaciones móviles.

### 📖 Descripción

BookWorm API es un servicio backend RESTful para gestionar una biblioteca personal de libros. Permite a los usuarios registrarse, autenticarse y administrar su colección de libros con características como agregar libros con imágenes de portada, calificarlos y descubrir libros de otros usuarios.

### 🎯 Problema que Resuelve

- **Gestión de Biblioteca Personal**: Catalogar y organizar tu colección personal de libros
- **Descubrimiento de Libros**: Compartir y descubrir libros de otros usuarios
- **Seguimiento de Lecturas**: Mantener un registro de los libros que has leído con calificaciones
- **Lectura Social**: Ver libros y perfiles de otros lectores en la comunidad

### 🛠️ Tecnologías Utilizadas

#### Stack Backend

- **Express.js** - Framework web rápido y minimalista para Node.js
- **MongoDB + Mongoose** - Base de datos NoSQL con ODM para modelado de datos
- **JWT (jsonwebtoken)** - Autenticación y autorización segura con tokens
- **bcryptjs** - Cifrado y hash de contraseñas
- **Cloudinary** - Almacenamiento y gestión de imágenes en la nube
- **CORS** - Configuración de intercambio de recursos entre orígenes
- **Cron** - Programador de tareas para trabajos periódicos
- **dotenv** - Gestión de variables de entorno
- **Nodemon** - Herramienta de desarrollo para reinicio automático del servidor

### 📋 Prerequisitos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- Cuenta de Cloudinary (para subida de imágenes)

### ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Boris-Espinosa/BookWorm-API.git
cd BookWorm-API
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio raíz:

```env
PORT=5000
MONGODB_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloudinary
CLOUDINARY_API_KEY=tu_api_key_de_cloudinary
CLOUDINARY_API_SECRET=tu_api_secret_de_cloudinary
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

### 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor de producción
- `npm run dev` - Inicia el servidor de desarrollo con reinicio automático
- `npm test` - Ejecuta pruebas (aún no configurado)

### 📡 Endpoints de la API

#### Autenticación (`/api/auth`)

| Método | Endpoint    | Descripción                       | Requiere Auth |
| ------ | ----------- | --------------------------------- | ------------- |
| POST   | `/register` | Registrar un nuevo usuario        | No            |
| POST   | `/login`    | Iniciar sesión                    | No            |
| POST   | `/logout`   | Cerrar sesión                     | Sí            |
| GET    | `/me`       | Obtener perfil del usuario actual | Sí            |

#### Libros (`/api/books`)

| Método | Endpoint        | Descripción                         | Requiere Auth |
| ------ | --------------- | ----------------------------------- | ------------- |
| POST   | `/`             | Crear un nuevo libro                | Sí            |
| GET    | `/`             | Obtener todos los libros (paginado) | No            |
| GET    | `/user/:userId` | Obtener libros por usuario          | No            |
| DELETE | `/:bookId`      | Eliminar un libro                   | Sí            |

### 📝 Ejemplos de Peticiones a la API

#### Registrar un Usuario

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "bookworm",
  "email": "bookworm@example.com",
  "password": "password123"
}
```

#### Iniciar Sesión

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "bookworm@example.com",
  "password": "password123"
}
```

#### Crear un Libro

```bash
POST /api/books
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "title": "El Gran Gatsby",
  "description": "Una novela clásica americana",
  "coverImage": "data:image/jpeg;base64,...",
  "rating": 5
}
```

#### Obtener Libros (con paginación)

```bash
GET /api/books?page=1&limit=5
```

### 🗂️ Estructura del Proyecto

```
backend/
├── src/
│   ├── index.js              # Punto de entrada principal
│   ├── lib/
│   │   ├── cloudinary.js     # Configuración de Cloudinary
│   │   ├── cron.js           # Tareas programadas
│   │   └── db.js             # Conexión a la base de datos
│   ├── middleware/
│   │   └── auth.middleware.js # Middleware de autenticación JWT
│   ├── models/
│   │   ├── Book.js           # Esquema y modelo de Libro
│   │   └── User.js           # Esquema y modelo de Usuario
│   └── routes/
│       ├── authRoutes.js     # Endpoints de autenticación
│       └── bookRoutes.js     # Endpoints de gestión de libros
├── .env                      # Variables de entorno
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

### 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Después de un inicio de sesión o registro exitoso, se devuelve un token que debe incluirse en el encabezado `Authorization` para rutas protegidas:

```
Authorization: Bearer <tu_token_jwt>
```

Los tokens expiran después de 15 días.

### 📦 Modelos de Datos

#### Modelo de Usuario

```javascript
{
  username: String (requerido, único, mín 3 caracteres),
  email: String (requerido, único, email válido),
  password: String (requerido, mín 8 caracteres, hasheado),
  profileImage: String (auto-generado desde DiceBear),
  createdAt: Date,
  updatedAt: Date
}
```

#### Modelo de Libro

```javascript
{
  title: String (requerido),
  description: String (requerido),
  coverImage: String (requerido, URL de Cloudinary),
  rating: Number (requerido, 1-5),
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### 🔧 Características

- ✅ Registro y autenticación de usuarios con JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Subida de imágenes a Cloudinary
- ✅ Avatares de perfil auto-generados (DiceBear)
- ✅ Paginación con scroll infinito
- ✅ Gestión de libros específica por usuario
- ✅ Tareas cron programadas para mantenimiento
- ✅ CORS habilitado para integración con frontend

### 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

### 📄 Licencia

ISC

### 👤 Autor

Boris Espinosa
