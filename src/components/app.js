import { h, Component } from 'preact';
import {Goban} from '@sabaki/shudan';
const Board = require('@sabaki/go-board');
const sgf = require('@sabaki/sgf')
const GameTree = require('@sabaki/immutable-gametree')

import style from '@sabaki/shudan/css/goban.css';

// According to the tests found in https://github.com/SabakiHQ/sgf/blob/master/tests/parse.test.js the following should works but it produce a JS error - @awea 20191123
//let rootNodes = sgf.parse('(;B[aa]SZ[19];AB[cc][dd:ee])')
//let gameTrees = rootNodes.map(rootNode => {
//    return new GameTree({root: rootNode})
//})


const signMap = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const board = new Board(signMap)

export default class App extends Component {
   constructor(props) {
        super(props)

        this.state = {
            board: new Board(signMap),
            vertexSize: 24,
        }
    }

	render() {
		return h('div', {},
			h(Goban, {
				vertexSize: this.state.vertexSize,
				signMap: this.state.board.signMap,
        onVertexMouseUp:(evt, [x, y]) => {
          // play a black stone on left click and a white stone on right click
          let sign = evt.button === 0 ? 1 : -1
          let newBoard = this.state.board.makeMove(sign, [x, y])
          this.setState({board: newBoard})
        }
			},
    ),
    // following buttons are here to show how to add elements that would interact with the goban
    h('button', {
      type: 'button',
      onClick: evt => {
          this.setState(s => ({vertexSize: Math.max(s.vertexSize - 4, 4)}))
      }
    }, '-'),
    h('button', {
      type: 'button',
      onClick: evt => {
          this.setState(s => ({vertexSize: Math.max(s.vertexSize + 4, 4)}))
      }
    }, '+'),

		);
	}
}
