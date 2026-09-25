
const express = require("express");

const router = express.Router();

const verificarToken = require("../../middleware/authMiddleware");

const {
    registrarProgreso,
    listarProgreso,
    obtenerProgresoPorIdController,
    editarProgreso,
    borrarProgreso
} = require("../../controllers/progresoController");

// POST - registrar progreso
router.post("/", verificarToken, registrarProgreso);

// GET - listar progreso
router.get("/", verificarToken, listarProgreso);

// GET - obtener progreso por ID
router.get("/:id", verificarToken, obtenerProgresoPorIdController);

// PATCH - actualizar progreso
router.patch("/:id", verificarToken, editarProgreso);

// DELETE - eliminar progreso
router.delete("/:id", verificarToken, borrarProgreso);

module.exports = router;

