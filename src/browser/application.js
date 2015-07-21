var ApplicationWindow = require('./application-window')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var app = require('app')
var path = require('path')
var argv = require('yargs').argv

var Application = function(options) {
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

  this.windows = []
}

Application.prototype.openWindow = function() {
  var args = {
    paths: argv._
  }
  var win = new ApplicationWindow(path.resolve(__dirname, "..", "main-window", "index.html"), {show: false}, args)
  this.addWindow(win)
}

// Public: Removes the window from the global window list.
Application.prototype.removeWindow = function(window) {
  this.windows.splice(this.windows.indexOf(window), 1)
}

// Public: Adds the window to the global window list.
Application.prototype.addWindow = function(window) {
  var self = this
  this.windows.push(window)
  window.on("closed", function() {
    self.removeWindow(window)
  })
}

module.exports = Application
