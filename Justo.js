//imports
const os = require("os");
const catalog = require("justo").catalog;
const simple = require("justo").simple;
const fs = require("justo-fs");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;
const cli = require("justo-plugin-cli");

//works
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  jshint("Best practices", {
    output: true,
    src: [
      "index.js",
      "lib/op.js"
    ]
  });

  cli("Transpile", {
    cmd: /^win/.test(os.platform()) ? "babel.cmd" : "babel",
    args: [
      "--presets", "es2015",
      "--retain-lines",
      "--no-comments",
      "-d", "build/es5",
      "index.js",
      "lib/op.js"
    ]
  });

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-plugin-babel/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-plugin-babel/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/justo-plugin-babel"
    }
  );
});

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-babel"
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
