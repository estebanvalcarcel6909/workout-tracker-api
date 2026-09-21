
const db = require("../database/database");

const crearEntrenamiento = (
    usuario_id,
    nombre,
    descripcion,
    fecha,
    callback
) => {
    const sql = `
        INSERT INTO entrenamientos
        (usuario_id, nombre, descripcion, fecha)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        sql,
        [usuario_id, nombre, descripcion || null, fecha || null],
        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                id: this.lastID,
                usuario_id,
                nombre,
                descripcion,
                fecha
            });
        }
    );
};

const obtenerEntrenamientos = (
    usuario_id,
    limit,
    callback
) => {
    let sql = `
        SELECT *
        FROM entrenamientos
        WHERE usuario_id = ?
        ORDER BY id DESC
    `;

    const parametros = [usuario_id];

    if (limit !== null) {
        sql += " LIMIT ?";
        parametros.push(limit);
    }

    db.all(sql, parametros, (err, entrenamientos) => {
        if (err) {
            return callback(err);
        }

        callback(null, entrenamientos);
    });
};

const actualizarEntrenamiento = (
    id,
    usuario_id,
    nombre,
    descripcion,
    fecha,
    callback
) => {
    const sql = `
        UPDATE entrenamientos
        SET nombre = ?,
            descripcion = ?,
            fecha = ?
        WHERE id = ?
        AND usuario_id = ?
    `;

    db.run(
        sql,
        [
            nombre,
            descripcion || null,
            fecha || null,
            id,
            usuario_id
        ],
        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, this.changes);
        }
    );
};

const eliminarEntrenamiento = (
    id,
    usuario_id,
    callback
) => {
    const sql = `
        DELETE FROM entrenamientos
        WHERE id = ?
        AND usuario_id = ?
    `;

    db.run(
        sql,
        [id, usuario_id],
        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, this.changes);
        }
    );
};

module.exports = {
    crearEntrenamiento,
    obtenerEntrenamientos,
    actualizarEntrenamiento,
    eliminarEntrenamiento
};

