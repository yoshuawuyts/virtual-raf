const virtualPatch = require('virtual-dom/patch')
const virtualDiff = require('virtual-dom/diff')
const assert = require('assert')
const isDom = require('is-dom')
const raf = require('raf')

module.exports = virtualRaf

// create a RAF loop
// virtualRaf(Object:tree, HTMLElement:rootNode, Object?:opts, Function:cb)
// => String:rafIdentifier
function virtualRaf (tree, rootNode, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  const diff = opts.diff || virtualDiff
  const patch = opts.patch || virtualPatch

  assert.equal(typeof tree, 'object')
  assert(isDom(rootNode), 'not a dom node')
  assert.equal(typeof opts, 'object')
  assert.equal(typeof cb, 'function')

  return raf(function tick () {
    const nwTree = cb()
    const patches = diff(tree, nwTree)
    rootNode = patch(rootNode, patches)
    tree = nwTree
    raf(tick)
  })
}
