#!/bin/bash
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

ELECRON_PATH="$DIR/node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron"
if [ ! -f "$ELECRON_PATH" ]; then
  ELECRON_PATH="$DIR/../electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron"
fi

$ELECRON_PATH $DIR --executed-from="$(pwd)" --pid=$$ "$@"
exit $?
