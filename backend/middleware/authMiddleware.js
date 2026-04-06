const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            error: "Token requerido"
        });
    }

    try {

        const decoded = jwt.verify(token, "clave_secreta");

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            error: "Token inválido"
        });

    }

};

module.exports = verificarToken;