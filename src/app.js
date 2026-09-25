
const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");

const usuarioRoutes = require("./routes/v1/usuarioRoutes");
const entrenamientoRoutes = require("./routes/v1/entrenamientoRoutes");
const progresoRoutes = require("./routes/v1/progresoRoutes");
const informeRoutes = require("./routes/v1/informeRoutes");
const ejercicioRoutes = require("./routes/v1/ejercicioRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/usuarios", usuarioRoutes);
app.use("/api/v1/entrenamientos", entrenamientoRoutes);
app.use("/api/v1/progreso", progresoRoutes);
app.use("/api/v1/informe", informeRoutes);
app.use("/api/v1/ejercicios", ejercicioRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API Workout Tracker funcionando"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

