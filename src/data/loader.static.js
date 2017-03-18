import data from './data.normalised';
import Promise from './PromiseMonad';

const root = data.root;
const store = data.store;

// TODO refactor
export const LoadState = Object.freeze({
    MISSING: -1,
    NONE: 0,
    LOADING: 1,
    LOADED: 2
})

function getInternal(predicate) {
    return store.filter(val => predicate(val));
}

function getRootInternal() {
    return getInternal(v => v.id === root)[0];
}

export function get(predicate) {
    return new Promise(resolve => resolve(getInternal(predicate)));
}

export function getRoot() {
    return new Promise(resolve => resolve(getRootInternal()));
}

export default {get, getRoot, LoadState}