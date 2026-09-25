
const express = require("express");

const router = express.Router();

const verificarToken = require("../../middleware/authMiddleware");

const {
    registrarEntrenamiento,
    listarEntrenamientos,
    obtenerEntrenamientoPorId,
    editarEntrenamiento,
    borrarEntrenamiento
} = require("../../controllers/entrenamientoController");

// GET - listar todos los entrenamientos
router.get("/", verificarToken, listarEntrenamientos);

// GET - obtener un entrenamiento por ID
router.get("/:id", verificarToken, obtenerEntrenamientoPorId);

// POST - crear entrenamiento
router.post("/", verificarToken, registrarEntrenamiento);

// PATCH - actualizar entrenamiento
router.patch("/:id", verificarToken, editarEntrenamiento);

// DELETE - eliminar entrenamiento
router.delete("/:id", verificarToken, borrarEntrenamiento);

module.exports = router;
