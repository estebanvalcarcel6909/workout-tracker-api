
const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    registrarProgreso,
    listarProgreso
} = require("../controllers/progresoController");

router.post("/", verificarToken, registrarProgreso);

router.get("/", verificarToken, listarProgreso);

module.exports = router;

