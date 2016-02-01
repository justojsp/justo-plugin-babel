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
- `files` (object[]). The files to compile:
  - `src` (string or string[]). The files to compile.
  - `dst` (string). The output.
- `presets` (string[]) or `preset` (string). Presets to load and use.
- `plugins` (string[]) or `plugin` (string). Plugins to load and use.
- `retainLines` (boolean). Retain line numbers: `true`, yep, `false`, nope. Default: `false`.

The `dst` can be a file or a directory. When a file is specified, all files are compiled to this
file. If a directory is specified, the files are compiled into this directory. To indicate
a directory, it must ended with `/`.

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

//lib/a.js + lib/b.js -> build/es/ab.js
babel("Build", {
  src: ["lib/a.js", "lib/b.js"],
  dst: "build/es/ab.js"
});
```
