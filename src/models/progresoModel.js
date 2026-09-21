
const db = require("../database/database");

const crearProgreso = (
    usuario_id,
    entrenamiento_id,
    peso,
    repeticiones,
    series,
    completado,
    callback
) => {
    const sql = `
        INSERT INTO progreso
        (usuario_id, entrenamiento_id, peso, repeticiones, series, completado)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            usuario_id,
            entrenamiento_id,
            peso,
            repeticiones,
            series,
            completado
        ],
        function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, {
                    id: this.lastID,
                    usuario_id,
                    entrenamiento_id,
                    peso,
                    repeticiones,
                    series,
                    completado
                });
            }
        }
    );
};

const obtenerProgreso = (usuario_id, callback) => {
    const sql = `
        SELECT *
        FROM progreso
        WHERE usuario_id = ?
        ORDER BY id DESC
    `;

    db.all(sql, [usuario_id], (err, progreso) => {
        if (err) {
            callback(err);
        } else {
            callback(null, progreso);
        }
    });
};

module.exports = {
    crearProgreso,
    obtenerProgreso
};
