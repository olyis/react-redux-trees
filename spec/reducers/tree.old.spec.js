import {tree, Expansion, setContent, setExpansion}
    from '../../src/reducers/tree.old.js';
import {addFresh, add, act, actAll, remove, clear}
    from '../../src/reducers/algebraic/association-list';

describe('the old tree reducer', () => {
    function fresh(reducer) {
        return reducer(undefined, {});
    }

    it('initialises as expected', () => {
        const freshTree = fresh(tree);
        expect(freshTree).toEqual({
            content: '',
            expansion: Expansion.COLLAPSE,
            children: []
        });
    });

    it('can set content', () => {
        const start = {
            content: 'blah',
            expansion: Expansion.EXPAND,
            children: []
        };
        const updated = tree(start, setContent('new content'));
        expect(updated).toEqual({
            ...start,
            content: 'new content'
        });
    });

    it('can set expansion', () => {
        const start = {
            content: 'blah',
            expansion: Expansion.EXPAND,
            children: []
        };
        const updated = tree(start, setExpansion(Expansion.PIN));
        expect(updated).toEqual({
            ...start,
            expansion: Expansion.PIN
        });
    });

    it('can add fresh child with specified key', () => {
        const freshTree = fresh(tree);
        const updated = tree(freshTree, addFresh('fresh'));
        expect(updated).toEqual({
            ...freshTree,
            children: [{
                key: 'fresh',
                value: freshTree
            }]
        });
    });

    it('can add fresh nested child', () => {
        const child = {
            content: 'child',
            expansion: Expansion.PIN,
            children: []
        };
        const parent = {
            content: 'blah',
            expansion: Expansion.EXPAND,
            children: [{key: 'child', value: child}]
        };
        const action = addFresh('fresh grandchild');
        const wrapped = act('child', action);
        const updated = tree(parent, wrapped);

        const expected = {
            ...parent,
            children: [{
                key: 'child',
                value: {
                    ...child,
                    children:[{
                        key: 'fresh grandchild',
                        value: fresh(tree)
                    }]
                }
            }]
        };
        expect(updated).toEqual(expected);
    });
});