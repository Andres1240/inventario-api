const clienteService = require("../services/clienteService");

const listarClientes = async (req, res) => {

    try {

        const clientes = await clienteService.obtenerClientes();

        res.json(clientes);

    } catch (error) {

        res.status(500).json({
            error: "Error al obtener clientes"
        });

    }

};

const crearCliente = async (req, res) => {

    try {

        const result = await clienteService.crearCliente(req.body);

        res.json({
            mensaje: "Cliente creado",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: "Error al crear cliente"
        });

    }

};

module.exports = {
    listarClientes,
    crearCliente
};