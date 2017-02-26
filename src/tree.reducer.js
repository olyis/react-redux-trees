const Expansion = Object.freeze({
    COLLAPSE:0,
    EXPAND:1,
    PIN:2
});

const Action = Object.freeze({
    SET_EXPANSION:0
});

function tree(
    state =
        { content:''
        , children:[]
        , expansion:Expansion.COLLAPSE},
    action) {
    switch(action.type) {
        case Action.SET_EXPANSION:
            return state;
            break;
        default:
            return state;
    }
}

export default {tree, Expansion, Action};