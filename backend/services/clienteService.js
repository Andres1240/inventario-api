const db = require("../config/db");

const obtenerClientes = async () => {

    const [rows] = await db.promise().query(`
        SELECT * FROM Cliente
    `);

    return rows;

};

const crearCliente = async (cliente) => {

    const {
        nombre,
        apellido,
        correo,
        telefono
    } = cliente;

    const [result] = await db.promise().query(`
        INSERT INTO Cliente
        (
            client_pri_nom,
            client_pri_apell,
            correo_client,
            Tell_client
        )
        VALUES (?, ?, ?, ?)
    `,
    [
        nombre,
        apellido,
        correo,
        telefono
    ]);

    return result;

};

module.exports = {
    obtenerClientes,
    crearCliente
};