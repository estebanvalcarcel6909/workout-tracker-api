
const express = require("express");
const router = express.Router();

const {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
} = require("../controllers/usuarioController");

const verificarToken = require("../middleware/authMiddleware");

// POST - Registrar usuario
router.post("/registro", registrarUsuario);

// POST - Iniciar sesión
router.post("/login", iniciarSesion);

// GET - Obtener usuario por ID
router.get("/:id", verificarToken, obtenerUsuarioPorId);

// PUT - Actualizar usuario completo
router.put("/:id", verificarToken, actualizarUsuario);

// PATCH - Actualizar usuario parcialmente
router.patch("/:id", verificarToken, actualizarUsuarioParcial);

// DELETE - Eliminar usuario
router.delete("/:id", verificarToken, eliminarUsuario);

module.exports = router;

