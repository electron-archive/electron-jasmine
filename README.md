# Electron Jasmine

Run your jasmine (2.3) specs in electron. You can:

* Run your electron app's specs
* Run specs for your node modules that need to use the DOM, or need electron-isms.

### Running Standalone

```bash
npm install --save-dev electron-jasmine
electron-jasmine ./spec-directory
```

![.](https://cloud.githubusercontent.com/assets/69169/8792820/7ff18c8e-2f21-11e5-9245-252ba4b380b1.png)

### Running Your Electron App's specs

You can integrate it into your app with the `TestApplication` export.

```js
var TestApplication = require('electron-jasmine').TestApplication
new TestApplication({specDirectory: 'spec'})
```

A practical example that makes your app accept a `--test` command line parameter:

```js
var path = require('path')
var argv = require('yargs')
  .default('test', false)
  .argv

if (argv.test) {
  require('electron-compile').init()
  var TestApplication = require('electron-jasmine').TestApplication
  new TestApplication({specDirectory: 'spec'})
}
else {
  require('electron-compile').init()
  var Application = require('./src/browser/application')
  new Application
}
```
