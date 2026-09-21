
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./workout_tracker.db", (err) => {
    if (err) {
        console.error("Error al conectar con SQLite:", err.message);
    } else {
        console.log("Base de datos SQLite conectada");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error("Error al crear la tabla usuarios:", err.message);
    } else {
        console.log("Tabla usuarios creada correctamente");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS entrenamientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
`, (err) => {
    if (err) {
        console.error("Error al crear la tabla entrenamientos:", err.message);
    } else {
        console.log("Tabla entrenamientos creada correctamente");
    }
});
db.run(`
    CREATE TABLE IF NOT EXISTS ejercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
`, (err) => {
    if (err) {
        console.error("Error al crear la tabla ejercicios:", err.message);
    } else {
        console.log("Tabla ejercicios creada correctamente");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS progreso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        entrenamiento_id INTEGER NOT NULL,
        peso REAL,
        repeticiones INTEGER,
        series INTEGER,
        completado INTEGER DEFAULT 0,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (entrenamiento_id) REFERENCES entrenamientos(id)
    )
`, (err) => {
    if (err) {
        console.error("Error al crear la tabla progreso:", err.message);
    } else {
        console.log("Tabla progreso creada correctamente");
    }
});

module.exports = db;
