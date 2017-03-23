export function values(obj) {
    return Object.keys(obj)
        .map(key => obj[key])
}