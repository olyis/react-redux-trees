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

export function addFresh(key) {
    return {type: Action.FRESH, key};
}

export function add(key, value) {
    return {type: Action.ADD, key, value};
}

export function map(action) {
    return {type: Action.map, action};
}

export function remove(key) {
    return {type: Action.REMOVE, key};
}

export function clear() {
    return {type: Action.CLEAR};
}

export function act(key, action) {
    return {type: Action.ACT, key, action};
}

export function aList(reducer) {
    return function(state = [], action) {
        const act = kvp => ({...kvp, value: reducer(kvp.value, action.action)});
        switch(action.type) {
            case Action.ADD:
                const child = (({key, value})=>({key, value}))(action);
                return [...state, child];
            case Action.FRESH:
                const child_ = {key: action.key, value: fresh(reducer)};
                return [...state, child_];
            case Action.ACT:
                return state.map(kvp => kvp.key === action.key
                    ? act(kvp)
                    : kvp);
            case Action.MAP:
                return state.map(act);
            case Action.REMOVE:
                return state.filter(kvp => kvp.key !== action.key);
            case Action.CLEAR:
                return [];
            default:
                return state;
        }
    }
}

export default {addFresh, add, act, map, remove, clear, aList};