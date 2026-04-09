const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/rolMiddleware");

router.post("/login", usuarioController.login);

router.get(
    "/usuarios",
    verificarToken,
    verificarRol([1]), // solo administrador
    usuarioController.listarUsuarios
);

router.post(
    "/usuarios",
    verificarToken,
    verificarRol([1]),
    usuarioController.crearUsuario
);

router.get(
    "/me",
    verificarToken,
    (req, res) => {
        res.json(req.usuario);
    }
);

module.exports = router;