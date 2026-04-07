const zonaService = require("../services/zonaService");

const listarZonas = async (req, res) => {

    try {

        const zonas = await zonaService.obtenerZonas();

        res.json(zonas);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener zonas"
        });

    }

};

const crearZona = async (req, res) => {

    try {

        const result = await zonaService.crearZona(req.body);

        res.json({
            mensaje: "Zona creada",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: "Error al crear zona"
        });

    }

};

module.exports = {
    listarZonas,
    crearZona
};