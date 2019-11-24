import { h, Component } from 'preact';
import {Goban} from '@sabaki/shudan';
const Board = require('@sabaki/go-board');
const sgf = require('@sabaki/sgf')
const GameTree = require('@sabaki/immutable-gametree')

import style from '@sabaki/shudan/css/goban.css';

// According to the tests found in https://github.com/SabakiHQ/sgf/blob/master/tests/parse.test.js the following should works but it produce a JS error - @awea 20191123
let rootNodes = sgf.parse('(;B[aa]SZ[19];B[dp];W[pq]C[somecomments on move 2];B[dd];W[qc]C[somecomments on move 4];B[qo];B[ch];W[cq];B[cp];W[dq];B[eq];W[er])')
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

class Commentbox extends Component {
  render(){
    return (<div>{this.props.comment}</div>)
  }
}

class MoveNumberbox extends Component{
  render(){
    return (<div>{this.props.moveNumber}</div>)
  }
}



export default class App extends Component {
   constructor(props) {
        super(props)

        this.state = {
            board: new Board(signMap),
            vertexSize: 24,
            move : 0,
            tree: tree,
            comment: "",
        }
    }

  updateComment(n){
    // update comment for move n
    var node = this.state.tree.get(n)
    if (node == null){
      return
    }
    if (node.data.C != null) {
      this.setState({comment: node.data.C})
    }
    else{
      this.setState({comment: ""})
    }
  }

  playMove(n, cancel=false){
    // play the move number n.
    // if cancel is true, we cancel the said move
    // update state board, move and comment
    var node = this.state.tree.get(n)
    if (node == null){
      return
    }
    // play move
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
    if (cancel) {
      var newBoard = this.state.board.set(vertex, 0)
      this.setState({move: n - 1})
      this.updateComment(n - 1)
    }
    else {
      var newBoard = this.state.board.makeMove(sign, vertex)
      this.setState({move: n})
      this.updateComment(n)

    }

    this.setState({board: newBoard})
  }

  movePrevious(){
    this.playMove(this.state.move, true)
  }

  moveNext(){
    this.playMove(this.state.move + 1)
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
    <MoveNumberbox moveNumber={this.state.move}/>,

    <Commentbox comment={this.state.comment}/>,

		);
	}
}
