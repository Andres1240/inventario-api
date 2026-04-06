const verificarRol = (rolesPermitidos) => {

    return (req, res, next) => {

        const rolUsuario = req.usuario.permiso;

        if (!rolesPermitidos.includes(rolUsuario)) {

            return res.status(403).json({
                error: "No tiene permiso para esta acción"
            });

        }

        next();

    };

};

module.exports = verificarRol;