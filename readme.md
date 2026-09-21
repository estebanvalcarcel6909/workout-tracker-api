# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, entrenamientos, ejercicios y registros de progreso.

## Tecnologías utilizadas

* Node.js
* Express
* SQLite
* JWT
* bcryptjs
* CORS
* dotenv
* Nodemon

## Requisitos

* Node.js
* npm
* Visual Studio Code
* Postman o cualquier cliente HTTP

## Instalación

Clonar o descargar el proyecto y entrar a la carpeta:

```bash
cd workout-tracker-api
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
```

## Ejecución

Para ejecutar el servidor:

```bash
npm start
```

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Estructura del proyecto

```text
workout-tracker-api/
│
├── src/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Autenticación

Las rutas protegidas utilizan JWT.

La cabecera debe enviarse de la siguiente forma:

```text
Authorization: Bearer TOKEN
```

La API también utiliza la cabecera personalizada:

```text
X-API-Key: Workout-Tracker-API
```

## Endpoints de usuarios

### Registrar usuario

```text
POST /api/usuarios/registro
```

Request:

```json
{
    "nombre": "Esteban",
    "email": "esteban@gmail.com",
    "password": "123456"
}
```

Response:

```json
{
    "mensaje": "Usuario registrado correctamente",
    "usuario": {
        "id": 1,
        "nombre": "Esteban",
        "email": "esteban@gmail.com"
    }
}
```

### Iniciar sesión

```text
POST /api/usuarios/login
```

Request:

```json
{
    "email": "esteban@gmail.com",
    "password": "123456"
}
```

Response:

```json
{
    "mensaje": "Inicio de sesión correcto",
    "token": "TOKEN_JWT",
    "usuario": {
        "id": 1,
        "nombre": "Esteban",
        "email": "esteban@gmail.com"
    }
}
```

### Obtener usuario por ID

```text
GET /api/usuarios/:id
```

Ejemplo:

```text
GET /api/usuarios/1
```

### Actualizar usuario

```text
PUT /api/usuarios/:id
```

Request:

```json
{
    "nombre": "Esteban",
    "email": "esteban@gmail.com",
    "password": "123456"
}
```

### Actualizar parcialmente un usuario

```text
PATCH /api/usuarios/:id
```

Request:

```json
{
    "nombre": "Esteban"
}
```

### Eliminar usuario

```text
DELETE /api/usuarios/:id
```

Response:

```text
204 No Content
```

## Endpoints de entrenamientos

### Listar entrenamientos

```text
GET /api/entrenamientos
```

### Limitar resultados

```text
GET /api/entrenamientos?limit=10
```

### Obtener entrenamiento por ID

```text
GET /api/entrenamientos/:id
```

### Crear entrenamiento

```text
POST /api/entrenamientos
```

Request:

```json
{
    "nombre": "Entrenamiento de piernas",
    "descripcion": "Rutina para piernas",
    "fecha": "2026-09-20"
}
```

### Actualizar entrenamiento

```text
PUT /api/entrenamientos/:id
```

### Eliminar entrenamiento

```text
DELETE /api/entrenamientos/:id
```

Response:

```text
204 No Content
```

## Endpoints de ejercicios

### Listar ejercicios

```text
GET /api/ejercicios
```

### Crear ejercicio

```text
POST /api/ejercicios
```

Request:

```json
{
    "nombre": "Sentadilla",
    "descripcion": "Ejercicio para piernas"
}
```

Response:

```json
{
    "mensaje": "Ejercicio creado correctamente",
    "ejercicio": {
        "id": 1,
        "usuario_id": 1,
        "nombre": "Sentadilla",
        "descripcion": "Ejercicio para piernas"
    }
}
```

## Endpoints de progreso

```text
GET /api/progreso
POST /api/progreso
```

Los endpoints de progreso permiten registrar y consultar los resultados de los entrenamientos realizados.

## Informes

```text
GET /api/informe
```

El informe permite consultar información resumida sobre el progreso de los entrenamientos.

## Parámetros y Query Strings

La API utiliza parámetros dinámicos mediante `req.params`.

Ejemplo:

```text
GET /api/usuarios/1
GET /api/entrenamientos/2
```

También utiliza Query Strings mediante `req.query`.

Ejemplo:

```text
GET /api/entrenamientos?limit=10
```

## Códigos de estado HTTP

| Código | Descripción                                    |
| ------ | ---------------------------------------------- |
| 200    | Solicitud procesada correctamente              |
| 201    | Recurso creado correctamente                   |
| 400    | Solicitud incorrecta o datos inválidos         |
| 401    | No autorizado                                  |
| 404    | Recurso no encontrado                          |
| 500    | Error interno del servidor                     |
| 204    | Operación realizada sin contenido de respuesta |

## Manejo de cabeceras

La API utiliza:

```text
Authorization
Content-Type
X-API-Key
```

Ejemplo:

```text
Authorization: Bearer TOKEN_JWT
Content-Type: application/json
X-API-Key: Workout-Tracker-API
```

## Scripts disponibles

```bash
npm start
```

Ejecuta el servidor normalmente.

```bash
npm run dev
```

Ejecuta el servidor utilizando Nodemon para detectar cambios automáticamente.

## Proyecto académico

Proyecto desarrollado como parte de la actividad:

**GA1-220501098-03-AA1-EV09 – Configurar proyecto de API RESTful con Node.js, Express y creación de rutas + control de versiones.**

### Caso de estudio

**Workout Tracker**
