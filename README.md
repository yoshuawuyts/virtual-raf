# virtual-raf
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Create a [`RAF`](https://github.com/chrisdickinson/raf) loop for
[`virtual-dom`](https://github.com/Matt-Esch/virtual-dom).

## Installation
```bash
$ npm install virtual-raf
```

## Usage
```js
const vraf = require('virtual-raf')
const vdom = require('virtual-dom')
const h = require('virtual-dom/h')

function render (state) {
  return h('div', [state.count])
}

const tree = vraf({ count: 1 }, render, vdom)
document.body.appendChild(tree())

tree.update({ count: 2 })
```

## API
### tree = vraf(state, render, vdom)
Create a `virtual-dom` tree based on a `state` and render function.

### tree()
Mount the `virtual-dom` tree on a DOM node. Alias: `tree.render()`,
`tree.target`.

### tree.update(state, [render])
Update the tree with an optional new state and render function.

## Why?
Because [`main-loop`](https://github.com/Raynos/main-loop) assumes a single
render function is used, while `virtual-dom` diffs trees, making it irrelevant
which rendering function is used. This makes `virtual-dom` play well with
decentralized routers.

## See Also
- [main-loop](https://github.com/Raynos/main-loop) - A rendering loop for diffable UIs
- [render-loop](https://github.com/azer/render-loop) - Async DOM render loop with virtual dom diffing and Hyperglue

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/virtual-raf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/virtual-raf
[travis-image]: https://img.shields.io/travis/yoshuawuyts/virtual-raf.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/virtual-raf
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/virtual-raf.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/virtual-raf?branch=master
[downloads-image]: http://img.shields.io/npm/dm/virtual-raf.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/virtual-raf
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
