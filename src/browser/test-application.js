var ApplicationWindow = require('./application-window')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var app = require('app')
var path = require('path')

var TestApplication = function(options) {
  this.options = options || {}
  if (!this.options.specDirectory) {
    var argv = require('yargs').argv
    if (argv._.length)
      this.options.specDirectory = argv._[0]
  }

  var self = this
  global.application = this

  // Report crashes to our server.
  require('crash-reporter').start()

  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
      app.quit()
  })
  app.on('ready', function() {
    self.openWindow()
  })

  this.window = null
}

TestApplication.prototype.openWindow = function() {
  var htmlPath = path.resolve(__dirname, "..", "terminal-runner", "index.html")
  this.window = new ApplicationWindow(htmlPath, {show: false}, this.options)
}

module.exports = TestApplication
