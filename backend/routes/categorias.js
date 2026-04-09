const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Listar categorías (usuarios autenticados)
router.get(
    "/categorias",
    verificarToken,
    categoriaController.listarCategorias
);

// Crear categoría (solo admin)
router.post(
    "/categorias",
    verificarToken,
    verificarRol([1]),
    categoriaController.crearCategoria
);

module.exports = router;