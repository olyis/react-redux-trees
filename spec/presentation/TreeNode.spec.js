import {shallow} from 'enzyme';
import React from 'react';

import TreeNode, {Expansion} from '../../src/presentation/TreeNode';

describe('the TreeNode view', () => {
    beforeAll(() => {
        spyOn(console, 'error').and.callFake(err => {
            throw new Error(err);
        });
    });

    it('renders successfully with expected props', () => {
        expect(() =>
            <TreeNode content='foo'/>)
            .not.toThrow();
    });

    it('has error for missing content', () => {
        expect(() => <TreeNode/>)
            .toThrowError(/content/);
    });

    it('has error for non string content', () => {
        expect(() => <TreeNode content={0}/>)
            .toThrowError(/content/);
    });
});