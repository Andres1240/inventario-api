class Factura {

    constructor(numFactura, cliente, usuario, fecha, total) {

        this.numFactura = numFactura;
        this.cliente = cliente;
        this.usuario = usuario;
        this.fecha = fecha;
        this.total = total;

    }

}

module.exports = Factura;