import React from 'react';

import Tree from '../../src/presentation/tree';
import {LoadState} from '../../src/presentation/Loadable';

describe('the Tree view', () => {
    beforeAll(() => {
        spyOn(console, 'error').and.callFake(err => {
            throw new Error(err);
        });
    });

    function stubTreeStore(data) {
        return {
            getLoadState: id => data[id]
                ? LoadState.LOADED
                : LoadState.NONE,
            getContent: id => data[id].content,
            getChildren: id => data[id].children,
            load: id => {}
        }
    }

    it('creates successfully when provided with id and treeStore', () => {
        const treeStore = stubTreeStore({})
        expect(() =>
            <Tree
                id={0}
                treeStore={treeStore}/>)
            .not.toThrow()
    });

    it('gives warning when given no id', () => {
        const treeStore = stubTreeStore({})
        expect(() =>
            <Tree
                treeStore={treeStore}/>)
            .toThrowError(/id/)
    });

    it('gives warning when given no treeStore', () => {
        expect(() =>
            <Tree
                id={0}/>)
            .toThrowError(/treeStore/)
    });

    it('gives warning when treeStore does not have necessary load method', () => {
        const treeStore = stubTreeStore({})
        treeStore.load = undefined;
        expect(() =>
            <Tree
                id={0}
                treeStore={treeStore}/>)
            .toThrowError(/treeStore/)
    });

    it('gives warning when treeStore does not have necessary getLoadState method', () => {
        const treeStore = stubTreeStore({})
        treeStore.getLoadState = undefined;
        expect(() =>
            <Tree
                id={0}
                treeStore={treeStore}/>)
            .toThrowError(/treeStore/)
    });

    it('gives warning when treeStore does not have necessary getContent method', () => {
        const treeStore = stubTreeStore({})
        treeStore.getContent = undefined;
        expect(() =>
            <Tree
                id={0}
                treeStore={treeStore}/>)
            .toThrowError(/treeStore/)
    });

    it('gives warning when treeStore does not have necessary getChildren method', () => {
        const treeStore = stubTreeStore({})
        treeStore.getChildren = undefined;
        expect(() =>
            <Tree
                id={0}
                treeStore={treeStore}/>)
            .toThrowError(/treeStore/)
    });
});