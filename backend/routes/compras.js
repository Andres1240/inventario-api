const express = require("express");
const router = express.Router();

const compraController = require("../controllers/compraController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Crear compra (Admin y Bodega)
router.post(
    "/compras",
    verificarToken,
    verificarRol([1,3]),
    compraController.crearCompra
);

// Listar compras (solo Admin)
router.get(
    "/compras",
    verificarToken,
    verificarRol([1]),
    compraController.listarCompras
);

// Ver detalle de compra (solo Admin)
router.get(
    "/compras/:id/detalle",
    verificarToken,
    verificarRol([1]),
    compraController.detalleCompra
);

module.exports = router;