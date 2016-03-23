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
  const SRC = "test/unit/data";
  var DST_DIR, DST;

  init("*", function() {
    DST_DIR = fs.Dir.createTmpDir();
    DST = DST_DIR.path;
  });

  fin("*", function() {
    DST_DIR.remove();
  });

  test("babel() - {src} - without dst", function() {
    babel.must.raise("Expected 'dst' property.", [[{src: path.join(SRC, "a.js")}]]);
  });

  test("babel() - {src, dst} - without files", function() {
    babel([{
      src: path.join(SRC, "valid/a.js"),
      dst: path.join(DST, "aa.js")
    }]).must.be.eq(1);

    file(DST, "aa.js").must.contain("hello");
  });

  test("babel() - transpile file to file", function() {
    babel([{
      src: path.join(SRC, "valid/a.js"),
      dst: path.join(DST, "aa.js")
    }]).must.be.eq(1);

    file(DST, "aa.js").must.contain("hello");
  });

  test("babel() - transpile file to dir/", function() {
    babel([{
      src: path.join(SRC, "valid/a.js"),
      dst: DST + "/"
    }]).must.be.eq(1);

    file(DST, "a.js").must.contain("hello");
  });

  test("babel() - transpile files to dir/", function() {
    babel([{
      src: [path.join(SRC, "valid/a.js"), path.join(SRC, "valid/b.js")],
      dst: DST + "/"
    }]).must.be.eq(2);

    file(DST, "a.js").must.contain("hello");
    file(DST, "b.js").must.contain("bye");
  });

  test("babel() - transpile dir to dir", function() {
    babel([{
      src: path.join(SRC, "valid"),
      dst: DST
    }]).must.be.eq(2);

    file(DST, "a.js").must.contain("hello");
    file(DST, "b.js").must.contain("bye");
  });

  test("babel() - transpile dir to dir/", function() {
    babel([{
      src: path.join(SRC, "valid"),
      dst: DST + "/"
    }]).must.be.eq(2);

    file(DST, "valid", "a.js").must.contain("hello");
    file(DST, "valid", "b.js").must.contain("bye");
  });

  test("babel() - {files: object[]}", function() {
    babel([{
      files: [
        {src: path.join(SRC, "valid/a.js"), dst: DST + "/"},
        {src: path.join(SRC, "valid/b.js"), dst: DST + "/"}
      ]
    }]).must.be.eq(2);

    file(DST, "a.js").must.contain("hello");
    file(DST, "b.js").must.contain("bye");
  });

  test("babel() - {comments: true}", function() {
    babel([{
      comments: true,
      src: path.join(SRC, "valid/a.js"),
      dst: path.join(DST, "aa.js")
    }]).must.be.eq(1);

    file(DST, "aa.js").must.contain(["hello", "comment"]);
  });

  test("babel() - {comments: false}", function() {
    babel([{
      comments: false,
      src: path.join(SRC, "valid/a.js"),
      dst: path.join(DST, "aa.js")
    }]).must.be.eq(1);

    file(DST, "aa.js").must.contain("hello");
    file(DST, "aa.js").must.not.contain("comment");
  });

  test("babel() - {ignore: string}", function() {
    babel([{
      ignore: path.join(SRC, "valid/a.js"),
      src: path.join(SRC, "valid/"),
      dst: DST + "/"
    }]).must.be.eq(1);

    file(DST, "valid/a.js").must.not.exist();
    file(DST, "valid/b.js").must.exist();
  });

  test("babel() - {ignore: RegExp}", function() {
    babel([{
      ignore: /a\.js$/,
      src: path.join(SRC, "valid/"),
      dst: DST + "/"
    }]).must.be.eq(1);

    file(DST, "valid/a.js").must.not.exist();
    file(DST, "valid/b.js").must.exist();
  });

  test("babel() - unknown file", function() {
    babel([{
      src: path.join(SRC, "unknown.js"),
      dst: path.join(DST, "unknown.js")
    }]).must.be.eq(0);
  });

  test("babel() - syntax error", function() {
    babel.must.raise(SyntaxError, [[{
      src: path.join(SRC, "error.js"),
      dst: path.join(DST, "error.js")
    }]]);
  });
})();
