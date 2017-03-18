import React, {PropTypes} from 'react';
import map from 'lodash/fp/map';

import TreeNode from './TreeNode';
import Loadable from './Loadable';
import {LoadState} from '../data/loader.static';


// TODO refactor
const Expansion = Object.freeze({
    COLLAPSE:0,
    EXPAND:1,
    PIN:2
})



const propTypes = {
    id: PropTypes.any.isRequired,
    treeStore: PropTypes.shape({
        getLoadState: PropTypes.func.isRequired,
        getContent: PropTypes.func.isRequired,
        getChildren: PropTypes.func.isRequired,
        load: PropTypes.func.isRequired
    }).isRequired
}

const getChildNodes = (treeStore, id) =>
    treeStore.getChildren(id)
        .map(childId =>
            <li key={childId}>
                <Tree id={childId} treeStore={treeStore}/>
            </li>)

function Tree(props) {
    const id = props.id
    const treeStore = props.treeStore
    const loadState = treeStore.getLoadState(id)
    const loadAction = () => treeStore.load(id)
    const lazyContent = () => (
        <div>
            <TreeNode content={treeStore.getContent(id)}/>
            <ul>
                {getChildNodes(treeStore, id)}
            </ul>
        </div>)
    return (
        <Loadable
            loadState={loadState}
            loadAction={loadAction}
            lazyContent={lazyContent}/>)
}

Tree.propTypes = propTypes;

export default Tree;