
let entrenamientos = [];
let siguienteId = 1;

const crearEntrenamiento = (
    usuario_id,
    nombre,
    descripcion,
    fecha,
    callback
) => {

    const nuevoEntrenamiento = {
        id: siguienteId++,
        usuario_id,
        nombre,
        descripcion: descripcion || null,
        fecha: fecha || null
    };

    entrenamientos.push(nuevoEntrenamiento);

    callback(null, nuevoEntrenamiento);
};

const obtenerEntrenamientos = (
    usuario_id,
    limit,
    callback
) => {

    let resultado = entrenamientos.filter(
        entrenamiento => entrenamiento.usuario_id === usuario_id
    );

    resultado.sort((a, b) => b.id - a.id);

    if (limit !== null) {
        resultado = resultado.slice(0, limit);
    }

    callback(null, resultado);
};

const actualizarEntrenamiento = (
    id,
    usuario_id,
    nombre,
    descripcion,
    fecha,
    callback
) => {

    const entrenamiento = entrenamientos.find(
        entrenamiento =>
            entrenamiento.id === id &&
            entrenamiento.usuario_id === usuario_id
    );

    if (!entrenamiento) {
        return callback(null, 0);
    }

    entrenamiento.nombre = nombre;
    entrenamiento.descripcion = descripcion || null;
    entrenamiento.fecha = fecha || null;

    callback(null, 1);
};

const eliminarEntrenamiento = (
    id,
    usuario_id,
    callback
) => {

    const indice = entrenamientos.findIndex(
        entrenamiento =>
            entrenamiento.id === id &&
            entrenamiento.usuario_id === usuario_id
    );

    if (indice === -1) {
        return callback(null, 0);
    }

    entrenamientos.splice(indice, 1);

    callback(null, 1);
};

module.exports = {
    crearEntrenamiento,
    obtenerEntrenamientos,
    actualizarEntrenamiento,
    eliminarEntrenamiento
};
