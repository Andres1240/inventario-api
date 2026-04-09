const db = require("../config/db");

const registrarFactura = async (data) => {

    const connection = await db.promise().getConnection();

    try {

        await connection.beginTransaction();

        if (!data.productos || data.productos.length === 0) {
            throw new Error("La factura debe tener productos");
        }

        let totalFactura = 0;

        const fecha = new Date();

        // calcular total y validar
        for (const item of data.productos) {

            if (item.cantidad <= 0) {
                throw new Error("Cantidad inválida");
            }

            const [producto] = await connection.query(
                "SELECT stock, valor_unit FROM Producto WHERE Co_Product = ?",
                [item.producto]
            );

            if (producto.length === 0) {
                throw new Error(`Producto ${item.producto} no existe`);
            }

            if (producto[0].stock < item.cantidad) {
                throw new Error("Stock insuficiente");
            }

            const precio = producto[0].valor_unit;
            totalFactura += item.cantidad * precio;
        }

        // insertar factura
        const [factura] = await connection.query(
            `INSERT INTO Factura
            (Num_Factura, Cliente_Client_id, Usuario_ID, Fecha_Fact, Total)
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.numFactura,
                data.cliente,
                data.usuario,
                fecha,
                totalFactura
            ]
        );

        const facturaId = factura.insertId;

        // insertar detalle y actualizar stock
        for (const item of data.productos) {

            const [producto] = await connection.query(
                "SELECT valor_unit FROM Producto WHERE Co_Product = ?",
                [item.producto]
            );

            const precio = producto[0].valor_unit;
            const subtotal = item.cantidad * precio;

            await connection.query(
                `INSERT INTO Detalle
                (Fact_No_Fact, Product_Co_Product, Unidad, Precio, Subtotal)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    facturaId,
                    item.producto,
                    item.cantidad,
                    precio,
                    subtotal
                ]
            );

            await connection.query(
                `UPDATE Producto
                SET stock = stock - ?
                WHERE Co_Product = ?`,
                [
                    item.cantidad,
                    item.producto
                ]
            );
        }

        await connection.commit();

        return {
            facturaId,
            totalFactura
        };

    } catch (error) {

        await connection.rollback();
        throw error;

    } finally {

        connection.release();

    }
};

const obtenerFacturas = async () => {

    const [rows] = await db.promise().query(`
        SELECT 
            f.No_Fact,
            f.Num_Factura,
            f.Fecha_Fact,
            f.Total,
            c.Nombre AS Cliente,
            u.Nombre AS Usuario
        FROM Factura f
        JOIN Cliente c 
        ON f.Cliente_Client_id = c.ID_client
        JOIN Usuarios u 
        ON f.Usuario_ID = u.ID_Usuario
        ORDER BY f.Fecha_Fact DESC
    `);

    return rows;

};

const obtenerFacturaPorId = async (id) => {

    const [rows] = await db.promise().query(`
        SELECT *
        FROM Factura
        WHERE No_Fact = ?
    `, [id]);

    return rows[0];

};

const obtenerDetalleFactura = async (id) => {

    const [rows] = await db.promise().query(`
        SELECT 
            d.No_Det,
            p.Nombre_product,
            d.Unidad,
            d.Precio,
            d.Subtotal
        FROM Detalle d
        JOIN Producto p
        ON d.Product_Co_Product = p.Co_Product
        WHERE d.Fact_No_Fact = ?
    `, [id]);

    return rows;

};

module.exports = {
    registrarFactura,
    obtenerFacturas,
    obtenerFacturaPorId,
    obtenerDetalleFactura
};