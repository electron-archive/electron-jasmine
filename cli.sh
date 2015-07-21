#!/bin/bash
ELECRON_PATH="./node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron"
$ELECRON_PATH . --executed-from="$(pwd)" --pid=$$ "$@"
exit $?
