import {product, act, reset, resetAll}
    from '../../src/reducers/algebraic/product';
import {int, decr, incr} from '../../src/reducers/int';

describe('the product reducer', () => {
    const StringAction = Object.freeze({
        CLEAR: 0,
        SET: 1
    });

    function fresh(reducer) {
        return reducer(undefined, {});
    }

    function string(state = '', action) {
        switch(action.type) {
            case StringAction.CLEAR:
                return '';
            case StringAction.SET:
                return action.value;
            default:
                return state;
        }
    }

    const foo = product({id:int, content:string});

    it('initialises as expected', () => {
        const definition = {
            id: int,
            content: string,
            foo
        };
        const reducer = product(definition);
        const initial = fresh(reducer);
        expect(Object.keys(initial))
            .toEqual(['id', 'content', 'foo']);
        expect(initial.id).toEqual(0);
        expect(initial.content).toEqual('');
        expect(initial.foo).toEqual({
            id: 0,
            content: ''
        });
    });

    it('can reset specified key', () => {
        const start = {
            id: 10,
            content: 'hello world'
        };
        const action = reset('content');
        const result = foo(start, action);
        const expected = {
            id: 10,
            content: ''
        }
        expect(result).toEqual(expected);
    });

    it('can reset all keys', () => {
        const startFoo = {
            id: 10,
            content: 'hello world'
        };
        const action = resetAll();
        const result = foo(startFoo, action);
        expect(result).toEqual(fresh(foo));
    });

    it('can act on specified key', () => {
        const definition = {
            int,
            string,
            foo
        };
        const reducer = product(definition);
        const initial = fresh(reducer);
        const action = act('int', incr());
        const result = reducer(initial, action);
        const expected = {
            int: 1,
            string: '',
            foo: fresh(foo)
        };
        expect(result).toEqual(expected);
    });
});