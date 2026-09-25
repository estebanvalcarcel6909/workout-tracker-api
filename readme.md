# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, entrenamientos, ejercicios y registros de progreso.

El proyecto utiliza autenticación mediante JWT y almacena los datos temporalmente en memoria, sin utilizar una base de datos.

---

## Tecnologías utilizadas

* Node.js
* Express
* JWT
* bcryptjs
* CORS
* dotenv
* Nodemon

---

## Requisitos

* Node.js
* npm
* Visual Studio Code
* Thunder Client, curl o cualquier cliente HTTP

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/estebanvalcarcel6909/workout-tracker-api.git
```

Entrar a la carpeta:

```bash
cd workout-tracker-api
```

Instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=secreto_temporal
```

El archivo `.env` está incluido en `.gitignore` y no debe subirse al repositorio.

También se incluye un archivo `.env.example` como referencia:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
```

---

## Ejecución

Para ejecutar el servidor:

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

---

## Respuesta inicial

Al realizar:

```text
GET /
```

La API responde:

```json
{
    "mensaje": "API Workout Tracker funcionando"
}
```

---

# Estructura del proyecto

```text
workout-tracker-api/
│
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── README.md
│
└── src/
    │
    ├── app.js
    │
    ├── config/
    │   └── env.js
    │
    ├── controllers/
    │   ├── ejercicioController.js
    │   ├── entrenamientoController.js
    │   ├── informeController.js
    │   ├── progresoController.js
    │   └── usuarioController.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── ejercicioModel.js
    │   ├── entrenamientoModel.js
    │   ├── informeModel.js
    │   └── progresoModel.js
    │
    └── routes/
        │
        └── v1/
            ├── ejercicioRoutes.js
            ├── entrenamientoRoutes.js
            ├── informeRoutes.js
            ├── progresoRoutes.js
            └── usuarioRoutes.js
```

---

# Versionado de la API

Las rutas de la API utilizan la versión `v1`.

La estructura general es:

```text
/api/v1/
```

Por ejemplo:

```text
/api/v1/usuarios
/api/v1/entrenamientos
/api/v1/ejercicios
/api/v1/progreso
/api/v1/informe
```

---

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

El token se obtiene al iniciar sesión.

---

# Usuarios

## Registrar usuario

```text
POST /api/v1/usuarios/registro
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

---

## Iniciar sesión

```text
POST /api/v1/usuarios/login
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

---

## Obtener usuario por ID

```text
GET /api/v1/usuarios/:id
```

Ejemplo:

```text
GET /api/v1/usuarios/1
```

Requiere:

```text
Authorization: Bearer TOKEN_JWT
```

Código:

```text
200 OK
```

Si el usuario no existe:

```text
404 Not Found
```

---

## Actualizar usuario completamente

```text
PUT /api/v1/usuarios/:id
```

Ejemplo:

```text
PUT /api/v1/usuarios/1
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

---

## Actualizar usuario parcialmente

```text
PATCH /api/v1/usuarios/:id
```

Ejemplo:

```text
PATCH /api/v1/usuarios/1
```

Request:

```json
{
    "nombre": "Emmanuel"
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

---

## Eliminar usuario

```text
DELETE /api/v1/usuarios/:id
```

Ejemplo:

```text
DELETE /api/v1/usuarios/1
```

Respuesta exitosa:

```text
204 No Content
```

Si el usuario no existe:

```text
404 Not Found
```

---

# Entrenamientos

## Listar entrenamientos

```text
GET /api/v1/entrenamientos
```

Requiere autenticación.

Código:

```text
200 OK
```

---

## Limitar entrenamientos

La API permite utilizar Query Strings mediante `limit`.

Ejemplo:

```text
GET /api/v1/entrenamientos?limit=10
```

El parámetro debe ser un número entero mayor que `0`.

Código:

```text
200 OK
```

---

## Obtener entrenamiento por ID

```text
GET /api/v1/entrenamientos/:id
```

Ejemplo:

```text
GET /api/v1/entrenamientos/1
```

Código:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

---

## Crear entrenamiento

```text
POST /api/v1/entrenamientos
```

Request:

```json
{
    "nombre": "Entrenamiento de piernas",
    "descripcion": "Rutina para piernas",
    "fecha": "2026-09-25"
}
```

Código:

```text
201 Created
```

---

## Actualizar parcialmente entrenamiento

```text
PATCH /api/v1/entrenamientos/:id
```

Ejemplo:

```text
PATCH /api/v1/entrenamientos/1
```

Request:

```json
{
    "nombre": "Entrenamiento de pecho"
}
```

Código:

```text
200 OK
```

---

## Eliminar entrenamiento

```text
DELETE /api/v1/entrenamientos/:id
```

Ejemplo:

```text
DELETE /api/v1/entrenamientos/1
```

Respuesta exitosa:

```text
204 No Content
```

Si no existe:

```text
404 Not Found
```

---

# Ejercicios

## Listar ejercicios

```text
GET /api/v1/ejercicios
```

Código:

```text
200 OK
```

---

## Crear ejercicio

```text
POST /api/v1/ejercicios
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

---

## Obtener ejercicio por ID

```text
GET /api/v1/ejercicios/:id
```

Ejemplo:

```text
GET /api/v1/ejercicios/1
```

Código:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

---

## Actualizar ejercicio

```text
PATCH /api/v1/ejercicios/:id
```

Ejemplo:

```text
PATCH /api/v1/ejercicios/1
```

Request:

```json
{
    "nombre": "Sentadilla con barra",
    "descripcion": "Ejercicio para piernas y glúteos"
}
```

Código:

```text
200 OK
```

