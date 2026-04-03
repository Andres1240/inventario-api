class Producto {

    constructor(id, nombre, unidades, valor, min, max, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.unidades = unidades;
        this.valor = valor;
        this.min = min;
        this.max = max;
        this.categoria = categoria;
    }

}

module.exports = Producto;