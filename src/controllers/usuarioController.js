
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let usuarios = [];
let siguienteId = 1;

// POST - Registrar usuario
const registrarUsuario = (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const usuarioExistente = usuarios.find(
        usuario => usuario.email === email
    );

    if (usuarioExistente) {
        return res.status(400).json({
            mensaje: "El correo ya está registrado"
        });
    }

    const passwordEncriptada = bcrypt.hashSync(password, 10);

    const nuevoUsuario = {
        id: siguienteId++,
        nombre,
        email,
        password: passwordEncriptada,
        fecha_creacion: new Date().toISOString()
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email
        }
    });
};

// POST - Iniciar sesión
const iniciarSesion = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            mensaje: "El email y la contraseña son obligatorios"
        });
    }

    const usuario = usuarios.find(
        usuario => usuario.email === email
    );

    if (!usuario) {
        return res.status(401).json({
            mensaje: "Email o contraseña incorrectos"
        });
    }

    const contraseñaCorrecta = bcrypt.compareSync(
        password,
        usuario.password
    );

    if (!contraseñaCorrecta) {
        return res.status(401).json({
            mensaje: "Email o contraseña incorrectos"
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET || "secreto_temporal",
        {
            expiresIn: "2h"
        }
    );

    res.status(200).json({
        mensaje: "Inicio de sesión correcto",
        token: token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    });
};

// GET - Obtener usuario por ID
const obtenerUsuarioPorId = (req, res) => {
    const usuarioId = Number(req.params.id);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    const usuario = usuarios.find(
        usuario => usuario.id === usuarioId
    );

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.status(200).json({
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            fecha_creacion: usuario.fecha_creacion
        }
    });
};

// PUT - Actualización completa
const actualizarUsuario = (req, res) => {
    const usuarioId = Number(req.params.id);
    const { nombre, email, password } = req.body;

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: "Para PUT debes enviar nombre, email y password"
        });
    }

    const usuario = usuarios.find(
        usuario => usuario.id === usuarioId
    );

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    const emailExistente = usuarios.find(
        usuario => usuario.email === email && usuario.id !== usuarioId
    );

    if (emailExistente) {
        return res.status(400).json({
            mensaje: "El correo ya está registrado"
        });
    }

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = bcrypt.hashSync(password, 10);

    res.status(200).json({
        mensaje: "Usuario actualizado correctamente"
    });
};

// PATCH - Actualización parcial
const actualizarUsuarioParcial = (req, res) => {
    const usuarioId = Number(req.params.id);
    const { nombre, email, password } = req.body;

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    if (!nombre && !email && !password) {
        return res.status(400).json({
            mensaje: "Debes enviar al menos un campo para actualizar"
        });
    }

    const usuario = usuarios.find(
        usuario => usuario.id === usuarioId
    );

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    if (nombre) {
        usuario.nombre = nombre;
    }

    if (email) {
        const emailExistente = usuarios.find(
            usuario => usuario.email === email && usuario.id !== usuarioId
        );

        if (emailExistente) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        usuario.email = email;
    }

    if (password) {
        usuario.password = bcrypt.hashSync(password, 10);
    }

    res.status(200).json({
        mensaje: "Usuario actualizado parcialmente"
    });
};

// DELETE - Eliminar usuario
const eliminarUsuario = (req, res) => {
    const usuarioId = Number(req.params.id);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    const indice = usuarios.findIndex(
        usuario => usuario.id === usuarioId
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    usuarios.splice(indice, 1);

    res.status(204).send();
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
};

