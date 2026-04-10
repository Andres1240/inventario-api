import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";

const AppRoutes = ({ auth, setAuth }) => {

    return (
        <BrowserRouter>
            <Routes>

                {!auth ? (
                    <Route path="*" element={<Login setAuth={setAuth} />} />
                ) : (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/productos" element={<Productos />} />
                    </>
                )}

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;