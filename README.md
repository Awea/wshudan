# wshudan

## What is that?
This project aim to build a goban widget that would be easy to integrate in any website to display a go Game.

It would be an alternative to the [wgo.js](http://wgo.waltheri.net/) library.

We are going to use sabaki libraries:

- [shudan](https://github.com/SabakiHQ/Shudan)
- [Go-board](https://github.com/SabakiHQ/go-board)
- [sgf](https://github.com/SabakiHQ/sgf)
- [immutable-gametree](https://github.com/SabakiHQ/immutable-gametree)

## Motivations
Why? one could ask!

- **Why not just use sabaki web branch?** It have been attempted and it's not that easy (see [this issue](https://github.com/SabakiHQ/Sabaki/issues/394)). Sabaki author advise us to iframe sabaki and we prefer to build a proper tool.
- **Why not use [wgo.js](http://wgo.waltheri.net/) or [glift](https://github.com/Kashomon/glift)?** Sadly wgo fail to display some sgfs and is hardly maintained. On the other hand we feel glift lack a proper API to interact with it (got to move/variation, highlight coordinate, ...).

## Setup
We assume you have a working nodejs 8.10.0.

Clone the repo: `git clone https://github.com/Awea/wshudan.git`

Install dependencies:`npm install`

Run the server: `make serve`

You can also build the js bundle with `make build`
