
const express = require("express");

const router = express.Router();

const verificarToken = require("../../middleware/authMiddleware");

const {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
} = require("../../controllers/usuarioController");

// POST - registrar usuario
router.post("/registro", registrarUsuario);

// POST - iniciar sesión
router.post("/login", iniciarSesion);

// GET - obtener usuario por ID
router.get("/:id", verificarToken, obtenerUsuarioPorId);

// PUT - actualizar usuario completo
router.put("/:id", verificarToken, actualizarUsuario);

// PATCH - actualizar usuario parcialmente
router.patch("/:id", verificarToken, actualizarUsuarioParcial);

// DELETE - eliminar usuario
router.delete("/:id", verificarToken, eliminarUsuario);

module.exports = router;