---

## Eliminar ejercicio

```text
DELETE /api/v1/ejercicios/:id
```

Ejemplo:

```text
DELETE /api/v1/ejercicios/1
```

Respuesta exitosa:

```text
204 No Content
```

---

# Progreso

## Registrar progreso

```text
POST /api/v1/progreso
```

Request:

```json
{
    "entrenamiento_id": 1,
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
        "entrenamiento_id": 1,
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

---

## Listar progreso

```text
GET /api/v1/progreso
```

Response:

```json
{
    "progreso": [
        {
            "id": 1,
            "usuario_id": 1,
            "entrenamiento_id": 1,
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

---

## Obtener progreso por ID

```text
GET /api/v1/progreso/:id
```

Ejemplo:

```text
GET /api/v1/progreso/1
```

Código:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

---

## Actualizar progreso

```text
PATCH /api/v1/progreso/:id
```

Ejemplo:

```text
PATCH /api/v1/progreso/1
```

Request:

```json
{
    "entrenamiento_id": 1,
    "peso": 65,
    "repeticiones": 10,
    "series": 3,
    "completado": 1
}
```

Código:

```text
200 OK
```

---

## Eliminar progreso

```text
DELETE /api/v1/progreso/:id
```

Ejemplo:

```text
DELETE /api/v1/progreso/1
```

Respuesta exitosa:

```text
204 No Content
```

---

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

---

# Informes

## Generar informe

```text
GET /api/v1/informe
```

El informe permite consultar información resumida sobre los entrenamientos y sus registros de progreso.

Ejemplo:

```json
{
    "mensaje": "Informe generado correctamente",
    "informe": [
        {
            "entrenamiento_id": 1,
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

---

# Parámetros y Query Strings

La API utiliza parámetros dinámicos mediante `req.params`.

Ejemplos:

```text
GET /api/v1/usuarios/1

GET /api/v1/entrenamientos/1

GET /api/v1/ejercicios/1

GET /api/v1/progreso/1
```

También utiliza Query Strings mediante `req.query`.

Ejemplo:

```text
GET /api/v1/entrenamientos?limit=10
```

---

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

---

# Cabeceras HTTP

Las principales cabeceras utilizadas son:

```text
Content-Type
Authorization
```

Ejemplo:

```text
Content-Type: application/json

Authorization: Bearer TOKEN_JWT
```

La cabecera `Authorization` se utiliza para enviar el token JWT y acceder a las rutas protegidas.

---

# Códigos de estado HTTP

| Código | Significado                                     |
| ------ | ----------------------------------------------- |
| 200    | Solicitud procesada correctamente               |
| 201    | Recurso creado correctamente                    |
| 204    | Operación realizada correctamente sin contenido |
| 400    | Solicitud incorrecta o datos inválidos          |
| 401    | No autorizado o token inválido                  |
| 404    | Recurso no encontrado                           |
| 500    | Error interno del servidor                      |

---

# Scripts de npm

Ejecutar el servidor:

```bash
npm start
```

Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

---

# Almacenamiento de datos

Este proyecto actualmente **no utiliza ninguna base de datos**.

Los datos se almacenan temporalmente en memoria utilizando arreglos de JavaScript.

Por ejemplo:

```javascript
let usuarios = [];
let entrenamientos = [];
let ejercicios = [];
let progreso = [];
```

Esto significa que los datos se pierden cuando el servidor se detiene o se reinicia.

No se utiliza:

* MySQL
* SQLite
* MongoDB
* PostgreSQL
* Otra base de datos

---

# Pruebas de la API

Las pruebas de los endpoints pueden realizarse utilizando Thunder Client, curl u otro cliente HTTP.

Para las rutas protegidas se debe incluir:

```text
Authorization: Bearer TOKEN_JWT
```

Primero se debe registrar un usuario y posteriormente iniciar sesión para obtener el token JWT.

---

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
feat/readme
```

Repositorio:

https://github.com/estebanvalcarcel6909/workout-tracker-api

---

# Seguridad

El proyecto utiliza:

* JWT para autenticación.
* bcryptjs para proteger las contraseñas.
* Variables de entorno mediante dotenv.
* `.gitignore` para evitar subir información privada.
* Cabecera `Authorization` para proteger las rutas.
* Validaciones de datos en los controladores.

El archivo `.env` no debe subirse al repositorio.

---

# Proyecto académico

Proyecto desarrollado como parte de la actividad:

**GA1-220501098-03-AA1-EV09 – Configurar proyecto de API RESTful con Node.js, Express y creación de rutas + control de versiones.**

## Caso de estudio

**Workout Tracker**

La aplicación permite gestionar usuarios, entrenamientos, ejercicios y registros de progreso mediante una API RESTful.

---

# Objetivos cumplidos

* Inicialización del proyecto Node.js con npm.
* Configuración de Express.
* Configuración de Nodemon.
* Creación de rutas RESTful.
* Organización de rutas mediante versión `v1`.
* Métodos GET.
* Métodos POST.
* Métodos PUT.
* Métodos PATCH.
* Métodos DELETE.
* Uso de parámetros mediante `req.params`.
* Uso de Query Strings mediante `req.query`.
* Uso de `req.body`.
* Manejo de cabeceras HTTP.
* Uso de códigos de estado HTTP.
* Autenticación mediante JWT.
* Protección de rutas.
* Gestión de usuarios.
* Gestión de entrenamientos.
* Gestión de ejercicios.
* Gestión de progreso.
* Generación de informes.
* Almacenamiento temporal de datos en memoria.
* Variables de entorno mediante `.env`.
* Control de versiones mediante Git y GitHub.
