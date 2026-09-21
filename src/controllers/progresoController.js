
const {
    crearProgreso,
    obtenerProgreso
} = require("../models/progresoModel");

const registrarProgreso = (req, res) => {
    const {
        entrenamiento_id,
        peso,
        repeticiones,
        series,
        completado
    } = req.body;

    if (!entrenamiento_id) {
        return res.status(400).json({
            mensaje: "El entrenamiento_id es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    crearProgreso(
        usuario_id,
        entrenamiento_id,
        peso,
        repeticiones,
        series,
        completado || 0,
        (err, progreso) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al registrar el progreso"
                });
            }

            res.status(201).json({
                mensaje: "Progreso registrado correctamente",
                progreso
            });
        }
    );
};

const listarProgreso = (req, res) => {
    const usuario_id = req.usuario.id;

    obtenerProgreso(usuario_id, (err, progreso) => {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener el progreso"
            });
        }

        res.json({
            progreso
        });
    });
};

module.exports = {
    registrarProgreso,
    listarProgreso
};

