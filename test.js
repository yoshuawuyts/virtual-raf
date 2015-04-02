const domStub = require('dom-stub')
const test = require('tape')
const raf = require('raf')
const virtualRaf = require('./')

global.window = {}

test('should assert input types', function (t) {
  t.plan(5)
  t.throws(virtualRaf, /object/)
  t.throws(virtualRaf.bind(null, {}, 'nodom'), /not a dom node/)
  t.throws(virtualRaf.bind(null, {}, domStub(), {}), /function/)
  t.doesNotThrow(function () {
    const id = virtualRaf({}, domStub(), function () {})
    raf.cancel(id)
  })
  t.doesNotThrow(function () {
    const id = virtualRaf({}, domStub(), {}, function () {})
    raf.cancel(id)
  })
})
