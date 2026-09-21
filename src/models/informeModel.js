
const db = require("../database/database");

const obtenerInforme = (usuario_id, callback) => {
    const sql = `
        SELECT
            e.id AS entrenamiento_id,
            e.nombre AS entrenamiento,
            COUNT(p.id) AS registros,
            SUM(p.series) AS series_totales,
            SUM(p.repeticiones) AS repeticiones_totales,
            MAX(p.peso) AS peso_maximo,
            SUM(
                CASE
                    WHEN p.completado = 1 THEN 1
                    ELSE 0
                END
            ) AS entrenamientos_completados
        FROM entrenamientos e
        LEFT JOIN progreso p
            ON e.id = p.entrenamiento_id
        WHERE e.usuario_id = ?
        GROUP BY e.id, e.nombre
        ORDER BY e.id DESC
    `;

    db.all(sql, [usuario_id], (err, informe) => {
        if (err) {
            callback(err);
        } else {
            callback(null, informe);
        }
    });
};

module.exports = {
    obtenerInforme
};

