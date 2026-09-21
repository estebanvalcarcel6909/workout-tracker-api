
const {
    crearEjercicio,
    obtenerEjercicios
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

module.exports = {
    registrarEjercicio,
    listarEjercicios
};
