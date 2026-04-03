const obtenerProductos = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            p.Co_Product,
            p.Nombre_product,
            p.unid_product,
            p.valor_unit,
            c.Descrip_Cat
        FROM Producto p
        JOIN Categoria c
        ON p.Catego_Co_Categ = c.Co_Categ
    `);

    return rows;

};

const crearProducto = async (producto) => {

    const [result] = await db.promise().query(
        `INSERT INTO Producto
        (Nombre_product, unid_product, valor_unit, cant_min, cant_max, Catego_Co_Categ)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            producto.nombre,
            producto.unidades,
            producto.valor,
            producto.min,
            producto.max,
            producto.categoria
        ]
    );

    return result;

};

const actualizarProducto = async (id, producto) => {

    const [result] = await db.promise().query(
        `UPDATE Producto
        SET Nombre_product=?, unid_product=?, valor_unit=?, cant_min=?, cant_max=?, Catego_Co_Categ=?
        WHERE Co_Product=?`,
        [
            producto.nombre,
            producto.unidades,
            producto.valor,
            producto.min,
            producto.max,
            producto.categoria,
            id
        ]
    );

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
