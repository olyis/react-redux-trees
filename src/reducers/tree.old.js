import {combineReducers} from 'redux';
import {aList} from './algebraic/association-list';

export const Expansion = Object.freeze({
    COLLAPSE:0,
    EXPAND:1,
    PIN:2
});

const Action = Object.freeze({
    SET_CONTENT:0,
    SET_EXPANSION:1
});

export function setContent(content) {
    return {type:Action.SET_CONTENT, content};
}

export function setExpansion(expansion) {
    return {type:Action.SET_EXPANSION, expansion};
}

function content(state = '', action) {
    return (action.type === Action.SET_CONTENT)
        ? action.content
        : state;
}

function expansion(state = Expansion.COLLAPSE, action) {
    return (action.type === Action.SET_EXPANSION)
        ? action.expansion
        : state;
}

/* can't do 
 *   const children = aList(tree)
 * because tree not yet defined
 */
function children(state, action) {
    return aList(tree)(state, action);
}

export const tree = combineReducers({content, children, expansion});

export default {
    tree,
    Expansion,
    setContent,
    setExpansion
};