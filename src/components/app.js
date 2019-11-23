import { h, Component } from 'preact';
import {Goban} from '@sabaki/shudan';
const Board = require('@sabaki/go-board');


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
