const db = require("../config/db");

const obtenerCategorias = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            Co_Categ,
            Descrip_Cat
        FROM Categoria
    `);

    return rows;

};

const crearCategoria = async (categoria) => {

    const { descripcion } = categoria;

    const [result] = await db.promise().query(`
        INSERT INTO Categoria (Descrip_Cat)
        VALUES (?)
    `, [descripcion]);

    return result;

};

const actualizarCategoria = async (id, categoria) => {

    const { descripcion } = categoria;

    const [result] = await db.promise().query(`
        UPDATE Categoria
        SET Descrip_Cat = ?
        WHERE Co_Categ = ?
    `, [descripcion, id]);

    return result;

};

const eliminarCategoria = async (id) => {

    const [result] = await db.promise().query(`
        DELETE FROM Categoria
        WHERE Co_Categ = ?
    `, [id]);

    return result;

};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};