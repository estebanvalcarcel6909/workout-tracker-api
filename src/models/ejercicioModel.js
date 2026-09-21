
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

module.exports = {
    crearEjercicio,
    obtenerEjercicios
};
