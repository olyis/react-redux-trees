import React from 'react'
import TreeStore from '../../src/presentation/TreeStore'

describe('the TreeStore component', () => {
    beforeAll(() => {
        spyOn(console, 'error').and.callFake(err => {
            throw new Error(err)
        })
    })

    it('has error for missing loader prop', () =>
        expect(() => <TreeStore/>)
            .toThrowError(/loader/)
    )
})