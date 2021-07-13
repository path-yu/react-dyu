export function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
        return false
    }
    const prototype = Object.getPrototypeOf(val)
    return prototype === null || prototype === Object.prototype
}

export function getDOMSize(selector) {
    const ele = document.querySelector(selector);
    if (ele != null) {
        return [ele.offsetWidth, ele.offsetHeight];
    }
    return {}
}

export function getWindowSize() {
    return [window.screen.width, window.screen.height]
}