
const express = require("express");

const router = express.Router();

const verificarToken = require("../../middleware/authMiddleware");

const {
    registrarEjercicio,
    listarEjercicios,
    obtenerEjercicioPorIdController,
    editarEjercicio,
    borrarEjercicio
} = require("../../controllers/ejercicioController");

// GET - listar ejercicios
router.get("/", verificarToken, listarEjercicios);

// GET - obtener ejercicio por ID
router.get("/:id", verificarToken, obtenerEjercicioPorIdController);

// POST - crear ejercicio
router.post("/", verificarToken, registrarEjercicio);

// PATCH - actualizar ejercicio
router.patch("/:id", verificarToken, editarEjercicio);

// DELETE - eliminar ejercicio
router.delete("/:id", verificarToken, borrarEjercicio);

module.exports = router;

