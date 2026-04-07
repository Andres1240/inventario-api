const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");

const validarProducto = require("../validations/productoValidation");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

router.get(
    "/productos",
    verificarToken,
    productoController.listarProductos
);

router.post(
    "/productos",
    verificarToken,
    verificarRol([1]),
    validarProducto,
    productoController.crearProducto
);

router.put(
    "/productos/:id",
    verificarToken,
    verificarRol([1]),
    validarProducto,
    productoController.actualizarProducto
);

router.delete(
    "/productos/:id",
    verificarToken,
    verificarRol([1]),
    productoController.eliminarProducto
);

module.exports = router;