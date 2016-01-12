//imports
const register = require("justo").register;
const simple = require("justo").simple;
const fs = require("justo-fs");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jshint = require("justo-plugin-jshint");

//works
register({name: "build", desc: "Build the package."}, function() {
  clean.ignore("Clean build directory", {
    dirs: ["build/es5"]
  });

  jshint("Best practices", {
    output: true,
    files: [
      "lib/babel.js",
      "lib/index.js"
    ]
  });

  simple("Transpile", function() {
    var babel;

    if (fs.exists("./dist/es5/nodejs/justo-plugin-babel")) babel = require("./dist/es5/nodejs/justo-plugin-babel/lib/babel");
    else babel = require("./build/es5/lib/babel");

    babel([{
      comments: false,
      retainLines: true,
      files: {
        "build/es5/lib/index.js": "lib/index.js",
        "build/es5/lib/babel.js": "lib/babel.js"
      }
    }]);
  })();

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
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

register({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: [
    "test/unit/lib/babel.js",
    "test/unit/lib/index.js"
  ]
});

register("default", ["build", "test"]);
