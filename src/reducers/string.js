const Action = Object.freeze({
    SET: 0,
    CLEAR: 1
});

export function set(value) {
    return {type: Action.SET, value};
}

export function clear() {
    return {type: Action.CLEAR};
}

export function string(state = '', action) {
    switch(action.type) {
        case Action.CLEAR:
            return '';
        case Action.SET:
            return action.value || '';
        default:
            return state;
    }
}

export default {string, set, clear};