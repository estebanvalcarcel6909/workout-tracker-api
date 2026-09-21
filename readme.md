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
* Postman, Thunder Client, curl o cualquier cliente HTTP

## Instalación

Clonar el repositorio y entrar a la carpeta del proyecto:

```bash
git clone https://github.com/estebanvalcarcel6909/workout-tracker-api.git
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

> El archivo `.env` no debe subirse al repositorio porque contiene información privada.

## Ejecución

Para ejecutar el servidor normalmente:

```bash
npm start
```

Para ejecutar el servidor en modo desarrollo con Nodemon:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Respuesta inicial

Al acceder a:

```text
GET /
```

La API responde:

```json
{
    "mensaje": "API Workout Tracker funcionando"
}
```

## Estructura del proyecto

```text
workout-tracker-api/
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
│
└── src/
    │
    ├── app.js
    │
    ├── controllers/
    │   ├── ejercicioController.js
    │   ├── entrenamientoController.js
    │   ├── informeController.js
    │   ├── progresoController.js
    │   └── usuarioController.js
    │
    ├── database/
    │   └── database.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── ejercicioModel.js
    │   ├── entrenamientoModel.js
    │   ├── informeModel.js
    │   ├── progresoModel.js
    │   └── usuarioModel.js
    │
    └── routes/
        ├── ejercicioRoutes.js
        ├── entrenamientoRoutes.js
        ├── informeRoutes.js
        ├── progresoRoutes.js
        └── usuarioRoutes.js
