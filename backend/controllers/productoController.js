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


const actualizarProducto = async (req, res) => {

    try {
        const { id } = req.params;

        const resultado = await productoService.actualizarProducto(id, req.body);

        res.json({
            mensaje: "Producto actualizado correctamente",
            resultado
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar producto"
        });
    }
};


const eliminarProducto = async (req, res) => {

    try {
        const { id } = req.params;

        const resultado = await productoService.eliminarProducto(id);

        res.json({
            mensaje: "Producto eliminado correctamente",
            resultado
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar producto"
        });
    }
};

module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,   
    eliminarProducto      
};