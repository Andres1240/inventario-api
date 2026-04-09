const compraService = require("../services/compraService");


const crearCompra = async (req, res) => {

    try {

        const result = await compraService.registrarCompra(req.body);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: "Error al registrar compra"
        });

    }

};

const listarCompras = async (req, res) => {

    try {

        const compras = await compraService.obtenerCompras();

        res.json(compras);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener compras"
        });

    }

};

const detalleCompra = async (req, res) => {

    try {

        const detalle = await compraService.obtenerDetalleCompra(req.params.id);

        res.json(detalle);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener detalle"
        });

    }

};

module.exports = {
    crearCompra,
    listarCompras,
    detalleCompra
};