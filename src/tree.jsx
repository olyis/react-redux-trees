import React from 'react';
import _map from 'lodash/fp/map';
var map = _map.convert({'cap':false});

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapsed:true};
    }
    mapToChildNodes(children) {
        return map((child, index) =>
            <Tree
                {...child}
                key={index}>
            </Tree>)(children);
    }

    onClick() {
        this.setState((prevState, props) =>
            ({collapsed: !prevState.collapsed}));
    }

    render() {
        var childNodes = this.state.collapsed
            ? []
            : this.mapToChildNodes(this.props.children);
        return (
            <div>
                <div onClick={() => this.onClick()}>
                    {this.props.content}
                    {this.state.collapsed ? " +" : " -"}
                </div>
                <div>
                    {childNodes}
                </div>
            </div>);
    }
}