/**
 * @file utils
 * @author lishaohai
 */
// 深拷贝
export function deepCopy(obj, cache = []) {
    function find(list, f) {
        return list.filter(f)[0];
    }

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache a first
    // because we want to refer it in recursive deepCopy
    cache.push({original: obj, copy});

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
}
// 使用elem.currentStyle
export function getStyles(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            return window.getComputedStyle(elem, null)[prop];
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else {
        if (prop) {
            return elem.currentStyle[prop];
        } else {
            return elem.currentStyle;
        }
    }
}
