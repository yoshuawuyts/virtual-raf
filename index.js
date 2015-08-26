const assert = require('assert')
const raf = require('raf')

module.exports = virtualRaf

// create a RAF loop
// (obj, fn, obj) -> fn -> obj
function virtualRaf (state, view, vdom) {
  assert.equal(typeof state, 'object')
  assert.equal(typeof view, 'function')
  assert.equal(typeof vdom, 'object')

  const create = vdom.create
  const patch = vdom.patch
  const diff = vdom.diff

  var tree = view(state)
  var target = create(tree)

  var inRenderingTransaction = false
  var redrawScheduled = false
  var currentState = null

  render.render = render
  render.update = update
  return render

  // return the vdom tree
  // null -> obj
  function render () {
    return target
  }

  // update the state and render function
  // (obj, fn?) -> null
  function update (state, nwRender) {
    if (inRenderingTransaction) throw new Error('infinite loop detected')
    if (nwRender) view = nwRender

    if (!currentState && !redrawScheduled) raf(redraw)
    currentState = state

    function redraw () {
      redrawScheduled = false

      if (!currentState) return

      inRenderingTransaction = true
      var newTree = view(currentState)
      const patches = diff(tree, newTree)
      inRenderingTransaction = false

      target = patch(target, patches)
      tree = newTree
      currentState = null
    }
  }
}
