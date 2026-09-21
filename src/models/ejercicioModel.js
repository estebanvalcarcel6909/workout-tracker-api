
const db = require("../database/database");

const crearEjercicio = (
    usuario_id,
    nombre,
    descripcion,
    callback
) => {
    const sql = `
        INSERT INTO ejercicios
        (usuario_id, nombre, descripcion)
        VALUES (?, ?, ?)
    `;

    db.run(
        sql,
        [usuario_id, nombre, descripcion || null],
        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                id: this.lastID,
                usuario_id,
                nombre,
                descripcion
            });
        }
    );
};

const obtenerEjercicios = (
    usuario_id,
    callback
) => {
    const sql = `
        SELECT *
        FROM ejercicios
        WHERE usuario_id = ?
        ORDER BY id DESC
    `;

    db.all(sql, [usuario_id], (err, ejercicios) => {
        if (err) {
            return callback(err);
        }

        callback(null, ejercicios);
    });
};

module.exports = {
    crearEjercicio,
    obtenerEjercicios
};
