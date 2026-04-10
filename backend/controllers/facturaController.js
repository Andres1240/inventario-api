const facturaService = require("../services/facturaService");

// Crear factura
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

// Listar facturas
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


const obtenerFactura = async (req, res) => {
    try {
        const { id } = req.params;

        const factura = await facturaService.obtenerFacturaPorId(id);

        res.json(factura);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener factura"
        });
    }
};


const obtenerDetalle = async (req, res) => {
    try {
        const { id } = req.params;

        const detalle = await facturaService.obtenerDetalleFactura(id);

        res.json(detalle);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener detalle"
        });
    }
};

module.exports = {
    crearFactura,
    listarFacturas,
    obtenerFactura,   
    obtenerDetalle    
};