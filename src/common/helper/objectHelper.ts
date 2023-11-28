export function assignObjectValues(path: string[], object: any, params: URLSearchParams) {
    Object.keys(object).forEach((key) => {
        if (typeof object[key] === 'object')
            assignObjectValues(path.concat(key), object[key], params);
        else if (object[key] !== '')
            params.append(path.join('.').concat('.' + key), object[key]);
    });
}
export function bindObjects(...objects: any[]): any {
    const objectBinded = {};
    for (const object of objects) {
        Object.assign(objectBinded, object);
    }
    return objectBinded;
}
