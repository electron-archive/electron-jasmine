'use strict'

const electron = require('electron')
const app = electron.app  // Module to control application life.
const BrowserWindow = electron.BrowserWindow  // Module to create native browser window.
const ipcMain = electron.ipcMain
const interactive = require('yargs')
  .boolean('interactive')
  .alias('i', 'interactive')
  .argv.interactive

let mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()

  // When the window finishes loading, send it the working directory and
  // command-line arguments. Exclude `--interactive` option since it confuses
  // Jasmine.
  const commandLineArguments = process.argv.slice(2).filter(arg => !arg.match(/^(-i|--interactive)$/))
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('execute-specs', {
      workingDirectory: process.cwd(),
      commandLineArguments: commandLineArguments
    })
  })

  // When not in interactive mode, don't show the window and exit with an exit
  // code when the spec run is completed.
  if (!interactive) {
    mainWindow.hide()
    ipcMain.on('specs-completed', function (event, specsPassed) {
      let exitCode = specsPassed ? 0 : 1
      process.exit(exitCode)
    })
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})
