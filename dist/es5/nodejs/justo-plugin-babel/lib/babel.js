"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 







babel;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");function babel(params) {
  var cmd;


  if (params.length === 0) {
    files = {};} else 
  if (params.length >= 1) {
    params = params[0];}


  if (!params.files) params.files = {};
  if (params.src) params.files = params.src;
  if (!params.hasOwnProperty("comments")) params.comments = true;


  if (/^win/.test(_os2["default"].platform())) cmd = "babel.cmd";else 
  cmd = "babel";var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = Object.keys(params.files)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var dst = _step.value;
      var src = params.files[dst];
      var args = [];
      var res = undefined;


      dst = new _justoFs.File(dst);
      if (!dst.parent.exists()) dst.parent.create();
      dst = dst.path;


      if (!params.comments) args.push("--no-comments");
      if (params.presets) {
        args.push("--presets");
        args.push(params.presets.join(","));}

      if (params.plugins) {
        args.push("--plugins");
        args.push(params.plugins.join(","));}

      if (params.retainLines) args.push("--retain-lines");

      args.push("-o");
      args.push(dst);
      args.push(src);

      res = _child_process2["default"].spawnSync(cmd, args);

      if (res.error) throw res.error;
      if (res.status) throw new Error(res.stderr.toString());}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


  return 0;}module.exports = exports["default"];
