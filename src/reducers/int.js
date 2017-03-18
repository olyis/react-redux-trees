const Action = Object.freeze({
    DECR: -1,
    RESET: 0,
    INCR: 1
});

export function decr() {
    return {type: Action.DECR};
}

export function reset() {
    return {type: Action.RESET};
}

export function incr() {
    return {type: Action.INCR};
}

export function int(state = 0, action) {
    switch(action.type) {
        case Action.DECR:
            return state - 1;
        case Action.RESET:
            return 0;
        case Action.INCR:
            return state + 1;
        default:
            return state;
    }
}

export default {decr, reset, incr, int};