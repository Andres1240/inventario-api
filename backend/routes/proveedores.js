const express = require("express");
const router = express.Router();

const proveedorController = require("../controllers/proveedorController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Listar proveedores (solo Admin)
router.get(
    "/proveedores",
    verificarToken,
    verificarRol([1]),
    proveedorController.listarProveedores
);

// Crear proveedor (solo Admin)
router.post(
    "/proveedores",
    verificarToken,
    verificarRol([1]),
    proveedorController.crearProveedor
);

module.exports = router;