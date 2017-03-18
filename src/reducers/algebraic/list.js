const Action = Object.freeze({
    FRESH: 'FRESH',
    ADD: 'ADD',
    MAP: 'MAP',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    ACT: 'ACT'
});

function fresh(reducer) {
    return reducer(undefined, {});
}

export function addFresh(index) {
    return {type: Action.FRESH, index};
}

export function add(index, value) {
    return {type: Action.ADD, index, value};
}

export function map(action) {
    return {type: Action.MAP, action};
}

export function remove(index) {
    return {type: Action.REMOVE, index};
}

export function clear() {
    return {type: Action.CLEAR};
}

export function act(index, action) {
    return {type: Action.ACT, index, action};
}

export function list(reducer) {
    return function(state = [], action) {
        const act = value => reducer(value, action.action);
        const index = action.index === undefined
            ? 0
            : action.index;
        switch(action.type) {
            case Action.ADD:
                return insert(state, index, action.value);
            case Action.FRESH:
                return insert(state, index, fresh(reducer));
            case Action.ACT:
                return state.map((val, i) => i === index
                    ? act(val)
                    : val);
            case Action.MAP:
                return state.map(act);
            case Action.REMOVE:
                return state.filter((_, i) => i !== index);
            case Action.CLEAR:
                return [];
            default:
                return state;
        }
    }
}

function insert(state, index, value) {
    const initial = state.filter((_, i) => i < index)
    const terminal = state.filter((_, i) => i >= index);
    return initial.concat([value]).concat(terminal);
}

export default {addFresh, add, map, remove, clear, act, list}