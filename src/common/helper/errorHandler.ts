export const getError = (error: any) => {
    let title = '';
    let desc = '';
    if (!error.response) {
        title = 'HAY un problema con la API';
        desc = 'No se encuentra disponible la API';
    } else {
        console.error('Data', error.response.data);
        if (error.response.status == 401) {
            title = 'Credenciales Inválidas';
            desc = 'Ha introducido incorrectamente el usuario y/o la contraseña';
        }
    }

    return { title, desc };
};
