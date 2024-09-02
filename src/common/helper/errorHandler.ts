export const getErrorLogin = (error: any) => {
    let title = '';
    let desc = '';
    if (!error.response) {
        title = 'Error en el servicio';
        desc = 'No se encuentra disponible el Servicio';
    } else {
        if (error.response.status == 401) {
            title = 'Credenciales Inválidas';
            desc = 'Ha introducido incorrectamente el usuario y/o la contraseña';
        }
    }

    return { title, desc };
};
