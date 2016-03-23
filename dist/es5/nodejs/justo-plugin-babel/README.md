[![Build Status](https://travis-ci.org/justojsp/justo-plugin-babel.svg)](https://travis-ci.org/justojsp/justo-plugin-babel)

Plugin for running *Babel*.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-babel
```

## Use

```
const babel = require("justo-plugin-babel");
```

To run `babel`, the task must be called as follows:

```
babel(opts, config) : number
```

The task returns the number of transpiled files.

`config` properties:

- `comments` (boolean). Add comments to the output: `true`, yep; `false`, nope. Default: `true`.
- `files` (object[]). The files to compile:
  - `src` (string or string[]). The files to compile.
  - `dst` (string). The output.
- `presets` (string[]) or `preset` (string). Presets to load and use.
- `plugins` (string[]) or `plugin` (string). Plugins to load and use.
- `retainLines` (boolean). Retain line numbers: `true`, yep, `false`, nope. Default: `false`.
- `compact` (boolean). Compact the output, not including superfluous whitespaces and line terminators? Default: `false`.
- `babelrc` (boolean). Use `.babelrc` and `.babelignore` files? Default: `true`.
- `ignore` (string, RegExp, object[]). Ignore the given files?

Examples:

```
//index.js -> build/es5/index.js
//lib/* -> build/es5/lib/*
babel("Build", {
  presets: ["es2015"],
  comments: false,
  retainLines: true,
  files: [
    {src: "index.js", dst: "build/es5/index.js"},
    {src: "lib/", dst: "build/es5/"}
  ]
});

//index.js -> build/es5/index.js
//lib/* -> build/es5/lib/*
babel("Build", {
  preset: "es2015",
  comments: false,
  retainLines: true,
  files: {
    src: ["index.js", "lib/"],
    dst: "build/es5/"
  }
});

//index.js -> build/es5/index.js
//lib/* -> build/es5/lib/*
babel("Build", {
  preset: "es2015",
  comments: false,
  retainLines: true,
  src: ["index.js", "lib/"],
  dst: "build/es5/"
});
```
