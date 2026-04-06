const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

router.get("/categorias", categoriaController.listarCategorias);

router.post("/categorias", categoriaController.crearCategoria);

module.exports = router;