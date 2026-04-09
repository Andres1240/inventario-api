const express = require("express");
const router = express.Router();

const permisoController = require("../controllers/permisoController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

// Ver permisos (solo admin)
router.get(
    "/permisos",
    verificarToken,
    verificarRol([1]),
    permisoController.listarPermisos
);

module.exports = router;