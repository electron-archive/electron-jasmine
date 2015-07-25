// This is the global spec-helper. It will be added before any user
// spec-helper files.

var getContentNode = function() {
  return document.querySelector('#jasmine-content')
}

jasmine.attachToDOM = function(node) {
  getContentNode().appendChild(node)
}

afterEach(function() {
  getContentNode().innerHTML = ''
})
