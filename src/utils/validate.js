
export function isDef (val){
    return val !== undefined && val !== null;
}
export function isNumeric(val) {
    return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}
export function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
        return false
    }
    const prototype = Object.getPrototypeOf(val)
    return prototype === null || prototype === Object.prototype
}
