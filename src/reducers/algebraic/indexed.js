const Action = Object.freeze({
    FRESH: 'FRESH',
    ADD: 'ADD',
    MAP: 'MAP',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    ACT: 'ACT'
})

function fresh(reducer) {
    return reducer(undefined, {})
}

function mapO(func, obj) {
    return Object.keys(obj)
        .reduce
            ((curr, key) => (
                { ...curr
                , [key]: func(obj[key], key)})
            , {})
}

function filterO(pred, obj) {
    return Object.keys(obj)
        .reduce
            ((curr, key) =>
                pred(obj[key], key)
                    ? (
                        {...curr
                        , [key]: obj[key]})
                    : curr
            , {})
}

export function addFresh(index) {
    return {type: Action.FRESH, index}
}

export function put(index, value) {
    return {type: Action.ADD, index, value}
}

export function map(action) {
    return {type: Action.MAP, action}
}

export function remove(index) {
    return {type: Action.REMOVE, index}
}

export function clear() {
    return {type: Action.CLEAR}
}

export function on(index, action) {
    return {type: Action.ACT, index, action}
}

export function indexed(reducer) {
    return function(state = {}, action) {
        const act = value => reducer(value, action.action)
        const index = action.index
        switch(action.type) {
            case Action.ADD:
                return {
                    ...state,
                    [index]: reducer(action.value, {})
                }
            case Action.FRESH:
                return {
                    ...state,
                    [index]: fresh
                }
            case Action.ACT:
                return mapO(
                    (val, i) => i === index
                        ? act(val)
                        : val,
                    state)
            case Action.MAP:
                return mapO(act, state)
            case Action.REMOVE:
                return filterO((_, i) => i !== index, state)
            case Action.CLEAR:
                return {}
            default:
                return state
        }
    }
}

export default {addFresh, put, map, remove, clear, on, indexed}