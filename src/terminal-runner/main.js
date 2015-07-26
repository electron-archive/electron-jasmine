var path = require('path')
var util = require('util')
var remote = require('remote')
var Jasmine = require('jasmine')
var browserStderr = remote.getGlobal('process').stderr

var hash = window.location.hash.slice(1)
var args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

try {
  // HACK: For some reason, when this is included as an NPM, electron-compile
  // isnt getting setup for the renderer processes when `init` is invoked in the
  // browser's main file.
  require('electron-compile').init()
} catch (e) {}

var run = function() {
  if (!args.specDirectory){
    browserStderr.write('No spec directory specified\n')
    return exit(1)
  }

  var jasmine = new Jasmine()
  jasmine.loadConfig({
    timer: new this.jasmine.Timer(),
    spec_dir: args.specDirectory,
    spec_files: [
      '**/*[sS]pec.coffee',
      '**/*[sS]pec.js'
    ],
    helpers: [
      '**/*[hH]elper.coffee',
      '**/*[hH]elper.js'
    ]
  })

  jasmine.onComplete(function(passed) {
    if(passed)
      exit(0)
    else
      exit(1)
  })

  jasmine.configureDefaultReporter({
    showColors: true,
    print: function() {
      log(util.format.apply(util, arguments))
    }
  })

  // The jasmine object that the specs will use
  window.jasmine = jasmine.jasmine

  // Require the global helper
  require(path.join(__dirname, '..', 'spec-helper.js'))

  try {
    jasmine.execute()
  } catch (e) {
    var redStart = '\u001b[31m'
    var yellowStart = '\u001b[33m'
    var end = '\u001b[39m'
    log(yellowStart + 'ERROR executing specs:\n' + end)
    log(redStart + e.message + '\n' + end)
    exit(1)
  }
}

var exit = function(status) {
  var app = remote.require('app')
  app.emit('will-exit')
  remote.process.exit(status)
}

var log = function(str) {
  // FIXME: UGH, writing to process.stdout fails, and process.stderr is silent
  // process.stdout.write(str)
  browserStderr.write(str)
}

run()