```

# Autenticación

Las rutas protegidas utilizan JSON Web Token (JWT).

La cabecera de autorización debe enviarse de la siguiente forma:

```text
Authorization: Bearer TOKEN_JWT
```

Ejemplo:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

La API también utiliza una cabecera personalizada:

```text
X-API-Key: Workout-Tracker-API
```

# Usuarios

## Registrar usuario

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

Código:

```text
201 Created
```

## Iniciar sesión

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

Código:

```text
200 OK
```

## Obtener todos los usuarios

```text
GET /api/usuarios
```

Código:

```text
200 OK
```

## Obtener usuario por ID

```text
GET /api/usuarios/:id
```

Ejemplo:

```text
GET /api/usuarios/1
```

Response:

```json
{
    "usuario": {
        "id": 1,
        "nombre": "Esteban",
        "email": "esteban@gmail.com"
    }
}
```

Código:

```text
200 OK
```

Si el usuario no existe:

```text
404 Not Found
```

## Actualizar usuario

```text
PUT /api/usuarios/:id
```

Ejemplo:

```text
PUT /api/usuarios/1
```

Request:

```json
{
    "nombre": "Esteban",
    "email": "esteban@gmail.com",
    "password": "123456"
}
```

Código:

```text
200 OK
```

## Actualizar parcialmente un usuario

```text
PATCH /api/usuarios/:id
```

Ejemplo:

```text
PATCH /api/usuarios/1
```

Request:

```json
{
    "nombre": "Esteban"
}
```

Response:

```json
{
    "mensaje": "Usuario actualizado parcialmente"
}
```

Código:

```text
200 OK
```

## Eliminar usuario

```text
DELETE /api/usuarios/:id
```

Ejemplo:

```text
DELETE /api/usuarios/2
```

Respuesta exitosa:

```text
204 No Content
```

Si el usuario no existe:

```text
404 Not Found
```

# Entrenamientos

## Listar entrenamientos

```text
GET /api/entrenamientos
```

Código:

```text
200 OK
```

## Filtrar o limitar entrenamientos

La API permite utilizar Query Strings.

Ejemplo:

```text
GET /api/entrenamientos?limit=10
```

Código:

```text
200 OK
```

## Obtener entrenamiento por ID

```text
GET /api/entrenamientos/:id
```

Ejemplo:

```text
GET /api/entrenamientos/2
```

Código:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

## Crear entrenamiento

```text
POST /api/entrenamientos
```

Request:

```json
{
    "nombre": "Entrenamiento de piernas",
    "descripcion": "Rutina para piernas"
}
```

Código:

```text
201 Created
```

## Actualizar entrenamiento

```text
PUT /api/entrenamientos/:id
```

Ejemplo:

```text
PUT /api/entrenamientos/2
```

Código:

```text
200 OK
```

## Actualizar parcialmente entrenamiento

```text
PATCH /api/entrenamientos/:id
```

Ejemplo:

```text
PATCH /api/entrenamientos/2
```

Código:

```text
200 OK
```

## Eliminar entrenamiento

```text
DELETE /api/entrenamientos/:id
```

Ejemplo:

```text
DELETE /api/entrenamientos/2
```

Respuesta exitosa:

```text
204 No Content
```

Si no existe:

```text
404 Not Found
```

# Ejercicios

## Listar ejercicios

```text
GET /api/ejercicios
```

Código:

```text
200 OK
```

## Crear ejercicio

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

Código:

```text
201 Created
```

## Obtener ejercicio por ID

```text
GET /api/ejercicios/:id
```

Ejemplo:

```text
GET /api/ejercicios/1
```

Código:

```text
200 OK
```

## Actualizar ejercicio

```text
PUT /api/ejercicios/:id
```

Código:

```text
200 OK
```

## Actualizar parcialmente ejercicio

```text
PATCH /api/ejercicios/:id
```

Código:

```text
200 OK
```

## Eliminar ejercicio

```text
DELETE /api/ejercicios/:id
```

Código:

```text
204 No Content
```

# Progreso

## Registrar progreso

```text
POST /api/progreso
```

Request:

```json
{
    "entrenamiento_id": 2,
    "peso": 60,
    "repeticiones": 10,
    "series": 3,
    "completado": 1
}
```

Response:

```json
{
    "mensaje": "Progreso registrado correctamente",
    "progreso": {
        "id": 1,
        "usuario_id": 1,
        "entrenamiento_id": 2,
        "peso": 60,
        "repeticiones": 10,
        "series": 3,
        "completado": 1
    }
}
```

Código:

```text
201 Created
```

## Listar progreso

```text
GET /api/progreso
```

Response:

```json
{
    "progreso": [
        {
            "id": 1,
            "usuario_id": 1,
            "entrenamiento_id": 2,
            "peso": 60,
            "repeticiones": 10,
            "series": 3,
            "completado": 1
        }
    ]
}
```

Código:

```text
200 OK
```

## Validación del progreso

El campo `entrenamiento_id` es obligatorio.

Si no se envía:

```text
400 Bad Request
```

Response:

```json
{
    "mensaje": "El entrenamiento_id es obligatorio"
}
```

# Informes

## Generar informe

```text
GET /api/informe
```

El informe permite consultar información resumida sobre el progreso de los entrenamientos.

Ejemplo de respuesta:

```json
{
    "mensaje": "Informe generado correctamente",
    "informe": [
        {
            "entrenamiento_id": 2,
            "entrenamiento": "Entrenamiento de piernas",
            "registros": 2,
            "series_totales": 6,
            "repeticiones_totales": 20,
            "peso_maximo": 60,
            "entrenamientos_completados": 2
        }
    ]
}
```

Código:

```text
200 OK
```

# Parámetros y Query Strings

La API utiliza parámetros dinámicos mediante `req.params`.

Ejemplos:

```text
GET /api/usuarios/1
GET /api/entrenamientos/2
GET /api/ejercicios/1
```

También utiliza Query Strings mediante `req.query`.

Ejemplo:

```text
GET /api/entrenamientos?limit=10
```

# Request y Response

La API utiliza:

```javascript
express.json()
```

para procesar datos enviados mediante `req.body`.

También utiliza:

```javascript
express.urlencoded()
```

para procesar datos enviados mediante formularios.

La API trabaja con:

```text
req.params
req.query
req.body
req.headers
req.get()
```

Las respuestas utilizan:

```text
res.status()
res.json()
res.send()
```

# Cabeceras HTTP

La API utiliza las siguientes cabeceras:

```text
Content-Type
Authorization
X-API-Key
```

Ejemplo:

```text
Content-Type: application/json
Authorization: Bearer TOKEN_JWT
X-API-Key: Workout-Tracker-API
```

La API utiliza `req.get()` para obtener información de las cabeceras recibidas y `res.set()` para configurar cabeceras de respuesta.

# Códigos de estado HTTP

| Código | Significado                                     |
| ------ | ----------------------------------------------- |
| 200    | Solicitud procesada correctamente               |
| 201    | Recurso creado correctamente                    |
| 400    | Solicitud incorrecta o datos inválidos          |
| 401    | No autorizado o token inválido                  |
| 404    | Recurso no encontrado                           |
| 500    | Error interno del servidor                      |
| 204    | Operación realizada correctamente sin contenido |

# Scripts de npm

Ejecutar el servidor:

```bash
npm start
```

Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

# Control de versiones

El proyecto utiliza Git y GitHub para el control de versiones.

Ramas principales:

```text
main
develop
```

Ramas de características:

```text
feat/users
feat/workouts
feat/exercises
feat/progress
```

Repositorio:

```text
https://github.com/estebanvalcarcel6909/workout-tracker-api
```

# Seguridad

El proyecto utiliza:

* JWT para autenticación.
* bcryptjs para encriptar contraseñas.
* Variables de entorno mediante dotenv.
* `.gitignore` para evitar subir información privada.
* Cabecera `Authorization` para proteger las rutas.
* Cabecera personalizada `X-API-Key`.

El archivo `.env` y las bases de datos locales no deben subirse al repositorio.

# Proyecto académico

Proyecto desarrollado como parte de la actividad:

**GA1-220501098-03-AA1-EV09 – Configurar proyecto de API RESTful con Node.js, Express y creación de rutas + control de versiones.**

## Caso de estudio

**Workout Tracker**

La aplicación permite gestionar usuarios, rutinas, ejercicios y registros de progreso mediante una API RESTful.

## Objetivos cumplidos

* Inicialización del proyecto Node.js con npm.
* Configuración de Express.
* Configuración de Nodemon.
* Creación de rutas RESTful.
* Métodos GET.
* Métodos POST.
* Métodos PUT.
* Métodos PATCH.
* Métodos DELETE.
* Uso de parámetros mediante `req.params`.
* Uso de Query Strings mediante `req.query`.
* Manejo de `req.body`.
* Manejo de cabeceras HTTP.
* Uso de estados HTTP.
* Autenticación mediante JWT.
* Protección de rutas.
* Gestión de usuarios.
* Gestión de entrenamientos.
* Gestión de ejercicios.
* Gestión de progreso.
* Generación de informes.
* Persistencia de datos mediante SQLite.
* Control de versiones mediante Git y GitHub.
