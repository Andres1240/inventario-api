const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obtenerUsuarios = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            u.ID_Usuario,
            u.Usu_pri_nomb,
            u.Usu_pri_apell,
            u.Usuario,
            u.Correo,
            p.Descrip_perm
        FROM Usuarios u
        JOIN Permisos p
        ON u.Permiso_Co_perm = p.Co_Perm
    `);

    return rows;

};

const crearUsuario = async (usuario) => {

    const {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        usuarioNombre,
        password,
        correo,
        permiso
    } = usuario;

    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.promise().query(`
        INSERT INTO Usuarios
        (
            Usu_pri_nomb,
            Usu_sec_nomb,
            Usu_pri_apell,
            Usu_sec_apell,
            Usuario,
            password,
            Correo,
            Permiso_Co_perm
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        usuarioNombre,
        hash,
        correo,
        permiso
    ]);

    return result;

};

const loginUsuario = async (usuario, password) => {

    const [rows] = await db.promise().query(`
        SELECT * FROM Usuarios
        WHERE Usuario = ?
    `, [usuario]);

    if (rows.length === 0) {
        throw new Error("Usuario no encontrado");
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
        {
            id: user.ID_Usuario,
            usuario: user.Usuario,
            permiso: user.Permiso_Co_perm
        },
        "clave_secreta",
        { expiresIn: "8h" }
    );

    return token;

};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    loginUsuario
};