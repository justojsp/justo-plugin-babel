//imports
const path = require("path");
const babel = require("../../../dist/es5/nodejs/justo-plugin-babel/lib/babel");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;

//suite
describe("#babel()", function() {
  const SRC_DIR = new Dir("test/unit/data");
  const DST_DIR = new Dir(Dir.TMP_DIR, Date.now());

  beforeEach(function() {
    DST_DIR.create();
  });

  afterEach(function() {
    DST_DIR.remove();
  });

  it("babel() - ok", function() {
    babel([{
      comments: false,
      retainLines: true,
      presets: ["es2015"],
      files: {
        [path.join(DST_DIR.path, "a.js")]: path.join(SRC_DIR.path, "a.js"),
        [path.join(DST_DIR.path, "b.js")]: path.join(SRC_DIR.path, "b.js")
      }
    }]).must.be.eq(0);

    file(DST_DIR.path, "a.js").must.exist();
    file(DST_DIR.path, "a.js").text.must.contain("hello");
    file(DST_DIR.path, "b.js").must.exist();
    file(DST_DIR.path, "b.js").text.must.contain("bye");
  });

  it("babel() - destination directory not existing", function() {
    babel([{
      presets: ["es2015"],
      files: {
        [path.join(DST_DIR.path, "unknown", "a.js")]: path.join(SRC_DIR.path, "a.js")
      }
    }]);
  });

  it("babel() - unknown file", function() {
    babel.must.raise(/unknown\.js doesn't exist/, [{
      files: {
        [path.join(DST_DIR.path, "unknown.js")]: path.join(SRC_DIR.path, "unknown.js")
      }
    }]);
  });

  it("babel() - syntax error", function() {
    babel.must.raise(/SyntaxError/, [{
      presets: ["es2015"],
      files: {
        [path.join(DST_DIR.path, "error.js")]: path.join(SRC_DIR.path, "error.js")
      }
    }]);
  });
});
