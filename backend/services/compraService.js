const db = require("../config/db");

const registrarCompra = async (compra) => {

    const connection = await db.promise().getConnection();

    try {

        await connection.beginTransaction();

        const { proveedor, usuario, fecha, productos } = compra;

        let total = 0;

        productos.forEach(p => {
            total += p.cantidad * p.precio;
        });

        const [resultCompra] = await connection.query(`
            INSERT INTO Compra (fecha_compra, Proveedor_Co_Prov, Usuario_ID, total_compra)
            VALUES (?, ?, ?, ?)
        `, [fecha, proveedor, usuario, total]);

        const idCompra = resultCompra.insertId;

        for (const producto of productos) {

            const subtotal = producto.cantidad * producto.precio;

            await connection.query(`
                INSERT INTO DetalleCompra
                (Compra_Co_Compra, Producto_Co_Product, cantidad, precio_compra, subtotal)
                VALUES (?, ?, ?, ?, ?)
            `, [
                idCompra,
                producto.idProducto,
                producto.cantidad,
                producto.precio,
                subtotal
            ]);

            await connection.query(`
                UPDATE Producto
                SET stock = stock + ?
                WHERE Co_Product = ?
            `, [producto.cantidad, producto.idProducto]);

        }

        await connection.commit();

        return {
            mensaje: "Compra registrada correctamente",
            compraId: idCompra
        };

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();

    }

};

const obtenerCompras = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            c.Co_Compra,
            c.fecha_compra,
            c.total_compra,
            p.Nombre_prov,
            u.Nombre
        FROM Compra c
        JOIN Proveedores p 
        ON c.Proveedor_Co_Prov = p.ID_prov
        JOIN Usuarios u 
        ON c.Usuario_ID = u.ID_Usuario
        ORDER BY c.fecha_compra DESC
    `);

    return rows;

};

const obtenerDetalleCompra = async (id) => {

    const [rows] = await db.promise().query(`
        SELECT 
            d.Co_Detalle,
            pr.Nombre_product,
            d.cantidad,
            d.precio_compra,
            d.subtotal
        FROM DetalleCompra d
        JOIN Producto pr
        ON d.Producto_Co_Product = pr.Co_Product
        WHERE d.Compra_Co_Compra = ?
    `, [id]);

    return rows;

};

module.exports = {
    registrarCompra,
    obtenerCompras,
    obtenerDetalleCompra
};