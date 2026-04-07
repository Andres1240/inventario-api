const express = require("express");
const router = express.Router();

const zonaController = require("../controllers/zonaController");

router.get("/zonas", zonaController.listarZonas);

router.post("/zonas", zonaController.crearZona);

module.exports = router;