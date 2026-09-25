
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

const obtenerProgresoPorId = (
    id,
    usuario_id,
    callback
) => {

    const registro = progreso.find(
        item =>
            item.id === id &&
            item.usuario_id === usuario_id
    );

    if (!registro) {
        return callback(null, null);
    }

    callback(null, registro);
};

const actualizarProgreso = (
    id,
    usuario_id,
    entrenamiento_id,
    peso,
    repeticiones,
    series,
    completado,
    callback
) => {

    const registro = progreso.find(
        item =>
            item.id === id &&
            item.usuario_id === usuario_id
    );

    if (!registro) {
        return callback(null, 0);
    }

    registro.entrenamiento_id = entrenamiento_id;
    registro.peso = peso;
    registro.repeticiones = repeticiones;
    registro.series = series;
    registro.completado = completado;

    callback(null, 1);
};

const eliminarProgreso = (
    id,
    usuario_id,
    callback
) => {

    const indice = progreso.findIndex(
        item =>
            item.id === id &&
            item.usuario_id === usuario_id
    );

    if (indice === -1) {
        return callback(null, 0);
    }

    progreso.splice(indice, 1);

    callback(null, 1);
};

module.exports = {
    crearProgreso,
    obtenerProgreso,
    obtenerProgresoPorId,
    actualizarProgreso,
    eliminarProgreso
};
