const API_URL = "http://localhost:3000/api";

export const request = async (endpoint, method = "GET", data = null) => {

    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Error en la petición");
    }

    return result;
};