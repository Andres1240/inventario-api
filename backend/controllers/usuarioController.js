const usuarioService = require("../services/usuarioService");

const listarUsuarios = async (req, res) => {

    try {

        const usuarios = await usuarioService.obtenerUsuarios();

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener usuarios"
        });

    }

};

const crearUsuario = async (req, res) => {

    try {

        const result = await usuarioService.crearUsuario(req.body);

        res.json({
            mensaje: "Usuario creado correctamente",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: "Error al crear usuario"
        });

    }

};

const login = async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const data = await usuarioService.loginUsuario(usuario, password);

        res.json({
            mensaje: "Login exitoso",
            token: data.token,
            usuario: data.usuario
        });

    } catch (error) {

        res.status(401).json({
            error: error.message
        });

    }

};

module.exports = {
    listarUsuarios,
    crearUsuario,
    login
};