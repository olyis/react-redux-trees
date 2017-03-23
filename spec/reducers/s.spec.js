import {s} from '../../src/reducers/algebraic/tree'
import {addFresh, remove, on, map, clear} from '../../src/reducers/algebraic/list'

describe('the s reducer', () => {
    function fresh(reducer) {
        return reducer(undefined, {})
    }

    it('initialises as expected', () => {
        const initial = fresh(s)
        expect(initial).toEqual([])
    })

    it('can add a fresh child at start (push fresh)', () => {
        const start =
            [ [], [ [] ] ]
        const updated = s(start, addFresh())
        expect(updated).toEqual(
            [fresh(s), ...start])
    })

    it('can add a fresh child in middle', () => {
        const start =
            [ [], [ [] ] ]
        const action = addFresh(1)
        const updated = s(start, action)
        expect(updated).toEqual(
            [ [], [], [ [] ] ])
    })

    it('can remove child from start (pop)', () => {
        const start =
            [ [], [ [] ] ]
        const updated = s(start, remove())
        expect(updated).toEqual(
            [ [ [] ] ]
        )
    })

    it('can remove child from specified index', () => {
        const start =
            [ [], [ [] ] ]
        const updated = s(start, remove(1))
        expect(updated).toEqual(
            [ [] ]
        )
    })

    it('can act on specified index', () => {
        const start =
            [ [], [ [] ] ]
        const action = on(1, clear())
        const updated = s(start, action)
        expect(updated).toEqual(
            [ [], [] ]
        )
    })

    it('can map across all children', () => {
        const start =
            [ [], [ [] ] ]
        const action = map(addFresh())
        const updated = s(start, action)
        expect(updated).toEqual(
            [ [ [] ], [ [], [] ] ]
        )
    })
})