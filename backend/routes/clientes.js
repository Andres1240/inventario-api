const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Listar clientes (Admin y Vendedor)
router.get(
    "/clientes",
    verificarToken,
    verificarRol([1,2]),
    clienteController.listarClientes
);

// Crear cliente (Admin y Vendedor)
router.post(
    "/clientes",
    verificarToken,
    verificarRol([1,2]),
    clienteController.crearCliente
);

module.exports = router;