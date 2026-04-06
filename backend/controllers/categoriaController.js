const categoriaService = require("../services/categoriaService");

const listarCategorias = async (req, res) => {

    const categorias = await categoriaService.obtenerCategorias();

    res.json(categorias);

};

const crearCategoria = async (req, res) => {

    const resultado = await categoriaService.crearCategoria(req.body);

    res.json({
        mensaje: "Categoría creada",
        resultado
    });

};

module.exports = {
    listarCategorias,
    crearCategoria
};