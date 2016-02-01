//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const fs = require("justo-fs");
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const babel = require("../../../dist/es5/nodejs/justo-plugin-babel/lib/op").default;

//suite
suite("#babel()", function() {
  const SRC_DIR = "test/unit/data";
  const DST_DIR = path.join(fs.Dir.TMP_DIR, Date.now().toString(), "/");

  init("*", function() {
    new fs.Dir(DST_DIR).create();
  });

  fin("*", function() {
    fs.remove(DST_DIR);
  });

  test("babel() - {src} - without dst", function() {
    babel.must.raise("Expected 'dst' property.", [[{src: path.join(SRC_DIR, "a.js")}]]);
  });

  test("babel() - {src, dst} - without files", function() {
    babel([{
      src: path.join(SRC_DIR, "a.js"),
      dst: path.join(DST_DIR, "aa.js")
    }]).must.be.eq(0);

    file(DST_DIR, "aa.js").must.contain("hello");
  });

  test("babel() - transpile file to file", function() {
    babel([{
      files: {
        src: path.join(SRC_DIR, "a.js"),
        dst: path.join(DST_DIR, "aa.js")
      }
    }]).must.be.eq(0);

    file(DST_DIR, "aa.js").must.contain("hello");
  });

  test("babel() - transpile files to file", function() {
    babel([{
      files: {
        src: [path.join(SRC_DIR, "a.js"), path.join(SRC_DIR, "b.js")],
        dst: path.join(DST_DIR, "ab.js")
      }
    }]).must.be.eq(0);

    file(DST_DIR, "ab.js").must.contain(["hello", "bye"]);
  });

  test("babel() - transpile file to dir", function() {
    babel([{
      files: {
        src: path.join(SRC_DIR, "a.js"),
        dst: DST_DIR
      }
    }]).must.be.eq(0);

    file(DST_DIR, SRC_DIR, "a.js").must.contain("hello");
  });

  test("babel() - transpile files to dir", function() {
    babel([{
      files: {
        src: [path.join(SRC_DIR, "a.js"), path.join(SRC_DIR, "b.js")],
        dst: DST_DIR
      }
    }]).must.be.eq(0);

    file(DST_DIR, SRC_DIR, "a.js").must.contain("hello");
    file(DST_DIR, SRC_DIR, "b.js").must.contain("bye");
  });

  test("babel() - {files: object[]}", function() {
    babel([{
      files: [
        {src: path.join(SRC_DIR, "a.js"), dst: DST_DIR},
        {src: path.join(SRC_DIR, "b.js"), dst: DST_DIR}
      ]
    }]).must.be.eq(0);

    file(DST_DIR, SRC_DIR, "a.js").must.contain("hello");
    file(DST_DIR, SRC_DIR, "b.js").must.contain("bye");
  });

  test("babel() - {comments: true}", function() {
    babel([{
      comments: true,
      files: {
        src: path.join(SRC_DIR, "a.js"),
        dst: path.join(DST_DIR, "aa.js")
      }
    }]).must.be.eq(0);

    file(DST_DIR, "aa.js").must.contain("hello");
    file(DST_DIR, "aa.js").must.contain("comment");
  });

  test("babel() - {comments: false}", function() {
    babel([{
      comments: false,
      files: {
        src: path.join(SRC_DIR, "a.js"),
        dst: path.join(DST_DIR, "aa.js")
      }
    }]).must.be.eq(0);

    file(DST_DIR, "aa.js").must.contain("hello");
    file(DST_DIR, "aa.js").must.not.contain("comment");
  });

  test("babel() - unknown file", function() {
    babel.must.raise(/unknown\.js doesn't exist/, [[{
      files: {
        src: path.join(SRC_DIR, "unknown.js"),
        dst: path.join(DST_DIR, "unknown.js")
      }
    }]]);
  });

  test("babel() - syntax error", function() {
    babel.must.raise(/SyntaxError/, [[{
      files: {
        src: path.join(SRC_DIR, "error.js"),
        dst: path.join(DST_DIR, "error.js")
      }
    }]]);
  });
})();
