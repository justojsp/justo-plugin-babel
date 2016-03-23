//imports
import path from "path";
import * as babel from "babel-core";
import {entry, Dir, File} from "justo-fs";

/**
 * Op.
 */
export default function op(params) {
  var src, ignore, opts = {}, count = 0;

  //(1) arguments
  if (params.length === 0) params = {};
  else if (params.length >= 1) params = params[0];

  ignore = params.ignore || [];
  if (typeof(ignore) == "string" || ignore instanceof RegExp) ignore = [ignore];
  for (let i = 0; i < ignore.length; ++i) {
    let item = ignore[i];
    if(typeof(item) == "string") ignore[i] = path.join(item);
  }

  src = params.files || [];
  if (!(src instanceof Array)) src = [src];
  if (params.src) src.push({src: params.src, dst: params.dst});

  opts.presets = params.presets || [];
  if (params.preset) opts.presets.push(params.preset);
  opts.plugins = params.plugins || [];
  if (params.plugin) opts.plugins.push(params.plugin);
  opts.comments = (params.hasOwnProperty("comments") ? !!params.comments : true);
  opts.retainLines = !!params.retainLines;
  opts.compact = !!params.compact;
  opts.babelrc = (params.hasOwnProperty("babelrc") ? !!params.babelrc : true);

  //(2) transpile
  for (let info of src) {
    let src = info.src;
    let dst = info.dst;

    //pre
    if (!dst) throw new Error("Expected 'dst' property.");
    if (!src) continue;

    //transpile
    if (typeof(src) == "string") src = [src];

    for (let file of src) {
      file = entry(file);

      if (file instanceof File) count += transpileFile(file, dst, opts, ignore);
      else if (file instanceof Dir) count += transpileDir(file, dst, opts, ignore);
    }
  }

  //(3) return
  return count;
}

//transpileDir(src : Dir, dst : string, opts : object, ignore : object[]) : number
function transpileDir(src, dst, opts, ignore) {
  var count = 0;

  //(1) determine dst
  if (typeof(dst) == "string") {
    if (/[\\\/]$/.test(dst)) dst = new Dir(dst, src.name);
    else dst = new Dir(dst);
  }

  //(2) transpile
  for (let entry of src.entries) {
    if (entry instanceof File) count += transpileFile(entry, dst.file(entry.name), opts, ignore);
    else if (entry instanceof Dir) count += transpileDir(entry, dst.dir(entry.name), opts, ignore);
  }

  //(3) return
  return count;
}

//transpileFile(src : File, dst : string|File, opts : object, ignore : object[]) : number
function transpileFile(src, dst, opts, ignore) {
  var parent;

  //(1) pre
  if (!src.exists()) return 0;

  for (let entry of ignore) {
    if (entry instanceof RegExp) {
      if (entry.test(src.path)) return 0;
    } else {
      if (entry == src.path) return 0;
    }
  }

  //(2) transpile
  if (typeof(dst) == "string") {
    if (/[\\\/]$/.test(dst)) dst = new File(dst, src.name);
    else dst = new File(dst);
  }

  parent = new Dir(dst.parent);
  if (!parent.exists()) parent.create();
  dst.text = babel.transformFileSync(src.path, opts).code;

  //(3) return
  return 1;
}
