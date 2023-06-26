const typeTemplate = '${label}  no es un ${type}';
const typeTemplateN = '${label}  no es un numero ';
export const defaultValidateMessages = {
    default: 'Validation error on field ${label} ',
    required: '${label}  es un campo obligatorio',
    enum: '${label}  must be one of [${enum}]',
    whitespace: '${label}  no debe poseer espacios ',
    date: {
        format: '${label}  is invalid for format date',
        parse: '${label}  could not be parsed as date',
        invalid: '${label}  is invalid date',
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplateN,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: '${label}  debe ser igual a ${len} caracteres',
        min: '${label} no puede tener menos de ${min} caracteres',
        max: '${label}  no puede tener mas de ${max} caracteres',
        range: '${label}  debe estar ${min} y ${max} caracteres',
    },
    number: {
        len: '${label}  debe ser igual a ${len} caracteres',
        min: '${label} no puede tener menos de ${min} caracteres',
        max: '${label}  no puede tener mas de ${max} caracteres',
        range: '${label}  debe estar ${min} y ${max} caracteres',
    },
    array: {
        len: '${label}  must be exactly ${len} in length',
        min: '${label}  cannot be less than ${min} in length',
        max: '${label}  cannot be greater than ${max} in length',
        range: '${label}  must be between ${min} and ${max} in length',
    },
    pattern: {
        mismatch: '${label}  no es de tipo numerico',
    },
    numberDays: {
        number: 'La cantidad de dias no coincide con el plan',
    },
};
export const validateMessages = {
    required: '${label} es un campo obligatorio',
    types: {
        email: '${label} no es un correo valido !',
        number: '${label} no es un numero valido !',
        date: 'Por favor seleccione la fecha!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
export function deleteMessage(entity: string, other?: string): string {
    return (
        'El ' +
        entity +
        ' no puede ser borrado ya que esta siendo usado por al menos un ' +
        other! +
        '. Por lo tanto sera puesto en estado inactivo'
    );
}
export function repeatMessage(entity: string, other?: string): string {
    return 'Se esta intentando agregar ' + entity + other + ' que ya existen';
}
