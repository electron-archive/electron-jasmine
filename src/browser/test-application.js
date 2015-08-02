var ApplicationWindow = require('./application-window')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var app = require('app')
var path = require('path')
var async = require('async');

var TestApplication = function(options) {
  this.window = null
  this.options = options || {}
  var argv = this.getArgv()

  if (!this.options.specDirectory) {
    if (argv._.length)
      this.options.specDirectory = argv._[0]
    if (argv.renderer)
      this.options.specDirectory = argv.renderer
  }

  if (!this.options.browserSpecDirectory) {
    if (argv.browser)
      this.options.browserSpecDirectory = argv.browser
  }

  // Report crashes to our server.
  require('crash-reporter').start()
}

TestApplication.prototype.start = function() {
  var self = this
  async.waterfall([
    function(callback) {
      if (self.options.browserSpecDirectory)
        self.runBrowserSpecs(function(exitCode){
          callback(null, exitCode)
        })
      else
        callback(null, 0)
    },
    function(browserExitCode, callback) {
      console.log('2 ex', browserExitCode);
      if (self.options.specDirectory) {
        ipc.on('renderer-specs-finished', function(event, exitCode) {
          console.log('3 ex', browserExitCode || exitCode);
          callback(null, browserExitCode || exitCode)
        })
        app.on('ready', function() {
          console.log('ready', browserExitCode);
          self.startRendererTerminalRunner()
        })
      }
      else
        callback(null, browserExitCode)
    },
    function(exitCode) {
      console.log('4 ex', exitCode);
      self.exit()
    }
  ])
}

TestApplication.prototype.getArgv = function() {
  return require('yargs').argv
}

TestApplication.prototype.log = function(str) {
  process.stderr.write(str)
}

TestApplication.prototype.exit = function(exitCode) {
  app.emit('will-exit')
  process.exit(exitCode)
}

TestApplication.prototype.runBrowserSpecs = function(callback) {
  var options = {
    specDirectory: this.options.browserSpecDirectory
  }
  this.callSpecRunner(options, this.log, callback)
}


TestApplication.prototype.callSpecRunner = function(options, log, callback) {
  var SpecRunner = require('../spec-runner')
  SpecRunner.run(options, this.log, callback)
}

TestApplication.prototype.startRendererTerminalRunner = function() {
  var htmlPath = path.resolve(__dirname, "..", "terminal-runner", "index.html")
  this.window = new ApplicationWindow(htmlPath, {show: false}, this.options)
}

module.exports = TestApplication
