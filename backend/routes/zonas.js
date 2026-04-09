const express = require("express");
const router = express.Router();

const zonaController = require("../controllers/zonaController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Listar zonas (usuarios autenticados)
router.get(
    "/zonas",
    verificarToken,
    zonaController.listarZonas
);

// Crear zona (solo admin)
router.post(
    "/zonas",
    verificarToken,
    verificarRol([1]),
    zonaController.crearZona
);

module.exports = router;