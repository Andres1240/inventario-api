const facturaService = require("../services/facturaService");


const crearFactura = async (req, res) => {

    try {

        const resultado = await facturaService.registrarFactura(req.body);

        res.json({
            mensaje: "Factura registrada correctamente",
            factura: resultado
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

const listarFacturas = async (req, res) => {

    try {

        const facturas = await facturaService.obtenerFacturas();

        res.json(facturas);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener facturas"
        });

    }

};

module.exports = {
    crearFactura,
    listarFacturas
};