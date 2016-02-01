"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 







op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args;


  if (params.length === 0) {
    files = {};} else 
  if (params.length >= 1) {
    params = params[0];}


  if (!params.files) params.files = [];
  if (!(params.files instanceof Array)) params.files = [params.files];
  if (params.src) params.files = [{ src: params.src, dst: params.dst }];
  if (params.preset) params.presets = [params.preset];
  if (params.plugin) params.plugins = [params.plugin];
  if (!params.hasOwnProperty("comments")) params.comments = true;


  if (/^win/.test(_os2.default.platform())) cmd = "babel.cmd";else 
  cmd = "babel";

  args = [];
  if (!params.comments) args.push("--no-comments");
  if (params.presets) {
    args.push("--presets");
    args.push(params.presets.join(","));}

  if (params.plugins) {
    args.push("--plugins");
    args.push(params.plugins.join(","));}

  if (params.retainLines) args.push("--retain-lines");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var info = _step.value;
      var res = undefined;
      var ca = args.concat([]);
      var src = info.src;
      var dst = info.dst;


      if (!dst) throw new Error("Expected 'dst' property.");
      if (!src) continue;


      if (/[\/\\]$/.test(dst)) {
        new _justoFs.Dir(dst).create();
        ca.push("-d");
        ca.push(dst);} else 
      {
        ca.push("-o");
        ca.push(dst);}


      if (typeof src == "string") src = [src];
      ca = ca.concat(src);

      res = _child_process2.default.spawnSync(cmd, ca);
      if (res.error) throw res.error;
      if (res.status) throw new Error(res.stderr.toString());}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


  return 0;}