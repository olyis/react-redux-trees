import Promise from '../../src/data/PromiseMonad';

describe('the PromiseMonad promise', () => {
    function pure(val) {
        return new Promise(resolve => resolve(val))
    }

    function error(err) {
        return new Promise((_, reject) => reject(err))
    }

    it('resolves as expected', done => {
        let promise = pure(10)
        promise.then(val => {
            expect(val).toBe(10)
            done()})
    })

    it('can map to new value', done => {
        let promise = pure(10)
        promise
            .map(val => val * 2)
            .then(val => {
                expect(val).toBe(20)
                done()})
    })

    it('remains unchanged by map operation', done => {
        let promise = pure(42)
        promise.map(val => 200)
        promise.then(val => {
            expect(val).toBe(42)
            done()})
    })

    it('can obtain new value by binding', done => {
        let promise = pure(42)
        promise
            .bind(val => pure(val * 2))
            .then(val => {
                expect(val).toBe(84)
                done()})
    })

    it('remains unchanged by bind operation', done => {
        let promise = pure(42)
        promise.bind(val => pure(val * 2))
        promise.then(val => {
            expect(val).toBe(42)
            done()})
    })

    it('can use \'then\' to map', done => {
        let promise = pure(100)
        promise
            .then(val => val * 3)
            .then(val => {
                expect(val).toBe(300)
                done()})
    })

    it('can use \'then\' to bind', done => {
        let promise = pure(100)
        promise
            .then(val => pure(val * 3))
            .then(val => {
                expect(val).toBe(300)
                done()})
    })

    it('rejects as expected', done => {
        let promise = error(-1)
        promise
            .then(val =>
                fail('Promise resolved but was expected to reject'))
            .catch(err => {
                expect(err).toBe(-1)
                done()})
    })

    it('can use \'catch\' to map errors to results', done => {
        let promise = error(100)
        promise
            .catch(err => err * 2)
            .then(val => {
                expect(val).toBe(200)
                done()})
            .catch(_ =>
                fail('promise rejected when expected to resolve'))
    })

    it('can use \'catch\' to bind errors to results', done => {
        let promise = error(100)
        promise
            .catch(err => pure(err * 2))
            .then(val => {
                expect(val).toBe(200)
                done()})
            .catch(_ =>
                fail('promise rejected when expected to resolve'))
    })

    it('can use \'catch\' to bind errors to different errors', done => {
        let promise = error(100)
        promise
            .catch(err => error(err * 2))
            .then(_ =>
                fail('promise resolved when expected to reject'))
            .catch(err => {
                expect(err).toBe(200)
                done()})
    })

    it('passes errors straight through map, bind and then', done => {
        let promise = error(-1)
        promise
            .map(val => val * 3)
            .bind(val => pure(val + 100))
            .then(val => val / 5)
            .then(val => val -38)
            .then(val =>
                fail('promise resolved when expected to reject'))
            .catch(err => {
                expect(err).toBe(-1)
                done()})
    })

    it('passes results straight through catch', done => {
        let promise = pure(100)
        promise
            .catch(err => err + 12)
            .catch(err => error(err - 70))
            .then(val => {
                expect(val).toBe(100)
                done()})
            .catch(_ =>
                fail('promise rejected when expected to resolve'))
    })

    it('remains unchanged by catch', done => {
        let promise = error(42)
        promise.catch(err => -1)
        promise
            .then(_ =>
                fail('promise resolved when expected to reject'))
            .catch(err => {
                expect(err).toBe(42)
                done()})
    })
})