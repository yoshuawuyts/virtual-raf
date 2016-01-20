const assert = require('assert')
const raf = require('raf')

module.exports = virtualRaf

// create a RAF loop
// (obj, fn, obj) -> fn -> obj
function virtualRaf (state, view, vdom) {
  state = state || {}

  assert.equal(typeof state, 'object')
  assert.equal(typeof view, 'function')
  assert.equal(typeof vdom, 'object')

  var inRenderingTransaction = false
  var redrawScheduled = false
  var currentState = null
  var target = null
  var tree = null

  return { render: render, update: update }

  // return the vdom tree
  // null -> obj
  function render () {
    tree = view(state)
    target = vdom.create(tree)
    return target
  }

  // update the state and render function
  // obj -> null
  function update (state) {
    assert.ifError(inRenderingTransaction, 'infinite loop detected')

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true

      raf(function redraw () {
        redrawScheduled = false
        if (!currentState) return

        inRenderingTransaction = true
        var newTree = view(currentState)
        const patches = vdom.diff(tree, newTree)
        inRenderingTransaction = false

        target = vdom.patch(target, patches)
        tree = newTree
        currentState = null
      })
    }

    // update data for redraw
    currentState = state
  }
}
