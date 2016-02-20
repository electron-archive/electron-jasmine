'use strict'

const ipcRenderer = require('electron').ipcRenderer
const Jasmine = require('jasmine')
const JasmineCommand = require('jasmine/lib/command.js')

ipcRenderer.on('execute-specs', function (sender, data) {
  executeSpecs(data.workingDirectory, data.commandLineArguments)
})

function executeSpecs (workingDirectory, commandLineArguments) {
  const jasmine = new Jasmine({projectBaseDir: workingDirectory})

  // report to dev tools console
  jasmine.configureDefaultReporter({
    showColors: false,
    print: console.log.bind(console)
  })

  // report to launching terminal via stdout
  jasmine.configureDefaultReporter({
    showColors: true,
    print: process.stdout.write.bind(process.stdout)
  })

  jasmine.onComplete(function(passed) {
    ipcRenderer.send('specs-completed', passed)
  })

  const command = new JasmineCommand(workingDirectory, null, process.stdout.write.bind(process.stdout))
  command.run(jasmine, commandLineArguments)
}
