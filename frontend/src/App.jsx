import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {

    const [auth, setAuth] = useState(
        !!localStorage.getItem("token")
    );

    return <AppRoutes auth={auth} setAuth={setAuth} />;
}

export default App;
