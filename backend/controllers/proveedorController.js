const proveedorService = require("../services/proveedorService");

const listarProveedores = async (req, res) => {

    try {

        const proveedores = await proveedorService.obtenerProveedores();

        res.json(proveedores);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener proveedores"
        });

    }

};

const crearProveedor = async (req, res) => {

    try {

        const result = await proveedorService.crearProveedor(req.body);

        res.json({
            mensaje: "Proveedor creado",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: "Error al crear proveedor"
        });

    }

};

module.exports = {
    listarProveedores,
    crearProveedor
};