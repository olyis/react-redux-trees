import React from 'react';
import {render} from 'react-dom';
import Tree from './tree.jsx';
import data from '../data/data.json';
import loader from '../data/loader.js';

loader.getRoot().then(root => console.log('root: ' + root));

var view = <Tree {...data}></Tree>;

render(view, document.getElementById('root'));