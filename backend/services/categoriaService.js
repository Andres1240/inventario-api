const db = require("../config/db");

const obtenerCategorias = async () => {

    const [rows] = await db.promise().query(
        "SELECT * FROM Categoria"
    );

    return rows;

};

const crearCategoria = async (categoria) => {

    const [result] = await db.promise().query(
        "INSERT INTO Categoria (Descrip_Cat) VALUES (?)",
        [categoria.descripcion]
    );

    return result;

};

const eliminarCategoria = async (id) => {

    const [result] = await db.promise().query(
        "DELETE FROM Categoria WHERE Co_Categ = ?",
        [id]
    );

    return result;

};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    eliminarCategoria
};