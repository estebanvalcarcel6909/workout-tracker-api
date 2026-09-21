
let progreso = [];
let siguienteId = 1;

const crearProgreso = (
    usuario_id,
    entrenamiento_id,
    peso,
    repeticiones,
    series,
    completado,
    callback
) => {

    const nuevoProgreso = {
        id: siguienteId++,
        usuario_id,
        entrenamiento_id,
        peso,
        repeticiones,
        series,
        completado
    };

    progreso.push(nuevoProgreso);

    callback(null, nuevoProgreso);
};

const obtenerProgreso = (
    usuario_id,
    callback
) => {

    const progresoUsuario = progreso.filter(
        registro => registro.usuario_id === usuario_id
    );

    progresoUsuario.sort((a, b) => b.id - a.id);

    callback(null, progresoUsuario);
};

module.exports = {
    crearProgreso,
    obtenerProgreso
};

