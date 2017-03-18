import Tree from '../../src/reducers/algebraic/tree';
import List from '../../src/reducers/algebraic/list';
import String from '../../src/reducers/string';

const stringTree = Tree.rooted(String.string);

describe('the tree reducer', () => {
    function fresh(reducer) {
        return reducer(undefined, {});
    }

    it('initialises as expected', () => {
        const freshTree = fresh(stringTree);
        expect(freshTree).toEqual({
            content: fresh(String.string),
            children: []
        });
    });

    it('can act on content', () => {
        const start = {
            content: 'blah',
            children: []
        };
        const action = Tree.onContent(String.set('new content'));
        const updated = stringTree(start, action);
        expect(updated).toEqual({
            ...start,
            content: 'new content'
        });
    });

    it('can add fresh child at end', () => {
        const freshTree = fresh(stringTree);
        const action = Tree.onChildren(List.addFresh());
        const updated = stringTree(freshTree, action);
        expect(updated).toEqual({
            ...freshTree,
            children: [freshTree]
        });
    });

    it('can add fresh child with specified index', () => {
        const start = {
            content: 'root',
            children: [
                {content: 'child 1', children: []},
                {content: 'child 2', children: []}
            ]
        }
        const action = Tree.onChildren(List.addFresh(1));
        const updated = stringTree(start, action);
        expect(updated).toEqual({
            ...start,
            children: [
                {content: 'child 1', children: []},
                fresh(stringTree),
                {content: 'child 2', children: []}
            ]
        });
    });

    it('can add fresh nested child', () => {
        const child = {
            content: 'child',
            children: []
        };
        const root = {
            content: 'blah',
            children: [child]
        };
        const action = Tree.onChildren(List.addFresh());
        const wrapped = Tree.onChild(0, action);
        const updated = stringTree(root, wrapped);

        const expected = {
            ...root,
            children: [
                {...child, children:[fresh(stringTree)]}
            ]
        };
        expect(updated).toEqual(expected);
    });

    it('can remove a child', () => {
        const start = {
            content: 'root',
            children: [
                {content: 'child 1', children: []},
                {
                    content: 'child 2',
                    children: [{content: 'grandchild', children: []}]
                }
            ]
        };
        const action = Tree.onChildren(List.remove(1));
        const updated = stringTree(start, action);
        expect(updated).toEqual({
            content: 'root',
            children: [{content: 'child 1', children: []}]
        });
    });
});