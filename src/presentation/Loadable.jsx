import React, {PropTypes} from 'react';
import {LoadState} from '../data/loader.static'

function values(obj) {
    return Object.keys(obj).map(key => obj[key])
}

Loadable.propTypes = {
    loadState: PropTypes.oneOf(values(LoadState)).isRequired,
    loadAction: function(props, ...rest) {
        if (props.loadState === LoadState.LOADING)
            return null
        return PropTypes.func.isRequired(props, ...rest)
    },
    lazyContent: function(props, ...rest) {
        if (props.loadState === LoadState.LOADED)
            return PropTypes.func.isRequired(props, ...rest)
        return null
    }
}

function Loadable(props) {
    const ClickToLoad = ({msg = 'Click to load.'}) => (
        <div onClick={props.loadAction}>
            <span>{msg}</span>
        </div>)
    switch(props.loadState) {
        case LoadState.MISSING:
            return (
                <div>
                    Failed to load.
                    <ClickToLoad msg='Click to reload.'/>
                </div>)
        case LoadState.NONE:
            return <ClickToLoad/>
        case LoadState.LOADING:
            return (
                <div>
                    <i>Loading...</i>
                </div>)
        case LoadState.LOADED:
            return (
                <div>
                    {props.lazyContent()}
                    <ClickToLoad msg='Click to reload.'/>
                </div>
            )
        default:
            return null
    }
}

export default Loadable;