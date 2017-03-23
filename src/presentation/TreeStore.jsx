import React, {PropTypes} from 'react'
import {LoadState} from '../data/loader.static'
import {values} from '../utils/object-utils'
import Tree from './Tree'

const propTypes = {
    loader: PropTypes.shape({
        get: PropTypes.func.isRequired
    }).isRequired,
    rootId: PropTypes.any.isRequired
}

class TreeStore extends React.Component {
    constructor(props) {
        super(props)

        // object of tree node Records (record) indexed by id
        // Node = {id: int, parent: int?, content: string}
        // Record = {loadState: LoadState, ...?Node}
        this.state = {}
    }

    getLoadState(id) {
        const record = this.state[id]
        return record
            ? record.loadState
            : LoadState.NONE
    }

    getContent(id) {
        const record = this.state[id]
        return record
            ? record.content
            : undefined
    }

    getChildren(id) {
        return values(this.state)
            .filter(record => record.parent === id)
            .map(record => record.id)
    }

    load(id) {
        this.setState(() => ({[id]:{loadState: LoadState.LOADING}}))
        this.props.loader.get(record => record.id === id || record.parent === id)
            .then(records => {
                records.forEach(record => {
                    const loadState = record.id === id
                        ? LoadState.LOADED
                        : LoadState.NONE
                    this.setState(() => ({[record.id]: {...record, loadState}}))
                })
                if (!records.some(record => record.id === id))
                    this.setState(() => ({[id]: {loadState: LoadState.MISSING}}))})
            .catch(err =>
                this.setState(() => ({[id]: {loadState: LoadState.MISSING}})))
    }

    render() {
        const treeStore = {
            getLoadState: this.getLoadState.bind(this),
            getContent: this.getContent.bind(this),
            getChildren: this.getChildren.bind(this),
            load: this.load.bind(this)
        }
        return (
            <Tree
                id={this.props.rootId}
                treeStore={treeStore}/>)
    }
}

TreeStore.propTypes = propTypes

export default TreeStore