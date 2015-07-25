var TestApplication = require('./src/browser/test-application')

// FIXME: crappy way to tell if it's being run standalone or required
if(!module.parent || !module.parent.parent || !module.parent.parent.children) {
  require('electron-compile').init()
  new TestApplication
}
else {
  module.exports = {
    TestApplication: TestApplication
  }
}
