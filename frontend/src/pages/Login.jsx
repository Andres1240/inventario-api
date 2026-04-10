import { useState } from "react";
import { request } from "../api/api";

const Login = ({ setAuth }) => {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            const res = await request("/login", "POST", {
                usuario,
                password
            });

            localStorage.setItem("token", res.token);
            setAuth(true);

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Usuario"
                onChange={(e) => setUsuario(e.target.value)}
            />

            <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Ingresar
            </button>
        </div>
    );
};

export default Login;