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
            c.Nombre_Categ
        FROM Producto p
        JOIN Categoria c 
        ON p.Catego_Co_Categ = c.Co_Categ
    `);

    return rows;

};

const crearProducto = async (producto) => {

    const { nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock } = producto;

    const [result] = await db.promise().query(`
        INSERT INTO Producto
        (Nombre_product, unid_product, valor_unit, cant_min, cant_max, Catego_Co_Categ, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock]);

    return result;

};

const actualizarProducto = async (id, producto) => {

    const { nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock } = producto;

    const [result] = await db.promise().query(`
        UPDATE Producto
        SET 
            Nombre_product = ?,
            unid_product = ?,
            valor_unit = ?,
            cant_min = ?,
            cant_max = ?,
            Catego_Co_Categ = ?,
            stock = ?
        WHERE Co_Product = ?
    `, [nombre, unidad, valorUnitario, cantMin, cantMax, categoria, stock, id]);

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
