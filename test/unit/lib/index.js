//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;

//suite
suite("#babel", function() {
  test("babel", function() {
    const babel = require("../../../dist/es5/nodejs/justo-plugin-babel");

    babel.must.be.instanceOf(Function);
    babel.toString().must.contain("runSimpleTask");
  });
})();
