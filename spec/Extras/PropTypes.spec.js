import {PropTypes} from 'react'

describe('Custom maybeNumber PropTypes', () => {
    function checkProps(propTypes, object, name = 'maybeNumber') {
        return Object.keys(propTypes)
            .map(key => propTypes[key](object, key, name))
            .reduce((current, err) => current || err, null)
    }

    const maybeNumber = {
        isSome: PropTypes.bool.isRequired,
        value: (props, ...rest) =>
            (props.isSome)
                ? PropTypes.number.isRequired(props, ...rest)
                : null
    }

    it('permits none', () => {
        const none = {
            isSome: false
        }
        expect(checkProps(maybeNumber, none)).toEqual(null)
    })

    it('permits some number', () => {
        const someNumber = {
            isSome: true,
            value: 10
        }
        expect(checkProps(maybeNumber, someNumber)).toEqual(null)
    })

    it('rejects some string', () => {
        const someString = {
            isSome: true,
            value: 'hello'
        }
        expect(checkProps(maybeNumber, someString)).not.toEqual(null)
    })

    it('rejects inconsistent', () => {
        const inconsistent = {
            isSome: true
        }
        expect(checkProps(maybeNumber, inconsistent)).not.toEqual(null)
    })
})