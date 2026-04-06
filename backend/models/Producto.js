class Producto {

    constructor(id, nombre, unidades, valor, min, max, categoria, stock) {
        this.id = id;
        this.nombre = nombre;
        this.unidades = unidades;
        this.valor = valor;
        this.min = min;
        this.max = max;
        this.categoria = categoria;
        this.stock = stock;
    }

}

module.exports = Producto;