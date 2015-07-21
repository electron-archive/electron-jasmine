var ApplicationWindow = require('./application-window')
var ipc = require('ipc')
var BrowserWindow = require('browser-window')
var app = require('app')

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
  var win = new ApplicationWindow("file://" + __dirname + "/../main-window/index.html", {width: 1200, height: 800})
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
