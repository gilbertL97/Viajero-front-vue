const typeTemplate = "'${name}' no es un ${type}";

export const defaultValidateMessages = {
    default: "Validation error on field '${name}'",
    required: "'${name}' es un campo obligatorio",
    enum: "'${name}' must be one of [${enum}]",
    whitespace: "'${name}' no puede estar vacia",
    date: {
        format: "'${name}' is invalid for format date",
        parse: "'${name}' could not be parsed as date",
        invalid: "'${name}' is invalid date",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
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
        len: "'${name}' must be exactly ${len} characters",
        min: "'${name}' must be at least ${min} characters",
        max: "'${name}' cannot be longer than ${max} characters",
        range: "'${name}' must be between ${min} and ${max} characters",
    },
    number: {
        len: "'${name}' must equal ${len}",
        min: "'${name}' cannot be less than ${min}",
        max: "'${name}' cannot be greater than ${max}",
        range: "'${name}' must be between ${min} and ${max}",
    },
    array: {
        len: "'${name}' must be exactly ${len} in length",
        min: "'${name}' cannot be less than ${min} in length",
        max: "'${name}' cannot be greater than ${max} in length",
        range: "'${name}' must be between ${min} and ${max} in length",
    },
    pattern: {
        mismatch: "'${name}' does not match pattern ${pattern}",
    },
};
export const validateMessages = {
    required: '${label} es un campo obligatorio',
    types: {
        email: '${label} no es un correo valido !',
        number: '${label} no es un valido number!',
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
