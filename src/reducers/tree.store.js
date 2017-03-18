import {list} from './algebraic/list';
import {product} from './algebraic/product';
import {maybe, none} from './algebraic/maybe';
import {unit} from './algebraic/unit';
import {int} from './int';
import {string} from './string';

defaultRecord = {
    id: 0,
    content: '',
    parent: none
}

export const record = product({id: int, content: string, parent: maybe(int)})

export const treeStore = list(record)

export default {record, treeStore}