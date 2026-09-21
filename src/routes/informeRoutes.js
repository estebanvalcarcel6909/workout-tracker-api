
const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    generarInforme
} = require("../controllers/informeController");

router.get("/", verificarToken, generarInforme);

module.exports = router;

