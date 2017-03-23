import data from './data.normalised';
import Promise from './PromiseMonad';

const root = data.root;
const store = data.store;

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

export default {get, getRoot}