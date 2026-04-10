import { useEffect, useState } from "react";
import { request } from "../api/api";

const Productos = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await request("/productos");
            setProductos(res);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Productos</h2>

            <ul>
                {productos.map(p => (
                    <li key={p.Co_Product}>
                        {p.Nombre_product} - Stock: {p.stock}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;