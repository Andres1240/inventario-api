const express = require("express");

const validarProducto = require("../validations/productoValidation");

const router = express.Router();

const productoController = require("../controllers/productoController");

router.get("/productos", productoController.listarProductos);

router.post("/productos", productoController.crearProducto);

router.post(
    "/productos",
    validarProducto,
    productoController.crearProducto
);

router.put("/productos/:id", productoController.actualizarProducto);

router.delete("/productos/:id", productoController.eliminarProducto);

module.exports = router;