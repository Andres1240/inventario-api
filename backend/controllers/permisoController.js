const permisoService = require("../services/permisoService");

const listarPermisos = async (req, res) => {

    try {

        const permisos = await permisoService.obtenerPermisos();

        res.json(permisos);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener permisos"
        });

    }

};

module.exports = {
    listarPermisos
};