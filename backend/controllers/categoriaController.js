const categoriaService = require("../services/categoriaService");

const listarCategorias = async (req, res) => {

    try {

        const categorias = await categoriaService.obtenerCategorias();

        res.json(categorias);

    } catch (error) {

        res.status(500).json({ error: "Error al obtener categorias" });

    }

};

const crearCategoria = async (req, res) => {

    try {

        const result = await categoriaService.crearCategoria(req.body);

        res.json(result);

    } catch (error) {

        res.status(500).json({ error: "Error al crear categoria" });

    }

};

module.exports = {
    listarCategorias,
    crearCategoria
};