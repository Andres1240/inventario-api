const express = require("express");
const router = express.Router();

const facturaController = require("../controllers/facturaController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Crear factura (Admin y Vendedor)
router.post(
    "/facturas",
    verificarToken,
    verificarRol([1,2]),
    facturaController.crearFactura
);

// Listar facturas (solo Admin)
router.get(
    "/facturas",
    verificarToken,
    verificarRol([1]),
    facturaController.listarFacturas
);

// Obtener una factura (solo Admin)
router.get(
    "/facturas/:id",
    verificarToken,
    verificarRol([1]),
    facturaController.obtenerFactura
);

// Detalle de factura (solo Admin)
router.get(
    "/facturas/:id/detalle",
    verificarToken,
    verificarRol([1]),
    facturaController.obtenerDetalle
);

module.exports = router;