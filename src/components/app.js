import { h, Component } from 'preact';
import {Goban} from '@sabaki/shudan';
const Board = require('@sabaki/go-board');
const sgf = require('@sabaki/sgf')
const GameTree = require('@sabaki/immutable-gametree')

import style from '@sabaki/shudan/css/goban.css';

// According to the tests found in https://github.com/SabakiHQ/sgf/blob/master/tests/parse.test.js the following should works but it produce a JS error - @awea 20191123
let rootNodes = sgf.parse('(;B[aa]SZ[19];B[dp];W[pq];B[dd];W[qc];B[qo];B[ch];W[cq];B[cp];W[dq];B[eq];W[er])')
let gameTrees = rootNodes.map(rootNode => {
    return new GameTree({root: rootNode})
})
var tree = gameTrees[0]

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
            move : 0,
        }
    }
  movePrevious(){
    var node = tree.get(this.state.move)
    if (node == null){
      return
    }
    if (node.data.B != null) {
      var vertex = sgf.parseVertex(node.data.B[0])
      var sign = 1
    }
    else if (node.data.W != null) {
      var vertex = sgf.parseVertex(node.data.W[0])
      var sign = -1
    }
    else{
      return
    }
    let newBoard = this.state.board.set(vertex, 0)
    this.setState({board: newBoard})
    this.setState({move: this.state.move - 1})

  }

  moveNext(){
    var newmove = this.state.move + 1
    var node = tree.get(newmove)
    if (node == null){
      return
    }
    if (node.data.B != null) {
      var vertex = sgf.parseVertex(node.data.B[0])
      var sign = 1
    }
    else if (node.data.W != null) {
      var vertex = sgf.parseVertex(node.data.W[0])
      var sign = -1
    }
    else{
      return
    }
    let newBoard = this.state.board.makeMove(sign, vertex)
    this.setState({board: newBoard})
    this.setState({move: newmove})

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
    h('button', {
      type: 'button',
      onClick: evt => {
        this.movePrevious()
      }
    }, '<'),
    h('button', {
      type: 'button',
      onClick: evt => {
        this.moveNext()

      }
    }, '>'),
    h('span',{},this.state.move)


		);
	}
}
