var ApplicationWindow = require('./application-window')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var app = require('app')
var path = require('path')
var async = require('async');

var TestApplication = function(options) {
  this.window = null
  this.options = options || {}

  if (!this.options.specDirectory) {
    var argv = this.getArgv()
    if (argv._.length)
      this.options.specDirectory = argv._[0]
  }

  if (!this.options.specDirectory) {
    console.error('No specs specified. Exiting.')
    this.exit(1)
  }

  var self = this
  async.waterfall([
    function(callback) {
      ipc.on('renderer-specs-finished', function(event, exitCode) {
        callback(null, exitCode)
      })
      app.on('ready', function() {
        self.startRendererTerminalRunner()
      })
    },
    function(exitCode) {
      self.exit(exitCode)
    }
  ])
}

TestApplication.prototype.getArgv = function() {
  return require('yargs').argv
}

TestApplication.prototype.exit = function(exitCode) {
  app.emit('will-exit')
  process.exit(exitCode)
}

TestApplication.prototype.startRendererTerminalRunner = function() {
  var htmlPath = path.resolve(__dirname, "..", "terminal-runner", "index.html")
  this.window = new ApplicationWindow(htmlPath, {show: false}, this.options)
}

module.exports = TestApplication
