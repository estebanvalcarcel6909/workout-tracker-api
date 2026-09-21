
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");
const entrenamientoRoutes = require("./routes/entrenamientoRoutes");
const progresoRoutes = require("./routes/progresoRoutes");
const informeRoutes = require("./routes/informeRoutes");
const ejercicioRoutes = require("./routes/ejercicioRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/entrenamientos", entrenamientoRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/informe", informeRoutes);
app.use("/api/ejercicios", ejercicioRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API Workout Tracker funcionando"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
