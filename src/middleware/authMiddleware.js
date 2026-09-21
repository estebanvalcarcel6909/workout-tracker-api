
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    // Leer la cabecera Authorization usando req.get()
    const authorization = req.get("Authorization");

    // Leer la cabecera Content-Type usando req.get()
    const contentType = req.get("Content-Type");

    console.log("Authorization:", authorization);
    console.log("Content-Type:", contentType);

    if (!authorization) {
        return res.status(401).json({
            mensaje: "Token no proporcionado"
        });
    }

    // Comprobar formato: Bearer TOKEN
    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            mensaje: "Formato de autorización inválido"
        });
    }

    const token = partes[1];

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        // Cabecera personalizada solicitada por la actividad
        res.set("X-API-Key", "Workout-Tracker-API");

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
};

module.exports = verificarToken;
