class Usuario {

    constructor(
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        usuario,
        password,
        correo,
        permiso
    ) {

        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.usuario = usuario;
        this.password = password;
        this.correo = correo;
        this.permiso = permiso;

    }

}

module.exports = Usuario;