const Action = Object.freeze({
    ACT: 0,
    MATCH: 1,
    SELECT: 2
})

function fresh(reducer) {
    return reducer(undefined, {})
}

export function act(key, action) {
    return {type: Action.ACT, key, action}
}

export function match(matcher) {
    return {type: Action.MATCH, matcher}
}

export function select(key, value) {
    return {type: Action.SELECT, key, value}
}

export function sum(definitionShape, initialKey) {
    const initialValue = fresh(definitionShape[initialKey])
    const initial = {key: initialKey, value: initialValue}
    return function(state = initial, action) {
        switch(action.type) {
            case Action.ACT:
                if (state.key === action.key) {
                    const currentReducer = definitionShape[state.key]
                    const actedValue = currentReducer(state.value, action.action)
                    return {
                        key: state.key,
                        value: actedValue
                    }
                } else
                    return state
            case Action.MATCH:
                const matchedReducer = definitionShape[state.key]
                const matchedAction = action.matcher[state.key]
                const newValue = matchedReducer(state.value, matchedAction)
                return {
                    key: state.key,
                    value: newValue
                }
            case Action.SELECT:
                const selectedReducer = definitionShape[action.key]
                const selectedValue = selectedReducer(action.value, {})
                return {
                    key: state.key,
                    value: selectedValue
                }
            default:
                return state
        }
    }
}

export default {act, match, select, sum}