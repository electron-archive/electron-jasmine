require('electron-compile').init();

var util = require('util')
var remote = require('remote')
var Jasmine = require('jasmine')
var browserStderr = remote.getGlobal('process').stderr

var hash = window.location.hash.slice(1)
var args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

var run = function() {
  if (args.paths.length === 0){
    browserStderr.write('No paths specified\n')
    return exit(1)
  }

  var jasmine = window.jasmine = new Jasmine();
  jasmine.loadConfig({
    spec_dir: args.paths[0],
    spec_files: [
      '*[sS]pec.coffee',
      '*[sS]pec.js'
    ],
    helpers: [
      '*[hH]elper.coffee',
      '*[hH]elper.js'
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
        log(util.format.apply(this, arguments));
      }
  })

  jasmine.execute()
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
