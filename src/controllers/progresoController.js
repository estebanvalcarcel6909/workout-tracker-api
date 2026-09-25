
const {
    crearProgreso,
    obtenerProgreso,
    obtenerProgresoPorId,
    actualizarProgreso,
    eliminarProgreso
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

        res.status(200).json({
            progreso
        });
    });
};

const obtenerProgresoPorIdController = (req, res) => {
    const progresoId = Number(req.params.id);

    if (!Number.isInteger(progresoId) || progresoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del progreso no es válido"
        });
    }

    const usuario_id = req.usuario.id;

    obtenerProgresoPorId(
        progresoId,
        usuario_id,
        (err, registro) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener el progreso"
                });
            }

            if (!registro) {
                return res.status(404).json({
                    mensaje: "Registro de progreso no encontrado"
                });
            }

            res.status(200).json({
                progreso: registro
            });
        }
    );
};

const editarProgreso = (req, res) => {
    const progresoId = Number(req.params.id);

    const {
        entrenamiento_id,
        peso,
        repeticiones,
        series,
        completado
    } = req.body;

    if (!Number.isInteger(progresoId) || progresoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del progreso no es válido"
        });
    }

    if (!entrenamiento_id) {
        return res.status(400).json({
            mensaje: "El entrenamiento_id es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    actualizarProgreso(
        progresoId,
        usuario_id,
        entrenamiento_id,
        peso,
        repeticiones,
        series,
        completado || 0,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al actualizar el progreso"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Registro de progreso no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Progreso actualizado correctamente"
            });
        }
    );
};

const borrarProgreso = (req, res) => {
    const progresoId = Number(req.params.id);

    if (!Number.isInteger(progresoId) || progresoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del progreso no es válido"
        });
    }

    const usuario_id = req.usuario.id;

    eliminarProgreso(
        progresoId,
        usuario_id,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al eliminar el progreso"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Registro de progreso no encontrado"
                });
            }

            res.status(204).send();
        }
    );
};

module.exports = {
    registrarProgreso,
    listarProgreso,
    obtenerProgresoPorIdController,
    editarProgreso,
    borrarProgreso
};

