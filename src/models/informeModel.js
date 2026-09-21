
const entrenamientoModel = require("./entrenamientoModel");
const progresoModel = require("./progresoModel");

const obtenerInforme = (usuario_id, callback) => {

    entrenamientoModel.obtenerEntrenamientos(
        usuario_id,
        null,
        (err, entrenamientos) => {

            if (err) {
                return callback(err);
            }

            progresoModel.obtenerProgreso(
                usuario_id,
                (err, progreso) => {

                    if (err) {
                        return callback(err);
                    }

                    const informe = entrenamientos.map(
                        entrenamiento => {

                            const registros = progreso.filter(
                                registro =>
                                    registro.entrenamiento_id === entrenamiento.id
                            );

                            const seriesTotales = registros.reduce(
                                (total, registro) =>
                                    total + Number(registro.series || 0),
                                0
                            );

                            const repeticionesTotales = registros.reduce(
                                (total, registro) =>
                                    total + Number(registro.repeticiones || 0),
                                0
                            );

                            const pesos = registros
                                .map(registro => Number(registro.peso || 0))
                                .filter(peso => peso > 0);

                            const pesoMaximo = pesos.length > 0
                                ? Math.max(...pesos)
                                : null;

                            const entrenamientosCompletados =
                                registros.filter(
                                    registro =>
                                        registro.completado === 1 ||
                                        registro.completado === true
                                ).length;

                            return {
                                entrenamiento_id: entrenamiento.id,
                                entrenamiento: entrenamiento.nombre,
                                registros: registros.length,
                                series_totales: seriesTotales,
                                repeticiones_totales: repeticionesTotales,
                                peso_maximo: pesoMaximo,
                                entrenamientos_completados:
                                    entrenamientosCompletados
                            };
                        }
                    );

                    callback(null, informe);
                }
            );
        }
    );
};

module.exports = {
    obtenerInforme
};

