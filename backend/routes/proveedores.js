const express = require("express");
const router = express.Router();

const proveedorController = require("../controllers/proveedorController");

router.get("/proveedores", proveedorController.listarProveedores);

router.post("/proveedores", proveedorController.crearProveedor);

module.exports = router;