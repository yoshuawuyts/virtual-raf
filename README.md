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
const createElement = require('virtual-dom/create-element')
const virtualRaf = require('virtual-raf')
const h = require('virtual-dom/h')

// 1: Create a function that declares what the DOM should look like
const divStyle = {border: '1px solid red', height: (100 + count) + 'px'}
function render(count)  {
  return h('div', {style: divStyle}, [String(count)])
}

// 2: Initialise the document
var count = 0      // We need some app data. Here we just store a count.

var tree = render(count)               // We need an initial tree
var rootNode = createElement(tree)     // Create an initial root DOM node ...
document.body.appendChild(rootNode)    // ... and it should be in the document

// 3: Wire up the update logic
virtualRaf(tree, rootNode, () => render(count))
```

## See Also
- [main-loop](https://github.com/Raynos/main-loop) - A rendering loop for diffable UIs

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
