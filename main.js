var path = require('path')
var fs = require('fs')
var cacheDir = path.join(__dirname, 'compile-cache')

var getEnvironment = function() {
  var environment = 'production'
  for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] == '--environment' && process.argv[i + 1]) {
      environment = process.argv[i + 1]
      break
    }
  }
  return environment
}

if (getEnvironment() == 'production' && fs.statSyncNoException(cacheDir)) {
  require('electron-compile').initForProduction(cacheDir)
}
else {
  console.log('In development mode')
  require('electron-compile').init()
}

var Application = require('./src/browser/application')
application = new Application
