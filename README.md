# Electron Jasmine

Run Jasmine 2.4.1 specs in an Electron window. This could be useful if:

* Your specs interact with browser or Electron APIs.
* You want to debug your specs with the Chrome Developer Tools or visualize their output with HTML.

This is a minimal implementation and just wraps the standard `jasmine` module in to get it running inside an Electron window.  Results are be reported to the terminal. If you want to *see* the document or mess with dev tools, pass the `--interactive` flag.

### Installing

This module can be installed globally:

```bash
npm install -g electron-jasmine
```

It can also be installed as a dev dependency:

```bash
npm install --save-dev electron-jasmine
```

### Running Specs

Run the `electron-jasmine` command in the root of your project. It will look for configuration in `spec/support/jasmine.json`.

```bash
cd my-module
electron-jasmine
```
You can also specify paths to specific spec files you want to run:

```bash
cd my-module
electron-jasmine spec/my-spec.js
```

If you want to use the developer tools or look at HTML output, run your specs in **interactive mode** by passing `--interactive` or `-i`.

```bash
cd my-module
electron-jasmine --interactive
```

The `--filter=` and `--stop-on-failure=true|false` flags are passed through to Jasmine and work as expected.

### Things That Need Improvement

* Improve the usage output on the CLI. We're forwarding to the Jasmine command in the render process, but it doesn't seem to be making its way back out to the terminal. Maybe we should just do our own usage in the browser process.
* Pass through the `JASMINE_CONFIG_PATH` environment variable.
* Use an HTML-based spec reporter in interactive mode. Jasmine's default HTML reporter was a pain to get working in a Node environment without polluting globals.
