const Action = Object.freeze({
    RESET: 0,
    RESET_ALL: 1,
    ACT: 2,
    SET: 3
});

function fresh(reducer) {
    return reducer(undefined, {});
}

export function reset(key) {
    return {type: Action.RESET, key};
}

export function resetAll() {
    return {type: Action.RESET_ALL};
}

export function act(key, action) {
    return {type: Action.ACT, key, action};
}

export function product(definitionShape) {
    const freshAll = Object.keys(definitionShape)
        .reduce((current, next) =>
            ({...current, [next]:fresh(definitionShape[next])}), {});
    return function(state = freshAll, action) {
        const key = action.key;
        switch(action.type) {
            case Action.ACT:
                const newVal = definitionShape[key](
                    state[key],
                    action.action);
                return {...state, [key]:newVal};
            case Action.RESET:
                const freshVal = fresh(definitionShape[key]);
                return {...state, [key]:freshVal};
            case Action.RESET_ALL:
                return freshAll;
            default:
                return state;
        }
    }
}

export default {reset, resetAll, act, product}