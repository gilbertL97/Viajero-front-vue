export function deleteLast<T>(array: T[]): T[] {
    array.pop();
    return array;
}
