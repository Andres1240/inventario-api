const bcrypt = require("bcrypt");

const generar = async () => {
    const password = "123456"; // tu contraseña
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
};

generar();