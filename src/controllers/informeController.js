
const {
    obtenerInforme
} = require("../models/informeModel");

const generarInforme = (req, res) => {
    const usuario_id = req.usuario.id;

    obtenerInforme(usuario_id, (err, informe) => {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al generar el informe"
            });
        }

        res.json({
            mensaje: "Informe generado correctamente",
            informe
        });
    });
};

module.exports = {
    generarInforme
};

