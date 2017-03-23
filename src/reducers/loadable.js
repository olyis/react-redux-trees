import {sum, select, tagged, on} from './algebraic/sum'
import {unit, UNIT} from './algebraic/unit'

export const LoadState = Object.freeze({
    MISSING: -1,
    NONE: 0,
    LOADING: 1,
    LOADED: 2
})

export const missing = tagged(LoadState.MISSING, UNIT)
export const none = tagged(LoadState.NONE, UNIT)
export const loading = tagged(LoadState.LOADING, UNIT)
export const loaded = value => tagged(LoadState.LOADED, value)

export function setMissing() {
    return select(LoadState.MISSING)
}

export function setNone() {
    return select(LoadState.NONE)
}

export function setLoading() {
    return select(LoadState.LOADING)
}

export function setLoaded(value) {
    return select(LoadState.LOADED, value)
}

export function map(action) {
    return on(LoadState.LOADED, action)
}

export function loadable(reducer) {
    return sum(
        {
            [LoadState.MISSING]: unit,
            [LoadState.NONE]: unit,
            [LoadState.LOADING]: unit,
            [LoadState.LOADED]: reducer
        },
        LoadState.NONE)
}

export default {
    LoadState,
    missing,
    none,
    loading,
    loaded,
    setMissing,
    setNone,
    setLoading,
    setLoaded,
    map,
    loadable
}