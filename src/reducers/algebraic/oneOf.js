const Action = Object.freeze({
    SELECT: 1
})

export function select(value) {
    return {type: Action.SELECT, value}
}

export function oneOf(options = [], initial) {
    if (options.some(opt => initial === opt))
        return function(state = initial, action) {
            switch(action.type) {
                case Action.SELECT:
                    if (options.some(opt => action.value === opt))
                        return action.value
                    else return state
                default:
                    return state
            }
        }
}

export default {oneOf, select}