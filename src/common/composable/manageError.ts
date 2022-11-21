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
    return {
        alertInactive,
        alertForbidden,
        alertUndelete,
    };
};
