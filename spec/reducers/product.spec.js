import {product, on, reset, resetAll}
    from '../../src/reducers/algebraic/product'
import {int, decr, incr} from '../../src/reducers/int'
import {string} from '../../src/reducers/string'

describe('the product reducer', () => {
    function fresh(reducer) {
        return reducer(undefined, {})
    }

    const foo = product({id:int, content:string})

    it('initialises as expected', () => {
        const definition = {
            id: int,
            content: string,
            foo
        }
        const reducer = product(definition)
        const initial = fresh(reducer)
        expect(Object.keys(initial))
            .toEqual(['id', 'content', 'foo'])
        expect(initial.id).toEqual(0)
        expect(initial.content).toEqual('')
        expect(initial.foo).toEqual({
            id: 0,
            content: ''
        })
    })

    it('can reset specified key', () => {
        const start = {
            id: 10,
            content: 'hello world'
        }
        const action = reset('content')
        const result = foo(start, action)
        const expected = {
            id: 10,
            content: ''
        }
        expect(result).toEqual(expected)
    })

    it('can reset all keys', () => {
        const startFoo = {
            id: 10,
            content: 'hello world'
        }
        const action = resetAll()
        const result = foo(startFoo, action)
        expect(result).toEqual(fresh(foo))
    })

    it('can act on specified key', () => {
        const definition = {
            int,
            string,
            foo
        }
        const reducer = product(definition)
        const initial = fresh(reducer)
        const action = on('int', incr())
        const result = reducer(initial, action)
        const expected = {
            int: 1,
            string: '',
            foo: fresh(foo)
        }
        expect(result).toEqual(expected)
    })
})