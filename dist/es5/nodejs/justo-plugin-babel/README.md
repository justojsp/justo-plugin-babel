[![Build Status](https://travis-ci.org/justojsp/justo-plugin-babel.svg)](https://travis-ci.org/justojsp/justo-plugin-babel)

Simple task to run the `babel` command.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-babel
```

Dependencies (Babel 6.0+):

```
npm install -g babel-cli
```

## Use

```
const babel = require("justo-plugin-babel");
```

To run `babel`, the task must be called as follows:

```
babel(opts, config) : number
```

Configuration object:

- `comments` (boolean). Add comments to the output: `true`, yep; `false`, nope. Default: `true`.
- `files` or `src` (object). The files to compile. The keys are the destinations; and the values, the sources.
- `presets` (string[]). Presets to load and use.
- `plugins` (string[]). Plugins to load and use.
- `retainLines` (boolean). Retain line numbers: `true`, yep, `false`, nope. Default: `false`.

Example:

```
babel("Build", {
  preset: ["es2015"],
  plugins: [],
  comments: false,
  retainLines: true,
  src: {
    "build/es5/lib/index.js": "lib/index.js",
    "build/es5/lib/module.js": "lib/module.js"
  }
});
```
