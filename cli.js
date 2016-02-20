#!/usr/bin/env node
const electron = require('electron-prebuilt')
const proc = require('child_process')

// Spawn electron with 'lib/browser-process-main.js' as its browser process main script
// and pass through the remainder of process.argv
const args = [`${__dirname}/electron-app/browser-process-main.js`].concat(process.argv.slice(2))
const childProcess = proc.spawn(electron, args)

// forward output on stdout of the child process
childProcess.stdout.on('data', (data) => {
  process.stdout.write(data)
});

// forward the exit code of the child process
childProcess.on('exit', (code) => {
  process.exit(code)
})
