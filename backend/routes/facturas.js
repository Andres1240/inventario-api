const express = require("express");
const router = express.Router();

const facturaController = require("../controllers/facturaController");

router.post("/facturas", facturaController.crearFactura);

router.get("/facturas", facturaController.listarFacturas);

router.get("/facturas/:id", facturaController.obtenerFactura);

router.get("/facturas/:id/detalle", facturaController.obtenerDetalle);

module.exports = router;