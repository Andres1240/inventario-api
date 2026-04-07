const db = require("../config/db");

const obtenerZonas = async () => {

    const [rows] = await db.promise().query(`
        SELECT * FROM Zonas
    `);

    return rows;

};

const crearZona = async (zona) => {

    const { descripcion } = zona;

    const [result] = await db.promise().query(`
        INSERT INTO Zonas
        (
            Descrip_Zona
        )
        VALUES (?)
    `,
    [
        descripcion
    ]);

    return result;

};

module.exports = {
    obtenerZonas,
    crearZona
};