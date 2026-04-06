const db = require("../config/db");

const obtenerPermisos = async () => {

    const [rows] = await db.promise().query(`
        SELECT *
        FROM Permisos
    `);

    return rows;

};

module.exports = {
    obtenerPermisos
};