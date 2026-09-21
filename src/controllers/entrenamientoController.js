
const {
    crearEntrenamiento,
    obtenerEntrenamientos,
    actualizarEntrenamiento,
    eliminarEntrenamiento
} = require("../models/entrenamientoModel");

const registrarEntrenamiento = (req, res) => {
    const { nombre, descripcion, fecha } = req.body;

    if (!nombre) {
        return res.status(400).json({
            mensaje: "El nombre del entrenamiento es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    crearEntrenamiento(
        usuario_id,
        nombre,
        descripcion,
        fecha,
        (err, entrenamiento) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al crear el entrenamiento"
                });
            }

            res.status(201).json({
                mensaje: "Entrenamiento creado correctamente",
                entrenamiento
            });
        }
    );
};

const listarEntrenamientos = (req, res) => {
    const usuario_id = req.usuario.id;
    const { limit } = req.query;

    if (limit !== undefined) {
        const limite = Number(limit);

        if (!Number.isInteger(limite) || limite <= 0) {
            return res.status(400).json({
                mensaje: "El parámetro limit debe ser un número entero mayor que 0"
            });
        }

        obtenerEntrenamientos(
            usuario_id,
            limite,
            (err, entrenamientos) => {
                if (err) {
                    return res.status(500).json({
                        mensaje: "Error al obtener los entrenamientos"
                    });
                }

                return res.status(200).json({
                    entrenamientos
                });
            }
        );

        return;
    }

    obtenerEntrenamientos(
        usuario_id,
        null,
        (err, entrenamientos) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener los entrenamientos"
                });
            }

            res.status(200).json({
                entrenamientos
            });
        }
    );
};

const obtenerEntrenamientoPorId = (req, res) => {
    const { id } = req.params;

    const usuario_id = req.usuario.id;

    const entrenamientoId = Number(id);

    if (!Number.isInteger(entrenamientoId) || entrenamientoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del entrenamiento no es válido"
        });
    }

    obtenerEntrenamientos(
        usuario_id,
        null,
        (err, entrenamientos) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener el entrenamiento"
                });
            }

            const entrenamiento = entrenamientos.find(
                item => item.id === entrenamientoId
            );

            if (!entrenamiento) {
                return res.status(404).json({
                    mensaje: "Entrenamiento no encontrado"
                });
            }

            res.status(200).json({
                entrenamiento
            });
        }
    );
};

const editarEntrenamiento = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha } = req.body;

    const entrenamientoId = Number(id);

    if (!Number.isInteger(entrenamientoId) || entrenamientoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del entrenamiento no es válido"
        });
    }

    if (!nombre) {
        return res.status(400).json({
            mensaje: "El nombre del entrenamiento es obligatorio"
        });
    }

    const usuario_id = req.usuario.id;

    actualizarEntrenamiento(
        entrenamientoId,
        usuario_id,
        nombre,
        descripcion,
        fecha,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al actualizar el entrenamiento"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Entrenamiento no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Entrenamiento actualizado correctamente"
            });
        }
    );
};

const borrarEntrenamiento = (req, res) => {
    const { id } = req.params;

    const entrenamientoId = Number(id);

    if (!Number.isInteger(entrenamientoId) || entrenamientoId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del entrenamiento no es válido"
        });
    }

    const usuario_id = req.usuario.id;

    eliminarEntrenamiento(
        entrenamientoId,
        usuario_id,
        (err, cambios) => {
            if (err) {
                return res.status(500).json({
                    mensaje: "Error al eliminar el entrenamiento"
                });
            }

            if (cambios === 0) {
                return res.status(404).json({
                    mensaje: "Entrenamiento no encontrado"
                });
            }

            res.status(204).send();
        }
    );
};

module.exports = {
    registrarEntrenamiento,
    listarEntrenamientos,
    obtenerEntrenamientoPorId,
    editarEntrenamiento,
    borrarEntrenamiento
};

