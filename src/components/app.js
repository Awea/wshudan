import { h, Component } from 'preact';
import {Goban} from '@sabaki/shudan';
const Board = require('@sabaki/go-board');
const sgf = require('@sabaki/sgf')

// According to the tests found in https://github.com/SabakiHQ/sgf/blob/master/tests/parse.test.js the following should works but it produce a JS error - @awea 20191123
// console.log(sgf.parse('(;B[aa]SZ[19];AB[cc][dd:ee])'))

import style from '@sabaki/shudan/css/goban.css';

const signMap = [
    [ 0, 0, 0,-1,-1,-1, 1, 0, 1, 1,-1,-1, 0,-1, 0,-1,-1, 1, 0],
    [ 0, 0,-1, 0,-1, 1, 1, 1, 0, 1,-1, 0,-1,-1,-1,-1, 1, 1, 0],
    [ 0, 0,-1,-1,-1, 1, 1, 0, 0, 1, 1,-1,-1, 1,-1, 1, 0, 1, 0],
    [ 0, 0, 0, 0,-1,-1, 1, 0, 1,-1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [ 0, 0, 0, 0,-1, 0,-1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [ 0, 0,-1, 0, 0,-1,-1, 1, 0,-1,-1, 1,-1,-1, 0, 1, 0, 0, 1],
    [ 0, 0, 0,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1,-1,-1,-1, 1, 1, 1],
    [ 0, 0,-1, 1, 1, 0, 1,-1,-1, 1, 0, 1,-1, 0, 1,-1,-1,-1, 1],
    [ 0, 0,-1,-1, 1, 1, 1, 0,-1, 1,-1,-1, 0,-1,-1, 1, 1, 1, 1],
    [ 0, 0,-1, 1, 1,-1,-1,-1,-1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1],
    [-1,-1,-1,-1, 1, 1, 1,-1, 0,-1, 1,-1,-1, 0,-1, 1, 1,-1, 0],
    [-1, 1,-1, 0,-1,-1,-1,-1,-1,-1, 1,-1, 0,-1,-1, 1,-1, 0,-1],
    [ 1, 1, 1, 1,-1, 1, 1, 1,-1, 1, 0, 1,-1, 0,-1, 1,-1,-1, 0],
    [ 0, 1,-1, 1, 1,-1,-1, 1,-1, 1, 1, 1,-1, 1,-1, 1, 1,-1, 1],
    [ 0, 0,-1, 1, 0, 0, 1, 1,-1,-1, 0, 1,-1, 1,-1, 1,-1, 0,-1],
    [ 0, 0, 1, 0, 1, 0, 1, 1, 1,-1,-1, 1,-1,-1, 1,-1,-1,-1, 0],
    [ 0, 0, 0, 0, 1, 1, 0, 1,-1, 0,-1,-1, 1, 1, 1, 1,-1,-1,-1],
    [ 0, 0, 1, 1,-1, 1, 1,-1, 0,-1,-1, 1, 1, 1, 1, 0, 1,-1, 1],
    [ 0, 0, 0, 1,-1,-1,-1,-1,-1, 0,-1,-1, 1, 1, 0, 1, 1, 1, 0]
]

const board = new Board(signMap)

export default class App extends Component {
	render() {
		return h('div', {},
			h(Goban, {
				vertexSize: 24,
				signMap: board.signMap
			})
		);
	}
}
