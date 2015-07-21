var BrowserWindow = require('browser-window')
var app = require('app')
var Menu = require('menu')

var ApplicationWindow = function(path, options) {
  this.window = new BrowserWindow(options)
  this.window.loadUrl(path)
  // # @menu = Menu.buildFromTemplate(require('./menu-darwin')(app, @window))
  // # Menu.setApplicationMenu(@menu)
}

ApplicationWindow.prototype.on = function() {
  this.window.on.apply(this.window, Array.prototype.slice.call(arguments, 0))
}

module.exports = ApplicationWindow
