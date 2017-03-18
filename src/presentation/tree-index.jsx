import React from 'react'
import {render} from 'react-dom'
import TreeStore from './TreeStore'
import Loader from '../data/loader.static'


var view = (
    <TreeStore
        loader={Loader}
        rootId={0}/>)

render(view, document.getElementById('root'))