const obtenerProductos = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            p.Co_Product,
            p.Nombre_product,
            p.unid_product,
            p.valor_unit,
            p.cant_min,
            p.cant_max,
            p.stock,
            c.Descrip_categ,
            z.Descrip_Zona
        FROM Producto p
        LEFT JOIN Categoria c
        ON p.Catego_Co_Categ = c.Co_Categ
        LEFT JOIN Zonas z
        ON p.Zona_Co_Zona = z.Co_Zona
    `);

    return rows;
};

const db = require("../config/db");

const crearProducto = async (producto) => {

    const {
        nombre,
        unidad,
        valor_unit,
        cant_min,
        cant_max,
        categoria,
        stock,
        zona
    } = producto;

    const [result] = await db.promise().query(`
        INSERT INTO Producto
        (
            Nombre_product,
            unid_product,
            valor_unit,
            cant_min,
            cant_max,
            Catego_Co_Categ,
            stock,
            Zona_Co_Zona
        )
        VALUES (?,?,?,?,?,?,?,?)
    `,
    [
        nombre,
        unidad,
        valor_unit,
        cant_min,
        cant_max,
        categoria,
        stock,
        zona
    ]);

    return result;
};

const actualizarProducto = async (id, producto) => {

    const { nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock, zona } = producto;

    const [result] = await db.promise().query(`
        UPDATE Producto
        SET 
            Nombre_product = ?,
            unid_product = ?,
            valor_unit = ?,
            cant_min = ?,
            cant_max = ?,
            Catego_Co_Categ = ?,
            stock = ?,
            Zona_Co_Zona = ?
        WHERE Co_Product = ?
    `, [nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock, zona, id]);

    return result;

};

const eliminarProducto = async (id) => {

    const [result] = await db.promise().query(
        `DELETE FROM Producto WHERE Co_Product=?`,
        [id]
    );

    return result;

};

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
