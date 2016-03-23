"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 







op;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _babelCore = require("babel-core");var babel = _interopRequireWildcard(_babelCore);var _justoFs = require("justo-fs");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var src, ignore, opts = {}, count = 0;


  if (params.length === 0) params = {};else 
  if (params.length >= 1) params = params[0];

  ignore = params.ignore || [];
  if (typeof ignore == "string" || ignore instanceof RegExp) ignore = [ignore];
  for (var i = 0; i < ignore.length; ++i) {
    var item = ignore[i];
    if (typeof item == "string") ignore[i] = _path2.default.join(item);}


  src = params.files || [];
  if (!(src instanceof Array)) src = [src];
  if (params.src) src.push({ src: params.src, dst: params.dst });

  opts.presets = params.presets || [];
  if (params.preset) opts.presets.push(params.preset);
  opts.plugins = params.plugins || [];
  if (params.plugin) opts.plugins.push(params.plugin);
  opts.comments = params.hasOwnProperty("comments") ? !!params.comments : true;
  opts.retainLines = !!params.retainLines;
  opts.compact = !!params.compact;
  opts.babelrc = params.hasOwnProperty("babelrc") ? !!params.babelrc : true;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var info = _step.value;
      var _src = info.src;
      var dst = info.dst;


      if (!dst) throw new Error("Expected 'dst' property.");
      if (!_src) continue;


      if (typeof _src == "string") _src = [_src];var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

        for (var _iterator2 = _src[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var file = _step2.value;
          file = (0, _justoFs.entry)(file);

          if (file instanceof _justoFs.File) count += transpileFile(file, dst, opts, ignore);else 
          if (file instanceof _justoFs.Dir) count += transpileDir(file, dst, opts, ignore);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




  return count;}



function transpileDir(src, dst, opts, ignore) {
  var count = 0;


  if (typeof dst == "string") {
    if (/[\\\/]$/.test(dst)) dst = new _justoFs.Dir(dst, src.name);else 
    dst = new _justoFs.Dir(dst);}var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {



    for (var _iterator3 = src.entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _entry = _step3.value;
      if (_entry instanceof _justoFs.File) count += transpileFile(_entry, dst.file(_entry.name), opts, ignore);else 
      if (_entry instanceof _justoFs.Dir) count += transpileDir(_entry, dst.dir(_entry.name), opts, ignore);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}



  return count;}



function transpileFile(src, dst, opts, ignore) {
  var parent;


  if (!src.exists()) return 0;var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {

    for (var _iterator4 = ignore[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var _entry2 = _step4.value;
      if (_entry2 instanceof RegExp) {
        if (_entry2.test(src.path)) return 0;} else 
      {
        if (_entry2 == src.path) return 0;}}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}




  if (typeof dst == "string") {
    if (/[\\\/]$/.test(dst)) dst = new _justoFs.File(dst, src.name);else 
    dst = new _justoFs.File(dst);}


  parent = new _justoFs.Dir(dst.parent);
  if (!parent.exists()) parent.create();
  dst.text = babel.transformFileSync(src.path, opts).code;


  return 1;}