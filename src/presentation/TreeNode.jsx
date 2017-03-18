import React, {PropTypes} from 'react';

function TreeNode(props) {
    return (
        <div>
            <span>{props.content}</span>
        </div>);
}

const propTypes = {
    content: PropTypes.string.isRequired,
};

TreeNode.propTypes = propTypes;

export default TreeNode;