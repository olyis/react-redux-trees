import {aList, addFresh, add, act, map, remove, clear}
    from '../../src/reducers/algebraic/association-list';
import {int, incr} from '../../src/reducers/int'

describe('the association-list reducer', () => {
    function fresh(reducer) {
        return reducer(undefined, {});
    }

    const intList = aList(int);

    it('initialises empty', () => {
        const initialInt = fresh(int);
        const initialList = fresh(intList);
        expect(initialInt).toEqual(0);
        expect(initialList).toEqual([]);
    });

    it('adds fresh as expected', () => {
        const withFreshAdded = intList([], addFresh('fresh'));
        expect(withFreshAdded.length).toEqual(1);
        const added = withFreshAdded[0];
        expect(added).toEqual({value:0, key:'fresh'});
    });

    it('adds new as expected', () => {
        const toAdd = 42;
        const withAdded = intList([{key:'hello', value:0}], add('new', toAdd));
        expect(withAdded.length).toEqual(2);
        const added = withAdded[1];
        expect(added).toEqual({value:42, key:'new'});
    });

    it('acts on existing child as expected', () => {
        const state = [{key:'key', value:36}];
        const wrappedAction = act('key', incr());
        const acted = intList(state, wrappedAction);
        expect(acted.length).toEqual(1);
        const item = acted[0];
        expect(item).toEqual({key:'key', value:37});
    });

    it('leaves children without specified key unchanged with act', () => {
        const state = [{key:'key', value:36}];
        const wrappedAction = act('different key', incr());
        const acted = intList(state, wrappedAction);
        expect(acted).toEqual(state);
    });
});