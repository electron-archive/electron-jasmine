var path = require('path')
var util = require('util')
var remote = require('remote')
var browserStderr = remote.getGlobal('process').stderr
var SpecRunner = require('../spec-runner')
var ipc = require('ipc')

var hash = window.location.hash.slice(1)
var args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

try {
  // HACK: For some reason, when this is included as an NPM, electron-compile
  // isnt getting setup for the renderer processes when `init` is invoked in the
  // browser's main file.
  require('electron-compile').init()
} catch (e) {}

var exit = function(status) {
  ipc.send('renderer-specs-finished', status)
}

var log = function(str) {
  // FIXME: UGH, writing to process.stdout fails, and process.stderr is silent
  // process.stdout.write(str)
  browserStderr.write(str)
}

var options = {
  specDirectory: args.specDirectory,
  requires: [path.join(__dirname, '..', 'renderer-spec-helper.js')]
}

SpecRunner.run(options, log, exit)
