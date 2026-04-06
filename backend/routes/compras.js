const express = require("express");
const router = express.Router();

const compraController = require("../controllers/compraController");

router.post("/compras", compraController.crearCompra);

router.get("/compras", compraController.listarCompras);

router.get("/compras/:id/detalle", compraController.detalleCompra);

module.exports = router;