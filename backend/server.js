const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const productoRoutes = require("./routes/productos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productoRoutes);

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