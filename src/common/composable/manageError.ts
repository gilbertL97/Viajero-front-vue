import Swal from 'sweetalert2';
import { deleteMessage, repeatMessage } from '../utils/validationMessages';
export default () => {
    const alertInactive = (message1: string, message2?: string) => {
        Swal.fire({
            title: 'Error',
            text: repeatMessage(message1, message2),
            timer: 10000,
        });
    };
    const alertUndelete = (message1: string, message2: string) => {
        Swal.fire({
            title: 'Inactivo',
            text: deleteMessage(message1, message2),
            timer: 10000,
        });
    };
    const alertForbidden = () => {
        Swal.fire({
            title: 'NO AUTORIZADO',
            text: 'Usted no tiene permiso para realizar esta accion',
            timer: 10000,
        });
    };
    const warningRepeatTraveler = () => {
        Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Cuidado',
            text: 'Se encontraron viajeros repetidos',
            showConfirmButton: false,
            timer: 3000,
        });
    };
    const errorWrongTraveler = () => {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            text: 'El fichero importado contenia los siguientes errores',
            showConfirmButton: false,
            timer: 3000,
        });
    };
    return {
        alertInactive,
        alertForbidden,
        alertUndelete,
        warningRepeatTraveler,
        errorWrongTraveler,
    };
};