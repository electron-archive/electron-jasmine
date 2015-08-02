var path = require('path')
var util = require('util')
var Jasmine = require('jasmine')

// * `options`
//   * `specDirectory` {Array}
//   * `requires` {Array}
var run = function(options, log, callback) {
  if (!options || !options.specDirectory){
    log('No spec directory specified\n')
    return callback(1)
  }

  var jasmine = new Jasmine()
  jasmine.loadConfig({
    timer: new global.jasmine.Timer(),
    spec_dir: options.specDirectory,
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
      callback(0)
    else
      callback(1)
  })

  jasmine.configureDefaultReporter({
    showColors: true,
    print: function() {
      log(util.format.apply(util, arguments))
    }
  })

  if (options.requires)
    for (var req of options.requires)
      require(req)

  try {
    jasmine.execute()
  } catch (e) {
    var redStart = '\u001b[31m'
    var yellowStart = '\u001b[33m'
    var end = '\u001b[39m'
    log(yellowStart + 'ERROR executing specs:\n' + end)
    log(redStart + e.stack + '\n' + end)
    callback(1)
  }
};

module.exports = {run: run}
