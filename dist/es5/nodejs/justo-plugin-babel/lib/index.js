//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _justo = require("justo");

//api
exports["default"] = (0, _justo.task)("org.justojs", "babel", require("./babel"));
module.exports = exports["default"];
