
let ejercicios = [];
let siguienteId = 1;

const crearEjercicio = (
    usuario_id,
    nombre,
    descripcion,
    callback
) => {
    const nuevoEjercicio = {
        id: siguienteId++,
        usuario_id,
        nombre,
        descripcion: descripcion || null
    };

    ejercicios.push(nuevoEjercicio);

    callback(null, nuevoEjercicio);
};

const obtenerEjercicios = (
    usuario_id,
    callback
) => {
    const ejerciciosUsuario = ejercicios.filter(
        ejercicio => ejercicio.usuario_id === usuario_id
    );

    ejerciciosUsuario.sort((a, b) => b.id - a.id);

    callback(null, ejerciciosUsuario);
};

const obtenerEjercicioPorId = (
    id,
    usuario_id,
    callback
) => {
    const ejercicio = ejercicios.find(
        ejercicio =>
            ejercicio.id === id &&
            ejercicio.usuario_id === usuario_id
    );

    if (!ejercicio) {
        return callback(null, null);
    }

    callback(null, ejercicio);
};

const actualizarEjercicio = (
    id,
    usuario_id,
    nombre,
    descripcion,
    callback
) => {
    const ejercicio = ejercicios.find(
        ejercicio =>
            ejercicio.id === id &&
            ejercicio.usuario_id === usuario_id
    );

    if (!ejercicio) {
        return callback(null, 0);
    }

    ejercicio.nombre = nombre;
    ejercicio.descripcion = descripcion || null;

    callback(null, 1);
};

const eliminarEjercicio = (
    id,
    usuario_id,
    callback
) => {
    const indice = ejercicios.findIndex(
        ejercicio =>
            ejercicio.id === id &&
            ejercicio.usuario_id === usuario_id
    );

    if (indice === -1) {
        return callback(null, 0);
    }

    ejercicios.splice(indice, 1);

    callback(null, 1);
};

module.exports = {
    crearEjercicio,
    obtenerEjercicios,
    obtenerEjercicioPorId,
    actualizarEjercicio,
    eliminarEjercicio
};

