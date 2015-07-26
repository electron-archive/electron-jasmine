var url = require('url')
var Menu = require('menu')
var BrowserWindow = require('browser-window')

var ApplicationWindow = function(indexPath, options, args) {
  this.window = new BrowserWindow(options)
  var indexUrl = url.format({
    protocol: 'file',
    pathname: indexPath,
    slashes: true,
    hash: encodeURIComponent(JSON.stringify(args))
  })
  this.window.loadUrl(indexUrl)
}

ApplicationWindow.prototype.on = function() {
  this.window.on.apply(this.window, Array.prototype.slice.call(arguments, 0))
}

module.exports = ApplicationWindow
