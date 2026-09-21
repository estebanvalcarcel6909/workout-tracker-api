
const db = require("../database/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST - Registrar usuario
const registrarUsuario = (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const passwordEncriptada = bcrypt.hashSync(password, 10);

    const sql = `
        INSERT INTO usuarios (nombre, email, password)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [nombre, email, passwordEncriptada], function (err) {
        if (err) {
            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({
                    mensaje: "El correo ya está registrado"
                });
            }

            return res.status(500).json({
                mensaje: "Error al registrar el usuario"
            });
        }

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: this.lastID,
                nombre,
                email
            }
        });
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

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.get(sql, [email], (err, usuario) => {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al buscar el usuario"
            });
        }

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
            process.env.JWT_SECRET,
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
    });
};

// GET - Obtener usuario por ID
const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;

    const usuarioId = Number(id);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    const sql = `
        SELECT id, nombre, email, fecha_creacion
        FROM usuarios
        WHERE id = ?
    `;

    db.get(sql, [usuarioId], (err, usuario) => {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al consultar el usuario"
            });
        }

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            usuario
        });
    });
};

// PUT - Actualización completa del usuario
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    const usuarioId = Number(id);

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

    const passwordEncriptada = bcrypt.hashSync(password, 10);

    const sql = `
        UPDATE usuarios
        SET nombre = ?,
            email = ?,
            password = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [nombre, email, passwordEncriptada, usuarioId],
        function (err) {
            if (err) {
                if (err.message.includes("UNIQUE")) {
                    return res.status(400).json({
                        mensaje: "El correo ya está registrado"
                    });
                }

                return res.status(500).json({
                    mensaje: "Error al actualizar el usuario"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Usuario actualizado correctamente"
            });
        }
    );
};

// PATCH - Actualización parcial del usuario
const actualizarUsuarioParcial = (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    const usuarioId = Number(id);

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

    const campos = [];
    const valores = [];

    if (nombre) {
        campos.push("nombre = ?");
        valores.push(nombre);
    }

    if (email) {
        campos.push("email = ?");
        valores.push(email);
    }

    if (password) {
        const passwordEncriptada = bcrypt.hashSync(password, 10);

        campos.push("password = ?");
        valores.push(passwordEncriptada);
    }

    valores.push(usuarioId);

    const sql = `
        UPDATE usuarios
        SET ${campos.join(", ")}
        WHERE id = ?
    `;

    db.run(sql, valores, function (err) {
        if (err) {
            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({
                    mensaje: "El correo ya está registrado"
                });
            }

            return res.status(500).json({
                mensaje: "Error al actualizar el usuario"
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario actualizado parcialmente"
        });
    });
};

// DELETE - Eliminar usuario
const eliminarUsuario = (req, res) => {
    const { id } = req.params;

    const usuarioId = Number(id);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({
            mensaje: "El ID del usuario no es válido"
        });
    }

    const sql = "DELETE FROM usuarios WHERE id = ?";

    db.run(sql, [usuarioId], function (err) {
        if (err) {
            return res.status(500).json({
                mensaje: "Error al eliminar el usuario"
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(204).send();
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
};

