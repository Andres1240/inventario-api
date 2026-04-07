const db = require("../config/db");

const obtenerProveedores = async () => {

    const [rows] = await db.promise().query(`
        SELECT * FROM Proveedores
    `);

    return rows;

};

const crearProveedor = async (proveedor) => {

    const {
        nit,
        nombre,
        telefono,
        correo
    } = proveedor;

    const [result] = await db.promise().query(`
        INSERT INTO Proveedores
        (
            NIT_prov,
            Nombre_prov,
            Tell_prov,
            Email_prov
        )
        VALUES (?, ?, ?, ?)
    `,
    [
        nit,
        nombre,
        telefono,
        correo
    ]);

    return result;

};

module.exports = {
    obtenerProveedores,
    crearProveedor
};