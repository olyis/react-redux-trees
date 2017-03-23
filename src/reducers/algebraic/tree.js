import Product, {product} from './product'
import List, {list} from './list'

export function onContent(action) {
    return Product.on('content', action)
}

export function onChildren(action) {
    return Product.on('children', action)
}

export function onChild(index, action) {
    return Product.on('children', List.on(index, action))
}

/*
 * rooted tree with content at all nodes
 * rooted(content) = product({content, children:list(rooted(content))})
 */
export function rooted(content) {
    const memo = product({
        content,
        children: list(func)
    })
    function func(state, action) {
        return memo(state, action)
    }
    return func
}

/*
 * S-expression style tree
 * s = list(s)
 * s isomorphic to rooted(unit)
 * e.g. [[[], []], [], [], [[[[], [[]]]]]]
 */
const sMemo = list(s)
export function s(state, action) {
    return sMemo(state, action)
}

export default {
    rooted,
    s,
    onContent,
    onChildren,
    onChild
}