import React from 'react';
import {render} from 'react-dom';
import Tree from './tree.jsx';
import data from './data.json';
import normalised from './data.normalised.json';
import TreeReducer from './tree.reducer.js';

var root = normalised.root;
var store = normalised.store;

var view = <Tree {...data}></Tree>;

render(view, document.getElementById('root'));