const vdom = require('virtual-dom')
const h = require('virtual-dom/h')
const test = require('tape')
const raf = require('raf')

global.window = {}
function render (state) {
  return h('div', [state.text])
}

const vraf = require('./')

test('vraf() should return a tree', function (t) {
  t.plan(1)
  const tree = vraf({}, render, vdom)
  t.equal(typeof tree, 'object')
})

test('.render() should render to a dom node', function (t) {
  t.plan(2)
  const state = { text: 'hello world' }
  const tree = vraf(state, render, vdom)
  const node = tree.render()
  t.equal(typeof node, 'object')
  t.equal(node.childNodes[0].data, 'hello world')
})

test('.update() should update values', function (t) {
  t.plan(4)

  const state = { text: 'hello world' }
  const tree = vraf(state, render, vdom)
  const node = tree.render()

  t.equal(typeof node, 'object')
  t.equal(node.childNodes[0].data, 'hello world')

  tree.update({ text: 'beep boop' })

  raf(function () {
    t.equal(typeof node, 'object')
    t.equal(node.childNodes[0].data, 'beep boop')
  })
})

test('.update() should do nothing if no data is passed', function (t) {
  t.plan(4)
  const state = { text: 'hello world' }
  const tree = vraf(state, render, vdom)
  const node = tree.render()
  t.equal(typeof node, 'object')
  t.equal(node.childNodes[0].data, 'hello world')

  tree.update()

  raf(function () {
    t.equal(typeof node, 'object')
    t.equal(node.childNodes[0].data, 'hello world')
  })
})
