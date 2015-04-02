const virtualPatch = require('virtual-dom/patch')
const virtualDiff = require('virtual-dom/diff')
const isDom = require('is-dom')
const raf = require('raf')

module.exports = virtualRaf

function virtualRaf (tree, rootNode, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  const diff = opts.diff || virtualDiff
  const patch = opts.patch || virtualPatch

  assert.equals(typeof tree, 'object')
  assert(isDom(rootNode))
  assert.equals(typeof cb, 'function')

  raf(function tick () {
    const nwTree = cb()
    const patches = diff(tree, nwTree)
    rootNode = patch(rootNode, patches)
    tree = nwTree
    raf(tick)
  })
}

