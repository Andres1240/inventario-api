const productoService = require("../services/productoService");

const { validationResult } = require("express-validator");

const listarProductos = async (req, res) => {

    try {

        const productos = await productoService.obtenerProductos();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error obteniendo productos",
            error: error
        });

    }

};

const crearProducto = async (req, res) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }

    try {

        const resultado = await productoService.crearProducto(req.body);

        res.json({
            mensaje: "Producto creado correctamente",
            resultado
        });

    } catch (error) {

        res.status(500).json({
            error: "Error al crear producto"
        });

    }

};

module.exports = {
    listarProductos,
    crearProducto
};