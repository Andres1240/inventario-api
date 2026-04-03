const { body } = require("express-validator");

const validarProducto = [

    body("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio"),

    body("unidades")
        .isInt({ min: 0 })
        .withMessage("Las unidades deben ser un número positivo"),

    body("valor")
        .isFloat({ min: 0 })
        .withMessage("El valor del producto debe ser positivo"),

    body("min")
        .isInt({ min: 0 })
        .withMessage("La cantidad mínima debe ser positiva"),

    body("max")
        .isInt({ min: 0 })
        .withMessage("La cantidad máxima debe ser positiva"),

    body("categoria")
        .isInt()
        .withMessage("La categoría debe ser un número válido")

];

module.exports = validarProducto;