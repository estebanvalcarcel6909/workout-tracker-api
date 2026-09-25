
const {
    crearEjercicio,
    obtenerEjercicios,
    obtenerEjercicioPorId,
    actualizarEjercicio,
    eliminarEjercicio
} = require("../models/ejercicioModel");

const registrarEjercicio = (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({
            mensaje: "El nombre del ejercicio es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    crearEjercicio(
        usuario_id,
        nombre,
        descripcion,
        (err, ejercicio) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al crear el ejercicio"
                });
            }

            res.status(201).json({
                mensaje: "Ejercicio creado correctamente",
                ejercicio
            });
        }
    );
};

const listarEjercicios = (req, res) => {
    const usuario_id = req.usuario.id;

    obtenerEjercicios(
        usuario_id,
        (err, ejercicios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener los ejercicios"
                });
            }

            res.status(200).json({
                ejercicios
            });
        }
    );
};

const obtenerEjercicioPorIdController = (req, res) => {
    const ejercicioId = Number(req.params.id);

    if (!Number.isInteger(ejercicioId) || ejercicioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del ejercicio no es válido"
        });
    }

    const usuario_id = req.usuario.id;

    obtenerEjercicioPorId(
        ejercicioId,
        usuario_id,
        (err, ejercicio) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener el ejercicio"
                });
            }

            if (!ejercicio) {
                return res.status(404).json({
                    mensaje: "Ejercicio no encontrado"
                });
            }

            res.status(200).json({
                ejercicio
            });
        }
    );
};

const editarEjercicio = (req, res) => {
    const ejercicioId = Number(req.params.id);
    const { nombre, descripcion } = req.body;

    if (!Number.isInteger(ejercicioId) || ejercicioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del ejercicio no es válido"
        });
    }

    if (!nombre) {
        return res.status(400).json({
            mensaje: "El nombre del ejercicio es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    actualizarEjercicio(
        ejercicioId,
        usuario_id,
        nombre,
        descripcion,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al actualizar el ejercicio"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Ejercicio no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Ejercicio actualizado correctamente"
            });
        }
    );
};

const borrarEjercicio = (req, res) => {
    const ejercicioId = Number(req.params.id);

    if (!Number.isInteger(ejercicioId) || ejercicioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del ejercicio no es válido"
        });
    }

    const usuario_id = req.usuario.id;

    eliminarEjercicio(
        ejercicioId,
        usuario_id,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al eliminar el ejercicio"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Ejercicio no encontrado"
                });
            }

            res.status(204).send();
        }
    );
};

module.exports = {
    registrarEjercicio,
    listarEjercicios,
    obtenerEjercicioPorIdController,
    editarEjercicio,
    borrarEjercicio
};
