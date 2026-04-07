const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const productoRoutes = require("./routes/productos");
const categoriaRoutes = require("./routes/categorias");
const facturaRoutes = require("./routes/facturas");
const permisosRoutes = require("./routes/permisos");
const usuarioRoutes = require("./routes/usuarios");
const clienteRoutes = require("./routes/clientes");
const proveedorRoutes = require("./routes/proveedores");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productoRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", facturaRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", permisosRoutes);
app.use("/api", clienteRoutes);
app.use("/api", proveedorRoutes);


app.get("/", (req, res) => {
    res.send("API de Inventario funcionando");
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
    } else {
        console.log("Conectado a MySQL");
        connection.release();
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});