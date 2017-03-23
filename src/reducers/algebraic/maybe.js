import sum, {on, match, select} from './sum';
import unit, {UNIT} from './unit';

const Action = Object.freeze({
    TO_NONE: 0,
    TO_SOME: 1,
    MAP: 2
})

export const none = Object.freeze({
    key: 'none',
    value: UNIT
});

export function some(value) {
    return {
        key: 'some',
        value
    }
}

export function toNone() {
    return select(none)
}

export function toSome(value) {
    return select(some(value))
}

export function map(action) {
    return match({
        none: {},
        some: action
    })
}

export function maybe(reducer) {
    return sum({none: unit, some: reducer})
}

export default {toNone, toSome, map, maybe}