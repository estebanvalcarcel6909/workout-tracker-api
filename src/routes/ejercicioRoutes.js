
const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    registrarEjercicio,
    listarEjercicios
} = require("../controllers/ejercicioController");

// GET - listar ejercicios
router.get("/", verificarToken, listarEjercicios);

// POST - crear ejercicio
router.post("/", verificarToken, registrarEjercicio);

module.exports = router;
